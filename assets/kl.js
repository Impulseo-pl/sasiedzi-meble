/* Sąsiedzi Meble - menu pełnoekranowe i przewijane karuzele (skórka „beż i grafit", 06.10.2026) */
(function () {
  var btn = document.querySelector('.kl-burger');
  var menu = document.getElementById('kl-menu');
  if (btn && menu) {
    var close = function () {
      btn.setAttribute('aria-expanded', 'false');
      menu.classList.remove('open');
      document.documentElement.style.overflow = '';
      setTimeout(function () { if (btn.getAttribute('aria-expanded') === 'false') menu.hidden = true; }, 450);
    };
    btn.addEventListener('click', function () {
      if (btn.getAttribute('aria-expanded') === 'true') { close(); return; }
      menu.hidden = false;
      btn.setAttribute('aria-expanded', 'true');
      document.documentElement.style.overflow = 'hidden';
      requestAnimationFrame(function () { menu.classList.add('open'); });
    });
    menu.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', close); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
  }

  // karuzele: strzałki przesuwają o jedną kartę, pasek pokazuje położenie
  document.querySelectorAll('.kl-sl-btn').forEach(function (b) {
    b.addEventListener('click', function () {
      var sl = document.getElementById(b.getAttribute('data-sl'));
      if (!sl) return;
      var card = sl.firstElementChild;
      var step = card ? card.getBoundingClientRect().width + parseFloat(getComputedStyle(sl).columnGap || 0) : sl.clientWidth;
      var dir = parseInt(b.getAttribute('data-dir'), 10);
      var max = sl.scrollWidth - sl.clientWidth;
      if (dir > 0 && sl.scrollLeft >= max - 4) sl.scrollTo({ left: 0 });
      else if (dir < 0 && sl.scrollLeft <= 4) sl.scrollTo({ left: max });
      else sl.scrollBy({ left: dir * step });
    });
  });
  document.querySelectorAll('.kl-sl-bar i').forEach(function (bar) {
    var sl = document.getElementById(bar.getAttribute('data-for'));
    if (!sl) return;
    var upd = function () {
      var vis = sl.clientWidth / sl.scrollWidth;
      var max = sl.scrollWidth - sl.clientWidth;
      var pos = max > 0 ? sl.scrollLeft / max : 0;
      bar.style.width = (vis * 100) + '%';
      bar.style.left = (pos * (1 - vis) * 100) + '%';
    };
    sl.addEventListener('scroll', upd, { passive: true });
    window.addEventListener('resize', upd);
    upd();
  });
})();
