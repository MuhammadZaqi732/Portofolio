// ============================================
// SCRIPT.JS - Muhammad Zaqi Portfolio (Updated Typing Effect)
// ============================================

// ============================================
// Typing Effect Multi-Roles (Bergantian)
// ============================================
// Array roles yang bergantian
const roles = ["Manual QA Tester", "Automation QA Engineer"];
let i = 0; // Index role saat ini
let j = 0; // Index karakter dalam role
let currentRole = "";
let isDeleting = false;
const typingSpeed = 150; // Kecepatan mengetik (ms)
const erasingSpeed = 50; // Kecepatan menghapus (ms)
const delayBetweenRoles = 1500; // Delay setelah selesai mengetik sebelum hapus (ms)

const typingElem = document.getElementById("typing");

function typeWriter() {
  // Tentukan kecepatan berdasarkan mode (mengetik atau hapus)
  const speed = isDeleting ? erasingSpeed : typingSpeed;

  // Jika sedang mengetik
  if (!isDeleting && j <= currentRole.length) {
    typingElem.textContent = currentRole.substring(0, j);
    j++;
    setTimeout(typeWriter, speed);
  }
  // Jika selesai mengetik, tunggu delay lalu mulai hapus
  else if (!isDeleting && j > currentRole.length) {
    setTimeout(() => {
      isDeleting = true;
      typeWriter();
    }, delayBetweenRoles);
  }
  // Jika sedang menghapus
  else if (isDeleting && j >= 0) {
    typingElem.textContent = currentRole.substring(0, j);
    j--;
    setTimeout(typeWriter, speed);
  }
  // Jika selesai menghapus, ganti ke role berikutnya
  else if (isDeleting && j < 0) {
    isDeleting = false;
    i = (i + 1) % roles.length; // Loop ke role berikutnya
    currentRole = roles[i];
    setTimeout(typeWriter, 500); // Delay kecil sebelum mulai mengetik role baru
  }
}

// Mulai typing effect saat halaman load (mulai dengan role pertama)
document.addEventListener("DOMContentLoaded", () => {
  currentRole = roles[i]; // Set role awal
  typeWriter();
});

// ============================================
// Fungsi Tabs untuk Skills (Slide 2)
// ============================================
function openTab(evt, tabName) {
  // Hide all tab contents
  const tabContents = document.querySelectorAll("#slide2 .tab-content");
  tabContents.forEach((content) => content.classList.remove("active"));

  // Remove active class from all tab buttons in skills
  const tabBtns = document.querySelectorAll("#slide2 .tab-btn");
  tabBtns.forEach((btn) => btn.classList.remove("active"));

  // Show selected tab content
  document.getElementById(tabName).classList.add("active");

  // Add active class to clicked button
  evt.currentTarget.classList.add("active");
}

// ============================================
// Fungsi Tabs untuk Projects (Slide 3)
// ============================================
function openProjectTab(evt, tabName) {
  // Hide all project tab contents
  const projectContents = document.querySelectorAll("#slide3 .tab-content");
  projectContents.forEach((content) => content.classList.remove("active"));

  // Remove active class from all project tab buttons
  const projectBtns = document.querySelectorAll("#slide3 .tab-btn");
  projectBtns.forEach((btn) => btn.classList.remove("active"));

  // Show selected project tab content
  document.getElementById(tabName).classList.add("active");

  // Add active class to clicked button
  evt.currentTarget.classList.add("active");
}

// ============================================
// Smooth Scroll ke Slide Tertentu
// ============================================
function scrollToSlide(slideId) {
  const element = document.getElementById(slideId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
}

// ============================================
// Download CV (Ganti 'cv.pdf' dengan file CV Anda)
// ============================================
function downloadCV() {
  const cvLink = "cv.pdf"; // Ganti dengan path file CV Anda (misal 'assets/cv.pdf')
  const link = document.createElement("a");
  link.href = cvLink;
  link.download = "Muhammad_Zaqi_CV.pdf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // Jika file tidak ada, fallback ke alert (ganti dengan link eksternal jika perlu)
  // Contoh: window.open('https://drive.google.com/your-cv-link', '_blank');
}

// ==== GALAXY BACKGROUND ANIMATION ====
window.onload = function () {
  const canvas = document.getElementById("bgCanvas");
  const ctx = canvas.getContext("2d");

  // resize otomatis
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  // daftar bintang & shooting star
  const stars = [];
  const shootingStars = [];

  // buat bintang
  for (let i = 0; i < 250; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.3 + 0.2,
      speed: Math.random() * 0.2 + 0.05,
      alpha: Math.random() * 0.8 + 0.2,
    });
  }

  function createShootingStar() {
    shootingStars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height * 0.4,
      length: Math.random() * 120 + 80,
      speed: Math.random() * 12 + 6,
      opacity: 1,
      angle: Math.PI / 4,
    });
  }

  function draw() {
    // latar belakang
    const gradient = ctx.createRadialGradient(
      canvas.width / 2,
      canvas.height,
      0,
      canvas.width / 2,
      canvas.height,
      canvas.height
    );
    gradient.addColorStop(0, "rgba(10,15,44,0.85)");
    gradient.addColorStop(1, "black");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // bintang berkedip
    stars.forEach((s) => {
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 229, 255, ${s.alpha})`;
      ctx.fill();

      s.y += s.speed;
      if (s.y > canvas.height) {
        s.y = 0;
        s.x = Math.random() * canvas.width;
      }

      // efek twinkle lembut
      s.alpha += (Math.random() - 0.5) * 0.05;
      if (s.alpha < 0.2) s.alpha = 0.2;
      if (s.alpha > 1) s.alpha = 1;
    });

    // shooting star biru tipis
    for (let i = 0; i < shootingStars.length; i++) {
      const s = shootingStars[i];
      const tailX = s.x - Math.cos(s.angle) * s.length;
      const tailY = s.y - Math.sin(s.angle) * s.length;

      const gradientStar = ctx.createLinearGradient(s.x, s.y, tailX, tailY);
      gradientStar.addColorStop(0, `rgba(0,255,255,${s.opacity})`);
      gradientStar.addColorStop(1, "rgba(0,255,255,0)");

      ctx.strokeStyle = gradientStar;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(s.x, s.y);
      ctx.lineTo(tailX, tailY);
      ctx.stroke();

      s.x += Math.cos(s.angle) * s.speed;
      s.y += Math.sin(s.angle) * s.speed;
      s.opacity -= 0.02;

      if (s.opacity <= 0) {
        shootingStars.splice(i, 1);
        i--;
      }
    }

    // muncul shooting star acak (jarang)
    if (Math.random() < 0.008) createShootingStar();

    requestAnimationFrame(draw);
  }

  draw();
};

// ============================================
// Fade-in Animation untuk Slides (saat scroll)
// ============================================
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

// Observe semua slides
document.querySelectorAll(".slide").forEach((slide) => {
  observer.observe(slide);
});

// ============================================
// Event Listeners Tambahan (Opsional)
// ============================================
// Preload typing effect setelah load
window.addEventListener("load", () => {
  // Tambah class untuk smooth load
  document.body.classList.add("loaded");
});

// Skills tab interaktif
function openSkillTab(evt, tabName) {
  const contents = document.querySelectorAll(".skill-content");
  const tabs = document.querySelectorAll(".skill-tab");

  contents.forEach((content) => content.classList.remove("active"));
  tabs.forEach((tab) => tab.classList.remove("active"));

  document.getElementById(tabName).classList.add("active");
  evt.currentTarget.classList.add("active");
}

// 🔹 Animasi fade-in per section
const fadeSections = document.querySelectorAll('.fade-section');

const appearOptions = {
  threshold: 0.15, // muncul saat 15% bagian terlihat
};

const appearOnScroll = new IntersectionObserver(function (entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('show');
    observer.unobserve(entry.target); // biar cuma sekali animasi
  });
}, appearOptions);

fadeSections.forEach(section => {
  appearOnScroll.observe(section);
});

// 🌠 Parallax scroll effect
window.addEventListener("scroll", function () {
  const scrollTop = window.pageYOffset;
  const parallaxElements = document.querySelectorAll(".parallax");

  parallaxElements.forEach(el => {
    const speed = el.getAttribute("data-speed") || 0.3;
    el.style.transform = `translateY(${scrollTop * speed}px)`;
  });
});

// 🍔 Burger menu toggle
const burger = document.getElementById('burger');
const navList = document.querySelector('nav ul');

burger.addEventListener('click', () => {
  navList.classList.toggle('show');
});