import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Layout from './Layout';
import './Rehab.css';

function Rehab() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const location = useLocation();
  
  const rehabCategories = [
    {
      id: 'lower',
      name: 'Lower Body Rehab',
      exercises: [
        { name: 'Seated Knee Extension ROM', description: 'Helps restore range of motion in the knee joint' },
        { name: 'Hamstring Stretch', description: 'Reduces tension in hamstrings and improves flexibility' },
        { name: 'Ankle Mobility', description: 'Improves ankle range of motion and stability' },
        { name: 'Hip Flexor Stretch', description: 'Relieves tightness in hip flexors and improves mobility' }
      ]
    },
    {
      id: 'upper',
      name: 'Upper Body Rehab',
      exercises: [
        { name: 'Shoulder External Rotation', description: 'Strengthens rotator cuff and improves shoulder stability' },
        { name: 'Wall Angels', description: 'Improves posture and scapular mobility' },
        { name: 'Wrist Flexion/Extension', description: 'Increases wrist mobility and reduces stiffness' },
        { name: 'Thoracic Spine Rotation', description: 'Enhances upper back mobility and posture' }
      ]
    },
    {
      id: 'full',
      name: 'Full Body Rehab',
      exercises: [
        { name: 'Bridge, Side-Facing', description: 'Activates glutes and core while improving stability' },
        { name: 'Standing Hip Flexion to 90°', description: 'Improves hip mobility and balance' },
        { name: 'Squat, Side-Facing', description: 'Builds lower body strength with proper form' },
        { name: 'Thoracic Rotation', description: 'Enhances spine mobility and reduces stiffness' }
      ]
    }
  ];

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const renderExerciseList = () => {
    if (!selectedCategory) return null;
    
    const category = rehabCategories.find(cat => cat.id === selectedCategory);
    if (!category) return null;
    
    return (
      <div className="exercise-list">
        <div className="exercise-list-header">
          <button 
            className="back-button-small" 
            onClick={() => setSelectedCategory(null)}
          >
            ←
          </button>
          <h2>{category.name}</h2>
        </div>
        
        {category.exercises.map((exercise, index) => (
          <div key={index} className="exercise-card">
            <div className="exercise-image-placeholder"></div>
            <div className="exercise-details">
              <h3>{exercise.name}</h3>
              <p>{exercise.description}</p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Layout location={location}>
      <div className="rehab-container">
        {!selectedCategory ? (
          <>
            <div className="rehab-header">
              <h1>Exercise Library</h1>
              <p className="today-date">Today is {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
            </div>
            
            <div className="search-bar">
              <input type="text" placeholder="Search exercises" />
            </div>
            
            <h2 className="category-title">Rehab Categories</h2>
            
            <div className="rehab-categories">
              {rehabCategories.map(category => (
                <div 
                  key={category.id} 
                  className="category-card"
                  onClick={() => handleCategorySelect(category.id)}
                >
                  <h3>{category.name}</h3>
                </div>
              ))}
            </div>
          </>
        ) : (
          renderExerciseList()
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

export default Rehab;
