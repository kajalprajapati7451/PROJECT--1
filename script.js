// Countdown Timer for Godrej Alira Launch
document.addEventListener('DOMContentLoaded', function() {
    // Set the launch date (YYYY-MM-DD format)
    const launchDate = new Date('2024-03-01T00:00:00').getTime();
    
    // Update countdown every second
    const countdownTimer = setInterval(function() {
        // Get current date and time
        const now = new Date().getTime();
        
        // Calculate time remaining
        const distance = launchDate - now;
        
        // If launch date has passed
        if (distance < 0) {
            clearInterval(countdownTimer);
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
            
            // Update the message
            const countdownContainer = document.querySelector('.countdown');
            countdownContainer.innerHTML = `
                <div class="launch-message" style="
                    background: rgba(0, 111, 60, 0.8);
                    padding: 1.5rem;
                    border-radius: 10px;
                    color: white;
                    font-size: 1.5rem;
                    font-weight: 600;
                ">
                    We're Live Now! Visit Our Website
                </div>
            `;
            return;
        }
        
        // Time calculations
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Display results with 2-digit format
        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
        
        // Add pulse animation when seconds change
        const secondsElement = document.getElementById('seconds');
        secondsElement.style.transform = 'scale(1.1)';
        setTimeout(() => {
            secondsElement.style.transform = 'scale(1)';
        }, 300);
        
    }, 1000);
    
    // Notification Form Submission
    const notificationForm = document.getElementById('notificationForm');
    if (notificationForm) {
        notificationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            // Simple validation
            if (!email || !email.includes('@')) {
                alert('Please enter a valid email address');
                return;
            }
            
            // Here you would typically send the data to your server
            console.log('Email submitted:', email);
            
            // Show success message
            alert('Thank you for your interest in Godrej Alira!\nWe will notify you when bookings open.');
            
            // Reset form
            this.reset();
            
            // Optional: Add to local storage
            try {
                let subscribers = JSON.parse(localStorage.getItem('godrejAliraSubscribers')) || [];
                if (!subscribers.includes(email)) {
                    subscribers.push(email);
                    localStorage.setItem('godrejAliraSubscribers', JSON.stringify(subscribers));
                }
            } catch (e) {
                console.log('Local storage not available');
            }
        });
    }
    
    // Social media links - track clicks
    document.querySelectorAll('.social-links a').forEach(link => {
        link.addEventListener('click', function(e) {
            const platform = this.getAttribute('aria-label').toLowerCase();
            console.log(`Social media click: ${platform}`);
            // You can add analytics tracking here
        });
    });
    
    // Add animation to countdown items on hover
    const countdownItems = document.querySelectorAll('.countdown-item');
    countdownItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.05)';
            this.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.2)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        });
    });
});