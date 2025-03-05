document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('dark-mode-toggle');
    const body = document.body;

    toggleButton.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', body.classList.contains('dark-mode'));
    });

    // Check for saved user preference
    const darkModePreference = localStorage.getItem('darkMode');
    if (darkModePreference === 'true') {
        body.classList.add('dark-mode');
    }
});