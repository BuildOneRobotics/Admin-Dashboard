const USERS = {
  bensteels: {
    password: '24122012',
    role: 'ceo',
    permissions: ['all']
  },
  ethanpatmore: {
    password: '1012',
    role: 'admin',
    permissions: ['view', 'edit', 'moderate']
  }
};

function login(username, password) {
  if (!USERS[username]) {
    return { success: false, error: 'Invalid credentials' };
  }

  if (password === USERS[username].password) {
    const user = { username, role: USERS[username].role, permissions: USERS[username].permissions };
    localStorage.setItem('adminUser', JSON.stringify(user));
    return { success: true, user };
  }

  return { success: false, error: 'Invalid credentials' };
}

function logout() {
  localStorage.removeItem('adminUser');
  window.location.reload();
}

function getCurrentUser() {
  const user = localStorage.getItem('adminUser');
  return user ? JSON.parse(user) : null;
}

function hasPermission(permission) {
  const user = getCurrentUser();
  if (!user) return false;
  return user.permissions.includes('all') || user.permissions.includes(permission);
}
