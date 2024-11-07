
function showContent(section) {
  // Hide all content sections
  const contentSections = document.querySelectorAll('.content-section');
  contentSections.forEach(content => {
    content.classList.remove('active-content');
  });

  // Show the selected content section
  const selectedContent = document.getElementById(section + 'Content');
  selectedContent.classList.add('active-content');

  // Highlight the active sidebar item
  const sidebarItems = document.querySelectorAll('.sidebar-item');
  sidebarItems.forEach(item => {
    item.classList.remove('active');
  });
  document.querySelector(`.sidebar-item[onclick="showContent('${section}')"]`).classList.add('active');
}

function toggleEditMode() {
  const profileView = document.getElementById('profileView');
  const profileForm = document.getElementById('profileForm');

  if (profileView.style.display === 'none') {
    profileView.style.display = 'block';
    profileForm.style.display = 'none';
  } else {
    profileView.style.display = 'none';
    profileForm.style.display = 'block';
  }
}
