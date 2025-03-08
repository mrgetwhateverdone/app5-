import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from './Layout';
import './TrainingDashboard.css';

// Enhanced workout generation logic with sport-specific exercises and progressive overload

function generateWorkoutPlan(userProfile) {
  const { trainingType, sport, position, height, weight } = userProfile;
  const isHeavy = weight >= 231;
  const isTall = height >= 76;

  // Define main exercises based on sport and position with more specific exercises
  const mainExercises = {
    football: {
      QB: [
        'Power Clean',
        'Bench Press',
        'Squat',
        'Shoulder Press',
        'Core Rotations',
        'Medicine Ball Throws'
      ],
      'Skill Position': [
        'Power Clean',
        'Box Jumps',
        'Speed Squats',
        'Deadlift',
        'Resistance Sprints',
        'Agility Ladder'
      ],
      Linebacker: [
        'Power Clean',
        'Front Squat',
        'Bench Press',
        'Box Jumps',
        'Sled Push',
        'Resistance Sprints'
      ],
      Lineman: [
        'Power Clean',
        'Back Squat',
        'Bench Press',
        'Deadlift',
        'Sled Push',
        'Farmers Walks'
      ]
    },
    basketball: {
      Guard: [
        'Box Jumps',
        'Speed Squats',
        'Explosive Step-ups',
        'Resistance Sprints',
        'Core Rotations',
        'Agility Ladder'
      ],
      Forward: [
        'Power Clean',
        'Box Jumps',
        'Front Squat',
        'Medicine Ball Throws',
        'Resistance Bands',
        'Vertical Jump Training'
      ],
      Center: [
        'Power Clean',
        'Back Squat',
        'Box Jumps',
        'Medicine Ball Throws',
        'Post Move Practice',
        'Core Stability'
      ]
    },
    baseball: {
      Pitcher: [
        'Medicine Ball Rotations',
        'Band Pull-aparts',
        'Single-leg RDL',
        'Shoulder Complex',
        'Core Anti-rotation',
        'Plyometric Push-ups'
      ],
      Infield: [
        'Box Jumps',
        'Lateral Bounds',
        'Speed Squats',
        'Medicine Ball Throws',
        'Agility Ladder',
        'Reaction Drills'
      ],
      Outfield: [
        'Power Clean',
        'Box Jumps',
        'Speed Training',
        'Medicine Ball Throws',
        'Resistance Sprints',
        'Jump Training'
      ],
      Catcher: [
        'Front Squat',
        'Hip Mobility',
        'Core Complex',
        'Medicine Ball Throws',
        'Explosive Step-ups',
        'Isometric Holds'
      ]
    },
    default: [
      'Power Clean',
      'Box Jumps',
      'Front Squat',
      'Bench Press',
      'Core Complex',
      'Speed Training'
    ]
  };

  // Get main exercises for the sport and position
  const sportExercises = mainExercises[sport] || mainExercises.default;
  const positionExercises = position ? (sportExercises[position] || sportExercises.default) : sportExercises.default;

  // Enhanced supplementary exercises based on body type
  const supplementaryExercises = {
    heavyTall: [
      'Rack Pulls',
      'Floor Press',
      'Safety Bar Squats',
      'Seated Press',
      'Trap Bar Deadlifts',
      'Band Pull-aparts',
      'Core Stability',
      'Mobility Work'
    ],
    heavyShort: [
      'Front Squats',
      'Push Press',
      'Romanian Deadlifts',
      'Power Cleans',
      'Box Jumps',
      'Kettlebell Complex',
      'Core Rotations',
      'Speed Work'
    ],
    lightShort: [
      'Clean and Jerk',
      'Snatch',
      'Bulgarian Split Squats',
      'Pull-ups',
      'Box Jumps',
      'Medicine Ball Work',
      'Sprint Training',
      'Bodyweight Complex'
    ],
    lightTall: [
      'Front Squats',
      'Incline Press',
      'Pull-ups',
      'Romanian Deadlifts',
      'Push Press',
      'Jump Training',
      'Core Complex',
      'Mobility Work'
    ]
  };

  const bodyType = isHeavy
    ? (isTall ? 'heavyTall' : 'heavyShort')
    : (isTall ? 'lightTall' : 'lightShort');

  // Initialize workout plan
  const workoutPlan = {
    weeks: Array(6).fill().map(() => Array(3).fill().map(() => ({
      exercises: [],
      mainExercises: positionExercises,
      supplementaryExercises: [],
      type: '',
      intensity: '',
      sets: 0,
      reps: 0
    })))
  };

  if (trainingType === 'strength') {
    // Weeks 1-2: High weight, low reps
    for (let week = 0; week < 2; week++) {
      for (let day = 0; day < 3; day++) {
        workoutPlan.weeks[week][day] = {
          ...workoutPlan.weeks[week][day],
          type: 'Strength',
          intensity: 'High weight, low reps',
          sets: 5,
          reps: '3-5',
          supplementaryExercises: supplementaryExercises[bodyType].slice(0, 3)
        };
      }
    }
    // Weeks 3-4: Medium weight, medium reps
    for (let week = 2; week < 4; week++) {
      for (let day = 0; day < 3; day++) {
        workoutPlan.weeks[week][day] = {
          ...workoutPlan.weeks[week][day],
          type: 'Strength',
          intensity: 'Medium weight, medium reps',
          sets: 4,
          reps: '8-10',
          supplementaryExercises: supplementaryExercises[bodyType].slice(1, 4)
        };
      }
    }
    // Weeks 5-6: Lower weight, higher reps
    for (let week = 4; week < 6; week++) {
      for (let day = 0; day < 3; day++) {
        workoutPlan.weeks[week][day] = {
          ...workoutPlan.weeks[week][day],
          type: 'Strength',
          intensity: 'Lower weight, higher reps',
          sets: 3,
          reps: '12-15',
          supplementaryExercises: supplementaryExercises[bodyType].slice(2, 5)
        };
      }
    }
  } else {
    const plyometricExercises = {
      low: [
        'Jump Rope',
        'Box Jumps (Low Height)',
        'Medicine Ball Throws',
        'Jumping Jacks',
        'Ladder Drills'
      ],
      medium: [
        'Box Jumps (Medium Height)',
        'Depth Jumps',
        'Bounding',
        'Medicine Ball Slams',
        'Hurdle Hops'
      ],
      high: [
        'Box Jumps (Max Height)',
        'Depth Jumps to Sprint',
        'Power Skips',
        'Reactive Jumps',
        'Complex Plyometrics'
      ]
    };

    // Weeks 1-2: Low intensity plyometrics
    for (let week = 0; week < 2; week++) {
      for (let day = 0; day < 3; day++) {
        workoutPlan.weeks[week][day] = {
          ...workoutPlan.weeks[week][day],
          type: 'Plyometrics',
          intensity: 'Low intensity',
          sets: 3,
          reps: '10-12',
          supplementaryExercises: plyometricExercises.low
        };
      }
    }
    // Weeks 3-4: Medium intensity
    for (let week = 2; week < 4; week++) {
      for (let day = 0; day < 3; day++) {
        workoutPlan.weeks[week][day] = {
          ...workoutPlan.weeks[week][day],
          type: 'Plyometrics',
          intensity: 'Medium intensity',
          sets: 4,
          reps: '8-10',
          supplementaryExercises: plyometricExercises.medium
        };
      }
    }
    // Weeks 5-6: High intensity
    for (let week = 4; week < 6; week++) {
      for (let day = 0; day < 3; day++) {
        workoutPlan.weeks[week][day] = {
          ...workoutPlan.weeks[week][day],
          type: 'Plyometrics',
          intensity: 'High intensity',
          sets: 5,
          reps: '6-8',
          supplementaryExercises: plyometricExercises.high
        };
      }
    }
  }

  return workoutPlan;
}

function WorkoutPlan({ plan, onStartWorkout }) {
  const [selectedWeek, setSelectedWeek] = useState(0);
  const [selectedDay, setSelectedDay] = useState(0);

  if (!plan) return null;

  const currentWorkout = plan.weeks[selectedWeek][selectedDay];
  const totalWeeks = plan.weeks.length;
  const daysPerWeek = plan.weeks[0].length;

  const handlePreviousWeek = () => {
    if (selectedWeek > 0) {
      setSelectedWeek(selectedWeek - 1);
      setSelectedDay(0);
    }
  };

  const handleNextWeek = () => {
    if (selectedWeek < totalWeeks - 1) {
      setSelectedWeek(selectedWeek + 1);
      setSelectedDay(0);
    }
  };

  return (
    <div className="workout-plan">
      <div className="week-selector">
        <div className="week-navigation">
          <button 
            className="week-nav-button" 
            onClick={handlePreviousWeek}
            disabled={selectedWeek === 0}
          >
            ←
          </button>
          <h2>Week {selectedWeek + 1}</h2>
          <button 
            className="week-nav-button" 
            onClick={handleNextWeek}
            disabled={selectedWeek === totalWeeks - 1}
          >
            →
          </button>
        </div>
        <div className="week-days">
          {Array.from({ length: daysPerWeek }, (_, i) => (
            <button
              key={i}
              className={`day-button ${selectedDay === i ? 'active' : ''}`}
              onClick={() => setSelectedDay(i)}
            >
              Day {i + 1}
            </button>
          ))}
        </div>
      </div>

      <div className="workout-details">
        <div className="workout-header">
          <h3>{currentWorkout.type}</h3>
          <div className="workout-intensity">{currentWorkout.intensity}</div>
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
          <h4>Main Exercises</h4>
          <ul className="exercise-list">
            {currentWorkout.mainExercises.map((exercise, index) => (
              <li key={index} className="exercise-item">
                <span className="exercise-number">{index + 1}</span>
                {exercise}
              </li>
            ))}
          </ul>
        </div>

        <div className="exercise-section">
          <h4>Supplementary Exercises</h4>
          <ul className="exercise-list">
            {currentWorkout.supplementaryExercises.map((exercise, index) => (
              <li key={index} className="exercise-item">
                <span className="exercise-number">{index + 1}</span>
                {exercise}
              </li>
            ))}
          </ul>
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



  return (
    <div className="workout-plan">
      <div className="week-selector">
        <div className="week-navigation">
          <button 
            className="week-nav-button" 
            onClick={handlePreviousWeek}
            disabled={selectedWeek === 0}
          >
            ←
          </button>
          <h2>Week {selectedWeek + 1}</h2>
          <button 
            className="week-nav-button" 
            onClick={handleNextWeek}
            disabled={selectedWeek === 5}
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
          <h3>{currentWorkout.type} Workout</h3>
          <div className="workout-intensity">{currentWorkout.intensity}</div>
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
          <h4>Main Exercises</h4>
          <ul className="exercise-list">
            {currentWorkout.mainExercises.map((exercise, index) => (
              <li key={index} className="exercise-item">
                <span className="exercise-number">{index + 1}</span>
                {exercise}
              </li>
            ))}
          </ul>
        </div>

        <div className="exercise-section">
          <h4>Supplementary Exercises</h4>
          <ul className="exercise-list">
            {currentWorkout.supplementaryExercises.map((exercise, index) => (
              <li key={index} className="exercise-item">
                <span className="exercise-number">{index + 1}</span>
                {exercise}
              </li>
            ))}
          </ul>
        </div>

        <button className="start-workout-button" onClick={() => onStartWorkout(currentWorkout)}>
          Start Workout
        </button>
      </div>
    </div>
  );
}

function TrainingDashboard() {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState(null);
  const [workoutPlan, setWorkoutPlan] = useState(null);
  const [showWorkoutPlan, setShowWorkoutPlan] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoading(true);
        const profileData = localStorage.getItem('userProfile');
        
        if (!profileData) {
          navigate('/profile-setup');
          return;
        }

        const profile = JSON.parse(profileData);
        const heightInInches = (parseInt(profile.heightFeet) * 12) + parseInt(profile.heightInches);
        
        const formattedProfile = {
          name: profile.name,
          sport: profile.sport.toLowerCase(),
          position: profile.position,
          height: heightInInches,
          weight: parseInt(profile.weight),
          trainingType: profile.focus === 'Strength' ? 'strength' : 'plyometrics'
        };

        setUserProfile(formattedProfile);
        const plan = generateWorkoutPlan(formattedProfile);
        setWorkoutPlan(plan);
      } catch (error) {
        console.error('Error loading profile:', error);
        navigate('/profile-setup');
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [navigate]);

  const handleStartWorkout = (workout) => {
    setCurrentWorkout(workout);
    localStorage.setItem('currentWorkout', JSON.stringify(workout));
  };

  return (
    <Layout>
      <div className="training-dashboard">
        {loading ? (
          <div className="loading-state">
            <h2>Loading your workout plan...</h2>
          </div>
        ) : !userProfile || !workoutPlan ? (
          <div className="error-state">
            <h2>Unable to load workout plan</h2>
            <p>Please try setting up your profile again.</p>
            <button onClick={() => navigate('/profile-setup')} className="retry-button">
              Set Up Profile
            </button>
          </div>
        ) : (
          <>
            <header className="dashboard-header">
              <h1>Your Training Plan</h1>
              <p className="welcome-message">Welcome, {userProfile.name}!</p>
            </header>

            <main className="dashboard-content">
              <WorkoutPlan 
                plan={workoutPlan} 
                onStartWorkout={handleStartWorkout} 
              />
            </main>

            <nav className="bottom-nav">
              <button className="nav-button">Dashboard</button>
              <button className="nav-button active">Workout</button>
              <button className="nav-button">Profile</button>
            </nav>
          </>
        )}
      </div>
    </Layout>
  );
    { id: 0, title: 'Welcome to Heroic', lessons: 3 },
    { id: 1, title: 'Know the Ultimate Game', lessons: 14, locked: true },
    { id: 2, title: 'Forge Antifragile Confidence', lessons: 12, locked: true },
    { id: 3, title: 'Optimize the Big 3', lessons: 11, locked: true },
    { id: 4, title: 'Make Today a Masterpiece', lessons: 11, locked: true },
    { id: 5, title: 'Master Yourself', lessons: 11, locked: true }
  ];

  return (
    <Layout>
      <div className="training-dashboard">
        <header className="dashboard-header">
          <button onClick={() => navigate(-1)} className="back-button">←</button>
          <h1>Basic Training</h1>
        </header>

        <main className="dashboard-content">
          {showWorkoutPlan ? (
            <WorkoutPlan plan={workoutPlan} onStartWorkout={handleStartWorkout} />
          ) : (
            sections.map((section) => (
              <div 
                key={section.id} 
                className={`section-card ${section.locked ? 'locked' : ''}`}
                onClick={() => !section.locked && setShowWorkoutPlan(true)}
              >
                <div className="section-number">{section.id}</div>
                <div className="section-info">
                  <h2>{section.title}</h2>
                  <p>{section.lessons} Lessons</p>
                </div>
                {section.locked && <div className="lock-icon">🔒</div>}
              </div>
            ))
          )}
        </main>

        <nav className="bottom-nav">
          <button className="nav-button">N</button>
          <button className="nav-button" onClick={() => setShowWorkoutPlan(!showWorkoutPlan)}>🏋️</button>
          <button className="nav-button">😊</button>
        </nav>
      </div>
    </Layout>
  );
}

export default TrainingDashboard;
