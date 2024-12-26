document.addEventListener("DOMContentLoaded", function () {
  // Navbar and header elements
  let menubar = document.getElementById("menubar");
  let navbar = document.querySelector(".navbar");
  let header = document.querySelector(".header");
  let gamesLink = document.getElementById("games-btn");
  let gamesSection = document.getElementById("games-section");

  // Login form elements
  let loginBtn = document.getElementById("login-btn");
  let loginFormContainer = document.getElementById("login-form-container");
  let closeLoginBtn = document.getElementById("close-login-btn");
  let loginForm = document.getElementById("login-form");
  let emailInput = document.getElementById("email");
  let passwordInput = document.getElementById("password");

  // Subscribe form elements
  let subscribeBtn = document.getElementById("subscribe-btn");
  let subscribeFormContainer = document.getElementById(
    "subscribe-form-container"
  );
  let closeSubscribeBtn = document.getElementById("close-subscribe-btn");
  let subscribeNowBtn = document.getElementById("subscribe-now-btn");

  // Parallax elements
  let homeParallaxElements = document.querySelectorAll(".home-parallax");

  // Toggle menubar and navbar
  menubar.onclick = () => {
    menubar.classList.toggle("fa-xmark");
    navbar.classList.toggle("active");
  };

  // Change header style on scroll
  window.onscroll = () => {
    if (window.scrollY > 0) {
      header.classList.add("active");
    } else {
      header.classList.remove("active");
      menubar.classList.remove("fa-xmark");
      navbar.classList.remove("active");
    }
  };

  // Open/close login form
  loginBtn.onclick = () => {
    loginFormContainer.classList.toggle("active");
  };
  closeLoginBtn.onclick = () => {
    loginFormContainer.classList.remove("active");
  };

  // Open/close subscribe form
  subscribeBtn.onclick = () => {
    subscribeFormContainer.classList.toggle("active");
  };
  closeSubscribeBtn.onclick = () => {
    subscribeFormContainer.classList.remove("active");
  };

  // Login Now button click handler
  // Login Now button click handler
  // Login Now button click handler
  let loginNowBtn = document.getElementById("login-now-btn");
  loginNowBtn.addEventListener("click", (e) => {
    loginForm.submit();
    e.preventDefault(); // Prevent default button click behavior

    const email = emailInput.value; // Get email from input field
    const password = passwordInput.value; // Get password from input field

    // Validate inputs
    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }

    // Prepare JSON data to send
    const loginData = {
      email, // Use the captured email
      password, // Use the captured password
    };

    // Send login data to the server
    fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData), // Use loginData here
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "User    data stored successfully!") {
          alert("Login successful!");
          window.location.href = "index.html"; // Redirect to dashboard
        } else {
          alert("Error: " + data.message);
        }
      })
      .catch((error) => console.error("Error:", error));
  });
  // Subscribe now button logic
  subscribeNowBtn.onclick = () => {
    const emailInput = document.querySelector(
      '#subscribe-form-container input[type="email"]'
    );
    const selectInput = document.querySelector(
      "#subscribe-form-container select"
    );
    const email = emailInput.value;
    const selectedOption = selectInput.value;

  
  };

  // Toggle games section visibility
  gamesLink.onclick = () => {
    gamesSection.classList.toggle("hidden");
  };

  // Handle parallax movement
  document.onmousemove = (e) => {
    homeParallaxElements.forEach((element) => {
      let speed = element.getAttribute("data-speed");
      let x = (window.innerHeight - e.pageX * speed) / 90;
      let y = (window.innerHeight - e.pageY * speed) / 90;

      element.style.transform = `translateX(${y}px) translateY(${x}px)`;
    });
  };

  // Reset parallax on mouse leave
  document.onmouseleave = () => {
    homeParallaxElements.forEach((element) => {
      element.style.transform = `translateX(0px) translateY(0px)`;
    });
  };
});
