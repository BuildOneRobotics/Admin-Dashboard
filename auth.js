const USERS = {
  bensteels: {
    role: 'ceo',
    permissions: ['all']
  },
  ethanpatmore: {
    role: 'admin',
    permissions: ['view', 'edit', 'moderate']
  }
};

function login(username, password) {
  if (!USERS[username]) {
    return { success: false, error: 'Invalid credentials' };
  }

  const envPassword = username === 'bensteels' 
    ? window.ENV?.ADMIN_PASSWORD_BENSTEELS 
    : window.ENV?.ADMIN_PASSWORD_ETHANPATMORE;

  if (password === envPassword) {
    const user = { username, ...USERS[username] };
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
