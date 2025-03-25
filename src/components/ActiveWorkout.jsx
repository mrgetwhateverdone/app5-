import React, { useState, useEffect, useRef } from 'react';
import './ActiveWorkout.css';
import Layout from './Layout';
import { 
  auth,
  getWorkoutPlanById, 
  completeWorkoutSession, 
  getExerciseWeights, 
  saveExerciseWeight
} from '../services/firebase';
import { useParams, useNavigate } from 'react-router-dom';

function ActiveWorkout() {
  const { planId } = useParams();
  const navigate = useNavigate();
  const [workoutPlan, setWorkoutPlan] = useState(null);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [sets, setSets] = useState([]);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isResting, setIsResting] = useState(false);
  const [restTimer, setRestTimer] = useState(0);
  const [workoutComplete, setWorkoutComplete] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [exerciseWeights, setExerciseWeights] = useState({});
  const intervalRef = useRef(null);
  const restIntervalRef = useRef(null);

  useEffect(() => {
    const loadWorkoutAndWeights = async () => {
      try {
        setLoading(true);
        
        const user = auth.currentUser;
        if (!user) {
          navigate('/login');
          return;
        }
        
        // Load workout plan from Firebase
        const { plan, error: planError } = await getWorkoutPlanById(planId);
        
        if (planError) {
          console.error("Error loading workout plan:", planError);
          setError("Failed to load workout plan");
          setLoading(false);
          return;
        }
        
        if (!plan) {
          setError("Workout plan not found");
          setLoading(false);
          return;
        }
        
        setWorkoutPlan(plan);
        
        // Initialize sets data structure for tracking
        const initialSets = [];
        for (let i = 0; i < plan.exercises.length; i++) {
          const exercise = plan.exercises[i];
          initialSets[i] = Array(exercise.sets).fill().map(() => ({
            completed: false,
            weight: 0,
            reps: exercise.reps
          }));
        }
        setSets(initialSets);
        
        // Load previous exercise weights from Firebase
        const weights = await getExerciseWeights(user.uid);
        setExerciseWeights(weights || {});
        
        // Pre-fill weights based on previous data
        if (weights) {
          const updatedSets = [...initialSets];
          for (let i = 0; i < plan.exercises.length; i++) {
            const exerciseName = plan.exercises[i].name;
            if (weights[exerciseName]) {
              const lastEntry = Object.entries(weights[exerciseName])
                .sort((a, b) => new Date(b[0]) - new Date(a[0]))[0];
              
              if (lastEntry) {
                const lastWeight = lastEntry[1];
                updatedSets[i] = updatedSets[i].map(set => ({
                  ...set,
                  weight: lastWeight
                }));
              }
            }
          }
          setSets(updatedSets);
        }
        
        // Start the workout timer
        setIsTimerRunning(true);
        
        setLoading(false);
      } catch (err) {
        console.error("Error setting up workout:", err);
        setError("Failed to set up workout");
        setLoading(false);
      }
    };
    
    loadWorkoutAndWeights();
    
    // Clean up function to clear intervals
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (restIntervalRef.current) clearInterval(restIntervalRef.current);
    };
  }, [planId, navigate]);

  // Timer for tracking workout duration
  useEffect(() => {
    if (isTimerRunning) {
      intervalRef.current = setInterval(() => {
        setTimer(prevTimer => prevTimer + 1);
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isTimerRunning]);

  // Timer for rest periods
  useEffect(() => {
    if (isResting && restTimer > 0) {
      restIntervalRef.current = setInterval(() => {
        setRestTimer(prevTimer => {
          if (prevTimer <= 1) {
            clearInterval(restIntervalRef.current);
            setIsResting(false);
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);
    } else if (restIntervalRef.current) {
      clearInterval(restIntervalRef.current);
    }
    
    return () => {
      if (restIntervalRef.current) clearInterval(restIntervalRef.current);
    };
  }, [isResting, restTimer]);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleWeightChange = (setIndex, value) => {
    const newSets = [...sets];
    const numericValue = value === '' ? 0 : Number(value);
    newSets[currentExerciseIndex][setIndex].weight = numericValue;
    setSets(newSets);
  };

  const handleSetComplete = async (setIndex) => {
    // Update set completion status
    const newSets = [...sets];
    newSets[currentExerciseIndex][setIndex].completed = true;
    setSets(newSets);
    
    // Save the weight used for this exercise to Firebase
    const exerciseName = workoutPlan.exercises[currentExerciseIndex].name;
    const weight = newSets[currentExerciseIndex][setIndex].weight;
    
    if (weight > 0) {
      try {
        const user = auth.currentUser;
        if (user) {
          await saveExerciseWeight(user.uid, exerciseName, weight);
        }
      } catch (err) {
        console.error("Error saving exercise weight:", err);
      }
    }
    
    // Check if all sets are completed for current exercise
    const allSetsCompleted = newSets[currentExerciseIndex].every(set => set.completed);
    
    if (allSetsCompleted) {
      // Move to next exercise or complete workout
      if (currentExerciseIndex < workoutPlan.exercises.length - 1) {
        // Start rest timer
        setRestTimer(60); // 60 seconds rest between exercises
        setIsResting(true);
        
        // After rest period completes, setIsResting will be set to false
        // by the rest timer effect
      } else {
        // Workout is complete
        await completeWorkout();
      }
    } else {
      // Start a shorter rest timer between sets
      setRestTimer(30); // 30 seconds rest between sets
      setIsResting(true);
    }
  };

  const moveToNextExercise = () => {
    if (currentExerciseIndex < workoutPlan.exercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
    } else {
      completeWorkout();
    }
  };

  const skipRest = () => {
    setIsResting(false);
    setRestTimer(0);
    
    // Check if all sets are completed for current exercise
    const allSetsCompleted = sets[currentExerciseIndex].every(set => set.completed);
    
    if (allSetsCompleted && currentExerciseIndex < workoutPlan.exercises.length - 1) {
      // Move to the next exercise
      setCurrentExerciseIndex(currentExerciseIndex + 1);
    }
  };

  const completeWorkout = async () => {
    setIsTimerRunning(false);
    setWorkoutComplete(true);
    
    try {
      const user = auth.currentUser;
      if (!user) return;
      
      // Prepare workout summary data
      const completedExercises = workoutPlan.exercises.map((exercise, index) => ({
        name: exercise.name,
        sets: sets[index].map(set => ({
          completed: set.completed,
          weight: set.weight,
          reps: set.reps
        }))
      }));
      
      const workoutSummary = {
        planId: planId,
        planName: workoutPlan.name,
        date: new Date().toISOString(),
        duration: timer,
        exercises: completedExercises
      };
      
      // Save completed workout to Firebase
      await completeWorkoutSession(user.uid, workoutSummary);
      
    } catch (err) {
      console.error("Error saving workout completion:", err);
      setError("Failed to save workout results");
    }
  };

  const restartWorkout = () => {
    // Reset all workout state
    setCurrentExerciseIndex(0);
    setTimer(0);
    setIsTimerRunning(true);
    setIsResting(false);
    setRestTimer(0);
    setWorkoutComplete(false);
    
    // Reset set completion status but keep weights
    const resetSets = sets.map(exerciseSets => 
      exerciseSets.map(set => ({
        ...set,
        completed: false
      }))
    );
    setSets(resetSets);
  };

  const exitWorkout = () => {
    navigate('/dashboard');
  };

  if (loading) {
    return (
      <Layout>
        <div className="active-workout-container">
          <div className="loading-message">Loading workout...</div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="active-workout-container">
          <div className="error-message">{error}</div>
          <button className="secondary-button" onClick={() => navigate('/dashboard')}>
            Return to Dashboard
          </button>
        </div>
      </Layout>
    );
  }

  if (!workoutPlan) {
    return (
      <Layout>
        <div className="active-workout-container">
          <div className="error-message">Workout plan not found</div>
          <button className="secondary-button" onClick={() => navigate('/dashboard')}>
            Return to Dashboard
          </button>
        </div>
      </Layout>
    );
  }

  if (workoutComplete) {
    return (
      <Layout>
        <div className="active-workout-container">
          <div className="workout-complete">
            <h1>Workout Complete!</h1>
            <div className="workout-summary">
              <p><strong>Workout:</strong> {workoutPlan.name}</p>
              <p><strong>Duration:</strong> {formatTime(timer)}</p>
              <p><strong>Exercises Completed:</strong> {workoutPlan.exercises.length}</p>
            </div>
            <div className="action-buttons">
              <button className="primary-button" onClick={restartWorkout}>
                Restart Workout
              </button>
              <button className="secondary-button" onClick={exitWorkout}>
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  const currentExercise = workoutPlan.exercises[currentExerciseIndex];

  return (
    <Layout>
      <div className="active-workout-container">
        <div className="workout-header">
          <h1>{workoutPlan.name}</h1>
          <div className="workout-timer">
            <span className="timer-label">Workout Time:</span>
            <span className="timer-value">{formatTime(timer)}</span>
          </div>
        </div>
        
        <div className="exercise-progress">
          <div className="progress-indicator">
            {workoutPlan.exercises.map((_, index) => (
              <div 
                key={index} 
                className={`progress-dot ${index < currentExerciseIndex ? 'completed' : index === currentExerciseIndex ? 'current' : ''}`}
              ></div>
            ))}
          </div>
          <div className="exercise-counter">
            Exercise {currentExerciseIndex + 1} of {workoutPlan.exercises.length}
          </div>
        </div>
        
        {isResting ? (
          <div className="rest-period">
            <h2>Rest Period</h2>
            <div className="rest-timer">{formatTime(restTimer)}</div>
            <p>Next exercise: {
              currentExerciseIndex < workoutPlan.exercises.length - 1 
                ? workoutPlan.exercises[currentExerciseIndex + 1].name 
                : 'Workout Complete'
            }</p>
            <button className="skip-rest-button" onClick={skipRest}>
              Skip Rest
            </button>
          </div>
        ) : (
          <div className="current-exercise">
            <h2>{currentExercise.name}</h2>
            <div className="exercise-details">
              <div className="exercise-target">
                <span className="detail-label">Target:</span>
                <span className="detail-value">{currentExercise.target}</span>
              </div>
              <div className="exercise-info">
                <span className="detail-label">Sets:</span>
                <span className="detail-value">{currentExercise.sets}</span>
              </div>
              <div className="exercise-info">
                <span className="detail-label">Reps:</span>
                <span className="detail-value">{currentExercise.reps}</span>
              </div>
              {currentExercise.notes && (
                <div className="exercise-notes">
                  <span className="detail-label">Notes:</span>
                  <span className="detail-value">{currentExercise.notes}</span>
                </div>
              )}
            </div>
            
            <div className="sets-container">
              <h3>Sets</h3>
              {sets[currentExerciseIndex].map((set, index) => (
                <div key={index} className={`set-item ${set.completed ? 'completed' : ''}`}>
                  <div className="set-number">Set {index + 1}</div>
                  <div className="set-fields">
                    <div className="set-field">
                      <label htmlFor={`weight-${index}`}>Weight (lbs)</label>
                      <input
                        type="number"
                        id={`weight-${index}`}
                        value={set.weight || ''}
                        onChange={(e) => handleWeightChange(index, e.target.value)}
                        disabled={set.completed}
                        min="0"
                        step="5"
                      />
                    </div>
                    <div className="set-field">
                      <label htmlFor={`reps-${index}`}>Reps</label>
                      <input
                        type="number"
                        id={`reps-${index}`}
                        value={set.reps}
                        readOnly
                        disabled
                      />
                    </div>
                  </div>
                  <button 
                    className={`complete-set-button ${set.completed ? 'disabled' : ''}`}
                    onClick={() => handleSetComplete(index)}
                    disabled={set.completed}
                  >
                    {set.completed ? 'Completed' : 'Complete Set'}
                  </button>
                </div>
              ))}
            </div>
            
            <div className="navigation-buttons">
              {currentExerciseIndex > 0 && (
                <button
                  className="nav-button prev-button"
                  onClick={() => setCurrentExerciseIndex(currentExerciseIndex - 1)}
                >
                  Previous Exercise
                </button>
              )}
              
              {currentExerciseIndex < workoutPlan.exercises.length - 1 && (
                <button
                  className="nav-button next-button"
                  onClick={moveToNextExercise}
                >
                  Next Exercise
                </button>
              )}
              
              {currentExerciseIndex === workoutPlan.exercises.length - 1 && (
                <button
                  className="nav-button finish-button"
                  onClick={completeWorkout}
                >
                  Finish Workout
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default ActiveWorkout;