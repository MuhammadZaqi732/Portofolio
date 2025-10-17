// main JS for small interactions
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("modal");
  const openBtn = document.getElementById("openGallery");
  const closeBtn = document.getElementById("closeModal");
  const closeBtn2 = document.getElementById("closeModal2");

  if (openBtn) {
    openBtn.addEventListener("click", () => {
      modal.classList.remove("hidden");
    });
  }
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      modal.classList.add("hidden");
    });
  }
  if (closeBtn2) {
    closeBtn2.addEventListener("click", () => {
      modal.classList.add("hidden");
    });
  }

  // close when clicking outside content
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) modal.classList.add("hidden");
    });

    // Tab switching for Portfolio Showcase
    function openTab(evt, tabId) {
      // hide all tab-content
      document.querySelectorAll(".tab-content").forEach((el) => {
        el.classList.add("hidden");
      });
      // remove active from buttons
      document
        .querySelectorAll(".tab-btn")
        .forEach((b) => b.classList.remove("active"));
      // show current
      const el = document.getElementById(tabId);
      if (el) el.classList.remove("hidden");
      // set active class on clicked button
      evt.currentTarget.classList.add("active");
    }
    document.querySelectorAll('.project-card').forEach(card => {
  const demoBtn = card.querySelector('.demo-btn');
  if (demoBtn) {
    const href = demoBtn.getAttribute('href');
    if (!href || href.trim() === "" || href === "#") {
      demoBtn.classList.add("disabled-demo");
      demoBtn.removeAttribute("href");
      demoBtn.removeAttribute("target");
    }
  }
});

    // expose to global so onclick in HTML works (type="module" environment)
    window.openTab = openTab;
  }

  /* ===== Certificates & Tech toggle (show/hide) ===== */
  const btnShowCerts = document.getElementById("btnShowCerts");
  const btnShowTech = document.getElementById("btnShowTech");
  const certPanel = document.getElementById("certPanel");
  const techPanel = document.getElementById("techPanel");

  if (btnShowCerts)
    btnShowCerts.addEventListener("click", () => {
      certPanel.classList.remove("hidden");
      techPanel.classList.add("hidden");
    });
  if (btnShowTech)
    btnShowTech.addEventListener("click", () => {
      techPanel.classList.remove("hidden");
      certPanel.classList.add("hidden");
    });

  function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  /* ===== Comments (localStorage) with true pinned Admin comment ===== */
const commentFormLocal = document.getElementById('commentFormLocal');
const commentsScroll   = document.getElementById('commentsScroll');
const clearCommentsBtn = document.getElementById('clearCommentsBtn');

function loadCommentsLocal() {
  let arr = JSON.parse(localStorage.getItem('z73_comments') || '[]');

  // jika belum ada pinned admin, tambahkan dia di urutan pertama
  const hasAdmin = arr.some(c => c.name === "Zakyy.m");
  if (!hasAdmin) {
    arr.unshift({
      name: "Zakyy.m",
      body: "Thanks for visiting! Contact me if you need anything",
      emoji: "😎",
      ts: Date.now()
    });
    localStorage.setItem('z73_comments', JSON.stringify(arr));
  }

  commentsScroll.innerHTML = arr.map((c, i) => `
    <div class="p-3 bg-white/6 rounded ${c.name === 'Zakyy.m' ? 'border border-yellow-400' : ''}">
      <div class="flex items-center gap-3">
        <div class="text-2xl">${escapeHtml(c.emoji || '😊')}</div>
        <div>
          <strong>${escapeHtml(c.name)}</strong>
          <div class="text-sm text-slate-300">${new Date(c.ts).toLocaleString()}</div>
        </div>
      </div>
      <p class="mt-2">${escapeHtml(c.body)}</p>
      ${c.name === 'Zakyy.m' ? '<span class="text-xs text-yellow-400 font-semibold">📌 Pinned Comment</span>' : ''}
    </div>
  `).join('');
}

if (commentFormLocal) {
  commentFormLocal.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('commenterName').value.trim();
    const body = document.getElementById('commenterBody').value.trim();
    const emoji = document.getElementById('commenterEmoji').value || '😊';
    if (!name || !body) return alert('Isi nama dan komentar dulu.');

    let arr = JSON.parse(localStorage.getItem('z73_comments') || '[]');

    // pastikan admin comment selalu di posisi [0]
    const admin = arr.find(c => c.name === 'Zakyy.m');
    const others = arr.filter(c => c.name !== 'Zakyy.m');

    // tambahkan komentar baru di depan list "others"
    others.unshift({name, body, emoji, ts: Date.now()});

    // gabungkan kembali: admin di atas, baru yang lain
    arr = [admin, ...others];

    localStorage.setItem('z73_comments', JSON.stringify(arr));
    commentFormLocal.reset();
    loadCommentsLocal();
  });
}

if (clearCommentsBtn) {
  clearCommentsBtn.addEventListener('click', () => {
    localStorage.removeItem('z73_comments');
    loadCommentsLocal();
  });
}

// Load awal
if (commentsScroll) loadCommentsLocal();
function openSkillTab(evt, tabName) {
  const tabContents = document.querySelectorAll(".skill-content");
  const tabButtons = document.querySelectorAll(".skill-tab");

  tabContents.forEach((content) => content.classList.add("hidden"));
  tabButtons.forEach((btn) => btn.classList.remove("active"));

  document.getElementById(tabName).classList.remove("hidden");
  evt.currentTarget.classList.add("active");
}

// 🧠 tambahkan baris ini biar bisa diakses dari HTML
window.openSkillTab = openSkillTab;
});

window.openCertificate = function (src) {
  const modal = document.getElementById("certificateModal");
  const img = document.getElementById("certificateImage");
  img.src = src;
  modal.classList.remove("hidden");
  modal.classList.add("flex");
};

window.closeCertificate = function () {
  const modal = document.getElementById("certificateModal");
  modal.classList.add("hidden");
  modal.classList.remove("flex");
};

// =============================
// Tab Switcher (Projects / Certificates / Tech Stack)
// =============================
window.openTab = function(evt, tabName) {
  // Sembunyikan semua tab
  const tabContents = document.querySelectorAll(".tab-content");
  tabContents.forEach(tab => tab.classList.add("hidden"));

  // Hapus status aktif dari semua tombol
  const tabButtons = document.querySelectorAll(".tab-btn");
  tabButtons.forEach(btn => btn.classList.remove("active", "bg-blue-600", "text-white"));
  
  // Tampilkan tab yang dipilih
  const activeTab = document.getElementById(tabName);
  if (activeTab) activeTab.classList.remove("hidden");

  // Tambahkan style aktif ke tombol yang diklik
  evt.currentTarget.classList.add("active", "bg-blue-600", "text-white");
};

// ==========================
// Burger Menu Functionality
// ==========================
const navbar = document.getElementById("navbar");
const burgerBtn = document.getElementById("burger-btn");
const mobileMenu = document.getElementById("mobile-menu");
const menuLinks = mobileMenu.querySelectorAll("a");
let lastScrollY = 0;

window.addEventListener("load", () => {
  const navbar = document.getElementById("navbar");
  navbar.classList.add("show");
});


// Efek scroll - ubah transparansi background
window.addEventListener("scroll", () => {
  const currentY = window.scrollY;

  if (currentY > 20 && lastScrollY <= 20) {
    navbar.classList.remove("bg-blue-900/20", "border-transparent");
    navbar.classList.add(
      "bg-blue-900/60",
      "border",
      "border-cyan-400/10",
      "shadow-lg",
      "opacity-100"
    );
  } else if (currentY <= 20 && lastScrollY > 20) {
    navbar.classList.remove(
      "bg-blue-900/60",
      "border",
      "border-cyan-400/10",
      "shadow-lg"
    );
    navbar.classList.add("bg-blue-900/20", "border-transparent", "opacity-100");
  }

  lastScrollY = currentY;
});

// Burger menu toggle
burgerBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

// Tutup menu saat klik salah satu link
menuLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.add("hidden");
  });
});
