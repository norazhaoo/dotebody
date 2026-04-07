/**
 * dote. body — Coming Soon Page
 */

document.addEventListener('DOMContentLoaded', () => {

  // ===== Scroll Reveal =====
  const revealElements = document.querySelectorAll('.reveal');
  // Trigger immediately since it's a single-screen page
  setTimeout(() => {
    revealElements.forEach((el, i) => {
      setTimeout(() => el.classList.add('visible'), i * 120);
    });
  }, 200);

  // ===== Floating Particles =====
  const particlesContainer = document.getElementById('particles');

  function createParticle() {
    const particle = document.createElement('div');
    particle.classList.add('particle');

    const size = Math.random() * 6 + 2;
    const x = Math.random() * 100;
    const duration = Math.random() * 12 + 10;
    const delay = Math.random() * 8;
    const hue = 200 + Math.random() * 20; // blue range matching brand
    const lightness = 70 + Math.random() * 20;

    particle.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${x}%;
      bottom: -10px;
      background: hsl(${hue}, 50%, ${lightness}%);
      animation-duration: ${duration}s;
      animation-delay: ${delay}s;
    `;

    particlesContainer.appendChild(particle);
  }

  // Create particles
  for (let i = 0; i < 25; i++) {
    createParticle();
  }

  // ===== Email Signup =====
  const form = document.getElementById('signup-form');
  const successMsg = document.getElementById('signup-success');
  const emailInput = document.getElementById('email-input');
  const submitBtn = document.getElementById('signup-btn');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const email = emailInput.value.trim();
      if (!email) return;

      const btnText = submitBtn.querySelector('.btn-text');
      const btnIcon = submitBtn.querySelector('.btn-icon');

      // Show loading state
      btnText.textContent = 'Sending...';
      btnIcon.textContent = '⏳';
      submitBtn.disabled = true;

      // Send via formsubmit.co
      fetch('https://formsubmit.co/ajax/norazhao039@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          _subject: 'New dote. body subscriber! 🎉',
          message: email + ' wants to be notified when dote. body launches.'
        })
      })
      .then(response => response.json())
      .then(data => {
        // Show success
        form.style.display = 'none';
        document.querySelector('.signup-note').style.display = 'none';
        successMsg.classList.add('show');
      })
      .catch(error => {
        // Fallback: open mailto
        window.location.href = 'mailto:norazhao039@gmail.com?subject=dote.%20body%20Subscription%20Request&body=Hi!%20' + encodeURIComponent(email) + '%20would%20like%20to%20be%20notified%20when%20dote.%20body%20launches.';

        // Still show success
        form.style.display = 'none';
        document.querySelector('.signup-note').style.display = 'none';
        successMsg.classList.add('show');
      })
      .finally(() => {
        emailInput.value = '';
        btnText.textContent = 'Notify Me';
        btnIcon.textContent = '→';
        submitBtn.disabled = false;
      });
    });
  }


});
