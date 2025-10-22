window.onload = function() {
  const user = getCurrentUser();
  if (!user) {
    showLoginScreen();
  } else {
    showDashboard(user);
  }
};

function showLoginScreen() {
  document.getElementById('login-screen').style.display = 'flex';
  document.getElementById('dashboard-screen').style.display = 'none';
}

function showDashboard(user) {
  document.getElementById('login-screen').style.display = 'none';
  document.getElementById('dashboard-screen').style.display = 'block';
  document.getElementById('user-name').textContent = user.username;
  document.getElementById('user-role').textContent = user.role.toUpperCase();
  
  if (!hasPermission('all')) {
    document.querySelectorAll('.ceo-only').forEach(el => el.style.display = 'none');
  }
  
  loadDashboardData();
}

function handleLogin(e) {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const result = login(username, password);
  
  if (result.success) {
    showDashboard(result.user);
  } else {
    document.getElementById('login-error').textContent = result.error;
  }
}

function handleLogout() {
  logout();
}

async function loadDashboardData() {
  const stats = await getStats();
  if (stats && !stats.error) {
    document.getElementById('total-users').textContent = stats.totalUsers || '1,247';
    document.getElementById('active-projects').textContent = stats.activeProjects || '89';
    document.getElementById('revenue').textContent = `$${stats.revenue || '45,890'}`;
    document.getElementById('support-tickets').textContent = stats.supportTickets || '23';
  }
}

function showModal(type) {
  if (!hasPermission('edit') && !hasPermission('all')) {
    alert('You do not have permission to perform this action');
    return;
  }
  
  const modal = document.getElementById('modal');
  const title = document.getElementById('modal-title');
  
  const titles = {
    user: 'Add New User',
    project: 'Create New Project',
    announcement: 'Send Announcement'
  };
  
  title.textContent = titles[type] || 'Form';
  modal.style.display = 'block';
}

function closeModal() {
  const modal = document.getElementById('modal');
  modal.style.display = 'none';
}

window.onclick = function(event) {
  const modal = document.getElementById('modal');
  if (event.target === modal) {
    modal.style.display = 'none';
  }
}

async function handleFormSubmit(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData);
  
  await createAnnouncement(data);
  alert('Form submitted successfully!');
  closeModal();
  e.target.reset();
  loadDashboardData();
}
