// Check if DeviceOrientationEvent is supported
if (window.DeviceOrientationEvent) {
  window.addEventListener('deviceorientation', (event) => {
      const heading = event.alpha; // Use alpha for compass direction
      const needle = document.querySelector('.needle');
      const headingDisplay = document.getElementById('heading');
      const directionDisplay = document.getElementById('direction');

      if (heading !== null) {
          // Rotate the needle
          needle.style.transform = `translate(-50%, -50%) rotate(${heading}deg)`;

          // Update heading display
          headingDisplay.textContent = `${Math.round(heading)}°`;

          // Convert heading to compass direction
          const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW', 'N'];
          const index = Math.round(heading / 45) % 8;
          directionDisplay.textContent = directions[index];
      }
  });
} else {
  alert('Your device does not support compass functionality.');
}
