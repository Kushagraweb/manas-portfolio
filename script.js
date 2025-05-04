// Add this script right before the closing </body> tag

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelector('.proj').addEventListener('click', function(e) {
      e.preventDefault();
      document.querySelector('.projects').scrollIntoView({
        behavior: 'smooth'
      });
    });
  
    document.querySelector('.contact').addEventListener('click', function(e) {
      e.preventDefault();
      document.querySelector('.contact1').scrollIntoView({
        behavior: 'smooth'
      });
    });
  
    // Intersection Observer for scroll animations
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };
  
    // Observer for Projects section
    const projectsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          document.querySelector('.projects').classList.add('visible');
          
          // Stagger animation for project items
          const projectItems = document.querySelectorAll('#projects');
          projectItems.forEach((item, index) => {
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'translateY(0)';
            }, 300 * (index + 1));
          });
        }
      });
    }, observerOptions);
  
    // Observer for Contact section
    const contactObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          document.querySelector('.contact1').classList.add('visible');
        }
      });
    }, observerOptions);
  
   // Adding hover effects for SVG elements
document.addEventListener('DOMContentLoaded', function() {
  // Main section SVG paths (semi-circles)
  const svgPaths = document.querySelectorAll('.art svg path');
  
  // Store original fills to revert back on mouseout
  const originalFills = [];
  svgPaths.forEach(path => {
    originalFills.push(path.getAttribute('fill'));
  });
  
  // Add hover effect to the entire SVG container
  const mainArt = document.querySelector('.art');
  if (mainArt) {
    mainArt.addEventListener('mouseenter', function() {
      // Animate each path with a staggered delay
      svgPaths.forEach((path, index) => {
        setTimeout(() => {
          // Scale effect with transform origin at center right (300, 335.5)
          path.style.transform = 'scale(1.1)';
          path.style.transformOrigin = '300px 335.5px';
          
          // Brighten the color
          let currentFill = path.getAttribute('fill');
          let brighterFill = makeBrighter(currentFill);
          path.setAttribute('fill', brighterFill);
          
          // Add subtle pulse animation
          path.style.animation = `pulse 1.5s infinite alternate ease-in-out`;
        }, index * 100);
      });
    });
    
    mainArt.addEventListener('mouseleave', function() {
      // Revert to original state with staggered delay
      svgPaths.forEach((path, index) => {
        setTimeout(() => {
          path.style.transform = 'scale(1)';
          path.setAttribute('fill', originalFills[index]);
          path.style.animation = 'none';
        }, index * 100);
      });
    });
  }
  
  // Contact section SVG circles
  const svgCircles = document.querySelectorAll('.art2 svg circle');
  const originalCircleFills = [];
  svgCircles.forEach(circle => {
    originalCircleFills.push(circle.getAttribute('fill'));
  });
  
  const contactArt = document.querySelector('.art2');
  if (contactArt) {
    contactArt.addEventListener('mouseenter', function() {
      // Add hover effect to each circle
      svgCircles.forEach((circle, index) => {
        setTimeout(() => {
          // Make circles expand outward
          const r = parseFloat(circle.getAttribute('r'));
          circle.setAttribute('r', r * 1.1);
          
          // Brighten the color
          let currentFill = circle.getAttribute('fill');
          let brighterFill = makeBrighter(currentFill);
          circle.setAttribute('fill', brighterFill);
          
          // Apply rotation effect to the whole SVG
          contactArt.querySelector('svg').style.transform = 'rotate(10deg)';
          contactArt.querySelector('svg').style.transition = 'transform 0.5s ease';
        }, index * 100);
      });
    });
    
    contactArt.addEventListener('mouseleave', function() {
      // Revert to original state
      svgCircles.forEach((circle, index) => {
        setTimeout(() => {
          const originalR = [120, 90, 60, 30][index];
          circle.setAttribute('r', originalR);
          circle.setAttribute('fill', originalCircleFills[index]);
        }, index * 100);
      });
      
      // Reset rotation
      contactArt.querySelector('svg').style.transform = 'rotate(0deg)';
    });
  }
  
  // Function to make colors brighter
  function makeBrighter(hexColor) {
    // For simple named colors, convert them first
    if (hexColor === '#3b3b3b') return '#4d4d4d';
    if (hexColor === '#3b6c4c') return '#4d8a61';
    if (hexColor === '#4ca866') return '#60cf7e';
    if (hexColor === '#6ed87c') return '#8ef19c';
    if (hexColor === '#81ffa0') return '#a5ffba';
    if (hexColor === '#4a6e4a') return '#5f8d5f';
    if (hexColor === '#5eb06e') return '#79ce89';
    if (hexColor === '#6adf8a') return '#8bf5a3';
    
    // For other colors, use a calculation
    let r = parseInt(hexColor.slice(1, 3), 16);
    let g = parseInt(hexColor.slice(3, 5), 16);
    let b = parseInt(hexColor.slice(5, 7), 16);
    
    // Increase brightness
    r = Math.min(255, r + 40);
    g = Math.min(255, g + 40);
    b = Math.min(255, b + 40);
    
    // Convert back to hex
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  }
  
  // Add CSS for the pulse animation
  const style = document.createElement('style');
  style.innerHTML = `
    @keyframes pulse {
      0% { opacity: 0.8; }
      100% { opacity: 1; }
    }
    
    .art, .art2 {
      cursor: pointer;
    }
    
    .art svg path, .art2 svg circle {
      transition: all 0.5s ease;
    }
    
    /* Interactive effect on hover for SVG elements */
    .main:hover .art svg {
      filter: drop-shadow(0 0 10px rgba(129, 255, 160, 0.5));
    }
    
    .contact-content:hover .art2 svg {
      filter: drop-shadow(0 0 10px rgba(129, 255, 160, 0.5));
    }
  `;
  document.head.appendChild(style);
  
  // Add interactive hover effect when user moves mouse over SVG areas
  if (mainArt) {
    mainArt.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      
      // Move SVG slightly based on mouse position
      this.querySelector('svg').style.transform = `translateX(${x * 15}px) translateY(${y * 15}px)`;
    });
    
    mainArt.addEventListener('mouseleave', function() {
      this.querySelector('svg').style.transform = 'translateX(0) translateY(0)';
    });
  }
  
  if (contactArt) {
    contactArt.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      
      // Move SVG slightly based on mouse position
      this.querySelector('svg').style.transform = `translateX(${x * 15}px) translateY(${y * 15}px)`;
    });
    
    contactArt.addEventListener('mouseleave', function() {
      this.querySelector('svg').style.transform = 'translateX(0) translateY(0)';
    });
  }
});
    // Word hover animation
    const wordElements = document.querySelectorAll('.word');
    wordElements.forEach(word => {
      word.addEventListener('mouseover', function() {
        this.style.transition = 'all 0.3s ease';
        this.style.color = '#6ed87c';
        this.style.transform = 'translateY(-2px)';
        this.style.textShadow = '0 0 10px rgba(129, 255, 160, 0.5)';
      });
  
      word.addEventListener('mouseout', function() {
        this.style.transition = 'all 0.3s ease';
        this.style.color = '#81ffa0';
        this.style.transform = 'translateY(0)';
        this.style.textShadow = 'none';
      });
    });

    const projectImages = document.querySelectorAll('.proj1-img img, .proj2-img img, .proj3-img img');
    projectImages.forEach(img => {
      img.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        
        this.style.transform = `scale(1.05) translate(${x * 10}px, ${y * 10}px)`;
        this.style.boxShadow = `${-x * 10}px ${-y * 10}px 20px rgba(129, 255, 160, 0.2)`;
      });
      
      img.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) translate(0, 0)';
        this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
      });
    });
  
    // Initialize AOS-like reveal animations
    function revealOnScroll() {
      const elements = document.querySelectorAll('.main, .projects, .contact1, #projects');
      
      elements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100 && elementBottom > 0) {
          element.classList.add('visible');
        }
      });
    }
  
    // Initial check on page load
    revealOnScroll();
    
    // Listen for scroll events
    window.addEventListener('scroll', revealOnScroll);
  });