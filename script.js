let isModalOpen = false;
let contrastToggle = false;

function toggleContrast() {
  contrastToggle = !contrastToggle;
  if (contrastToggle) {
    document.body.classList.add("dark-theme");
  } else {
    document.body.classList.remove("dark-theme");
  }
}

function toggleModal() {
  isModalOpen = true;
  document.body.classList.toggle("modal--open");
  if (!isModalOpen) {
    document.body.classList.remove("modal--open");
  } else {
    document.body.style.overflow = "visible";
  }
}

function contact(event) {
  event.preventDefault();

  const loading = document.querySelector(".modal__overlay--loading");
  const success = document.querySelector(".modal__overlay--success");
  const form = event.target;

  // Show loading animation
  loading.classList.add("modal__overlay--visible");

  // Initialize loading animation
  const animation = lottie.loadAnimation({
    container: document.querySelector(".modal__loading"),
    renderer: "svg",
    loop: true,
    autoplay: true,
    path: "./assets/loading.json",
  });

  // Send email
  emailjs
    .sendForm(
      "service_outLook",
      "template_portContact",
      form,
      "YyOZKzWkJL-8ieFYD"
    )
    .then(() => {
      // Keep loading visible for 3.5 seconds
      setTimeout(() => {
        loading.classList.remove("modal__overlay--visible");
        success.classList.add("modal__overlay--visible");

        // Reset form
        form.reset();
      }, 3500);
    })
    .catch((error) => {
      setTimeout(() => {
        loading.classList.remove("modal__overlay--visible");

        // Cleanup animation
        animation.destroy();

        // Alert user of error
        alert(
          "The email service is temporarily unavailable. Please contact me at: schneidercadet@live.fr."
        );
        console.error("Server Error:", error);
      });
    });
}

// Mouse movement animation
document.addEventListener('DOMContentLoaded', () => {
    const shapes = document.querySelectorAll('.bg-shape1, .bg-shape2');
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        // Calculate distance from center
        const distX = mouseX - centerX;
        const distY = mouseY - centerY;

        shapes.forEach((shape) => {
            const speed = parseFloat(shape.getAttribute('data-speed')) || 0.1;
            
            // Calculate movement based on mouse position
            const moveX = distX * speed;
            const moveY = distY * speed;

            shape.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    });

    // Reset position 
    document.addEventListener('mouseleave', () => {
        shapes.forEach((shape) => {
            shape.style.transform = 'translate(0, 0)';
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const text = "Hey,\nI'm Schneider.";
    const typingElement = document.querySelector('.typing');
    typingElement.innerHTML = `<span></span><span class="cursor">|</span>`;
    const textElement = typingElement.querySelector('span');
    let index = 0;

    function type() {
        if (index < text.length) {
            if (text.charAt(index) === '\n') {
                textElement.innerHTML += '<br>';
            } else {
                textElement.innerHTML += text.charAt(index);
            }
            index++;
            setTimeout(type, 100); // Adjust typing speed here
        }
    }

    // Start typing
    setTimeout(type, 1000); // Delay before starting
});

