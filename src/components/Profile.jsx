import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import Layout from './Layout';
import './Profile.css';

function Profile() {
  const navigate = useNavigate();
  const location = useLocation();
  const [userProfile, setUserProfile] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [completedWorkouts, setCompletedWorkouts] = useState({});
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [mostImprovedExercise, setMostImprovedExercise] = useState(null);

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
      const parsedWorkouts = JSON.parse(storedWorkouts);
      setCompletedWorkouts(parsedWorkouts);
      calculateMostImprovedExercise(parsedWorkouts);
    }
  }, [navigate]);
  
  const calculateMostImprovedExercise = (workouts) => {
    // Track the first and last weight for each exercise
    const exerciseProgress = {};
    
    // Iterate through all completed workouts
    Object.values(workouts).forEach(workout => {
      if (workout && workout.exercises) {
        workout.exercises.forEach(exercise => {
          if (!exerciseProgress[exercise.name]) {
            exerciseProgress[exercise.name] = {
              firstWeight: null,
              lastWeight: null,
              firstDate: null,
              lastDate: null,
              improvement: 0
            };
          }
          
          // Get the max weight from this exercise's sets
          const maxWeight = Math.max(...exercise.sets.map(set => parseFloat(set.weight) || 0));
          
          // If this is the first time we've seen this exercise or it's earlier than our first record
          if (!exerciseProgress[exercise.name].firstDate || 
              new Date(workout.date) < new Date(exerciseProgress[exercise.name].firstDate)) {
            exerciseProgress[exercise.name].firstWeight = maxWeight;
            exerciseProgress[exercise.name].firstDate = workout.date;
          }
          
          // If this is the latest record of this exercise
          if (!exerciseProgress[exercise.name].lastDate || 
              new Date(workout.date) > new Date(exerciseProgress[exercise.name].lastDate)) {
            exerciseProgress[exercise.name].lastWeight = maxWeight;
            exerciseProgress[exercise.name].lastDate = workout.date;
          }
        });
      }
    });
    
    // Calculate improvement for each exercise
    Object.keys(exerciseProgress).forEach(exerciseName => {
      const { firstWeight, lastWeight } = exerciseProgress[exerciseName];
      if (firstWeight !== null && lastWeight !== null) {
        exerciseProgress[exerciseName].improvement = lastWeight - firstWeight;
      }
    });
    
    // Find the exercise with the greatest improvement
    let mostImproved = null;
    let maxImprovement = 0;
    
    Object.entries(exerciseProgress).forEach(([name, data]) => {
      if (data.improvement > maxImprovement) {
        maxImprovement = data.improvement;
        mostImproved = {
          name,
          improvement: data.improvement,
          firstWeight: data.firstWeight,
          lastWeight: data.lastWeight
        };
      }
    });
    
    setMostImprovedExercise(mostImproved);
  };

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
    <Layout location={location}>
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
            <span className="stat-label">Most Improved Exercise</span>
            <span className="stat-value">
              {mostImprovedExercise ? (
                <>
                  {mostImprovedExercise.name}
                  <span className="improvement-details">
                    +{mostImprovedExercise.improvement} lbs
                  </span>
                </>
              ) : (
                'Not enough data yet'
              )}
            </span>
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
        
        <nav className="mobile-nav">
          <Link to="/dashboard" className={`nav-item ${location.pathname === '/dashboard' ? 'active' : ''}`}>
            <span className="nav-icon">🏋️‍♂️</span>
            <span className="nav-label">Workout</span>
          </Link>
          <Link to="/rehab" className={`nav-item ${location.pathname === '/rehab' ? 'active' : ''}`}>
            <span className="nav-icon">🧰</span>
            <span className="nav-label">Rehab</span>
          </Link>
          <Link to="/profile" className={`nav-item ${location.pathname === '/profile' ? 'active' : ''}`}>
            <span className="nav-icon">👤</span>
            <span className="nav-label">Profile</span>
          </Link>
        </nav>
      </div>
    </Layout>
  );
}

export default Profile; 