document.querySelectorAll('.main-nav a').forEach(function(link) {
  link.addEventListener('click', function() {
    // Only animate if it's not an anchor link
    if (!link.getAttribute('href').startsWith('#')) {
      sessionStorage.setItem('animate-hero', '1');
    }
  });
});

window.addEventListener('DOMContentLoaded', function() {
  const heroes = document.querySelectorAll('.hero');

  if (sessionStorage.getItem('animate-hero')) {
    sessionStorage.removeItem('animate-hero');
    setTimeout(function() {
      heroes.forEach(hero => hero.classList.add('visible'));
    }, 10);
  } else {
    heroes.forEach(hero => hero.classList.add('visible'));
  }
  
  // Animate sections on scroll
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -10% 0px',
    threshold: 0.1
  };
  
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);
  
  // Observe all hero sections except the first one (home)
  heroes.forEach((hero, index) => {
    if (index > 0) {
      hero.classList.remove('visible');
      sectionObserver.observe(hero);
    }
  });
});
