const API_URL = 'http://localhost:7777'; 

// Fetch pet data
export const fetchPet = async () => {
  try {
    const response = await fetch(`${API_URL}/pets`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching pet:', error);
    throw error;
  }
};

// Save or update pet data
export const savePet = async (petData) => {
  try {
    const response = await fetch(`${API_URL}/pets`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(petData),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error saving pet:', error);
    throw error;
  }
};

// Fetch all activities
export const fetchActivities = async () => {
  try {
    const response = await fetch(`${API_URL}/activities`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching activities:', error);
    throw error;
  }
};

// Create a new activity
export const createActivity = async (activityData) => {
  try {
    const response = await fetch(`${API_URL}/activities`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(activityData),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error creating activity:', error);
    throw error;
  }
};

// Delete an activity
export const deleteActivity = async (id) => {
  try {
    const response = await fetch(`${API_URL}/activities/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error deleting activity:', error);
    throw error;
  }
};

// Update an activity
export const updateActivity = async (id, updatedData) => {
  try {
    const response = await fetch(`${API_URL}/activities/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error updating activity:', error);
    throw error;
  }
};
