const API_URL = 'https://buildonerobotics.vercel.app';

async function fetchFromAPI(endpoint, options = {}) {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      }
    });
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    return { error: error.message };
  }
}

async function getAnnouncements() {
  return await fetchFromAPI('/api/announcements');
}

async function createAnnouncement(data) {
  return await fetchFromAPI('/api/announcements', {
    method: 'POST',
    body: JSON.stringify(data)
  });
}

async function updateAnnouncement(id, data) {
  return await fetchFromAPI(`/api/announcements/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  });
}

async function deleteAnnouncement(id) {
  return await fetchFromAPI(`/api/announcements/${id}`, {
    method: 'DELETE'
  });
}

async function getUsers() {
  return await fetchFromAPI('/api/users');
}

async function getPosts() {
  return await fetchFromAPI('/api/posts');
}

async function deletePost(id) {
  return await fetchFromAPI(`/api/delete-post?id=${id}`, {
    method: 'DELETE'
  });
}

async function getStats() {
  return await fetchFromAPI('/api/stats');
}
