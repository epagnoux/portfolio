// Fichier JavaScript principal pour le site Charlotte®
// Inspiré du style Mapbox — animations scroll reveal

// ── Dark Mode ──
(function initTheme() {
  const saved = localStorage.getItem('theme');
  if (saved) {
    document.documentElement.setAttribute('data-theme', saved);
  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
})();

function setupThemeToggle() {
  document.querySelectorAll('.theme-toggle').forEach(function(btn) {
    btn.addEventListener('click', function() {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
    });
  });
}

// ── Scroll Reveal (Intersection Observer) ──
function setupScrollReveal() {
  const reveals = document.querySelectorAll('.reveal, .reveal-children');
  if (!reveals.length) return;

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target); // ne déclencher qu'une fois
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  reveals.forEach(function(el) {
    observer.observe(el);
  });
}

// ── Smooth header shadow on scroll ──
function setupHeaderScroll() {
  const header = document.querySelector('.header');
  if (!header) return;

  let ticking = false;
  window.addEventListener('scroll', function() {
    if (!ticking) {
      window.requestAnimationFrame(function() {
        if (window.scrollY > 10) {
          header.style.boxShadow = '0 1px 12px rgba(0,0,0,0.06)';
        } else {
          header.style.boxShadow = 'none';
        }
        ticking = false;
      });
      ticking = true;
    }
  });
}

document.addEventListener('DOMContentLoaded', function() {
  // Setup toggle pour les boutons déjà présents dans le DOM
  setupThemeToggle();
  // Scroll reveal animations
  setupScrollReveal();
  // Header shadow on scroll
  setupHeaderScroll();
  // Déterminer si on est dans /pages/ ou à la racine
  const isInPages = window.location.pathname.includes('/pages/');
  const headerPath = isInPages ? 'header.html' : 'header-root.html';
  const footerPath = isInPages ? 'footer.html' : 'footer-root.html';
  
  // Inclure dynamiquement le header sur toutes les pages
  const headerTarget = document.getElementById('header-include');
  if (headerTarget) {
    fetch(headerPath)
      .then(response => {
        if (!response.ok) throw new Error('Erreur de chargement du header');
        return response.text();
      })
      .then(html => {
        headerTarget.innerHTML = html;
        setupThemeToggle(); // Re-bind toggle après injection dynamique
      })
      .catch(error => console.error('Erreur:', error));
  }
  
  // Inclure dynamiquement le footer sur toutes les pages
  const footerTarget = document.getElementById('footer-include');
  if (footerTarget) {
    fetch(footerPath)
      .then(response => {
        if (!response.ok) throw new Error('Erreur de chargement du footer');
        return response.text();
      })
      .then(html => { footerTarget.innerHTML = html; })
      .catch(error => console.error('Erreur:', error));
  }
});
