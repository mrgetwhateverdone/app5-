import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Layout from './Layout';
import './TrainingDashboard.css';

function generateWorkoutPlan(userProfile) {
  if (!userProfile) return null;

  const { sport, position, heightFeet, heightInches, weight, focus } = userProfile;
  const height = (parseInt(heightFeet) * 12) + parseInt(heightInches);
  const isHeavy = weight > 180;
  const isTall = height > 72;
  const bodyType = `${isTall ? 'Taller' : 'Shorter'} & ${isHeavy ? 'Heavier' : 'Lighter'}`;

  // Exercise database based on provided lists
  const exerciseDatabase = {
    basketball: {
      strength: {
        baseline: ['Squats', 'Bench Press', 'Deadlifts'],
        'Taller & Heavier': ['Leg Press', 'Seated Row', 'Overhead Press'],
        'Shorter & Heavier': ['Hack Squats', 'Romanian Deadlifts', 'Incline Bench Press'],
        'Taller & Lighter': ['Lunges', 'Pull-Ups', 'Dumbbell shoulder press'],
        'Shorter & Lighter': ['Goblet Squats', 'Bent-Over Rows', 'Push-Ups with Weight Vest'],
        Guard: ['Calf Raises', 'Planks', 'Russian Twists', 'Single-Leg Squats', 'Dumbbell Snatches'],
        Forward: ['Step-Ups', 'Lateral Raises', 'Chest Press', 'Tricep Dips', 'Barbell Curl'],
        Center: ['Heavy Squats', 'Chest Press', 'Power Cleans', "Farmer's Walk", 'Trap Bar Deadlifts']
      },
      plyometric: {
        baseline: ['Box Jumps', 'Depth Jumps', 'Lateral Bounds'],
        'Taller & Heavier': ['Medicine Ball Slams', 'Standing Long Jumps', 'Low-Height Box Jumps'],
        'Shorter & Heavier': ['Tuck Jumps', 'Broad Jumps', 'Single-Leg Hops'],
        'Taller & Lighter': ['Skater Jumps', 'Plyometric Push-Ups', 'Hurdle Jumps'],
        'Shorter & Lighter': ['Jump Squats', 'Medicine Ball Throws', 'Agility Ladder Drills'],
        Guard: ['Quick Feet Drills', 'Lateral Quick Steps', 'Sprint Starts'],
        Forward: ['Multi-Directional Jumps', 'Overhead Medicine Ball Throws', 'Shuttle Runs'],
        Center: ['Depth Jumps with Immediate Vertical Jump', 'Box Step-Ups with Jump', 'Sled Pushes']
      }
    },
    football: {
      strength: {
        baseline: ['Squats', 'Bench Press', 'Power Cleans'],
        'Taller & Heavier': ['Leg Press', 'Seated Cable Rows', 'shoulder press'],
        'Shorter & Heavier': ['Deadlifts', 'Incline Bench Press', 'Bulgarian Split Squats'],
        'Taller & Lighter': ['Lunges', 'Pull-Ups', 'Hanging Leg Raises'],
        'Shorter & Lighter': ['Goblet Squats', 'Dumbbell Bench Press', 'Planks with shoulder taps'],
        Quarterback: ['Rotational Cable Lifts', 'Single-Arm Dumbbell Press', 'Medicine Ball Throws'],
        'Skill Position': ['Hip Thrusts', 'Lateral Lunges', 'Box Jumps', 'Sled Pushes'],
        Linebacker: ['Romanian Deadlifts', 'Incline Press', 'Sled Pushes', 'Turkish Get-Ups'],
        Lineman: ['Heavy Squats', 'Heavy Bench Press', 'Power Cleans', "Farmer's Walk"]
      },
      plyometric: {
        baseline: ['Box Jumps', 'Broad Jumps', 'Agility Ladder Drills'],
        'Taller & Heavier': ['Medicine Ball Chest Pass', 'Standing Triple Jump', 'Low Box Depth Jumps'],
        'Shorter & Heavier': ['Tuck Jumps', 'Lateral Bounds', 'Single-Leg Hops'],
        'Taller & Lighter': ['Skater Jumps', 'Plyometric Push-Ups', 'Hurdle Jumps'],
        'Shorter & Lighter': ['Jump Squats', 'Medicine Ball Slams', 'Agility Cone Drills'],
        Quarterback: ['Medicine Ball Rotational Throws', 'Quick Feet Drills', 'Reaction Drills'],
        'Skill Position': ['Lateral Jumps', 'Clap Push-Ups', 'Shuttle Runs'],
        Linebacker: ['Box Jumps with Lateral Movement', 'Medicine Ball Slams', 'Sled Pushes'],
        Lineman: ['Sled Pushes', 'Heavy Medicine Ball Throws', 'Battle Ropes']
      }
    }
    // ... other sports would be defined similarly
  };

  // Get exercises for the user's sport and profile
  const sportExercises = exerciseDatabase[sport] || exerciseDatabase.basketball; // Default to basketball if sport not found
  const exerciseType = focus === 'Strength' ? 'strength' : 'plyometric';
  
  // Combine exercises based on body type and position
  const baselineExercises = sportExercises[exerciseType].baseline || [];
  const bodyTypeExercises = sportExercises[exerciseType][bodyType] || [];
  const positionExercises = position ? (sportExercises[exerciseType][position] || []) : [];
  
  const allExercises = [...baselineExercises, ...bodyTypeExercises, ...positionExercises];

  // Generate 6-week program
  const program = {
    weeks: Array(6).fill().map((_, weekIndex) => {
      // Progressive overload pattern
      const intensity = weekIndex < 2 ? 'Foundation' : weekIndex < 4 ? 'Development' : 'Peak';
      const sets = weekIndex < 2 ? 3 : weekIndex < 4 ? 4 : 5;
      const reps = focus === 'Strength' 
        ? (weekIndex < 2 ? '12-15' : weekIndex < 4 ? '8-10' : '4-6')
        : (weekIndex < 2 ? '10-12' : weekIndex < 4 ? '8-10' : '6-8');

      return Array(3).fill().map((_, dayIndex) => {
        // Rotate through exercises to maintain variety
        const dayExercises = allExercises
          .slice(dayIndex * 3, (dayIndex * 3) + 5)
          .filter(Boolean);

        return {
          day: dayIndex + 1,
          exercises: dayExercises,
          sets,
          reps,
          intensity,
          notes: `${intensity} Phase - Focus on ${focus === 'Strength' ? 'proper form and controlled movement' : 'explosive power and quick movements'}`
        };
      });
    })
  };

  return program;
}

function WorkoutPlan({ plan }) {
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

        <button className="start-workout-button">
          Start Workout
        </button>
      </div>
    </div>
  );
}

function TrainingDashboard() {
  const navigate = useNavigate();
  const [workoutPlan, setWorkoutPlan] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [showWorkoutPlan, setShowWorkoutPlan] = useState(false);

  useEffect(() => {
    const profile = localStorage.getItem('userProfile');
    const isNewUser = localStorage.getItem('isNewUser');
    
    if (profile) {
      const parsedProfile = JSON.parse(profile);
      setUserProfile(parsedProfile);
      const plan = generateWorkoutPlan(parsedProfile);
      setWorkoutPlan(plan);
    }

    // Clear the new user flag
    if (isNewUser) {
      localStorage.removeItem('isNewUser');
    }
  }, [navigate]);

  const handleCreateWorkout = () => {
    navigate('/profile-setup');
  };

  if (!userProfile || !workoutPlan) {
    return (
      <Layout>
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
              <button onClick={handleCreateWorkout} className="create-workout-button">
                Create Workout Plan
              </button>
            </div>
          </main>

          <button onClick={handleCreateWorkout} className="add-workout-button" title="Create new workout plan">
            +
          </button>
        </div>
      </Layout>
    );
  }

  const sections = [
    {
      id: 1,
      title: 'Foundation Phase',
      description: 'Building your base strength and form',
      lessons: 6,
      locked: false
    },
    {
      id: 2,
      title: 'Development Phase',
      description: 'Increasing intensity and complexity',
      lessons: 6,
      locked: false
    },
    {
      id: 3,
      title: 'Peak Phase',
      description: 'Maximizing your performance',
      lessons: 6,
      locked: false
    }
  ];

  return (
    <Layout>
      <div className="training-dashboard">
        <header className="dashboard-header">
          <h1>Your Training Journey</h1>
          <div className="profile-info">
            <p>Welcome, {userProfile.name}!</p>
            <p>{userProfile.sport} - {userProfile.position}</p>
            <p>Focus: {userProfile.focus}</p>
          </div>
        </header>

        <main className="dashboard-content">
          {showWorkoutPlan ? (
            <WorkoutPlan plan={workoutPlan} />
          ) : (
            <div className="sections-grid">
              {sections.map((section) => (
                <div 
                  key={section.id} 
                  className={`section-card ${section.locked ? 'locked' : ''}`}
                  onClick={() => !section.locked && setShowWorkoutPlan(true)}
                >
                  <div className="section-number">{section.id}</div>
                  <div className="section-info">
                    <h2>{section.title}</h2>
                    <p>{section.description}</p>
                    <span className="lessons-count">{section.lessons} Workouts</span>
                  </div>
                  {section.locked && <div className="lock-icon">🔒</div>}
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
    </Layout>
  );
}

export default TrainingDashboard;
