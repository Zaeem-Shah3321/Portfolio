'use strict';

/**
 * element toggle function
 */

const elemToggleFunc = function (elem) { elem.classList.toggle("active"); }

/**
 * header sticky & go to top
 */

const header = document.querySelector("[data-header]");
const goTopBtn = document.querySelector("[data-go-top]");

window.addEventListener("scroll", function () {
  if (window.scrollY >= 10) {
    header.classList.add("active");
    goTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    goTopBtn.classList.remove("active");
  }
});

/**
 * navbar toggle
 */

const navToggleBtn = document.querySelector("[data-nav-toggle-btn]");
const navbar = document.querySelector("[data-navbar]");

navToggleBtn.addEventListener("click", function () {
  elemToggleFunc(navToggleBtn);
  elemToggleFunc(navbar);
  elemToggleFunc(document.body);
});

/**
 * Close mobile menu on link click
 */
document.querySelectorAll('.navbar-link').forEach(link => {
  link.addEventListener('click', function () {
    navbar.classList.remove('active');
    navToggleBtn.classList.remove('active');
    document.body.classList.remove('active');
  });
});

/**
 * skills toggle
 */

const toggleBtnBox = document.querySelector("[data-toggle-box]");
const toggleBtns = document.querySelectorAll("[data-toggle-btn]");
const skillsBox = document.querySelector("[data-skills-box]");

for (let i = 0; i < toggleBtns.length; i++) {
  toggleBtns[i].addEventListener("click", function () {
    elemToggleFunc(toggleBtnBox);
    for (let i = 0; i < toggleBtns.length; i++) { elemToggleFunc(toggleBtns[i]); }
    elemToggleFunc(skillsBox);
  });
}

/**
 * dark & light theme toggle
 */

const themeToggleBtn = document.querySelector("[data-theme-btn]");

themeToggleBtn.addEventListener("click", function () {
  elemToggleFunc(themeToggleBtn);

  if (themeToggleBtn.classList.contains("active")) {
    document.body.classList.remove("dark_theme");
    document.body.classList.add("light_theme");

    localStorage.setItem("theme", "light_theme");
  } else {
    document.body.classList.add("dark_theme");
    document.body.classList.remove("light_theme");

    localStorage.setItem("theme", "dark_theme");
  }
});

/**
 * check & apply last time selected theme from localStorage
 */

if (localStorage.getItem("theme") === "light_theme") {
  themeToggleBtn.classList.add("active");
  document.body.classList.remove("dark_theme");
  document.body.classList.add("light_theme");
} else {
  themeToggleBtn.classList.remove("active");
  document.body.classList.remove("light_theme");
  document.body.classList.add("dark_theme");
}

// typing text animation script
var typed = new Typed(".typing", {
  strings: [ "Graphics Designer", "Wordpress Web Developer", "UI/UX Designer"],
  typeSpeed: 100,
  backSpeed: 60,
  loop: true
});

$(document).ready(function(){
  $(window).scroll(function(){ 
    // sticky navbar on scroll script
    if(this.scrollY > 20){
      $('.navbar').addClass("sticky");
    } else {
      $('.navbar').removeClass("sticky");
    }
    
    // scroll-up button show/hide script
    if(this.scrollY > 500){
      $('.scroll-up-btn').addClass("show");
    } else {
      $('.scroll-up-btn').removeClass("show");
    }
  });

  // slide-up script
  $('.scroll-up-btn').click(function(){
    $('html').animate({scrollTop: 0});
    // removing smooth scroll on slide-up button click
    $('html').css("scrollBehavior", "auto");
  });

  $('.navbar .menu li a').click(function(){
    // applying again smooth scroll on menu items click
    $('html').css("scrollBehavior", "smooth");
  });

  // toggle menu/navbar script
  $('.menu-btn').click(function(){
    $('.navbar .menu').toggleClass("active");
    $('.menu-btn i').toggleClass("active");
  });

  // owl carousel script
  $('.carousel').owlCarousel({
    margin: 20,
    loop: true,
    autoplay: true,
    autoplayTimeOut: 2000,
    autoplayHoverPause: true,
    responsive: {
      0:{
        items: 1,
        nav: false
      },
      600:{
        items: 2,
        nav: false
      },
      1000:{
        items: 3,
        nav: false
      }
    }
  });
});

// Intersection Observer for scrolling animations
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target); // Stop observing once the animation is triggered
      // Start counting animation for stats section
      if (entry.target.classList.contains('down-animation')) {
        const counters = entry.target.querySelectorAll('.count');
        counters.forEach(counter => {
          const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const increment = target / 200; // Adjust the speed of counting

            if (count < target) {
              counter.innerText = Math.ceil(count + increment);
              setTimeout(updateCount, 10);
            } else {
              counter.innerText = target;
            }
          };
          updateCount();
        });
      }
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.left-animation, .right-animation, .down-animation').forEach(section => {
  observer.observe(section);
});

function downloadCV() {
  fetch('cv.txt')
    .then(response => response.text())
    .then(base64CV => {
      const byteString = atob(base64CV);
      const mimeString = "application/pdf"; // Adjust MIME type as needed
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([ab], { type: mimeString });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Syed M. Zaeem CV.pdf';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    })
    .catch(error => console.error('Error loading CV text:', error));
}
const projects = [
  {
    title: "Custom Cardboard Boxes <br> (Wordpress)",
    image: "assets/images/CCB.png",
    link: "https://customcardboardboxes.co/"
  },
  {
    title: "Junk Cars For <br> Cash  <br> (Wordpress)",
    image: "assets/images/JCC.png",
    link: "https://junkcarsforcash.co/"
  },
  {
    title: "Streamline Medical <br> Billing <br> (Wordpress)",
    image: "assets/images/MDB1.png",
    link: "https://medicalbillingcompany.co/"
  },
  

  {
    title: "Drizzle Soft Ice Cream <br> Shop Designs <br> (Graphic Desing)",
    image: "assets/images/drz.jpg",
    link: "drizzle.html"
  },
  {
    title: "Different <br> Logos <br> (Graphic Desing)",
    image: "assets/images/ai.png",
    link: "logos.html"
  },
  {
    title: "Additional <br> Designs <br> (Graphic Desing)",
    image: "assets/images/Websites.png", 
    link: "additional.html"
  },
  {
    title: "Insider Threat Detection <br> System <br> (HTML, CSS, JS)",
    image: "assets/images/is.jpg",
    link: "https://insiderthreatfrontend.vercel.app/index.html"
  },
  {
    title: "Heart Disease Prediction <br> System <br> (Python, Flask, ML)",
    image: "assets/images/images.jpg",
    link: "https://github.com/Zaeem-Shah3321/Projects/tree/master/Semester%204/Heart%20Disease%20Prediction"
  },
  {
    title: "Library Management <br> System <br> (C#, Win Form)",
    image: "./assets/images/LMS.png",
    link: "https://github.com/Zaeem-Shah3321/Projects/tree/master/Semester%202/OOP%20Business%20App"
  },
  {
    title: "Attack On Titan <br> Game <br> (C#, Win Form)",
    image: "assets/images/aot.jpg",
    link: "https://github.com/Zaeem-Shah3321/Projects/tree/master/Semester%202/OOP%20Game"
  },

  {
    title: "Big Bazaar E-Com <br> Store <br> (HTML, CSS)",
    image: "assets/images/bb.png",
    link: "https://github.com/Zaeem-Shah3321/Projects/tree/master/Semester%201/AICT%20Final%20Project"
  }
];

function generateProjectsHTML() {
  return projects.map((project, index) => `
    <!-- Project ${index + 1} -->
    <a class="MyProjects" target="_blank" href="${project.link}">
      <div class="card">
        <div class="box">
          <img src="${project.image}" alt="${project.title}" />
          <div class="text">${project.title}</div>
        </div>
      </div>
    </a>
  `).join('');
}

// Add this to your existing DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', function() {
  const carouselContainer = document.querySelector('.carousel');
  if (carouselContainer) {
    carouselContainer.innerHTML = generateProjectsHTML();
    // Reinitialize owl carousel
    $('.carousel').owlCarousel({
      margin: 20,
      loop: true,
      autoplay: true,
      autoplayTimeOut: 2000,
      autoplayHoverPause: true,
      responsive: {
        0:{
          items: 1,
          nav: false
        },
        600:{
          items: 2,
          nav: false
        },
        1000:{
          items: 3,
          nav: false
        }
      }
    });
  }
});
document.addEventListener("DOMContentLoaded", function () {
  // Hide loader when everything is loaded
  window.addEventListener('load', function() {
    const loaderContainer = document.querySelector(".loader-container");
    if (loaderContainer) {
      loaderContainer.style.display = "none";
    }
  });
  
  // Optional: Add timeout as fallback
  setTimeout(function() {
    const loaderContainer = document.querySelector(".loader-container");
    if (loaderContainer) {
      loaderContainer.style.display = "none";
    }
  }, 3000);
});

		/*PRELOADER JS*/ 
    $('.spinner').fadeOut();
    $('.preloader').delay(350).fadeOut('slow'); 
  /*END PRELOADER JS*/
