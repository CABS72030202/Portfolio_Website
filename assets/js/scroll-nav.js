// Scroll-based navigation functionality
document.addEventListener('DOMContentLoaded', function() {
  const navLinks = document.querySelectorAll('.main-nav a');
  const sections = document.querySelectorAll('section');
  const allAnchorLinks = document.querySelectorAll('a[href^="#"]');
  
  // Get the header height for offset calculation
  const header = document.querySelector('header');
  const headerHeight = header.offsetHeight;
  
  // Function to update active navigation link
  function updateActiveLink() {
    let currentSection = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - headerHeight - 50; // 50px buffer
      const sectionBottom = sectionTop + section.offsetHeight;
      
      if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
        currentSection = section.getAttribute('id');
      }
    });
    
    // If we're at the very top, make sure home is active
    if (window.scrollY < 100) {
      currentSection = 'home';
    }
    
    // Update navigation links
    navLinks.forEach(link => {
      link.classList.remove('current');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('current');
      }
    });
  }
  
  // Function to handle smooth scrolling for all anchor links
  function handleAnchorClick(e) {
    e.preventDefault();
    
    const targetId = e.target.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);
    
    if (targetSection) {
      const targetOffset = targetSection.offsetTop - headerHeight;
      
      window.scrollTo({
        top: targetOffset,
        behavior: 'smooth'
      });
    }
  }
  
  // Add click event listeners to all anchor links
  allAnchorLinks.forEach(link => {
    link.addEventListener('click', handleAnchorClick);
  });
  
  // Add scroll event listener
  window.addEventListener('scroll', updateActiveLink);
  
  // Initial call to set active link
  updateActiveLink();
  
  // Intersection Observer for better performance and smoother transitions
  const observerOptions = {
    root: null,
    rootMargin: `-${headerHeight}px 0px -60% 0px`,
    threshold: 0
  };
  
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const sectionId = entry.target.getAttribute('id');
        
        navLinks.forEach(link => {
          link.classList.remove('current');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('current');
          }
        });
      }
    });
  }, observerOptions);
  
  // Observe all sections
  sections.forEach(section => {
    sectionObserver.observe(section);
  });
});
