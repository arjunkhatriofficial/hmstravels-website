document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('nav.pill-nav').forEach(function (nav) {
    var inner = nav.querySelector('.pill-nav-inner');
    if (!inner) return;

    var pill = inner.querySelector('.pill');
    if (!pill) {
      pill = document.createElement('div');
      pill.className = 'pill';
      inner.appendChild(pill);
    }

    var links = Array.from(nav.querySelectorAll('.pill-link'));
    if (links.length === 0) return;

    function moveTo(el) {
      if (!el) return;
      var rect = el.getBoundingClientRect();
      var parentRect = inner.getBoundingClientRect();
      var left = rect.left - parentRect.left + inner.scrollLeft;
      pill.style.transform = 'translateX(' + left + 'px) translateY(-50%)';
      pill.style.width = rect.width + 'px';
      pill.style.opacity = '1';
      links.forEach(function (l) { l.classList.remove('on-pill'); });
      el.classList.add('on-pill');
    }

    var active = nav.querySelector('.pill-link.active') || links[0];
    // slight delay to allow fonts/layout to settle
    setTimeout(function () { moveTo(active); }, 40);

    links.forEach(function (link) {
      link.addEventListener('mouseenter', function () { moveTo(link); });
      link.addEventListener('focus', function () { moveTo(link); });
      link.addEventListener('click', function () {
        links.forEach(function (l) { l.classList.remove('active'); });
        link.classList.add('active');
        moveTo(link);
      });
    });

    nav.addEventListener('mouseleave', function () {
      var current = nav.querySelector('.pill-link.active') || links[0];
      moveTo(current);
    });

    window.addEventListener('resize', function () {
      var current = nav.querySelector('.pill-link.active') || links[0];
      moveTo(current);
    });
  });
});
