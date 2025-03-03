import { useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';

const Particles = ({ density = 50, speed = 1, color = '#1E90FF', opacity = 0.3 }) => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const requestRef = useRef(null);
  const resizeTimeoutRef = useRef(null);
  const isScrollingRef = useRef(false);
  const lastScrollTime = useRef(0);

  // Throttled resize handler using useCallback for memoization
  const handleResize = useCallback(() => {
    if (resizeTimeoutRef.current) {
      clearTimeout(resizeTimeoutRef.current);
    }
    
    resizeTimeoutRef.current = setTimeout(() => {
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initParticles();
      }
    }, 200); // 200ms throttle for resize events
  }, []);

  // Initialize particles
  const initParticles = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const particles = [];
    // Further reduce particle count for better performance
    const particleCount = Math.floor((canvas.width * canvas.height) / (40000 / density));
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.2 + 0.8, // Smaller particles for subtlety
        speedX: (Math.random() - 0.5) * speed * 0.8, // Reduce speed slightly
        speedY: (Math.random() - 0.5) * speed * 0.8,
        opacity: Math.random() * opacity + 0.1, // Lower minimum opacity
      });
    }
    
    particlesRef.current = particles;
  }, [density, speed, opacity]);

  // Scroll handler to detect when user is scrolling
  const handleScroll = useCallback(() => {
    isScrollingRef.current = true;
    lastScrollTime.current = Date.now();
    
    // Clear previous timeout if it exists
    if (window.scrollTimeout) {
      clearTimeout(window.scrollTimeout);
    }
    
    // Set a timeout to detect when scrolling stops
    window.scrollTimeout = setTimeout(() => {
      if (Date.now() - lastScrollTime.current > 100) {
        isScrollingRef.current = false;
      }
    }, 100);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d', { alpha: true });
    let lastTime = 0;
    const fpsLimit = 30; // Limit frames per second
    
    // Animation loop with frame limiting and scroll detection
    const animate = (timestamp) => {
      // Throttle the frame rate
      const deltaTime = timestamp - lastTime;
      
      if (deltaTime < 1000 / fpsLimit) {
        requestRef.current = requestAnimationFrame(animate);
        return;
      }
      
      lastTime = timestamp;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Reduce animation complexity during scrolling
      const particles = particlesRef.current;
      const scrollingMode = isScrollingRef.current;
      const connectionDistance = scrollingMode ? 80 : 100; // Reduce connection distance
      const skipFactor = scrollingMode ? 5 : 3; // Skip more particles during scrolling
      const maxConnections = scrollingMode ? 2 : 3; // Fewer connections for subtlety
      
      // Update and draw particles
      particles.forEach((particle, index) => {
        // Skip updating some particles during scrolling for better performance
        if (scrollingMode && index % 2 !== 0) return;
        
        // Move particles
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.globalAlpha = particle.opacity;
        ctx.fill();
        
        // Only draw connections for a subset of particles to improve performance
        if (index % skipFactor === 0) {
          // Connect particles with lines if they're close enough
          let connectionsDrawn = 0;
          
          for (let i = index + 1; i < particles.length && connectionsDrawn < maxConnections; i++) {
            // Skip some connections during scrolling
            if (scrollingMode && i % 2 !== 0) continue;
            
            const dx = particle.x - particles[i].x;
            const dy = particle.y - particles[i].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < connectionDistance) {
              // Calculate opacity based on distance
              const opacity = 1 - (distance / connectionDistance);
              
              // Draw line
              ctx.beginPath();
              ctx.strokeStyle = color;
              ctx.globalAlpha = opacity * 0.2;
              ctx.lineWidth = 0.5;
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(particles[i].x, particles[i].y);
              ctx.stroke();
              
              connectionsDrawn++;
            }
          }
        }
      });
      
      requestRef.current = requestAnimationFrame(animate);
    };

    // Initialize
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
    requestRef.current = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(requestRef.current);
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
      if (window.scrollTimeout) {
        clearTimeout(window.scrollTimeout);
      }
    };
  }, [handleResize, handleScroll, initParticles, color]);

  return (
    <canvas 
      ref={canvasRef} 
      className="particles-container"
      style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        zIndex: 0,
        pointerEvents: 'none', // Ensure the canvas doesn't interfere with scrolling
        willChange: 'transform' // Optimize for animations
      }}
    />
  );
};

// Add prop validation
Particles.propTypes = {
  density: PropTypes.number,
  speed: PropTypes.number,
  color: PropTypes.string,
  opacity: PropTypes.number
};

export default Particles; 