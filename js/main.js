// Fichier JavaScript principal pour le site Charlotte®
// Ajoutez ici vos scripts personnalisés.

document.addEventListener('DOMContentLoaded', function() {
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
      .then(html => { headerTarget.innerHTML = html; })
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
  
  // Inclure dynamiquement le header sur toutes les pages
  const headerTarget = document.getElementById('header-include');
  if (headerTarget) {
    fetch(headerPath)
      .then(response => {
        if (!response.ok) throw new Error('Erreur de chargement du header');
        return response.text();
      })
      .then(html => { headerTarget.innerHTML = html; })
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
