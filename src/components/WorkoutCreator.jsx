import React, { useState } from 'react';
import './WorkoutCreator.css';

function WorkoutCreator({ userProfile, onCreateWorkout, onCancel }) {
  const [workoutType, setWorkoutType] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!workoutType) {
      setError('Please select a workout type');
      return;
    }

    setLoading(true);
    setError('');

    try {
      console.log('Creating workout with type:', workoutType);
      
      // Create a new workout plan with the selected focus
      const updatedProfile = {
        ...userProfile,
        focus: workoutType
      };

      console.log('Updated profile:', updatedProfile);

      // Save the updated profile
      localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
      
      // Call the parent component's callback
      setTimeout(() => {
        try {
          onCreateWorkout(updatedProfile);
        } catch (callbackErr) {
          console.error('Error in onCreateWorkout callback:', callbackErr);
          setError('Error creating workout: ' + callbackErr.message);
          setLoading(false);
        }
      }, 100); // Small delay to prevent UI freezing
    } catch (err) {
      console.error('Error in handleSubmit:', err);
      setError('An error occurred. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="workout-creator-overlay">
      <div className="workout-creator-modal">
        <button className="close-button" onClick={onCancel}>×</button>
        
        <div className="workout-creator-header">
          <h2>Create Your Workout Plan</h2>
          <p>Select your training focus to generate a personalized 6-week workout plan</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="workout-type-options">
            <div 
              className={`workout-type-card ${workoutType === 'strength' ? 'selected' : ''}`}
              onClick={() => setWorkoutType('strength')}
            >
              <div className="workout-type-icon">💪</div>
              <h3>Strength</h3>
              <p>Focus on building muscle mass and raw power</p>
              <ul>
                <li>Heavy compound lifts</li>
                <li>Progressive overload</li>
                <li>Lower rep ranges</li>
                <li>Longer rest periods</li>
              </ul>
              {workoutType === 'strength' && <div className="selected-indicator">✓</div>}
            </div>

            <div 
              className={`workout-type-card ${workoutType === 'explosiveness' ? 'selected' : ''}`}
              onClick={() => setWorkoutType('explosiveness')}
            >
              <div className="workout-type-icon">⚡</div>
              <h3>Explosiveness</h3>
              <p>Focus on speed, power, and athletic performance</p>
              <ul>
                <li>Plyometric exercises</li>
                <li>Olympic lifts</li>
                <li>Speed drills</li>
                <li>Reactive training</li>
              </ul>
              {workoutType === 'explosiveness' && <div className="selected-indicator">✓</div>}
            </div>
          </div>

          <div className="workout-creator-footer">
            <button 
              type="submit" 
              className="create-plan-button"
              disabled={loading}
            >
              {loading ? 'Creating Plan...' : 'Create Workout Plan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default WorkoutCreator;
