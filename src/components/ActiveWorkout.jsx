import React, { useState, useEffect } from 'react';
import './ActiveWorkout.css';
import Layout from './Layout';
import { auth, saveWorkoutSession } from '../services/firebase';

function ActiveWorkout({ workout, onComplete, onClose }) {
  const [exercises, setExercises] = useState(workout && workout.exercises ? 
    workout.exercises.map(exercise => ({
      name: exercise.name || exercise,
      sets: Array(exercise.sets || 3).fill({}).map(() => ({ 
        weight: '',
        reps: '',
        completed: false 
      })),
      type: 'weighted', // or 'timed'
      isCustom: false,
      previousWeights: []
    })) : []);
  const [customExercises, setCustomExercises] = useState([]);
  const [showAddExercise, setShowAddExercise] = useState(false);
  const [newExercise, setNewExercise] = useState({
    name: '',
    type: 'weighted',
    sets: 3,
    timePerSet: 30, // in seconds
  });
  const [currentExercise, setCurrentExercise] = useState(0);
  const [currentSet, setCurrentSet] = useState(0);
  const [showTimer, setShowTimer] = useState(false);
  const [time, setTime] = useState(45); // Rest timer in seconds
  const [timerActive, setTimerActive] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [showCountdown, setShowCountdown] = useState(false);
  const [exerciseHistory, setExerciseHistory] = useState({});
  const [showExerciseOptions, setShowExerciseOptions] = useState(false);
  const [currentWeight, setCurrentWeight] = useState('');
  const [currentReps, setCurrentReps] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [workoutComplete, setWorkoutComplete] = useState(false);
  const [showPreviousWeight, setShowPreviousWeight] = useState(false);

  useEffect(() => {
    // Load exercise history from localStorage for now, but we'll update this to use Firebase
    const history = JSON.parse(localStorage.getItem('exerciseHistory') || '{}');
    setExerciseHistory(history);
    
    // Load previous weights for each exercise
    loadPreviousWeights();
  }, []);

  const loadPreviousWeights = async () => {
    const user = auth.currentUser;
    if (!user) return;
    
    try {
      // For now, we'll just get this from localStorage as a fallback
      const savedWeights = JSON.parse(localStorage.getItem('exerciseWeights') || '{}');
      
      // Update exercises with previous weights
      const updatedExercises = exercises.map(exercise => {
        const previousWeights = savedWeights[exercise.name] || [];
        return {
          ...exercise,
          previousWeights
        };
      });
      
      setExercises(updatedExercises);
    } catch (error) {
      console.error("Error loading previous weights:", error);
    }
  };

  useEffect(() => {
    let interval;
    if (timerActive && time > 0) {
      interval = setInterval(() => {
        setTime(prev => prev - 1);
      }, 1000);
    } else if (time === 0) {
      setTimerActive(false);
      setShowTimer(false);
      setTime(45);
      // Auto-advance to next set or exercise
      advanceToNextSetOrExercise();
    }
    return () => clearInterval(interval);
  }, [timerActive, time]);

  useEffect(() => {
    let interval;
    if (showCountdown && countdown > 0) {
      interval = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    } else if (countdown === 0) {
      setShowCountdown(false);
      setCountdown(3);
      startExerciseTimer();
    }
    return () => clearInterval(interval);
  }, [showCountdown, countdown]);

  const startExerciseTimer = () => {
    const allExercises = [...exercises, ...customExercises];
    if (currentExercise >= allExercises.length) return;
    
    const exercise = allExercises[currentExercise];
    if (exercise.type === 'timed') {
      setTimerActive(true);
      setTime(exercise.timePerSet || 30);
    }
  };
  
  const advanceToNextSetOrExercise = () => {
    const allExercises = [...exercises, ...customExercises];
    if (currentExercise >= allExercises.length) return;
    
    const exercise = allExercises[currentExercise];
    
    if (currentSet + 1 < exercise.sets.length) {
      // Move to next set of current exercise
      setCurrentSet(currentSet + 1);
      setCurrentWeight('');
      setCurrentReps('');
    } else {
      // Check if this was the last exercise
      if (currentExercise + 1 >= allExercises.length) {
        // Workout complete
        finishWorkout();
      } else {
        // Move to next exercise
        setCurrentExercise(currentExercise + 1);
        setCurrentSet(0);
        setCurrentWeight('');
        setCurrentReps('');
      }
    }
  };

  const handleAddCustomExercise = () => {
    if (!newExercise.name) return;

    // Save to exercise history
    const updatedHistory = {
      ...exerciseHistory,
      [newExercise.name.toLowerCase()]: {
        name: newExercise.name,
        type: newExercise.type,
        lastUsed: new Date().toISOString()
      }
    };
    localStorage.setItem('exerciseHistory', JSON.stringify(updatedHistory));
    setExerciseHistory(updatedHistory);

    const customExercise = {
      name: newExercise.name,
      type: newExercise.type,
      sets: Array(newExercise.sets).fill({}).map(() => ({ 
        weight: '',
        reps: '',
        completed: false 
      })),
      isCustom: true,
      timePerSet: newExercise.type === 'timed' ? newExercise.timePerSet : null,
      previousWeights: []
    };

    setCustomExercises(prev => [...prev, customExercise]);
    setShowAddExercise(false);
    setNewExercise({
      name: '',
      type: 'weighted',
      sets: 3,
      timePerSet: 30
    });
  };

  const handleSetComplete = () => {
    const allExercises = [...exercises, ...customExercises];
    if (currentExercise >= allExercises.length) return;
    
    const exercise = allExercises[currentExercise];
    
    // For weighted exercises, validate input
    if (exercise.type === 'weighted' && (!currentWeight || !currentReps)) {
      alert('Please enter both weight and reps');
      return;
    }
    
    // Update the completed set
    const updatedExercises = allExercises.map((ex, i) => {
      if (i === currentExercise) {
        const updatedSets = [...ex.sets];
        updatedSets[currentSet] = {
          weight: exercise.type === 'weighted' ? currentWeight : null,
          reps: exercise.type === 'weighted' ? currentReps : null,
          completed: true
        };
        
        return {
          ...ex,
          sets: updatedSets
        };
      }
      return ex;
    });
    
    // Update state with the new exercises
    setExercises(updatedExercises.filter(ex => !ex.isCustom));
    setCustomExercises(updatedExercises.filter(ex => ex.isCustom));
    
    // Save weight to history for this exercise
    if (exercise.type === 'weighted' && currentWeight) {
      const weightRecord = {
        weight: currentWeight,
        reps: currentReps,
        date: new Date().toISOString()
      };
      
      // For now, store in localStorage as a fallback
      const savedWeights = JSON.parse(localStorage.getItem('exerciseWeights') || '{}');
      const exerciseWeights = savedWeights[exercise.name] || [];
      exerciseWeights.unshift(weightRecord); // Add to beginning of array
      
      // Keep only the last 10 records
      if (exerciseWeights.length > 10) {
        exerciseWeights.pop();
      }
      
      savedWeights[exercise.name] = exerciseWeights;
      localStorage.setItem('exerciseWeights', JSON.stringify(savedWeights));
    }
    
    // Start rest timer if not the last set or exercise
    if (currentSet + 1 < exercise.sets.length || currentExercise + 1 < allExercises.length) {
      setShowTimer(true);
      setTimerActive(true);
      setTime(45);
    } else {
      // Last set of last exercise - workout complete
      finishWorkout();
    }
  };

  const finishWorkout = async () => {
    setWorkoutComplete(true);
    setIsSaving(true);
    
    try {
      const user = auth.currentUser;
      if (!user) {
        console.error("User not authenticated");
        onComplete({
          exercises: [...exercises, ...customExercises],
          completedAt: new Date().toISOString()
        });
        return;
      }
      
      // Save workout to Firebase
      const workoutData = {
        exercises: [...exercises, ...customExercises].map(ex => ({
          name: ex.name,
          type: ex.type,
          sets: ex.sets.filter(set => set.completed)
        })),
        workoutName: workout.day,
        duration: calculateWorkoutDuration()
      };
      
      const result = await saveWorkoutSession(user.uid, workoutData);
      
      if (result.error) {
        console.error("Error saving workout:", result.error);
      }
      
      // Notify parent component
      onComplete(workoutData);
    } catch (error) {
      console.error("Error completing workout:", error);
    } finally {
      setIsSaving(false);
    }
  };
  
  const calculateWorkoutDuration = () => {
    // In a real app, you'd track the actual duration
    // For now, just generate a reasonable estimate
    const allExercises = [...exercises, ...customExercises];
    const completedSets = allExercises.reduce((total, ex) => {
      return total + ex.sets.filter(set => set.completed).length;
    }, 0);
    
    // Estimate: 1 minute per set + rest time
    return completedSets * 1.75; // minutes
  };

  const handleSkipRest = () => {
    setTimerActive(false);
    setShowTimer(false);
    setTime(45);
    advanceToNextSetOrExercise();
  };

  const handleSkipSet = () => {
    advanceToNextSetOrExercise();
  };

  const startExercise = () => {
    setShowCountdown(true);
  };

  const handleExerciseSearch = (searchTerm) => {
    const matches = Object.values(exerciseHistory)
      .filter(ex => ex.name.toLowerCase().includes(searchTerm.toLowerCase()))
      .sort((a, b) => new Date(b.lastUsed) - new Date(a.lastUsed));
    return matches;
  };
  
  const getLastWeight = () => {
    const allExercises = [...exercises, ...customExercises];
    if (currentExercise >= allExercises.length) return null;
    
    const exercise = allExercises[currentExercise];
    if (exercise.previousWeights && exercise.previousWeights.length > 0) {
      return exercise.previousWeights[0];
    }
    return null;
  };
  
  const togglePreviousWeight = () => {
    setShowPreviousWeight(!showPreviousWeight);
  };

  // Safety check for missing workout data
  if (!workout || !workout.day) {
    return (
      <Layout>
        <div className="active-workout error-state">
          <div className="workout-header">
            <button className="close-button" onClick={onClose}>×</button>
            <h2>Workout Error</h2>
          </div>
          <div className="error-message">
            <p>There was a problem loading your workout. Please go back and try again.</p>
            <button className="primary-button" onClick={onClose}>Return to Dashboard</button>
          </div>
        </div>
      </Layout>
    );
  }
  
  // If workout is complete, show summary
  if (workoutComplete) {
    return (
      <Layout>
        <div className="active-workout">
          <div className="workout-header">
            <button className="close-button" onClick={onClose}>×</button>
            <h2>Workout Complete!</h2>
          </div>
          
          <div className="workout-complete">
            <div className="complete-icon">🏆</div>
            <h3>Great Job!</h3>
            <p>You've completed your workout for today.</p>
            
            <div className="workout-summary">
              <div className="summary-stat">
                <span className="stat-label">Exercises</span>
                <span className="stat-value">{exercises.length + customExercises.length}</span>
              </div>
              <div className="summary-stat">
                <span className="stat-label">Sets</span>
                <span className="stat-value">
                  {[...exercises, ...customExercises].reduce((total, ex) => {
                    return total + ex.sets.filter(set => set.completed).length;
                  }, 0)}
                </span>
              </div>
              <div className="summary-stat">
                <span className="stat-label">Duration</span>
                <span className="stat-value">{Math.round(calculateWorkoutDuration())} min</span>
              </div>
            </div>
            
            {isSaving ? (
              <div className="saving-indicator">Saving your progress...</div>
            ) : (
              <button className="primary-button" onClick={onClose}>
                Return to Dashboard
              </button>
            )}
          </div>
        </div>
      </Layout>
    );
  }

  // Get the current exercise and set
  const allExercises = [...exercises, ...customExercises];
  const currentExerciseData = allExercises[currentExercise];
  const lastWeight = getLastWeight();
  
  return (
    <Layout>
      <div className="active-workout">
        <div className="workout-header">
          <button className="close-button" onClick={onClose}>×</button>
          <h2>Workout {workout.day}</h2>
        </div>

      {showAddExercise ? (
        <div className="add-exercise-form">
          <input
            type="text"
            placeholder="Exercise name"
            value={newExercise.name}
            onChange={(e) => {
              setNewExercise(prev => ({ ...prev, name: e.target.value }));
              const matches = handleExerciseSearch(e.target.value);
              // Show matches in UI
            }}
          />
          <div className="exercise-type-buttons">
            <button
              className={`type-button ${newExercise.type === 'weighted' ? 'active' : ''}`}
              onClick={() => setNewExercise(prev => ({ ...prev, type: 'weighted' }))}
            >
              Weighted
            </button>
            <button
              className={`type-button ${newExercise.type === 'timed' ? 'active' : ''}`}
              onClick={() => setNewExercise(prev => ({ ...prev, type: 'timed' }))}
            >
              Timed
            </button>
          </div>
          {newExercise.type === 'timed' && (
            <input
              type="number"
              placeholder="Time per set (seconds)"
              value={newExercise.timePerSet}
              onChange={(e) => setNewExercise(prev => ({ ...prev, timePerSet: parseInt(e.target.value) }))}
            />
          )}
          <input
            type="number"
            placeholder="Number of sets"
            value={newExercise.sets}
            onChange={(e) => setNewExercise(prev => ({ ...prev, sets: parseInt(e.target.value) }))}
          />
          <div className="button-group">
            <button onClick={() => setShowAddExercise(false)}>Cancel</button>
            <button onClick={handleAddCustomExercise}>Add Exercise</button>
          </div>
        </div>
      ) : showCountdown ? (
        <div className="countdown">
          <div className="countdown-number">{countdown}</div>
        </div>
      ) : showTimer ? (
        <div className="rest-timer">
          <div className="timer-circle">
            <svg viewBox="0 0 100 100">
              <circle 
                cx="50" cy="50" r="45" 
                fill="none" 
                stroke="#eee" 
                strokeWidth="5"
              />
              <circle 
                cx="50" cy="50" r="45" 
                fill="none" 
                stroke="#d4af37" 
                strokeWidth="5"
                strokeDasharray="283"
                strokeDashoffset={283 - (283 * (time / 45))}
                transform="rotate(-90 50 50)"
              />
            </svg>
            <div className="timer-text">{time}</div>
          </div>
          <div className="timer-label">Rest Time</div>
          <button className="skip-button" onClick={handleSkipRest}>Skip Rest</button>
        </div>
      ) : currentExerciseData ? (
        <div className="current-exercise">
          <div className="exercise-progress">
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ 
                  width: `${(((currentExercise * currentExerciseData.sets.length) + currentSet) / 
                    (allExercises.reduce((total, ex) => total + ex.sets.length, 0))) * 100}%` 
                }}
              ></div>
            </div>
            <div className="progress-text">
              Exercise {currentExercise + 1}/{allExercises.length}
            </div>
          </div>
          
          <div className="exercise-header">
            <h3>{currentExerciseData.name}</h3>
            <div className="set-indicator">
              Set {currentSet + 1}/{currentExerciseData.sets.length}
            </div>
          </div>
          
          {currentExerciseData.type === 'weighted' ? (
            <div className="weight-input-section">
              {lastWeight && (
                <button 
                  className="previous-weight-toggle"
                  onClick={togglePreviousWeight}
                >
                  {showPreviousWeight ? 'Hide' : 'Show'} Last Time
                </button>
              )}
              
              {showPreviousWeight && lastWeight && (
                <div className="previous-weight-info">
                  <p>Last time: {lastWeight.weight} lbs × {lastWeight.reps} reps</p>
                  <p className="weight-date">{new Date(lastWeight.date).toLocaleDateString()}</p>
                </div>
              )}
              
              <div className="weight-input-row">
                <div className="input-group">
                  <label>Weight (lbs)</label>
                  <input 
                    type="number" 
                    value={currentWeight}
                    onChange={(e) => setCurrentWeight(e.target.value)}
                    placeholder={lastWeight ? lastWeight.weight : "0"}
                  />
                </div>
                
                <div className="input-group">
                  <label>Reps</label>
                  <input 
                    type="number" 
                    value={currentReps}
                    onChange={(e) => setCurrentReps(e.target.value)}
                    placeholder={lastWeight ? lastWeight.reps : "0"}
                  />
                </div>
              </div>
              
              <button 
                className="complete-set-button"
                onClick={handleSetComplete}
              >
                Complete Set
              </button>
            </div>
          ) : (
            <div className="timed-exercise">
              <div className="time-display">
                {currentExerciseData.timePerSet || 30} seconds
              </div>
              <button 
                className="start-button"
                onClick={startExercise}
              >
                Start
              </button>
            </div>
          )}
          
          <button 
            className="skip-set-button"
            onClick={handleSkipSet}
          >
            Skip Set
          </button>
        </div>
      ) : (
        <div className="workout-loading">
          <p>Loading workout...</p>
        </div>
      )}
      
      <div className="exercise-list-toggle" onClick={() => setShowExerciseOptions(!showExerciseOptions)}>
        {showExerciseOptions ? 'Hide Exercise List' : 'Show Exercise List'}
      </div>
      
      {showExerciseOptions && (
        <div className="exercise-options">
          <div className="exercise-list-section">
            <h4>Workout Exercises</h4>
            <ul className="exercise-list">
              {allExercises.map((exercise, index) => (
                <li 
                  key={index} 
                  className={`exercise-item ${index === currentExercise ? 'current' : ''} ${
                    index < currentExercise ? 'completed' : ''
                  }`}
                >
                  <span className="exercise-name">{exercise.name}</span>
                  <div className="exercise-sets">
                    {exercise.sets.map((set, setIndex) => (
                      <div 
                        key={setIndex} 
                        className={`set-indicator ${
                          set.completed ? 'completed' : 
                          (index === currentExercise && setIndex === currentSet) ? 'current' : ''
                        }`}
                      ></div>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </div>
          
          <button 
            className="add-exercise-button" 
            onClick={() => setShowAddExercise(true)}
          >
            Add Exercise
          </button>
        </div>
      )}
      </div>
    </Layout>
  );
}

export default ActiveWorkout;