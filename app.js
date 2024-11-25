// Function to handle Device Orientation
function handleOrientation(event) {
    const alpha = event.alpha; // Get the heading in degrees
    const needle = document.querySelector('.needle');
    const headingDisplay = document.getElementById('heading');
    const directionDisplay = document.getElementById('direction');

    if (alpha !== null) {
        // Adjust heading for orientation (iOS fix)
        const adjustedHeading = alpha - (window.orientation || 0);

        // Update the needle rotation
        needle.style.transform = `translate(-50%, -50%) rotate(${adjustedHeading}deg)`;

        // Update heading display
        headingDisplay.textContent = `${Math.round(adjustedHeading)}°`;

        // Update compass direction
        const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW', 'N'];
        const index = Math.round(adjustedHeading / 45) % 8;
        directionDisplay.textContent = directions[index];
    } else {
        headingDisplay.textContent = 'Compass unavailable';
    }
}

// Check for permission and compatibility
function initializeCompass() {
    if (typeof DeviceOrientationEvent.requestPermission === 'function') {
        // For iOS devices
        const button = document.getElementById('grant-permission');
        button.style.display = 'block';

        button.addEventListener('click', () => {
            DeviceOrientationEvent.requestPermission()
                .then((response) => {
                    if (response === 'granted') {
                        window.addEventListener('deviceorientation', handleOrientation);
                        button.style.display = 'none';
                    } else {
                        alert('Permission denied.');
                    }
                })
                .catch(console.error);
        });
    } else if ('DeviceOrientationEvent' in window) {
        // For non-iOS devices
        window.addEventListener('deviceorientation', handleOrientation);
    } else {
        alert('Your device does not support compass functionality.');
    }
}

// Initialize the application
initializeCompass();
