import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import Layout from './Layout';
import './TrainingDashboard.css';
import ActiveWorkout from './ActiveWorkout';
import WorkoutCreator from './WorkoutCreator';
import { exerciseDatabase } from '../exerciseDatabase';
import { 
  auth, 
  getUserProfile, 
  getWorkoutPlans,
  getCompletedWorkouts,
  saveWorkoutPlan,
  getWorkoutPlan
} from '../services/firebase';
import { onAuthStateChanged } from 'firebase/auth';

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
  const day = week?.days[selectedDay];

  if (!day) return <div>Error loading workout data</div>;

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
          {week.days.map((day, index) => (
            <button
              key={index}
              className={`day-button ${selectedDay === index ? 'active' : ''}`}
              onClick={() => setSelectedDay(index)}
            >
              Day {day.dayNumber}
            </button>
          ))}
        </div>
      </div>

      <div className="workout-details">
        <div className="workout-header">
          <h3>{day.intensity} Workout</h3>
          <div className="workout-intensity">Phase {Math.floor(currentWeek/2) + 1}</div>
        </div>
        
        <div className="workout-stats">
          <div className="stat-item">
            <span className="stat-label">Sets</span>
            <span className="stat-value">{day.exercises[0]?.sets || "-"}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Reps</span>
            <span className="stat-value">{day.exercises[0]?.reps || "-"}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Rest</span>
            <span className="stat-value">{day.exercises[0]?.rest || "-"}</span>
          </div>
        </div>
        
        <div className="exercise-section">
          <h4>Today's Exercises</h4>
          <ul className="exercise-list">
            {day.exercises.map((exercise, index) => (
              <li key={index} className="exercise-item">
                <span className="exercise-number">{index + 1}</span>
                <span className="exercise-name">{exercise.name}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="workout-notes">
          <p>Focus on proper form and controlled movements. Adjust weights as needed.</p>
        </div>

        <button 
          className="start-workout-button"
          onClick={() => onStartWorkout(day)}
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
  const [workoutPlans, setWorkoutPlans] = useState([]);
  const [completedWorkouts, setCompletedWorkouts] = useState([]);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showCreatePlanModal, setShowCreatePlanModal] = useState(false);
  const [newPlanName, setNewPlanName] = useState('');
  const [workoutPlan, setWorkoutPlan] = useState(null);
  const [showWorkoutPlan, setShowWorkoutPlan] = useState(false);
  const [activeWorkout, setActiveWorkout] = useState(null);
  const [showWorkoutCreator, setShowWorkoutCreator] = useState(false);
  const [hasWorkoutPlan, setHasWorkoutPlan] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const loadUserDataAndWorkouts = async () => {
      try {
        setLoading(true);
        
        const user = auth.currentUser;
        if (!user) {
          navigate('/login');
          return;
        }
        
        // Get user profile from Firebase
        const { profile, error: profileError } = await getUserProfile(user.uid);
        
        if (profileError) {
          console.error("Error loading user profile:", profileError);
          setError("Failed to load your profile");
          setLoading(false);
          return;
        }
        
        if (!profile) {
          // Redirect to profile setup if no profile found
          navigate('/profile-setup');
          return;
        }
        
        setUserProfile(profile);
        
        // Get workout plans from Firebase
        const { plans, error: plansError } = await getWorkoutPlans(user.uid);
        
        if (plansError) {
          console.error("Error loading workout plans:", plansError);
          setError("Failed to load your workout plans");
          setLoading(false);
          return;
        }
        
        setWorkoutPlans(plans || []);
        
        // Get completed workouts from Firebase
        const { workouts, error: workoutsError } = await getCompletedWorkouts(user.uid);
        
        if (workoutsError) {
          console.error("Error loading completed workouts:", workoutsError);
        }
        
        setCompletedWorkouts(workouts || []);
        
        setLoading(false);
      } catch (err) {
        console.error("Error loading dashboard data:", err);
        setError("An unexpected error occurred. Please try again.");
        setLoading(false);
      }
    };
    
    loadUserDataAndWorkouts();
  }, [navigate]);

  const handleCreatePlan = () => {
    if (!newPlanName.trim()) {
      return;
    }
    
    navigate('/create-workout', { state: { planName: newPlanName.trim() } });
    setShowCreatePlanModal(false);
    setNewPlanName('');
  };

  const formatDate = (dateString) => {
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getRecentWorkout = () => {
    if (completedWorkouts.length === 0) return null;
    
    return completedWorkouts
      .sort((a, b) => new Date(b.date) - new Date(a.date))[0];
  };

  const getNextScheduledWorkout = () => {
    // In a real app, this would check scheduled workouts from a calendar
    // For now, just use the first available workout plan
    return workoutPlans[0] || null;
  };

  const getWorkoutStreakCount = () => {
    if (completedWorkouts.length === 0) return 0;
    
    // Sort workouts by date
    const sortedWorkouts = [...completedWorkouts]
      .sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // Get the most recent workout date
    const lastWorkoutDate = new Date(sortedWorkouts[0].date);
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    
    // If the last workout was more than a day ago, streak is broken
    if (lastWorkoutDate.toDateString() !== yesterday.toDateString() && 
        lastWorkoutDate.toDateString() !== new Date().toDateString()) {
      return 0;
    }
    
    // Count consecutive days with workouts
    let streak = 1;
    let currentDate = new Date(lastWorkoutDate);
    
    for (let i = 1; i < sortedWorkouts.length; i++) {
      currentDate.setDate(currentDate.getDate() - 1);
      
      // Check if there was a workout on this day
      const workoutOnThisDay = sortedWorkouts.some(workout => {
        const workoutDate = new Date(workout.date);
        return workoutDate.toDateString() === currentDate.toDateString();
      });
      
      if (workoutOnThisDay) {
        streak++;
      } else {
        break;
      }
    }
    
    return streak;
  };

  const loadUserData = async (uid) => {
    try {
      // Get user profile from Firebase
      const { profile, error: profileError } = await getUserProfile(uid);
      
      if (profileError) {
        console.error("Error fetching user profile:", profileError);
        // Try fallback to localStorage for profile
        const localProfile = localStorage.getItem('userProfile');
        if (localProfile) {
          const parsedProfile = JSON.parse(localProfile);
          setUserProfile(parsedProfile);
          
          // If there's a focus, try to load or generate a workout plan
          if (parsedProfile.focus) {
            await loadOrCreateWorkoutPlan(uid, parsedProfile);
          }
        } else {
          // No profile, redirect to profile setup
          navigate('/profile-setup');
        }
        return;
      }
      
      if (profile) {
        setUserProfile(profile);
        
        // Store profile in localStorage for backward compatibility
        localStorage.setItem('userProfile', JSON.stringify(profile));
        localStorage.setItem('userName', profile.name || '');
        
        // Try to load workout plan if profile has a focus
        if (profile.focus) {
          await loadOrCreateWorkoutPlan(uid, profile);
        }
      } else {
        // No profile, redirect to profile setup
        navigate('/profile-setup');
      }
    } catch (error) {
      console.error("Error in loadUserData:", error);
    }
  };
  
  const loadOrCreateWorkoutPlan = async (uid, profile) => {
    try {
      // Try to fetch existing workout plan from Firebase
      const { plan, error } = await getWorkoutPlan(uid);
      
      if (error) {
        console.error("Error fetching workout plan:", error);
        
        // Generate a new plan
        const newPlan = generateWorkoutPlan(profile);
        setWorkoutPlan(newPlan);
        setHasWorkoutPlan(!!newPlan);
        
        // Save the new plan to Firebase
        if (newPlan) {
          await saveWorkoutPlan(uid, newPlan);
        }
        
        return;
      }
      
      if (plan) {
        setWorkoutPlan(plan);
        setHasWorkoutPlan(true);
      } else {
        // No plan found, generate a new one
        const newPlan = generateWorkoutPlan(profile);
        setWorkoutPlan(newPlan);
        setHasWorkoutPlan(!!newPlan);
        
        // Save the new plan to Firebase
        if (newPlan) {
          await saveWorkoutPlan(uid, newPlan);
        }
      }
    } catch (error) {
      console.error("Error in loadOrCreateWorkoutPlan:", error);
    }
  };

  const handleStartWorkout = (workout) => {
    // Ensure the workout has the correct data structure that ActiveWorkout expects
    const formattedWorkout = {
      day: workout.dayNumber || "Today",
      exercises: workout.exercises.map(exercise => ({
        name: exercise.name,
        sets: exercise.sets || 3,
        reps: exercise.reps,
        type: 'weighted'
      }))
    };
    setActiveWorkout(formattedWorkout);
  };

  const handleCompleteWorkout = async (workoutData) => {
    try {
      // Workout data is already saved to Firebase in the ActiveWorkout component
      
      // Update UI
      setActiveWorkout(null);
      
      // Show success message or notification if needed
    } catch (error) {
      console.error("Error completing workout:", error);
    }
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
  
  const handleCreateWorkout = async (updatedProfile) => {
    try {
      setLoading(true);
      
      // Generate a new workout plan with the updated profile
      const newPlan = generateWorkoutPlan(updatedProfile);
      
      if (!newPlan) {
        console.error('Failed to generate workout plan');
        setLoading(false);
        return;
      }
      
      // Update state
      setUserProfile(updatedProfile);
      setWorkoutPlan(newPlan);
      setHasWorkoutPlan(true);
      setShowWorkoutCreator(false);
      
      // Save the updated profile and workout plan to Firebase
      if (userId) {
        await saveWorkoutPlan(userId, newPlan);
      }
      
      // Update localStorage for backward compatibility
      localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
      localStorage.setItem('workoutCreated', 'true');
      
      setLoading(false);
    } catch (error) {
      console.error('Error creating workout plan:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="dashboard-container">
          <div className="loading-message">Loading your dashboard...</div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="dashboard-container">
          <div className="error-message">{error}</div>
          <button 
            className="retry-button" 
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      </Layout>
    );
  }

  const recentWorkout = getRecentWorkout();
  const nextWorkout = getNextScheduledWorkout();
  const streakCount = getWorkoutStreakCount();

  return (
    <Layout>
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1>Welcome, {userProfile?.fullName || 'Athlete'}</h1>
          <div className="streak-counter">
            <span className="streak-icon">🔥</span>
            <span className="streak-count">{streakCount}</span>
            <span className="streak-label">day streak</span>
          </div>
        </div>
        
        <div className="dashboard-content">
          <div className="workout-section">
            <div className="section-header">
              <h2>Your Workout Plans</h2>
              <button 
                className="new-plan-button"
                onClick={() => setShowCreatePlanModal(true)}
              >
                + New Plan
              </button>
            </div>
            
            <div className="workout-plans">
              {workoutPlans.length > 0 ? (
                workoutPlans.map((plan, index) => (
                  <Link to={`/workout/${plan.id}`} key={plan.id || index} className="workout-plan-card">
                    <h3 className="plan-name">{plan.name}</h3>
                    <div className="plan-details">
                      <span className="plan-exercises">{plan.exercises.length} exercises</span>
                      {plan.lastCompleted && (
                        <span className="last-completed">
                          Last: {formatDate(plan.lastCompleted)}
                        </span>
                      )}
                    </div>
                    <div className="plan-arrow">→</div>
                  </Link>
                ))
              ) : (
                <div className="empty-state">
                  <p>You don't have any workout plans yet.</p>
                  <button 
                    className="create-plan-button"
                    onClick={() => setShowCreatePlanModal(true)}
                  >
                    Create Your First Plan
                  </button>
                </div>
              )}
            </div>
          </div>
          
          <div className="summary-section">
            <div className="summary-card recent-workout">
              <h3>Recent Workout</h3>
              {recentWorkout ? (
                <div className="summary-content">
                  <div className="summary-title">{recentWorkout.planName}</div>
                  <div className="summary-details">
                    <span className="summary-date">{formatDate(recentWorkout.date)}</span>
                    <span className="summary-duration">
                      {Math.floor(recentWorkout.duration / 60)}:{String(recentWorkout.duration % 60).padStart(2, '0')}
                    </span>
                  </div>
                  <div className="summary-exercises">
                    {recentWorkout.exercises.length} exercises completed
                  </div>
                </div>
              ) : (
                <div className="empty-summary">
                  <p>No recent workouts</p>
                </div>
              )}
            </div>
            
            <div className="summary-card next-workout">
              <h3>Next Workout</h3>
              {nextWorkout ? (
                <div className="summary-content">
                  <div className="summary-title">{nextWorkout.name}</div>
                  <div className="summary-details">
                    <span className="summary-focus">{nextWorkout.focus || 'Strength'}</span>
                  </div>
                  <Link to={`/workout/${nextWorkout.id}`} className="start-workout-button">
                    Start Workout
                  </Link>
                </div>
              ) : (
                <div className="empty-summary">
                  <p>No upcoming workouts</p>
                  <button 
                    className="create-workout-button"
                    onClick={() => setShowCreatePlanModal(true)}
                  >
                    Plan a Workout
                  </button>
                </div>
              )}
            </div>
          </div>
          
          <div className="progress-section">
            <div className="section-header">
              <h2>Recent Progress</h2>
              <Link to="/progress" className="view-all-link">
                View All
              </Link>
            </div>
            
            {completedWorkouts.length > 0 ? (
              <div className="progress-chart">
                <div className="chart-placeholder">
                  <div className="chart-bars">
                    {Array.from({ length: 7 }).map((_, index) => {
                      const height = Math.random() * 70 + 30;
                      return (
                        <div 
                          key={index} 
                          className="chart-bar"
                          style={{ height: `${height}%` }}
                        ></div>
                      );
                    })}
                  </div>
                  <div className="chart-labels">
                    <span>M</span>
                    <span>T</span>
                    <span>W</span>
                    <span>T</span>
                    <span>F</span>
                    <span>S</span>
                    <span>S</span>
                  </div>
                </div>
                <div className="chart-summary">
                  <div className="summary-stat">
                    <span className="stat-value">{completedWorkouts.length}</span>
                    <span className="stat-label">Workouts</span>
                  </div>
                  <div className="summary-stat">
                    <span className="stat-value">
                      {completedWorkouts.reduce((total, workout) => {
                        return total + workout.exercises.length;
                      }, 0)}
                    </span>
                    <span className="stat-label">Exercises</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="empty-progress">
                <p>Complete workouts to see your progress</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {showCreatePlanModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Create New Workout Plan</h2>
            <div className="modal-form">
              <div className="form-group">
                <label htmlFor="planName">Plan Name</label>
                <input
                  type="text"
                  id="planName"
                  value={newPlanName}
                  onChange={(e) => setNewPlanName(e.target.value)}
                  placeholder="e.g., Upper Body, Leg Day, Full Body"
                />
              </div>
              <div className="modal-buttons">
                <button 
                  className="cancel-button"
                  onClick={() => {
                    setShowCreatePlanModal(false);
                    setNewPlanName('');
                  }}
                >
                  Cancel
                </button>
                <button 
                  className="create-button"
                  onClick={handleCreatePlan}
                  disabled={!newPlanName.trim()}
                >
                  Create Plan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default TrainingDashboard;
