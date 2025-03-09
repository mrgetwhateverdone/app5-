import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from './Layout';
import './Profile.css';

function Profile() {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [completedWorkouts, setCompletedWorkouts] = useState({});
  const [selectedWorkout, setSelectedWorkout] = useState(null);

  useEffect(() => {
    const storedProfile = localStorage.getItem('userProfile');
    const storedName = localStorage.getItem('userName');
    const storedWorkouts = localStorage.getItem('completedWorkouts');
    
    if (!storedProfile || !storedName) {
      navigate('/login');
      return;
    }

    setUserProfile({
      name: storedName,
      ...JSON.parse(storedProfile)
    });

    if (storedWorkouts) {
      setCompletedWorkouts(JSON.parse(storedWorkouts));
    }
  }, [navigate]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
        localStorage.setItem('profileImage', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const getProgressColor = (index) => {
    if (index < 6) return '#ff4d4d'; // Red for first 6
    if (index < 12) return '#ffd700'; // Yellow for middle 6
    return '#4CAF50'; // Green for last 6
  };

  const handleWorkoutClick = (workoutNumber) => {
    if (completedWorkouts[workoutNumber]) {
      setSelectedWorkout(workoutNumber);
    }
  };

  const closeWorkoutDetails = () => {
    setSelectedWorkout(null);
  };

  if (!userProfile) return null;

  return (
    <Layout>
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-image-container">
            <div className="profile-image">
              {profileImage ? (
                <img src={profileImage} alt="Profile" />
              ) : (
                <div className="profile-placeholder">
                  {userProfile.name.charAt(0).toUpperCase()}
                </div>
              )}
              <label className="image-upload-label" htmlFor="profile-upload">
                <span className="upload-icon">📷</span>
              </label>
              <input
                type="file"
                id="profile-upload"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
          </div>
          <h1 className="profile-name">{userProfile.name}</h1>
        </div>

        <div className="stats-container">
          <div className="stat-item">
            <span className="stat-label">Height</span>
            <span className="stat-value">{userProfile.heightFeet}'{userProfile.heightInches}"</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Weight</span>
            <span className="stat-value">{userProfile.weight} lbs</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Sport</span>
            <span className="stat-value">{userProfile.sport}</span>
          </div>
          {userProfile.position && (
            <div className="stat-item">
              <span className="stat-label">Position</span>
              <span className="stat-value">{userProfile.position}</span>
            </div>
          )}
          <div className="stat-item">
            <span className="stat-label">Focus</span>
            <span className="stat-value">{userProfile.focus}</span>
          </div>
        </div>

        <div className="progress-section">
          <h2>6-Week Program Progress</h2>
          <div className="progress-grid">
            {Array.from({ length: 18 }, (_, i) => {
              const workoutNumber = i + 1;
              const isCompleted = completedWorkouts[workoutNumber];
              return (
                <div 
                  key={i} 
                  className={`progress-segment ${isCompleted ? 'completed' : ''}`}
                  style={{ 
                    '--progress-color': getProgressColor(i),
                    '--skew-angle': '10deg',
                    cursor: isCompleted ? 'pointer' : 'default'
                  }}
                  onClick={() => handleWorkoutClick(workoutNumber)}
                >
                  <div 
                    className="progress-fill"
                    style={{ 
                      width: isCompleted ? '100%' : '0%',
                      backgroundColor: getProgressColor(i)
                    }}
                  />
                  <span className="workout-number">{workoutNumber}</span>
                  {isCompleted && <span className="completed-check">✓</span>}
                </div>
              );
            })}
          </div>
          <div className="progress-legend">
            <div className="legend-item">
              <span className="legend-color" style={{ backgroundColor: '#ff4d4d' }}></span>
              <span>Foundation Phase</span>
            </div>
            <div className="legend-item">
              <span className="legend-color" style={{ backgroundColor: '#ffd700' }}></span>
              <span>Development Phase</span>
            </div>
            <div className="legend-item">
              <span className="legend-color" style={{ backgroundColor: '#4CAF50' }}></span>
              <span>Peak Performance Phase</span>
            </div>
          </div>
        </div>

        {selectedWorkout && completedWorkouts[selectedWorkout] && (
          <div className="workout-details-modal">
            <div className="workout-details-content">
              <button className="close-button" onClick={closeWorkoutDetails}>×</button>
              <h3>Workout {selectedWorkout} Details</h3>
              <div className="workout-exercises">
                {completedWorkouts[selectedWorkout].exercises.map((exercise, index) => (
                  <div key={index} className="exercise-item">
                    <h4>{exercise.name}</h4>
                    <div className="exercise-sets">
                      {exercise.sets.map((set, setIndex) => (
                        <div key={setIndex} className="set-details">
                          <span>Set {setIndex + 1}:</span>
                          <span>{set.weight} lbs × {set.reps} reps</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="workout-date">
                Completed on: {new Date(completedWorkouts[selectedWorkout].date).toLocaleDateString()}
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Profile; 