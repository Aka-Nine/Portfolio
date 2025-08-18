// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Real-time clock functionality in the header
  function updateHeaderTime() {
    const timeDisplay = document.getElementById("time-display");
    if (timeDisplay) {
      const now = new Date();
      const options = {
        timeZone: "Asia/Kolkata",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      };
      const timeString = new Intl.DateTimeFormat("en-US", options).format(now);
      timeDisplay.textContent = `🕒 ${timeString} IST`;
    }
  }

  // Date functionality in the footer
  function updateFooterDate() {
    const dateDisplay = document.getElementById("footer-date");
    if (dateDisplay) {
      const now = new Date();
      const options = {
        weekday: "long",
        year: "numeric",
        month: "numeric",
        day: "numeric",
      };
      const dateString = new Intl.DateTimeFormat("en-US", options).format(now);
      dateDisplay.textContent = dateString;
    }
  }

  // Update time/date immediately and then set intervals
  updateHeaderTime();
  updateFooterDate();
  const timeInterval = setInterval(updateHeaderTime, 60000); // Update every minute

  // Hamburger Menu Toggle
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");
  const body = document.body;

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", function (e) {
      e.stopPropagation();
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
      body.classList.toggle("nav-open");
    });

    // Close menu when clicking on a link
    navMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", function () {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
        body.classList.remove("nav-open");
      });
    });

    // Close menu when clicking outside
    document.addEventListener("click", function (e) {
      if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
        body.classList.remove("nav-open");
      }
    });

    // Close menu on escape key
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
        body.classList.remove("nav-open");
      }
    });
  }

  /// Resume Download Functionality - Updated for Google Drive
  const resumeBtn = document.getElementById("resume-btn");
  if (resumeBtn) {
    resumeBtn.addEventListener("click", function (e) {
      e.preventDefault();

      // Replace this URL with your actual Google Drive direct download link
      // To get the direct download link:
      // 1. Upload your resume to Google Drive
      // 2. Right-click the file and select "Get link"
      // 3. Change sharing to "Anyone with the link can view"
      // 4. Copy the file ID from the shareable link
      // 5. Replace FILE_ID below with your actual file ID

      const fileId = "1nsCnZFY_etjihTNdH2xnRi8s4mkoSmDF"; // Replace with your file ID
      const driveDownloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;

      // Alternative: If you prefer to open in a new tab instead of direct download
      // const driveViewUrl = `https://drive.google.com/file/d/${fileId}/view`;

      try {
        // Create a temporary link element for download
        const link = document.createElement("a");
        link.href = driveDownloadUrl;
        link.download = "Harsh_Yadav_Resume.pdf"; // This will be the suggested filename
        link.target = "_blank"; // Open in new tab as fallback

        // Add the link to DOM, click it, then remove it
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Optional: Show success message
        showNotification("Resume download started!", "success");
      } catch (error) {
        console.error("Download error:", error);
        // Fallback: Open Google Drive link in new tab
        window.open(`https://drive.google.com/file/d/${fileId}/view`, "_blank");
        showNotification("Opening resume in new tab...", "info");
      }
    });
  }

  // Optional: Notification system for better user feedback
  function showNotification(message, type = "info") {
    // Remove any existing notifications
    const existingNotification = document.querySelector(
      ".download-notification"
    );
    if (existingNotification) {
      existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement("div");
    notification.className = `download-notification ${type}`;
    notification.textContent = message;

    // Add styles
    Object.assign(notification.style, {
      position: "fixed",
      top: "20px",
      right: "20px",
      backgroundColor:
        type === "success"
          ? "#4CAF50"
          : type === "error"
          ? "#f44336"
          : "#2196F3",
      color: "white",
      padding: "12px 20px",
      borderRadius: "5px",
      boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
      zIndex: "10000",
      fontSize: "14px",
      fontWeight: "500",
      opacity: "0",
      transform: "translateY(-20px)",
      transition: "all 0.3s ease",
    });

    // Add to DOM
    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
      notification.style.opacity = "1";
      notification.style.transform = "translateY(0)";
    }, 100);

    // Remove after 3 seconds
    setTimeout(() => {
      notification.style.opacity = "0";
      notification.style.transform = "translateY(-20px)";
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }, 3000);
  }

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        const headerHeight = document.querySelector(".navbar").offsetHeight;
        const targetPosition = target.offsetTop - headerHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // Add scroll-based animations with better mobile performance
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -30px 0px",
  };

  const observer = new IntersectionObserver(function (entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        entry.target.classList.add("animate-in");
        observer.unobserve(entry.target); // Stop observing once animated
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animateElements = document.querySelectorAll(
    ".project-card, .info-section, .footer"
  );
  animateElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
    observer.observe(el);
  });

  // Enhanced project card hover effects (only for non-touch devices)
  const projectCards = document.querySelectorAll(".project-card");
  const isTouchDevice =
    "ontouchstart" in window || navigator.maxTouchPoints > 0;

  if (!isTouchDevice) {
    projectCards.forEach((card) => {
      card.addEventListener("mouseenter", function () {
        this.style.transform = "translateY(-8px)";
        this.style.boxShadow = "0 15px 35px rgba(0,0,0,0.1)";
      });

      card.addEventListener("mouseleave", function () {
        this.style.transform = "translateY(0)";
        this.style.boxShadow = "0 5px 15px rgba(0,0,0,0.05)";
      });
    });
  }

  // Enhanced navbar scroll effect
  const navbar = document.querySelector(".navbar");
  let lastScrollTop = 0;

  window.addEventListener("scroll", function () {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Navbar background on scroll
    if (scrollTop > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    // Hide/show navbar on scroll (mobile)
    if (window.innerWidth <= 768) {
      if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Scrolling down
        navbar.style.transform = "translateY(-100%)";
      } else {
        // Scrolling up
        navbar.style.transform = "translateY(0)";
      }
    } else {
      navbar.style.transform = "translateY(0)";
    }

    lastScrollTop = scrollTop;
  });

  // Add loading animation with better performance
  window.addEventListener("load", function () {
    document.body.classList.add("loaded");

    // Trigger initial animations
    setTimeout(() => {
      const heroElements = document.querySelectorAll(
        ".hero-title, .hero-right p"
      );
      heroElements.forEach((el, index) => {
        setTimeout(() => {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
        }, index * 200);
      });
    }, 300);
  });

  // Enhanced keyboard navigation
  document.addEventListener("keydown", function (e) {
    // Don't trigger if user is typing in an input
    if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;

    switch (e.key.toLowerCase()) {
      case "h":
        window.scrollTo({ top: 0, behavior: "smooth" });
        break;
      case "1":
        const projectsSection = document.getElementById("projects");
        if (projectsSection)
          projectsSection.scrollIntoView({ behavior: "smooth" });
        break;
      case "2":
        const aboutSection = document.getElementById("about");
        if (aboutSection) aboutSection.scrollIntoView({ behavior: "smooth" });
        break;
      case "3":
        const servicesSection = document.getElementById("services");
        if (servicesSection)
          servicesSection.scrollIntoView({ behavior: "smooth" });
        break;
      case "4":
        const recognitionSection = document.getElementById("recognition");
        if (recognitionSection)
          recognitionSection.scrollIntoView({ behavior: "smooth" });
        break;
    }
  });

  // Mobile touch interactions for better UX
  if (isTouchDevice) {
    // Add touch feedback to interactive elements
    const interactiveElements = document.querySelectorAll(
      ".btn, .project-card, .award-item"
    );

    interactiveElements.forEach((element) => {
      element.addEventListener("touchstart", function () {
        this.style.transform = "scale(0.98)";
      });

      element.addEventListener("touchend", function () {
        setTimeout(() => {
          this.style.transform = "";
        }, 150);
      });
    });
  }

  // Handle window resize for responsive adjustments
  let resizeTimeout;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function () {
      // Close mobile menu on resize to desktop
      if (window.innerWidth > 768) {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
        body.classList.remove("nav-open");
      }

      // Reset navbar transform on resize
      navbar.style.transform = "translateY(0)";
    }, 250);
  });

  // Add scroll progress indicator
  const progressBar = document.createElement("div");
  progressBar.className = "scroll-progress";
  progressBar.innerHTML = '<div class="scroll-progress-bar"></div>';
  document.body.appendChild(progressBar);

  window.addEventListener("scroll", function () {
    const scrollTop = window.pageYOffset;
    const documentHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / documentHeight) * 100;

    document.querySelector(".scroll-progress-bar").style.width =
      scrollPercent + "%";
  });

  // Add dynamic year update
  const currentYear = new Date().getFullYear();
  const copyrightElements = document.querySelectorAll(".copyright");
  copyrightElements.forEach((el) => {
    el.textContent = `© ${currentYear} Harsh Yadav`;
  });

  // Performance optimization: Debounce scroll events
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Apply debouncing to scroll events for better performance
  const debouncedScrollHandler = debounce(function () {
    // Any additional scroll-based animations can go here
  }, 16); // ~60fps

  window.addEventListener("scroll", debouncedScrollHandler);

  // Enhanced error handling for images
  const images = document.querySelectorAll("img");
  images.forEach((img) => {
    img.addEventListener("error", function () {
      // Add a placeholder or fallback styling
      this.style.backgroundColor = "#f0f0f0";
      this.style.display = "flex";
      this.style.alignItems = "center";
      this.style.justifyContent = "center";
      this.alt = "Image not available";
    });
  });

  // Cleanup function
  window.addEventListener("beforeunload", function () {
    if (timeInterval) {
      clearInterval(timeInterval);
    }
    // Clean up any other intervals or event listeners
  });

  // Add preloader functionality (optional)
  function hidePreloader() {
    const preloader = document.querySelector(".preloader");
    if (preloader) {
      preloader.style.opacity = "0";
      setTimeout(() => {
        preloader.style.display = "none";
      }, 300);
    }
  }

  // Hide preloader after everything loads
  window.addEventListener("load", hidePreloader);

  console.log("🚀 Harsh Yadav Portfolio - Loaded Successfully");
});
