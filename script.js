jQuery(document).ready(function($) {
  console.log('script.js cargado y jQuery ready');

  const sections   = $('.animated-section');
  const navLinks   = $('.main-menu a.nav-anim');
  const menuToggle = $('.menu-toggle');
  const header     = $('#site_header');
  const preloader  = $('.preloader');

  // Preloader: ocultamos cuando el DOM esté listo (no espera a recursos pesados)
  console.log('DOM listo - ocultando preloader');
  preloader.fadeOut(400, function() { 
    preloader.remove();
    console.log('Preloader removido (DOM ready)');
  });

  // 2) Carousel
  $('.text-rotation').owlCarousel({
    items: 1,
    loop: true,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    dots: false,
    nav: false
  });
  console.log('Carousel iniciado');

  // 3) Función para mostrar sección
  function showSection(id) {
    if (!id || id === '') {
      console.log('showSection llamada con ID vacío o nulo');
      return;
    }
    console.log(`Mostrando sección: ${id}`);
    sections.removeClass('active').hide();

    // Mostrar la sección seleccionada por fadeIn y agregar clase active
    $(id).fadeIn(400).addClass('active');

    navLinks.removeClass('active');
    $(`.main-menu a.nav-anim[href="${id}"]`).addClass('active');

    // Animar skills sólo en #resume
    if (id === '#resume') {
      console.log('Animando habilidades en #resume');
      $('.skill-percentage').each(function() {
        let parentSkill = $(this).closest('.skill');
        let skillValueText = parentSkill.find('.skill-value').text();
        let p = parseInt(skillValueText);
        if (!isNaN(p)) {
          $(this).css('width', p + '%');
          console.log(`Set skill width to ${p}%`);
        } else {
          console.log(`Valor de skill no es numérico: '${skillValueText}'`);
        }
      });
    } else {
      $('.skill-percentage').css('width', '0');
    }

    // Cerrar menú móvil si estaba abierto
    if (header.hasClass('open')) {
      header.removeClass('open');
      menuToggle.removeClass('open');
      console.log('Menú móvil cerrado');
    }
  }

  // 4) Click en menú lateral
  navLinks.on('click', function(e) {
    e.preventDefault();
    const targetId = $(this).attr('href');
    console.log(`Click en menú, navegando a ${targetId}`);
    showSection(targetId);
  });

  // 5) Toggle menú móvil
  menuToggle.on('click', function() {
    header.toggleClass('open');
    menuToggle.toggleClass('open');
    console.log('Toggle menú móvil');
  });

  // 6) Mostrar sección según hash inicial o por defecto #home
  const initialHash = window.location.hash;
  if (initialHash && $(initialHash).length) {
    console.log(`Cargando página con hash inicial: ${initialHash}`);
    showSection(initialHash);
  } else {
    console.log('Sin hash inicial válido, mostrando #home');
    showSection('#home');
  }
});