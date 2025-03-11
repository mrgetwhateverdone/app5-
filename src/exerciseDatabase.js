// Comprehensive exercise database for all sports, positions, and body types
export const exerciseDatabase = {
  Basketball: {
    strength: {
      baseline: ['Squats', 'Bench Press', 'Deadlifts'],
      'Taller & Heavier': ['Leg Press', 'Seated Row', 'Overhead Press', 'Weighted Step-Ups', 'Heavy Farmer\'s Walk', 'Trap Bar Deadlifts', 'Seated Chest Press', 'Weighted Dips', 'Barbell Shrugs', 'Heavy Sled Pulls'],
      'Shorter & Heavier': ['Hack Squats', 'Romanian Deadlifts', 'Incline Bench Press', 'Bulgarian Split Squats', 'Power Cleans', 'Weighted Pull-Ups', 'Barbell Hip Thrusts', 'Dumbbell Rows', 'Heavy Calf Raises', 'Weighted Plank Holds'],
      'Taller & Lighter': ['Lunges', 'Pull-Ups', 'Dumbbell Shoulder Press', 'Single-Leg Romanian Deadlifts', 'Step-Ups', 'Hanging Leg Raises', 'Dumbbell Bench Press', 'Cable Face Pulls', 'Barbell Landmine Press', 'Weighted Side Bends'],
      'Shorter & Lighter': ['Goblet Squats', 'Bent-Over Rows', 'Push-Ups with Weight Vest', 'Dumbbell Snatches', 'Russian Twists', 'Plank with Shoulder Taps', 'Dumbbell Thrusters', 'Incline Dumbbell Press', 'Kettlebell Swings', 'Bicycle Crunches'],
      'Guard': ['Calf Raises', 'Planks', 'Russian Twists', 'Single-Leg Squats', 'Dumbbell Snatches', 'Medicine Ball Rotational Throws', 'Cable Woodchoppers', 'Lateral Lunges'],
      'Forward': ['Step-Ups', 'Lateral Raises', 'Chest Press', 'Tricep Dips', 'Barbell Curl', 'Weighted Box Squats', 'Dumbbell Flyes'],
      'Center': ['Heavy Squats', 'Chest Press', 'Power Cleans', 'Farmer\'s Walk', 'Trap Bar Deadlifts', 'Weighted Dips', 'Barbell Shrugs']
    },
    explosiveness: {
      baseline: ['Box Jumps', 'Depth Jumps', 'Lateral Bounds'],
      'Taller & Heavier': ['Medicine Ball Slams', 'Standing Long Jumps', 'Low-Height Box Jumps', 'Sled Pushes', 'Heavy Medicine Ball Chest Pass', 'Standing Triple Jump', 'Weighted Vertical Jumps', 'Overhead Medicine Ball Throws', 'Broad Jumps', 'Low Hurdle Jumps'],
      'Shorter & Heavier': ['Tuck Jumps', 'Broad Jumps', 'Single-Leg Hops', 'Depth Jumps with Immediate Vertical Jump', 'Medicine Ball Rotational Throws', 'Lateral Quick Steps', 'Weighted Jump Squats', 'Bounding', 'Split Squat Jumps', 'Heavy Skater Jumps'],
      'Taller & Lighter': ['Skater Jumps', 'Plyometric Push-Ups', 'Hurdle Jumps', 'Multi-Directional Jumps', 'Agility Ladder Drills', 'Sprint Starts', 'Depth Drops', 'Medicine Ball Wall Balls', 'Lateral Hurdle Hops', 'Vertical Jumps with Twist'],
      'Shorter & Lighter': ['Jump Squats', 'Medicine Ball Throws', 'Agility Ladder Drills', 'Quick Feet Drills', 'Clap Push-Ups', 'Shuttle Runs', 'Single-Leg Box Jumps', 'Reaction Drills', 'Lateral Cone Hops', 'Burpees'],
      'Guard': ['Quick Feet Drills', 'Lateral Quick Steps', 'Sprint Starts', 'Agility Cone Drills', 'Speed Skaters'],
      'Forward': ['Multi-Directional Jumps', 'Overhead Medicine Ball Throws', 'Shuttle Runs', 'Box Step-Ups with Jump', 'Lateral Jumps'],
      'Center': ['Depth Jumps with Immediate Vertical Jump', 'Box Step-Ups with Jump', 'Sled Pushes', 'Heavy Medicine Ball Slams', 'Standing Triple Jump']
    }
  },
  Football: {
    strength: {
      baseline: ['Squats', 'Bench Press', 'Power Cleans'],
      'Taller & Heavier': ['Leg Press', 'Seated Cable Rows', 'Shoulder Press', 'Heavy Farmer\'s Walk', 'Trap Bar Deadlifts', 'Weighted Dips', 'Barbell Shrugs', 'Heavy Sled Pulls', 'Seated Chest Press', 'Weighted Step-Ups'],
      'Shorter & Heavier': ['Deadlifts', 'Incline Bench Press', 'Bulgarian Split Squats', 'Romanian Deadlifts', 'Weighted Pull-Ups', 'Barbell Hip Thrusts', 'Dumbbell Rows', 'Heavy Calf Raises', 'Weighted Plank Holds', 'Barbell Push Press'],
      'Taller & Lighter': ['Lunges', 'Pull-Ups', 'Hanging Leg Raises', 'Single-Leg Romanian Deadlifts', 'Dumbbell Shoulder Press', 'Step-Ups', 'Cable Face Pulls', 'Dumbbell Bench Press', 'Weighted Side Bends', 'Barbell Landmine Press'],
      'Shorter & Lighter': ['Goblet Squats', 'Dumbbell Bench Press', 'Planks with Shoulder Taps', 'Dumbbell Snatches', 'Russian Twists', 'Kettlebell Swings', 'Incline Dumbbell Press', 'Bicycle Crunches', 'Dumbbell Thrusters', 'Bent-Over Rows'],
      'Quarterback': ['Rotational Cable Lifts', 'Single-Arm Dumbbell Press', 'Medicine Ball Throws for Arm Strength', 'Dumbbell Curls', 'Rotator Cuff Exercises', 'Tricep Extensions', 'Lateral Raises'],
      'Running Back': ['Hip Thrusts', 'Lateral Lunges', 'Box Jumps', 'Sled Pushes', 'Kettlebell Swings', 'Weighted Step-Ups', 'Single-Leg Squats'],
      'Skill Position': ['Calf Raises', 'Grip Strength Exercises', 'Agility Ladder Drills', 'Speed Squats', 'Power Cleans', 'Dumbbell Flyes'],
      'Linebacker': ['Romanian Deadlifts', 'Incline Press', 'Sled Pushes', 'Turkish Get-Ups', 'Battle Ropes', 'Weighted Planks'],
      'Lineman': ['Heavy Squats', 'Heavy Bench Press', 'Power Cleans', 'Farmer\'s Walk', 'Trap Bar Deadlifts', 'Weighted Dips', 'Barbell Shrugs']
    },
    explosiveness: {
      baseline: ['Box Jumps', 'Broad Jumps', 'Agility Ladder Drills'],
      'Taller & Heavier': ['Medicine Ball Chest Pass', 'Standing Triple Jump', 'Low Box Depth Jumps', 'Sled Pushes', 'Heavy Medicine Ball Slams', 'Standing Long Jumps', 'Weighted Vertical Jumps', 'Overhead Medicine Ball Throws', 'Lateral Bounds', 'Low Hurdle Jumps'],
      'Shorter & Heavier': ['Tuck Jumps', 'Lateral Bounds', 'Single-Leg Hops', 'Depth Jumps', 'Medicine Ball Rotational Throws', 'Weighted Jump Squats', 'Bounding', 'Split Squat Jumps', 'Heavy Skater Jumps', 'Broad Jumps'],
      'Taller & Lighter': ['Skater Jumps', 'Plyometric Push-Ups', 'Hurdle Jumps', 'Multi-Directional Jumps', 'Sprint Starts', 'Depth Drops', 'Medicine Ball Wall Balls', 'Lateral Hurdle Hops', 'Vertical Jumps with Twist', 'Agility Cone Drills'],
      'Shorter & Lighter': ['Jump Squats', 'Medicine Ball Slams', 'Agility Cone Drills', 'Quick Feet Drills', 'Clap Push-Ups', 'Shuttle Runs', 'Single-Leg Box Jumps', 'Reaction Drills', 'Lateral Cone Hops', 'Burpees'],
      'Quarterback': ['Medicine Ball Rotational Throws', 'Quick Feet Drills', 'Reaction Drills', 'Lateral Quick Steps', 'Sprint Starts'],
      'Running Back': ['Depth Jumps', 'Zig-Zag Runs', 'Speed Skaters', 'Box Step-Ups with Jump', 'Lateral Jumps'],
      'Skill Position': ['Lateral Jumps', 'Clap Push-Ups', 'Shuttle Runs', 'Hurdle Jumps', 'Agility Ladder Drills'],
      'Linebacker': ['Box Jumps with Lateral Movement', 'Medicine Ball Slams', 'Sled Pushes', 'Depth Jumps with Immediate Vertical Jump', 'Standing Triple Jump'],
      'Lineman': ['Sled Pushes', 'Heavy Medicine Ball Throws', 'Battle Ropes', 'Weighted Vertical Jumps', 'Low Box Depth Jumps']
    }
  },
  Volleyball: {
    strength: {
      baseline: ['Squats', 'Overhead Press', 'Deadlifts'],
      'Taller & Heavier': ['Leg Press', 'Seated Row', 'Weighted Step-Ups', 'Heavy Farmer\'s Walk', 'Trap Bar Deadlifts', 'Seated Chest Press', 'Weighted Dips', 'Barbell Shrugs', 'Heavy Sled Pulls', 'Barbell Push Press'],
      'Shorter & Heavier': ['Lunges', 'Pull-Ups', 'Hack Squats', 'Romanian Deadlifts', 'Incline Bench Press', 'Weighted Pull-Ups', 'Barbell Hip Thrusts', 'Dumbbell Rows', 'Heavy Calf Raises', 'Weighted Plank Holds'],
      'Taller & Lighter': ['Step-Ups', 'Dumbbell Bench Press', 'Single-Leg Romanian Deadlifts', 'Pull-Ups', 'Dumbbell Shoulder Press', 'Hanging Leg Raises', 'Cable Face Pulls', 'Weighted Side Bends', 'Barbell Landmine Press', 'Lunges'],
      'Shorter & Lighter': ['Goblet Squats', 'Planks', 'Bent-Over Rows', 'Dumbbell Snatches', 'Russian Twists', 'Plank with Shoulder Taps', 'Dumbbell Thrusters', 'Incline Dumbbell Press', 'Kettlebell Swings', 'Bicycle Crunches'],
      'Hitter': ['Clean and Jerk', 'Wrist Curls', 'Depth Jumps', 'Box Jumps', 'Power Cleans', 'Tricep Dips'],
      'Setter': ['Finger Extensions', 'Russian Twists', 'Medicine Ball Throws', 'Core Stability Exercises', 'Dumbbell Curls', 'Lateral Raises'],
      'Blocker': ['Overhead Squats', 'Push Press', 'Weighted Step-Ups', 'Barbell Shrugs', 'Chest Press'],
      'Libero': ['Calf Raises', 'Bicycle Crunches', 'Agility Ladder Drills', 'Quick Feet Drills', 'Single-Leg Squats']
    },
    explosiveness: {
      baseline: ['Box Jumps', 'Lateral Bounds', 'Medicine Ball Slams'],
      'Taller & Heavier': ['Standing Long Jumps', 'Low Box Depth Jumps', 'Sled Pushes', 'Heavy Medicine Ball Chest Pass', 'Standing Triple Jump', 'Weighted Vertical Jumps', 'Overhead Medicine Ball Throws', 'Broad Jumps', 'Low Hurdle Jumps', 'Medicine Ball Rotational Throws'],
      'Shorter & Heavier': ['Skater Jumps', 'Plyometric Push-Ups', 'Tuck Jumps', 'Broad Jumps', 'Single-Leg Hops', 'Depth Jumps with Immediate Vertical Jump', 'Weighted Jump Squats', 'Bounding', 'Split Squat Jumps', 'Lateral Quick Steps'],
      'Taller & Lighter': ['Hurdle Jumps', 'Medicine Ball Throws', 'Multi-Directional Jumps', 'Agility Ladder Drills', 'Sprint Starts', 'Depth Drops', 'Medicine Ball Wall Balls', 'Lateral Hurdle Hops', 'Vertical Jumps with Twist', 'Skater Jumps'],
      'Shorter & Lighter': ['Agility Ladder Drills', 'Jump Squats', 'Quick Feet Drills', 'Clap Push-Ups', 'Shuttle Runs', 'Single-Leg Box Jumps', 'Reaction Drills', 'Lateral Cone Hops', 'Burpees', 'Medicine Ball Slams'],
      'Hitter': ['Depth Jumps with Immediate Vertical Jump', 'Overhead Medicine Ball Throws', 'Spike Jumps', 'Box Step-Ups with Jump', 'Lateral Jumps'],
      'Setter': ['Quick Feet Drills', 'Lateral Jumps', 'Reaction Drills', 'Agility Cone Drills', 'Speed Skaters'],
      'Blocker': ['Box Jumps', 'Medicine Ball Chest Pass', 'Vertical Jumps', 'Standing Triple Jump', 'Depth Drops'],
      'Libero': ['Agility Cone Drills', 'Tuck Jumps', 'Shuttle Runs', 'Lateral Quick Steps', 'Sprint Starts']
    }
  },
  Soccer: {
    strength: {
      baseline: ['Squats', 'Lunges', 'Planks'],
      'Taller & Heavier': ['Deadlifts', 'Bench Press', 'Leg Press', 'Seated Row', 'Weighted Step-Ups', 'Heavy Farmer\'s Walk', 'Trap Bar Deadlifts', 'Seated Chest Press', 'Weighted Dips', 'Barbell Shrugs'],
      'Shorter & Heavier': ['Step-Ups', 'Pull-Ups', 'Hack Squats', 'Romanian Deadlifts', 'Incline Bench Press', 'Weighted Pull-Ups', 'Barbell Hip Thrusts', 'Dumbbell Rows', 'Heavy Calf Raises', 'Weighted Plank Holds'],
      'Taller & Lighter': ['Romanian Deadlifts', 'Dumbbell Shoulder Press', 'Single-Leg Romanian Deadlifts', 'Pull-Ups', 'Step-Ups', 'Hanging Leg Raises', 'Dumbbell Bench Press', 'Cable Face Pulls', 'Weighted Side Bends', 'Barbell Landmine Press'],
      'Shorter & Lighter': ['Goblet Squats', 'Russian Twists', 'Bent-Over Rows', 'Dumbbell Snatches', 'Plank with Shoulder Taps', 'Dumbbell Thrusters', 'Incline Dumbbell Press', 'Kettlebell Swings', 'Bicycle Crunches', 'Push-Ups with Weight Vest'],
      'Striker': ['Calf Raises', 'Hip Flexor Exercises', 'Agility Cone Drills', 'Speed Skaters', 'Single-Leg Squats', 'Lateral Lunges'],
      'Midfielder': ['Circuit Training (Bodyweight)', 'Core Stability Exercises', 'Shuttle Runs', 'Jump Squats', 'Medicine Ball Throws', 'Weighted Planks'],
      'Defender': ['Heavy Squats', 'Chest Press', 'Lateral Lunges', 'Sled Pushes', 'Power Cleans', 'Weighted Step-Ups'],
      'Goalkeeper': ['Overhead Press', 'Grip Strength Exercises', 'Medicine Ball Slams', 'Reaction Drills', 'Dumbbell Shoulder Press', 'Tricep Dips']
    },
    explosiveness: {
      baseline: ['Box Jumps', 'Lateral Bounds', 'Sprint Drills'],
      'Taller & Heavier': ['Standing Long Jumps', 'Medicine Ball Slams', 'Sled Pushes', 'Heavy Medicine Ball Chest Pass', 'Standing Triple Jump', 'Weighted Vertical Jumps', 'Overhead Medicine Ball Throws', 'Broad Jumps', 'Low Hurdle Jumps', 'Medicine Ball Rotational Throws'],
      'Shorter & Heavier': ['Skater Jumps', 'Plyometric Push-Ups', 'Tuck Jumps', 'Broad Jumps', 'Single-Leg Hops', 'Depth Jumps', 'Weighted Jump Squats', 'Bounding', 'Split Squat Jumps', 'Lateral Quick Steps'],
      'Taller & Lighter': ['Hurdle Jumps', 'Agility Ladder Drills', 'Multi-Directional Jumps', 'Sprint Starts', 'Depth Drops', 'Medicine Ball Wall Balls', 'Lateral Hurdle Hops', 'Vertical Jumps with Twist', 'Skater Jumps', 'Medicine Ball Throws'],
      'Shorter & Lighter': ['Jump Squats', 'Medicine Ball Throws', 'Quick Feet Drills', 'Clap Push-Ups', 'Shuttle Runs', 'Single-Leg Box Jumps', 'Reaction Drills', 'Lateral Cone Hops', 'Burpees', 'Agility Cone Drills'],
      'Striker': ['Depth Jumps', 'Sprint Starts', 'Agility Cone Drills', 'Speed Skaters', 'Lateral Jumps'],
      'Midfielder': ['Multi-Directional Jumps', 'Shuttle Runs', 'Quick Feet Drills', 'Box Step-Ups with Jump', 'Lateral Quick Steps'],
      'Defender': ['Lateral Jumps', 'Medicine Ball Chest Pass', 'Sled Pushes', 'Standing Triple Jump', 'Depth Drops'],
      'Goalkeeper': ['Lateral Bounds', 'Reaction Drills', 'Medicine Ball Slams', 'Hurdle Jumps', 'Vertical Jumps with Twist']
    }
  },
  'Baseball & Softball': {
    strength: {
      baseline: ['Squats', 'Bench Press', 'Russian Twists'],
      'Taller & Heavier': ['Deadlifts', 'Overhead Press', 'Leg Press', 'Seated Row', 'Weighted Step-Ups', 'Heavy Farmer\'s Walk', 'Trap Bar Deadlifts', 'Seated Chest Press', 'Weighted Dips', 'Barbell Shrugs'],
      'Shorter & Heavier': ['Lunges', 'Pull-Ups', 'Hack Squats', 'Romanian Deadlifts', 'Incline Bench Press', 'Weighted Pull-Ups', 'Barbell Hip Thrusts', 'Dumbbell Rows', 'Heavy Calf Raises', 'Weighted Plank Holds'],
      'Taller & Lighter': ['Step-Ups', 'Dumbbell Bench Press', 'Single-Leg Romanian Deadlifts', 'Pull-Ups', 'Dumbbell Shoulder Press', 'Hanging Leg Raises', 'Cable Face Pulls', 'Weighted Side Bends', 'Barbell Landmine Press', 'Lunges'],
      'Shorter & Lighter': ['Goblet Squats', 'Planks', 'Bent-Over Rows', 'Dumbbell Snatches', 'Russian Twists', 'Plank with Shoulder Taps', 'Dumbbell Thrusters', 'Incline Dumbbell Press', 'Kettlebell Swings', 'Bicycle Crunches'],
      'Pitcher': ['Rotator Cuff Exercises', 'Single-Leg Squats', 'Medicine Ball Rotational Throws', 'Quick Feet Drills', 'Dumbbell Curls', 'Tricep Extensions'],
      'Infield': ['Lateral Lunges', 'Grip Strength Exercises', 'Agility Ladder Drills', 'Speed Squats', 'Power Cleans'],
      'Outfield': ['Calf Raises', 'Overhead Press', 'Shuttle Runs', 'Weighted Step-Ups', 'Dumbbell Flyes'],
      'Catcher': ['Squats', 'Chest Press', 'Planks with Shoulder Taps', 'Weighted Dips', 'Barbell Shrugs']
    },
    explosiveness: {
      baseline: ['Medicine Ball Rotational Throws', 'Sprint Drills', 'Lateral Jumps'],
      'Taller & Heavier': ['Standing Long Jumps', 'Medicine Ball Slams', 'Sled Pushes', 'Heavy Medicine Ball Chest Pass', 'Standing Triple Jump', 'Weighted Vertical Jumps', 'Overhead Medicine Ball Throws', 'Broad Jumps', 'Low Hurdle Jumps', 'Medicine Ball Rotational Throws'],
      'Shorter & Heavier': ['Skater Jumps', 'Plyometric Push-Ups', 'Tuck Jumps', 'Broad Jumps', 'Single-Leg Hops', 'Depth Jumps', 'Weighted Jump Squats', 'Bounding', 'Split Squat Jumps', 'Lateral Quick Steps'],
      'Taller & Lighter': ['Hurdle Jumps', 'Agility Ladder Drills', 'Multi-Directional Jumps', 'Sprint Starts', 'Depth Drops', 'Medicine Ball Wall Balls', 'Lateral Hurdle Hops', 'Vertical Jumps with Twist', 'Skater Jumps', 'Medicine Ball Throws'],
      'Shorter & Lighter': ['Jump Squats', 'Medicine Ball Throws', 'Quick Feet Drills', 'Clap Push-Ups', 'Shuttle Runs', 'Single-Leg Box Jumps', 'Reaction Drills', 'Lateral Cone Hops', 'Burpees', 'Agility Cone Drills'],
      'Pitcher': ['Medicine Ball Rotational Throws', 'Quick Feet Drills', 'Reaction Drills', 'Lateral Quick Steps', 'Sprint Starts'],
      'Infield': ['Lateral Bounds', 'Reaction Drills', 'Shuttle Runs', 'Speed Skaters', 'Agility Ladder Drills'],
      'Outfield': ['Sprint Starts', 'Medicine Ball Overhead Throws', 'Agility Cone Drills', 'Box Step-Ups with Jump', 'Lateral Jumps'],
      'Catcher': ['Box Jumps', 'Medicine Ball Chest Pass', 'Depth Jumps', 'Standing Triple Jump', 'Tuck Jumps']
    }
  },
  Tennis: {
    strength: {
      baseline: ['Lunges', 'Shoulder Press', 'Planks'],
      'Taller & Heavier': ['Deadlifts', 'Bench Press', 'Leg Press', 'Seated Row', 'Weighted Step-Ups', 'Heavy Farmer\'s Walk', 'Trap Bar Deadlifts', 'Seated Chest Press', 'Weighted Dips', 'Barbell Shrugs'],
      'Shorter & Heavier': ['Squats', 'Pull-Ups', 'Hack Squats', 'Romanian Deadlifts', 'Incline Bench Press', 'Weighted Pull-Ups', 'Barbell Hip Thrusts', 'Dumbbell Rows', 'Heavy Calf Raises', 'Weighted Plank Holds'],
      'Taller & Lighter': ['Step-Ups', 'Dumbbell Shoulder Press', 'Single-Leg Romanian Deadlifts', 'Pull-Ups', 'Dumbbell Bench Press', 'Hanging Leg Raises', 'Cable Face Pulls', 'Weighted Side Bends', 'Barbell Landmine Press', 'Lunges'],
      'Shorter & Lighter': ['Goblet Squats', 'Russian Twists', 'Bent-Over Rows', 'Dumbbell Snatches', 'Plank with Shoulder Taps', 'Dumbbell Thrusters', 'Incline Dumbbell Press', 'Kettlebell Swings', 'Bicycle Crunches', 'Agility Ladder Drills']
    },
    explosiveness: {
      baseline: ['Lateral Jumps', 'Medicine Ball Slams', 'Agility Ladder Drills'],
      'Taller & Heavier': ['Standing Long Jumps', 'Overhead Medicine Ball Throws', 'Sled Pushes', 'Heavy Medicine Ball Chest Pass', 'Standing Triple Jump', 'Weighted Vertical Jumps', 'Broad Jumps', 'Low Hurdle Jumps', 'Medicine Ball Rotational Throws', 'Depth Jumps'],
      'Shorter & Heavier': ['Skater Jumps', 'Plyometric Push-Ups', 'Tuck Jumps', 'Broad Jumps', 'Single-Leg Hops', 'Depth Jumps with Immediate Vertical Jump', 'Weighted Jump Squats', 'Bounding', 'Split Squat Jumps', 'Lateral Quick Steps'],
      'Taller & Lighter': ['Hurdle Jumps', 'Agility Cone Drills', 'Multi-Directional Jumps', 'Sprint Starts', 'Depth Drops', 'Medicine Ball Wall Balls', 'Lateral Hurdle Hops', 'Vertical Jumps with Twist', 'Skater Jumps', 'Medicine Ball Throws'],
      'Shorter & Lighter': ['Jump Squats', 'Medicine Ball Rotational Throws', 'Quick Feet Drills', 'Clap Push-Ups', 'Shuttle Runs', 'Single-Leg Box Jumps', 'Reaction Drills', 'Lateral Cone Hops', 'Burpees', 'Agility Ladder Drills']
    }
  },
  Sprinting: {
    strength: {
      baseline: ['Squats', 'Deadlifts', 'Calf Raises'],
      'Taller & Heavier': ['Leg Press', 'Bench Press', 'Weighted Step-Ups', 'Heavy Farmer\'s Walk', 'Trap Bar Deadlifts', 'Seated Chest Press', 'Weighted Dips', 'Barbell Shrugs', 'Heavy Sled Pulls', 'Barbell Push Press'],
      'Shorter & Heavier': ['Power Cleans', 'Incline Press', 'Hack Squats', 'Romanian Deadlifts', 'Weighted Pull-Ups', 'Barbell Hip Thrusts', 'Dumbbell Rows', 'Heavy Calf Raises', 'Weighted Plank Holds', 'Bulgarian Split Squats'],
      'Taller & Lighter': ['Lunges', 'Pull-Ups', 'Single-Leg Romanian Deadlifts', 'Dumbbell Shoulder Press', 'Step-Ups', 'Hanging Leg Raises', 'Dumbbell Bench Press', 'Cable Face Pulls', 'Weighted Side Bends', 'Barbell Landmine Press'],
      'Shorter & Lighter': ['Goblet Squats', 'Core Exercises (e.g., Hanging Knee Raises)', 'Box Jumps', 'Depth Jumps', 'Bent-Over Rows', 'Dumbbell Snatches', 'Plank with Shoulder Taps', 'Dumbbell Thrusters', 'Incline Dumbbell Press', 'Kettlebell Swings']
    },
    explosiveness: {
      baseline: ['Box Jumps', 'Bounding', 'Sprint Drills'],
      'Taller & Heavier': ['Standing Triple Jump', 'Medicine Ball Throws', 'Sled Pushes', 'Heavy Medicine Ball Chest Pass', 'Standing Long Jumps', 'Weighted Vertical Jumps', 'Overhead Medicine Ball Throws', 'Broad Jumps', 'Low Hurdle Jumps', 'Medicine Ball Rotational Throws'],
      'Shorter & Heavier': ['Tuck Jumps', 'Broad Jumps', 'Single-Leg Hops', 'Depth Jumps', 'Weighted Jump Squats', 'Bounding', 'Split Squat Jumps', 'Lateral Quick Steps', 'Skater Jumps', 'Plyometric Push-Ups'],
      'Taller & Lighter': ['Skater Jumps', 'Hurdle Jumps', 'Multi-Directional Jumps', 'Sprint Starts', 'Depth Drops', 'Medicine Ball Wall Balls', 'Lateral Hurdle Hops', 'Vertical Jumps with Twist', 'Agility Ladder Drills', 'Medicine Ball Throws'],
      'Shorter & Lighter': ['Jump Squats', 'Agility Ladder Drills', 'Quick Feet Drills', 'Clap Push-Ups', 'Shuttle Runs', 'Single-Leg Box Jumps', 'Reaction Drills', 'Lateral Cone Hops', 'Burpees', 'Sprint Starts']
    }
  },
  Wrestling: {
    strength: {
      baseline: ['Deadlifts', 'Pull-Ups', 'Planks'],
      'Taller & Heavier': ['Squats', 'Bench Press', 'Leg Press', 'Seated Row', 'Weighted Step-Ups', 'Heavy Farmer\'s Walk', 'Trap Bar Deadlifts', 'Seated Chest Press', 'Weighted Dips', 'Barbell Shrugs'],
      'Shorter & Heavier': ['Power Cleans', 'Incline Press', 'Hack Squats', 'Romanian Deadlifts', 'Weighted Pull-Ups', 'Barbell Hip Thrusts', 'Dumbbell Rows', 'Heavy Calf Raises', 'Weighted Plank Holds', 'Bulgarian Split Squats'],
      'Taller & Lighter': ['Lunges', 'Dumbbell Shoulder Press', 'Single-Leg Romanian Deadlifts', 'Pull-Ups', 'Step-Ups', 'Hanging Leg Raises', 'Dumbbell Bench Press', 'Cable Face Pulls', 'Weighted Side Bends', 'Barbell Landmine Press'],
      'Shorter & Lighter': ['Goblet Squats', 'Core Exercises (e.g., Hanging Knee Raises)', 'Turkish Get-Ups', 'Battle Ropes', 'Bent-Over Rows', 'Dumbbell Snatches', 'Plank with Shoulder Taps', 'Dumbbell Thrusters', 'Incline Dumbbell Press', 'Kettlebell Swings']
    },
    explosiveness: {
      baseline: ['Medicine Ball Slams', 'Lateral Bounds', 'Burpees'],
      'Taller & Heavier': ['Standing Long Jumps', 'Medicine Ball Chest Pass', 'Sled Pushes', 'Heavy Medicine Ball Throws', 'Standing Triple Jump', 'Weighted Vertical Jumps', 'Overhead Medicine Ball Throws', 'Broad Jumps', 'Low Hurdle Jumps', 'Medicine Ball Rotational Throws'],
      'Shorter & Heavier': ['Tuck Jumps', 'Broad Jumps', 'Single-Leg Hops', 'Depth Jumps', 'Weighted Jump Squats', 'Bounding', 'Split Squat Jumps', 'Lateral Quick Steps', 'Skater Jumps', 'Plyometric Push-Ups'],
      'Taller & Lighter': ['Skater Jumps', 'Plyometric Push-Ups', 'Hurdle Jumps', 'Multi-Directional Jumps', 'Sprint Starts', 'Depth Drops', 'Medicine Ball Wall Balls', 'Lateral Hurdle Hops', 'Vertical Jumps with Twist', 'Agility Ladder Drills'],
      'Shorter & Lighter': ['Jump Squats', 'Agility Cone Drills', 'Quick Feet Drills', 'Clap Push-Ups', 'Shuttle Runs', 'Single-Leg Box Jumps', 'Reaction Drills', 'Lateral Cone Hops', 'Burpees', 'Medicine Ball Throws']
    }
  },
  'General Workout': {
    strength: {
      baseline: ['Squats', 'Bench Press', 'Deadlifts'],
      'Taller & Heavier': ['Leg Press', 'Seated Row', 'Weighted Step-Ups', 'Heavy Farmer\'s Walk', 'Trap Bar Deadlifts', 'Seated Chest Press', 'Weighted Dips', 'Barbell Shrugs', 'Heavy Sled Pulls', 'Barbell Push Press'],
      'Shorter & Heavier': ['Hack Squats', 'Romanian Deadlifts', 'Weighted Pull-Ups', 'Barbell Hip Thrusts', 'Dumbbell Rows', 'Heavy Calf Raises', 'Weighted Plank Holds', 'Bulgarian Split Squats', 'Incline Bench Press', 'Power Cleans'],
      'Taller & Lighter': ['Lunges', 'Pull-Ups', 'Single-Leg Romanian Deadlifts', 'Dumbbell Shoulder Press', 'Step-Ups', 'Hanging Leg Raises', 'Dumbbell Bench Press', 'Cable Face Pulls', 'Weighted Side Bends', 'Barbell Landmine Press'],
      'Shorter & Lighter': ['Goblet Squats', 'Bent-Over Rows', 'Dumbbell Snatches', 'Russian Twists', 'Plank with Shoulder Taps', 'Dumbbell Thrusters', 'Incline Dumbbell Press', 'Kettlebell Swings', 'Bicycle Crunches', 'Push-Ups with Weight Vest']
    },
    explosiveness: {
      baseline: ['Box Jumps', 'Medicine Ball Throws', 'Agility Ladder Drills'],
      'Taller & Heavier': ['Standing Long Jumps', 'Low Box Depth Jumps', 'Sled Pushes', 'Heavy Medicine Ball Chest Pass', 'Standing Triple Jump', 'Weighted Vertical Jumps', 'Overhead Medicine Ball Throws', 'Broad Jumps', 'Low Hurdle Jumps', 'Medicine Ball Rotational Throws'],
      'Shorter & Heavier': ['Tuck Jumps', 'Broad Jumps', 'Single-Leg Hops', 'Depth Jumps', 'Weighted Jump Squats', 'Bounding', 'Split Squat Jumps', 'Lateral Quick Steps', 'Skater Jumps', 'Medicine Ball Slams'],
      'Taller & Lighter': ['Skater Jumps', 'Hurdle Jumps', 'Multi-Directional Jumps', 'Sprint Starts', 'Depth Drops', 'Medicine Ball Wall Balls', 'Lateral Hurdle Hops', 'Vertical Jumps with Twist', 'Agility Cone Drills', 'Plyometric Push-Ups'],
      'Shorter & Lighter': ['Jump Squats', 'Medicine Ball Slams', 'Quick Feet Drills', 'Clap Push-Ups', 'Shuttle Runs', 'Single-Leg Box Jumps', 'Reaction Drills', 'Lateral Cone Hops', 'Burpees', 'Agility Ladder Drills']
    }
  }
};
