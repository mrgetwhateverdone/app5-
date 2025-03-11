import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Layout from './Layout';
import './Rehab.css';
import BottomNav from './BottomNav';

function Rehab() {
  const [selectedSport, setSelectedSport] = useState(null);
  const [selectedTab, setSelectedTab] = useState('rehab');
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  
  // Available sports
  const sports = [
    { id: 'basketball', name: 'Basketball' },
    { id: 'football', name: 'Football' },
    { id: 'baseball', name: 'Baseball' },
    { id: 'volleyball', name: 'Volleyball' },
    { id: 'soccer', name: 'Soccer' },
    { id: 'tennis', name: 'Tennis' },
    { id: 'softball', name: 'Softball' },
    { id: 'sprinting', name: 'Sprinting' },
    { id: 'wrestling', name: 'Wrestling' },
    { id: 'general', name: 'General Rehab' }
  ];

  // Tab categories
  const tabCategories = [
    { id: 'rehab', name: 'Rehab Exercises' },
    { id: 'stretching', name: 'Stretching' }
  ];

  // Rehabilitation exercises by sport
  const rehabExercises = {
    basketball: [
      { 
        id: 'b1', 
        name: 'Single-Leg Balance Reach', 
        description: 'Improves ankle stability and proprioception, crucial for preventing basketball ankle injuries',
        image: '/exercise-images/single-leg-balance.jpg'
      },
      { 
        id: 'b2', 
        name: 'Lateral Band Walks', 
        description: 'Strengthens hip abductors to improve lateral movement and reduce knee injuries common in basketball',
        image: '/exercise-images/lateral-band-walks.jpg'
      },
      { 
        id: 'b3', 
        name: 'Eccentric Nordic Hamstring Curls', 
        description: 'Prevents hamstring strains during explosive movements and jumping',
        image: '/exercise-images/nordic-hamstring.jpg'
      }
    ],
    football: [
      { 
        id: 'f1', 
        name: 'Rotator Cuff External Rotation', 
        description: 'Strengthens the rotator cuff to prevent shoulder injuries common in football players',
        image: '/exercise-images/rotator-cuff.jpg'
      },
      { 
        id: 'f2', 
        name: 'Copenhagen Adductor Exercise', 
        description: 'Strengthens groin muscles to prevent adductor strains during cutting movements',
        image: '/exercise-images/copenhagen.jpg'
      },
      { 
        id: 'f3', 
        name: 'Single-Leg RDL', 
        description: 'Improves hamstring strength and balance to prevent non-contact ACL injuries',
        image: '/exercise-images/single-leg-rdl.jpg'
      }
    ],
    baseball: [
      { 
        id: 'bb1', 
        name: 'Shoulder Sleeper Stretch', 
        description: 'Improves internal rotation of the shoulder to prevent throwing injuries',
        image: '/exercise-images/sleeper-stretch.jpg'
      },
      { 
        id: 'bb2', 
        name: 'Scapular Retraction', 
        description: 'Strengthens muscles between shoulder blades to improve throwing mechanics',
        image: '/exercise-images/scapular-retraction.jpg'
      },
      { 
        id: 'bb3', 
        name: 'Forearm Pronation/Supination', 
        description: 'Prevents elbow injuries by strengthening forearm muscles used in pitching',
        image: '/exercise-images/forearm-rotation.jpg'
      }
    ],
    volleyball: [
      { 
        id: 'v1', 
        name: 'Jump Landing Training', 
        description: 'Improves landing mechanics to reduce knee and ankle injuries from repeated jumping',
        image: '/exercise-images/jump-landing.jpg'
      },
      { 
        id: 'v2', 
        name: 'Shoulder External Rotation', 
        description: 'Strengthens rotator cuff to prevent shoulder injuries from spiking',
        image: '/exercise-images/shoulder-external.jpg'
      },
      { 
        id: 'v3', 
        name: 'Core Anti-Rotation Press', 
        description: 'Improves core stability for better control during overhead movements',
        image: '/exercise-images/anti-rotation.jpg'
      }
    ],
    soccer: [
      { 
        id: 's1', 
        name: 'Nordic Hamstring Exercise', 
        description: 'Reduces hamstring injuries by strengthening eccentric control',
        image: '/exercise-images/nordic-hamstring.jpg'
      },
      { 
        id: 's2', 
        name: 'Single-Leg Squat', 
        description: 'Improves knee stability and control to prevent ACL injuries',
        image: '/exercise-images/single-leg-squat.jpg'
      },
      { 
        id: 's3', 
        name: 'Ankle Proprioception Training', 
        description: 'Reduces ankle sprains by improving balance and coordination',
        image: '/exercise-images/ankle-prop.jpg'
      }
    ],
    tennis: [
      { 
        id: 't1', 
        name: 'Rotator Cuff Strengthening', 
        description: 'Prevents shoulder injuries common in tennis players',
        image: '/exercise-images/rotator-cuff.jpg'
      },
      { 
        id: 't2', 
        name: 'Wrist Flexor/Extensor Strengthening', 
        description: 'Prevents tennis elbow and wrist injuries',
        image: '/exercise-images/wrist-exercise.jpg'
      },
      { 
        id: 't3', 
        name: 'Lateral Lunge', 
        description: 'Improves lateral movement and prevents groin strains',
        image: '/exercise-images/lateral-lunge.jpg'
      }
    ],
    softball: [
      { 
        id: 'sb1', 
        name: 'Shoulder Internal/External Rotation', 
        description: 'Strengthens rotator cuff for pitching and throwing',
        image: '/exercise-images/shoulder-rotation.jpg'
      },
      { 
        id: 'sb2', 
        name: 'Core Stability Exercises', 
        description: 'Improves power transfer from lower to upper body during pitching',
        image: '/exercise-images/core-stability.jpg'
      },
      { 
        id: 'sb3', 
        name: 'Hip Mobility Drills', 
        description: 'Enhances hip rotation for better pitching mechanics',
        image: '/exercise-images/hip-mobility.jpg'
      }
    ],
    sprinting: [
      { 
        id: 'sp1', 
        name: 'A-Skip Drill', 
        description: 'Improves running mechanics and prevents hamstring strains',
        image: '/exercise-images/a-skip.jpg'
      },
      { 
        id: 'sp2', 
        name: 'Calf Raise Progression', 
        description: 'Strengthens calf muscles to prevent Achilles tendon injuries',
        image: '/exercise-images/calf-raise.jpg'
      },
      { 
        id: 'sp3', 
        name: 'Hip Flexor Strengthening', 
        description: 'Improves sprint mechanics and prevents hip flexor strains',
        image: '/exercise-images/hip-flexor.jpg'
      }
    ],
    wrestling: [
      { 
        id: 'w1', 
        name: 'Neck Strengthening', 
        description: 'Prevents neck injuries common in wrestling',
        image: '/exercise-images/neck-exercise.jpg'
      },
      { 
        id: 'w2', 
        name: 'Shoulder Stability Exercises', 
        description: 'Prevents shoulder dislocations during grappling',
        image: '/exercise-images/shoulder-stability.jpg'
      },
      { 
        id: 'w3', 
        name: 'Core Anti-Rotation', 
        description: 'Improves core stability for better control during wrestling moves',
        image: '/exercise-images/anti-rotation.jpg'
      }
    ],
    general: [
      { 
        id: 'g1', 
        name: 'Squat, Side-Facing', 
        description: 'Builds lower body strength with proper form',
        image: '/exercise-images/squat.jpg'
      },
      { 
        id: 'g2', 
        name: 'Bridge, Side-Facing', 
        description: 'Activates glutes and core while improving stability',
        image: '/exercise-images/bridge.jpg'
      },
      { 
        id: 'g3', 
        name: 'Standing Hip Flexion to 90°', 
        description: 'Improves hip mobility and balance',
        image: '/exercise-images/hip-flexion.jpg'
      },
      { 
        id: 'g4', 
        name: 'Seated Knee Extension ROM', 
        description: 'Helps restore range of motion in the knee joint',
        image: '/exercise-images/knee-extension.jpg'
      }
    ]
  };

  // Stretching routines by sport
  const stretchingExercises = {
    basketball: [
      { 
        id: 'bs1', 
        name: 'Dynamic Hamstring Stretch', 
        description: 'Prepares hamstrings for explosive jumping movements',
        image: '/exercise-images/dynamic-hamstring.jpg'
      },
      { 
        id: 'bs2', 
        name: 'Hip Flexor Stretch', 
        description: 'Improves hip mobility for better jumping and landing mechanics',
        image: '/exercise-images/hip-flexor-stretch.jpg'
      },
      { 
        id: 'bs3', 
        name: 'Thoracic Spine Rotation', 
        description: 'Enhances upper back mobility for shooting and passing',
        image: '/exercise-images/thoracic-rotation.jpg'
      }
    ],
    football: [
      { 
        id: 'fs1', 
        name: 'Dynamic Leg Swings', 
        description: 'Improves hip mobility for sprinting and cutting movements',
        image: '/exercise-images/leg-swings.jpg'
      },
      { 
        id: 'fs2', 
        name: 'Shoulder Mobility Series', 
        description: 'Prepares shoulders for blocking and tackling',
        image: '/exercise-images/shoulder-mobility.jpg'
      },
      { 
        id: 'fs3', 
        name: 'Ankle Mobility Drill', 
        description: 'Enhances ankle range of motion for better agility',
        image: '/exercise-images/ankle-mobility.jpg'
      }
    ],
    baseball: [
      { 
        id: 'bbs1', 
        name: 'Sleeper Stretch', 
        description: 'Improves internal rotation of the shoulder for throwing',
        image: '/exercise-images/sleeper-stretch.jpg'
      },
      { 
        id: 'bbs2', 
        name: 'Cross-Body Shoulder Stretch', 
        description: 'Enhances shoulder mobility for better throwing mechanics',
        image: '/exercise-images/cross-body.jpg'
      },
      { 
        id: 'bbs3', 
        name: 'Forearm Stretches', 
        description: 'Prevents elbow injuries by improving forearm flexibility',
        image: '/exercise-images/forearm-stretch.jpg'
      }
    ],
    volleyball: [
      { 
        id: 'vs1', 
        name: 'Dynamic Shoulder Stretch Series', 
        description: 'Prepares shoulders for overhead hitting movements',
        image: '/exercise-images/dynamic-shoulder.jpg'
      },
      { 
        id: 'vs2', 
        name: 'Ankle Mobility Drill', 
        description: 'Improves ankle flexibility for better jumping and landing',
        image: '/exercise-images/ankle-mobility.jpg'
      },
      { 
        id: 'vs3', 
        name: 'Hip Opener Series', 
        description: 'Enhances hip mobility for lateral movements and jumping',
        image: '/exercise-images/hip-opener.jpg'
      }
    ],
    soccer: [
      { 
        id: 'ss1', 
        name: 'Dynamic Hamstring Sweep', 
        description: 'Prepares hamstrings for sprinting and kicking',
        image: '/exercise-images/hamstring-sweep.jpg'
      },
      { 
        id: 'ss2', 
        name: 'Hip Flexor Stretch', 
        description: 'Improves hip mobility for kicking and sprinting',
        image: '/exercise-images/hip-flexor-stretch.jpg'
      },
      { 
        id: 'ss3', 
        name: 'Calf and Achilles Stretch', 
        description: 'Prevents calf strains and Achilles injuries',
        image: '/exercise-images/calf-stretch.jpg'
      }
    ],
    tennis: [
      { 
        id: 'ts1', 
        name: 'Shoulder 90/90 Stretch', 
        description: 'Improves shoulder mobility for serving and overhead shots',
        image: '/exercise-images/shoulder-90-90.jpg'
      },
      { 
        id: 'ts2', 
        name: 'Wrist Flexor/Extensor Stretch', 
        description: 'Prevents tennis elbow by improving forearm flexibility',
        image: '/exercise-images/wrist-stretch.jpg'
      },
      { 
        id: 'ts3', 
        name: 'Thoracic Rotation', 
        description: 'Enhances rotational mobility for better swing mechanics',
        image: '/exercise-images/thoracic-rotation.jpg'
      }
    ],
    softball: [
      { 
        id: 'sbs1', 
        name: 'Shoulder Stretching Series', 
        description: 'Improves shoulder mobility for throwing and pitching',
        image: '/exercise-images/shoulder-series.jpg'
      },
      { 
        id: 'sbs2', 
        name: 'Trunk Rotation Stretch', 
        description: 'Enhances rotational power for batting and pitching',
        image: '/exercise-images/trunk-rotation.jpg'
      },
      { 
        id: 'sbs3', 
        name: 'Posterior Shoulder Stretch', 
        description: 'Prevents shoulder tightness from repetitive throwing',
        image: '/exercise-images/posterior-shoulder.jpg'
      }
    ],
    sprinting: [
      { 
        id: 'sps1', 
        name: 'Dynamic Leg Swings', 
        description: 'Prepares hips and legs for sprinting',
        image: '/exercise-images/leg-swings.jpg'
      },
      { 
        id: 'sps2', 
        name: 'Active Hamstring Stretch', 
        description: 'Improves hamstring flexibility for better sprint mechanics',
        image: '/exercise-images/active-hamstring.jpg'
      },
      { 
        id: 'sps3', 
        name: 'Calf and Achilles Mobility', 
        description: 'Enhances ankle mobility for better push-off during sprinting',
        image: '/exercise-images/calf-mobility.jpg'
      }
    ],
    wrestling: [
      { 
        id: 'ws1', 
        name: 'Neck Mobility Series', 
        description: 'Improves neck range of motion for better defensive positioning',
        image: '/exercise-images/neck-mobility.jpg'
      },
      { 
        id: 'ws2', 
        name: 'Hip Mobility Flow', 
        description: 'Enhances hip flexibility for better shooting and sprawling',
        image: '/exercise-images/hip-flow.jpg'
      },
      { 
        id: 'ws3', 
        name: 'Shoulder Mobility Drill', 
        description: 'Prevents shoulder injuries during grappling',
        image: '/exercise-images/shoulder-mobility.jpg'
      }
    ],
    general: [
      { 
        id: 'gs1', 
        name: 'Runner\'s Lunge', 
        description: 'Stretches hip flexors and hamstrings for better mobility',
        image: '/exercise-images/runners-lunge.jpg'
      },
      { 
        id: 'gs2', 
        name: 'Downward Dog', 
        description: 'Full body stretch that targets shoulders, hamstrings, and calves',
        image: '/exercise-images/downward-dog.jpg'
      },
      { 
        id: 'gs3', 
        name: 'Butterfly Stretch', 
        description: 'Opens hips and stretches inner thighs',
        image: '/exercise-images/butterfly.jpg'
      },
      { 
        id: 'gs4', 
        name: 'Chest Opener', 
        description: 'Improves shoulder and chest flexibility',
        image: '/exercise-images/chest-opener.jpg'
      }
    ]
  };

  // Filter sports based on search query
  const filteredSports = sports.filter(sport => 
    sport.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setSelectedSport(null); // Reset selected sport when searching
  };

  // Handle sport selection
  const handleSportSelect = (sportId) => {
    setSelectedSport(sportId);
    setSearchQuery(''); // Clear search when a sport is selected
  };

  // Handle tab selection
  const handleTabSelect = (tabId) => {
    setSelectedTab(tabId);
  };

  // Get current exercises based on selected sport and tab
  const getCurrentExercises = () => {
    if (!selectedSport) return [];
    
    return selectedTab === 'rehab' 
      ? rehabExercises[selectedSport] || []
      : stretchingExercises[selectedSport] || [];
  };

  return (
    <Layout location={location}>
      <div className="rehab-container">
        <div className="rehab-header">
          <h1>Rehabilitation Center</h1>
        </div>
        
        <div className="search-bar">
          <input 
            type="text" 
            placeholder="Search Sport" 
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        
        {selectedSport ? (
          <>
            {/* Tab navigation when sport is selected */}
            <div className="exercise-categories">
              {tabCategories.map(tab => (
                <div 
                  key={tab.id} 
                  className={`category-tab ${selectedTab === tab.id ? 'active' : ''}`}
                  onClick={() => handleTabSelect(tab.id)}
                >
                  <span>{tab.name}</span>
                </div>
              ))}
            </div>
            
            {/* Back button */}
            <div className="back-button" onClick={() => setSelectedSport(null)}>
              ← Back to Sports
            </div>
            
            {/* Selected sport title */}
            <h2 className="selected-sport-title">
              {sports.find(s => s.id === selectedSport)?.name} {selectedTab === 'rehab' ? 'Rehabilitation' : 'Stretching'}
            </h2>
            
            {/* Exercise list for selected sport and tab */}
            <div className="exercise-list">
              {getCurrentExercises().map((exercise) => (
                <div key={exercise.id} className="exercise-card">
                  <div 
                    className="exercise-image" 
                    style={{ backgroundImage: `url(${exercise.image})` }}
                  ></div>
                  <div className="exercise-details">
                    <h3>{exercise.name}</h3>
                    <p>{exercise.description}</p>
                  </div>
                </div>
              ))}
              
              {getCurrentExercises().length === 0 && (
                <div className="no-results">
                  <p>No exercises found for this sport and category.</p>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            {/* Sport selection grid */}
            <h2 className="sports-title">Select Your Sport</h2>
            
            <div className="sports-grid">
              {filteredSports.map(sport => (
                <div 
                  key={sport.id} 
                  className="sport-card"
                  onClick={() => handleSportSelect(sport.id)}
                >
                  <h3>{sport.name}</h3>
                </div>
              ))}
              
              {filteredSports.length === 0 && (
                <div className="no-results">
                  <p>No sports found. Try adjusting your search.</p>
                </div>
              )}
            </div>
          </>
        )}
        
        <BottomNav location={location} />
      </div>
    </Layout>
  );
}

export default Rehab;
