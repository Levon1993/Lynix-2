// Cookie Banner
const cookieBanner = document.getElementById('cookie-banner');
const acceptBtn = document.getElementById('accept-cookies');

acceptBtn.addEventListener('click', () => {
  cookieBanner.style.display = 'none';
  localStorage.setItem('cookiesAccepted', 'true');
});

window.addEventListener('load', () => {
  if(localStorage.getItem('cookiesAccepted') === 'true'){
    cookieBanner.style.display = 'none';
  }
});
