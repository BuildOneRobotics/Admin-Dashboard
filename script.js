function showModal(type) {
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

document.getElementById('modal-form').addEventListener('submit', function(e) {
  e.preventDefault();
  alert('Form submitted successfully!');
  closeModal();
  this.reset();
});
