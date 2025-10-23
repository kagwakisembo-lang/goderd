// Minimal JS for site interactivity
document.addEventListener('DOMContentLoaded', function(){
  // Track viewers
  function updateViewCount() {
    const viewerCount = document.getElementById('viewerCount');
    if (!viewerCount) return;
    
    // Get stored count
    let count = parseInt(localStorage.getItem('totalViewers') || '0');
    let viewed = localStorage.getItem('hasViewed');
    
    // If first time viewer
    if (!viewed) {
      count++;
      localStorage.setItem('totalViewers', count.toString());
      localStorage.setItem('hasViewed', 'true');
    }
    
    // Update display
    viewerCount.textContent = count;
  }
  
  updateViewCount();
  
  // set year in footer
  var y = document.getElementById('year');
  if(y) y.textContent = new Date().getFullYear();

  // contact form handling (local only)
  var form = document.getElementById('contactForm');
  if(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      var formMessage = document.getElementById('formMessage');
      if(formMessage) formMessage.textContent = 'Thank you — your message has been received. We will respond soon.';
      form.reset();
    });
  }

  // mobile nav toggle
  var toggles = document.querySelectorAll('.nav-toggle');
  toggles.forEach(function(btn){
    btn.addEventListener('click', function(){
      var expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', (!expanded).toString());
      var nav = this.parentElement.querySelector('.main-nav');
      if(nav){
        nav.classList.toggle('open');
      }
    });
  });

  // simple slider
  var sliders = document.querySelectorAll('.hero-slider');
  sliders.forEach(function(slider){
    var slides = Array.from(slider.querySelectorAll('.slide'));
    var prev = slider.querySelector('.slide-prev');
    var next = slider.querySelector('.slide-next');
    var indicators = slider.querySelector('.slide-indicators');
    var interval = parseInt(slider.dataset.interval, 10) || 5000;
    var current = slides.findIndex(s => s.classList.contains('active'));
    if(current < 0) current = 0;

    // build indicators
    slides.forEach(function(_, i){
      var btn = document.createElement('button');
      if(i === current) btn.classList.add('active');
      btn.addEventListener('click', function(){ goTo(i); });
      indicators.appendChild(btn);
    });

    function goTo(i){
      slides[current].classList.remove('active');
      indicators.children[current].classList.remove('active');
      current = (i + slides.length) % slides.length;
      slides[current].classList.add('active');
      indicators.children[current].classList.add('active');
    }

    if(prev) prev.addEventListener('click', function(){ goTo(current-1); resetTimer(); });
    if(next) next.addEventListener('click', function(){ goTo(current+1); resetTimer(); });

    var timer = setInterval(function(){ goTo(current+1); }, interval);
    function resetTimer(){ clearInterval(timer); timer = setInterval(function(){ goTo(current+1); }, interval); }
  });

  // programs slider (reusable logic similar to hero slider)
  var pSliders = document.querySelectorAll('.programs-slider');
  pSliders.forEach(function(slider){
    var slides = Array.from(slider.querySelectorAll('.p-slide'));
    if(slides.length === 0) return;
    var prev = slider.querySelector('.p-prev');
    var next = slider.querySelector('.p-next');
    var indicators = slider.querySelector('.p-indicators');
    var interval = parseInt(slider.dataset.interval, 10) || 5000;
    var current = slides.findIndex(s => s.classList.contains('active'));
    if(current < 0) current = 0;

    slides.forEach(function(_, i){
      var btn = document.createElement('button');
      if(i === current) btn.classList.add('active');
      btn.addEventListener('click', function(){ goTo(i); });
      indicators.appendChild(btn);
    });

    function goTo(i){
      slides[current].classList.remove('active');
      indicators.children[current].classList.remove('active');
      current = (i + slides.length) % slides.length;
      slides[current].classList.add('active');
      indicators.children[current].classList.add('active');
    }

    if(prev) prev.addEventListener('click', function(){ goTo(current-1); resetTimer(); });
    if(next) next.addEventListener('click', function(){ goTo(current+1); resetTimer(); });

    var timer = setInterval(function(){ goTo(current+1); }, interval);
    function resetTimer(){ clearInterval(timer); timer = setInterval(function(){ goTo(current+1); }, interval); }
  });
});
