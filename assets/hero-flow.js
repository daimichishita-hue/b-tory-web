(function(){
  var roots = document.querySelectorAll('[data-hero-flow]');
  if(!roots.length){return;}

  roots.forEach(function(root){
    var slides = Array.prototype.slice.call(root.querySelectorAll('[data-hero-slide]'));
    var dots = Array.prototype.slice.call(root.querySelectorAll('[data-hero-dot]'));
    if(!slides.length){return;}

    var active = Math.max(0, slides.findIndex(function(slide){return slide.classList.contains('is-active');}));
    var prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var timer = null;

    function show(index){
      active = (index + slides.length) % slides.length;
      slides.forEach(function(slide, i){
        var isActive = i === active;
        slide.classList.toggle('is-active', isActive);
        slide.setAttribute('aria-hidden', String(!isActive));
      });
      dots.forEach(function(dot, i){
        dot.classList.toggle('is-active', i === active);
        dot.setAttribute('aria-pressed', String(i === active));
      });
    }

    function stop(){
      if(timer){window.clearInterval(timer);timer = null;}
    }

    function start(){
      if(prefersReduced || slides.length < 2){return;}
      stop();
      timer = window.setInterval(function(){show(active + 1);}, 2000);
    }

    dots.forEach(function(dot, i){
      dot.addEventListener('click', function(){
        show(i);
        start();
      });
    });

    root.addEventListener('mouseenter', stop);
    root.addEventListener('mouseleave', start);
    root.addEventListener('focusin', stop);
    root.addEventListener('focusout', start);

    show(active);
    start();
  });
})();
