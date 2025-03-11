import React, { useState, useEffect } from 'react';
import './ActiveWorkout.css';
import Layout from './Layout';

function ActiveWorkout({ workout, onComplete, onClose }) {
  const [exercises, setExercises] = useState(workout && workout.exercises ? 
    workout.exercises.map(exercise => ({
      name: exercise.name || exercise,
      sets: [],
      type: 'weighted', // or 'timed'
      isCustom: false
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

  useEffect(() => {
    // Load exercise history from localStorage
    const history = JSON.parse(localStorage.getItem('exerciseHistory') || '{}');
    setExerciseHistory(history);
  }, []);

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
    const exercise = [...exercises, ...customExercises][currentExercise];
    if (exercise.type === 'timed') {
      setTimerActive(true);
      setTime(exercise.timePerSet || 30);
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
      sets: [],
      isCustom: true,
      timePerSet: newExercise.type === 'timed' ? newExercise.timePerSet : null
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

  const handleSetComplete = (weight, reps) => {
    const allExercises = [...exercises, ...customExercises];
    const exercise = allExercises[currentExercise];
    
    const newSet = exercise.type === 'weighted' 
      ? { weight, reps, completed: true }
      : { completed: true };

    const updatedExercises = allExercises.map((ex, i) => {
      if (i === currentExercise) {
        return {
          ...ex,
          sets: [...ex.sets, newSet]
        };
      }
      return ex;
    });

    if (currentExercise < allExercises.length) {
      setExercises(updatedExercises.filter(ex => !ex.isCustom));
      setCustomExercises(updatedExercises.filter(ex => ex.isCustom));
      setShowTimer(true);
      setTimerActive(true);
      setTime(45);
    }
  };

  const handleSkipRest = () => {
    setTimerActive(false);
    setShowTimer(false);
    setTime(45);
    if (currentSet + 1 < exercises[currentExercise].sets.length) {
      setCurrentSet(currentSet + 1);
    } else {
      setCurrentSet(0);
      setCurrentExercise(currentExercise + 1);
    }
  };

  const handleAddSet = () => {
    const allExercises = [...exercises, ...customExercises];
    const exercise = allExercises[currentExercise];
    exercise.sets.push({});
  };

  const handleSkipSet = () => {
    const allExercises = [...exercises, ...customExercises];
    if (currentSet + 1 < allExercises[currentExercise].sets.length) {
      setCurrentSet(currentSet + 1);
    } else {
      setCurrentSet(0);
      setCurrentExercise(currentExercise + 1);
    }
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
            <svg>
              <circle
                className="timer-progress"
                style={{
                  strokeDashoffset: `${440 * (1 - time / 45)}px`
                }}
              />
            </svg>
            <div className="timer-text">{time}s</div>
          </div>
          <button className="skip-rest" onClick={handleSkipRest}>
            Skip Rest
          </button>
        </div>
      ) : (
        <>
          <button className="add-exercise-button" onClick={() => setShowAddExercise(true)}>
            Add Custom Exercise
          </button>

          <div className="current-exercise">
            {currentExercise < [...exercises, ...customExercises].length && (
              <>
                <h3>{[...exercises, ...customExercises][currentExercise].name}</h3>
                <div className="set-info">
                  <div className="previous-weight">
                    Previous: {exerciseHistory[[...exercises, ...customExercises][currentExercise].name]?.lastWeight || 'No data'}
                  </div>
                  
                  {[...exercises, ...customExercises][currentExercise].type === 'weighted' ? (
                    <div className="weight-input">
                      <input type="number" placeholder="Weight (lbs)" />
                      <input type="number" placeholder="Reps" />
                      <button onClick={() => handleSetComplete(weight, reps)}>✓</button>
                    </div>
                  ) : (
                    <button onClick={startExercise}>Start Timer</button>
                  )}
                </div>

                <div className="exercise-options">
                  <button onClick={handleAddSet}>Add Set</button>
                  <button onClick={handleSkipSet}>Skip Set</button>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
    </Layout>
  );
}

export default ActiveWorkout;