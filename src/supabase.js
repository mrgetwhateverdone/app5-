import { createClient } from '@supabase/supabase-js';

// These will be replaced with your actual Supabase project credentials
const supabaseUrl = 'https://ttljfuzepfrxocgizodl.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR0bGpmdXplcGZyeG9jZ2l6b2RsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEyMTE4MzksImV4cCI6MjA1Njc4NzgzOX0.xOsQ1A8HP3xCGFjgXHGPa7n8vH1uDqESH6vrde1zROQ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Auth helper functions
export const signUp = async (email, password, fullName) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  });
  return { data, error };
};

export const signIn = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const resetPasswordForEmail = async (email) => {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: window.location.origin + '/reset-password',
  });
  return { data, error };
};

export const updateUserPassword = async (newPassword) => {
  const { data, error } = await supabase.auth.updateUser({
    password: newPassword
  });
  return { data, error };
};

export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser();
  return { user, error };
};

// Profile functions
export const updateProfile = async (userId, profileData) => {
  const { data, error } = await supabase
    .from('profiles')
    .upsert({
      id: userId,
      ...profileData,
      updated_at: new Date(),
    });
  return { data, error };
};

export const getProfile = async (userId) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  return { data, error };
};

// Workout functions
export const saveWorkout = async (userId, workoutData) => {
  const { data, error } = await supabase
    .from('workouts')
    .insert({
      user_id: userId,
      ...workoutData,
      created_at: new Date(),
    });
  return { data, error };
};

export const getWorkouts = async (userId) => {
  const { data, error } = await supabase
    .from('workouts')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  return { data, error };
};

// Progress tracking functions
export const getWorkoutStats = async (userId) => {
  const { data, error } = await supabase
    .from('workouts')
    .select('*')
    .eq('user_id', userId);
  
  if (error) return { error };
  
  const stats = data.reduce((acc, workout) => {
    workout.exercises.forEach(exercise => {
      acc.totalWeight += exercise.weight * exercise.reps;
      acc.totalReps += exercise.reps;
    });
    return acc;
  }, { totalWeight: 0, totalReps: 0, workoutCount: data.length });
  
  return { data: stats };
}; 