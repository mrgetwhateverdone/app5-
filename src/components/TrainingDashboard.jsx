import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import Layout from './Layout';
import './TrainingDashboard.css';
import ActiveWorkout from './ActiveWorkout';
import WorkoutCreator from './WorkoutCreator';
import { exerciseDatabase } from '../exerciseDatabase';

function generateWorkoutPlan(userProfile) {
  if (!userProfile) return null;

  const { sport, position, heightFeet, heightInches, weight, focus } = userProfile;
  const height = (parseInt(heightFeet) * 12) + parseInt(heightInches);
  
  // Body type assessment based on height and weight
  const isHeavy = weight > 230;
  const isTall = height > 72.5; // 6'0.5"
  
  // Determine body type
  let bodyType;
  if (isHeavy && isTall) bodyType = 'Taller & Heavier';
  else if (isHeavy && !isTall) bodyType = 'Shorter & Heavier';
  else if (!isHeavy && isTall) bodyType = 'Taller & Lighter';
  else bodyType = 'Shorter & Lighter';
  
  console.log(`Generating workout plan for ${sport}, position: ${position}, body type: ${bodyType}, focus: ${focus}`);

  // Get exercises for the user's sport and profile
  const sportExercises = exerciseDatabase[sport] || exerciseDatabase['General Workout'];
  const exerciseType = focus.toLowerCase() === 'strength' ? 'strength' : 'explosiveness';
  
  console.log('Selected sport:', sport);
  console.log('Exercise type:', exerciseType);
  console.log('Available exercises for sport and type:', sportExercises[exerciseType]);
  
  // Combine exercises based on body type and position
  const baselineExercises = sportExercises[exerciseType].baseline || [];
  const bodyTypeExercises = sportExercises[exerciseType][bodyType] || [];
  const positionExercises = position ? (sportExercises[exerciseType][position] || []) : [];
  
  console.log('Baseline exercises:', baselineExercises);
  console.log('Body type exercises:', bodyTypeExercises);
  console.log('Position exercises:', positionExercises);
  
  // Create a pool of exercises with priority to position-specific exercises
  let allExercises = [...baselineExercises, ...bodyTypeExercises, ...positionExercises];
  
  // Remove duplicates
  allExercises = [...new Set(allExercises)];
  
  console.log('All exercises after combining:', allExercises);
  
  // Ensure we have enough exercises
  if (allExercises.length < 9) {
    console.log('Not enough exercises, adding general exercises');
    const generalExercises = exerciseDatabase['General Workout'][exerciseType].baseline || [];
    console.log('General exercises to add:', generalExercises);
    allExercises = [...allExercises, ...generalExercises];
    allExercises = [...new Set(allExercises)]; // Remove duplicates again
    console.log('Final exercise pool after adding general exercises:', allExercises);
  }
  
  // Generate 6-week program
  const program = {
    weeks: Array(6).fill().map((_, weekIndex) => {
      // Progressive overload pattern based on focus and week
      let intensity, sets, reps, rest;
      
      if (exerciseType === 'strength') {
        if (weekIndex < 2) {
          // Weeks 1-2: Heavy weight, low reps
          intensity = 'Foundation';
          sets = 4;
          reps = '6-8';
          rest = '90-120 sec';
        } else if (weekIndex < 4) {
          // Weeks 3-4: Medium weight, medium reps
          intensity = 'Development';
          sets = 3;
          reps = '8-12';
          rest = '60-90 sec';
        } else {
          // Weeks 5-6: Medium-heavy weight, medium-low reps
          intensity = 'Peak';
          sets = 5;
          reps = '5-8';
          rest = '75-90 sec';
        }
      } else { // explosiveness
        if (weekIndex < 2) {
          // Weeks 1-2: Low-level plyometrics
          intensity = 'Foundation';
          sets = 3;
          reps = '8-10';
          rest = '60-90 sec';
        } else if (weekIndex < 4) {
          // Weeks 3-4: Medium-level plyometrics
          intensity = 'Development';
          sets = 4;
          reps = '6-8';
          rest = '90-120 sec';
        } else {
          // Weeks 5-6: High-level plyometrics
          intensity = 'Peak';
          sets = 5;
          reps = '4-6';
          rest = '120-150 sec';
        }
      }

      // Create the weekly workout structure
      return {
        weekNumber: weekIndex + 1,
        days: [
          {
            dayNumber: 1,
            exercises: allExercises.slice(0, Math.min(4, allExercises.length)).map(exercise => ({
              name: exercise,
              sets,
              reps,
              intensity,
              rest
            }))
          },
          {
            dayNumber: 3,
            exercises: allExercises.slice(Math.min(4, allExercises.length), Math.min(8, allExercises.length)).map(exercise => ({
              name: exercise,
              sets,
              reps,
              intensity,
              rest
            }))
          },
          {
            dayNumber: 5,
            exercises: [
              ...allExercises.slice(0, Math.min(2, allExercises.length)),
              ...allExercises.slice(Math.min(8, allExercises.length))
            ].map(exercise => ({
              name: exercise,
              sets,
              reps,
              intensity,
              rest
            }))
          }
        ]
      };
    })
  };
  
  return program;
}

function WorkoutPlan({ plan, onStartWorkout }) {
  const [currentWeek, setCurrentWeek] = useState(0);
  const [selectedDay, setSelectedDay] = useState(0);

  if (!plan) return <div>Loading workout plan...</div>;

  const week = plan.weeks[currentWeek];
  const currentWorkout = week[selectedDay];

  return (
    <div className="workout-plan">
      <div className="week-selector">
        <div className="week-navigation">
          <button 
            className="week-nav-button" 
            onClick={() => setCurrentWeek(prev => Math.max(0, prev - 1))}
            disabled={currentWeek === 0}
          >
            ←
          </button>
          <h2>Week {currentWeek + 1}</h2>
          <button 
            className="week-nav-button" 
            onClick={() => setCurrentWeek(prev => Math.min(5, prev + 1))}
            disabled={currentWeek === 5}
          >
            →
          </button>
        </div>
        <div className="week-days">
          {[0, 1, 2].map((day) => (
            <button
              key={day}
              className={`day-button ${selectedDay === day ? 'active' : ''}`}
              onClick={() => setSelectedDay(day)}
            >
              Day {day + 1}
            </button>
          ))}
        </div>
      </div>

      <div className="workout-details">
        <div className="workout-header">
          <h3>{currentWorkout.intensity} Workout</h3>
          <div className="workout-intensity">Phase {Math.floor(currentWeek/2) + 1}</div>
        </div>
        
        <div className="workout-stats">
          <div className="stat-item">
            <span className="stat-label">Sets</span>
            <span className="stat-value">{currentWorkout.sets}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Reps</span>
            <span className="stat-value">{currentWorkout.reps}</span>
          </div>
        </div>
        
        <div className="exercise-section">
          <h4>Today's Exercises</h4>
          <ul className="exercise-list">
            {currentWorkout.exercises.map((exercise, index) => (
              <li key={index} className="exercise-item">
                <span className="exercise-number">{index + 1}</span>
                {exercise}
              </li>
            ))}
          </ul>
        </div>

        <div className="workout-notes">
          <p>{currentWorkout.notes}</p>
        </div>

        <button 
          className="start-workout-button"
          onClick={() => onStartWorkout(currentWorkout)}
        >
          Start Workout
        </button>
      </div>
    </div>
  );
}

function TrainingDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [workoutPlan, setWorkoutPlan] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [showWorkoutPlan, setShowWorkoutPlan] = useState(false);
  const [activeWorkout, setActiveWorkout] = useState(null);
  const [showWorkoutCreator, setShowWorkoutCreator] = useState(false);
  const [hasWorkoutPlan, setHasWorkoutPlan] = useState(false);

  useEffect(() => {
    const profile = localStorage.getItem('userProfile');
    const isNewUser = localStorage.getItem('isNewUser');
    const workoutCreated = localStorage.getItem('workoutCreated');
    const onboardingCompleted = localStorage.getItem('onboardingCompleted');
    
    if (profile) {
      const parsedProfile = JSON.parse(profile);
      setUserProfile(parsedProfile);
      
      // Check if user has completed onboarding
      if (!onboardingCompleted) {
        navigate('/onboarding');
        return;
      }
      
      // Check if user has created a workout plan
      if (parsedProfile.focus && workoutCreated) {
        const plan = generateWorkoutPlan(parsedProfile);
        setWorkoutPlan(plan);
        setHasWorkoutPlan(true);
      }
    } else {
      // No profile found, redirect to login
      navigate('/login');
      return;
    }

    if (isNewUser) {
      localStorage.removeItem('isNewUser');
    }
  }, [navigate]);

  const handleStartWorkout = (workout) => {
    setActiveWorkout(workout);
  };

  const handleCompleteWorkout = (workoutData) => {
    // Save workout data
    const completedWorkouts = JSON.parse(localStorage.getItem('completedWorkouts') || '{}');
    const workoutNumber = activeWorkout.day;
    
    completedWorkouts[workoutNumber] = {
      ...workoutData,
      date: new Date().toISOString()
    };
    
    localStorage.setItem('completedWorkouts', JSON.stringify(completedWorkouts));
    setActiveWorkout(null);
  };

  const handleCloseWorkout = () => {
    setActiveWorkout(null);
  };
  
  const handleOpenWorkoutCreator = () => {
    setShowWorkoutCreator(true);
  };
  
  const handleCloseWorkoutCreator = () => {
    setShowWorkoutCreator(false);
  };
  
  const handleCreateWorkout = (updatedProfile) => {
    try {
      console.log('Creating workout with profile:', updatedProfile);
      
      // Generate a new workout plan with the updated profile
      const newPlan = generateWorkoutPlan(updatedProfile);
      console.log('Generated workout plan:', newPlan);
      
      if (!newPlan) {
        console.error('Failed to generate workout plan');
        return;
      }
      
      // Update state
      setUserProfile(updatedProfile);
      setWorkoutPlan(newPlan);
      setHasWorkoutPlan(true);
      setShowWorkoutCreator(false);
      
      // Save the updated profile to localStorage
      localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
      
      // Mark that a workout has been created
      localStorage.setItem('workoutCreated', 'true');
      
      // Initialize workout progress tracking if it doesn't exist
      if (!localStorage.getItem('completedWorkouts')) {
        localStorage.setItem('completedWorkouts', JSON.stringify({}));
      }
      
      console.log('Workout plan created and saved successfully');
    } catch (error) {
      console.error('Error creating workout plan:', error);
    }
  };

  if (!userProfile) {
    return (
      <Layout location={location}>
        <div className="training-dashboard">
          <header className="dashboard-header">
            <h1>Welcome to Your Dashboard</h1>
            <p>Get started by creating your first workout plan</p>
          </header>

          <main className="dashboard-content empty-state">
            <div className="empty-state-content">
              <div className="empty-state-icon">💪</div>
              <h2>No Profile Set Up</h2>
              <p>Please complete your profile setup to get started.</p>
              <button onClick={() => navigate('/profile-setup')} className="create-workout-button">
                Set Up Profile
              </button>
            </div>
          </main>
        </div>
      </Layout>
    );
  }
  
  if (!hasWorkoutPlan) {
    return (
      <Layout location={location}>
        <div className="training-dashboard">
          <header className="dashboard-header">
            <h1>Welcome to Your Dashboard</h1>
            <p>Get started by creating your first workout plan</p>
          </header>

          <main className="dashboard-content empty-state">
            <div className="empty-state-content">
              <div className="empty-state-icon">💪</div>
              <h2>No Workout Plans Yet</h2>
              <p>Create your first personalized workout plan to get started on your fitness journey.</p>
              <button onClick={handleOpenWorkoutCreator} className="create-workout-button gold-button">
                <span className="plus-icon">+</span> Create Workout Plan
              </button>
            </div>
          </main>
        </div>
        
        {showWorkoutCreator && (
          <WorkoutCreator 
            userProfile={userProfile}
            onCreateWorkout={handleCreateWorkout}
            onCancel={handleCloseWorkoutCreator}
          />
        )}
      </Layout>
    );
  }

  if (activeWorkout) {
    return (
      <ActiveWorkout
        workout={activeWorkout}
        onComplete={handleCompleteWorkout}
        onClose={handleCloseWorkout}
      />
    );
  }

  return (
    <Layout location={location}>
      <div className="training-dashboard">
        <header className="dashboard-header">
          <div className="header-top">
            <h1>Your Training Journey</h1>
            <button onClick={handleOpenWorkoutCreator} className="create-new-workout-button" title="Create new workout plan">
              <span className="plus-icon">+</span>
            </button>
          </div>
          <div className="profile-info">
            <p>Welcome, {userProfile.name}!</p>
            <p>{userProfile.sport} - {userProfile.position}</p>
            <p>Focus: {userProfile.focus}</p>
          </div>
        </header>

        <main className="dashboard-content">
          {showWorkoutPlan ? (
            <WorkoutPlan 
              plan={workoutPlan} 
              onStartWorkout={handleStartWorkout}
            />
          ) : (
            <div className="sections-grid">
              {[1, 2, 3].map((phase) => (
                <div 
                  key={phase} 
                  className="section-card"
                  onClick={() => {
                    // Ensure we have a workout plan before showing it
                    if (workoutPlan && workoutPlan.weeks && workoutPlan.weeks.length > 0) {
                      setShowWorkoutPlan(true);
                    } else {
                      // If no workout plan exists, create one
                      handleOpenWorkoutCreator();
                    }
                  }}
                >
                  <div className="section-number">{phase}</div>
                  <div className="section-info">
                    <h2>{
                      phase === 1 ? 'Foundation Phase' :
                      phase === 2 ? 'Development Phase' :
                      'Peak Phase'
                    }</h2>
                    <p>{
                      phase === 1 ? 'Building your base strength and form' :
                      phase === 2 ? 'Increasing intensity and complexity' :
                      'Maximizing your performance'
                    }</p>
                    <span className="lessons-count">6 Workouts</span>
                    <button className="view-workouts-button">View Workouts</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>

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
      
      {showWorkoutCreator && (
        <WorkoutCreator 
          userProfile={userProfile}
          onCreateWorkout={handleCreateWorkout}
          onCancel={handleCloseWorkoutCreator}
        />
      )}
    </Layout>
  );
}

export default TrainingDashboard;
