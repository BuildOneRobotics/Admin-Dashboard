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
  loadPartnershipContent();
  initAutoSave();
  
  const posts = await getPosts();
  if (posts && !posts.error && Array.isArray(posts)) {
    document.getElementById('total-users').textContent = '-';
    document.getElementById('active-posts').textContent = posts.length;
    document.getElementById('forum-topics').textContent = posts.length;
    document.getElementById('announcements').textContent = '-';
    
    const recentPosts = posts.slice(0, 5);
    const recentPostsList = document.getElementById('recent-posts');
    recentPostsList.innerHTML = recentPosts.map(post => `
      <li class="activity-item">
        <span class="activity-icon">📝</span>
        <div>
          <p><strong>${post.title || 'Untitled'}</strong> by ${post.author || 'Anonymous'}</p>
          <span class="activity-time">${new Date(post.timestamp).toLocaleDateString()}</span>
        </div>
      </li>
    `).join('');
    
    const postsTable = document.getElementById('posts-table');
    postsTable.innerHTML = posts.map(post => `
      <tr>
        <td>${post.title || 'Untitled'}</td>
        <td>${post.author || 'Anonymous'}</td>
        <td>${new Date(post.timestamp).toLocaleDateString()}</td>
        <td><button class="btn-small" onclick="deletePostById('${post.id}')">Delete</button></td>
      </tr>
    `).join('');
  }
}

async function deletePostById(id) {
  if (confirm('Delete this post?')) {
    await deletePost(id);
    loadDashboardData();
  }
}

function loadPartnershipContent() {
  const saved = localStorage.getItem('partnerships-content');
  if (saved) {
    document.getElementById('editor').innerHTML = saved;
  }
}

function savePartnershipContent() {
  const content = document.getElementById('editor').innerHTML;
  localStorage.setItem('partnerships-content', content);
  document.querySelector('.auto-save-status').textContent = 'Saved ✓';
  setTimeout(() => {
    document.querySelector('.auto-save-status').textContent = 'Auto-saving...';
  }, 2000);
}

function initAutoSave() {
  const editor = document.getElementById('editor');
  let timeout;
  
  editor.addEventListener('input', () => {
    clearTimeout(timeout);
    timeout = setTimeout(savePartnershipContent, 1000);
  });
}

function formatText(command) {
  document.execCommand(command, false, null);
  document.getElementById('editor').focus();
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
  const data = {
    title: formData.get('title'),
    content: formData.get('content'),
    author: getCurrentUser().username,
    timestamp: Date.now()
  };
  
  await createAnnouncement(data);
  alert('Announcement created!');
  closeModal();
  e.target.reset();
  loadDashboardData();
}

if (window.location.pathname.endsWith('dashboard.html')) {
  window.onload();
}
