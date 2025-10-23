// Minimal JS for site interactivity
// Social media sharing function
function shareToSocial(platform) {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent('Check out Swizen Goderd Foundation!');
    const text = encodeURIComponent('Supporting vulnerable children and families in Uganda through education, care, and humanitarian support.');
    
    let shareUrl = '';
    
    switch(platform) {
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
            break;
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
            break;
        case 'whatsapp':
            shareUrl = `https://wa.me/?text=${text}%20${url}`;
            break;
        case 'linkedin':
            shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
            break;
    }
    
    window.open(shareUrl, '_blank', 'width=600,height=400');
    return false;
}

document.addEventListener('DOMContentLoaded', function(){
  // Format numbers in k format (e.g., 1.2k, 30k)
  function formatNumberInK(number) {
    if (number >= 1000000) {
      return (number / 1000000).toFixed(1) + 'M';
    } else if (number >= 1000) {
      return (number / 1000).toFixed(1) + 'k';
    }
    return number.toString();
  }

  // Track viewers and likes
  function updateViewCount() {
    const viewerCount = document.getElementById('viewerCount');
    const likeCount = document.getElementById('likeCount');
    const likeBtn = document.getElementById('likeBtn');
    
    if (viewerCount) {
      // Set initial count to 30,000 if not already higher
      let count = parseInt(localStorage.getItem('totalViewers') || '0');
      if (count < 30000) {
        count = 30000;
        localStorage.setItem('totalViewers', count.toString());
      }
      
      // Format number in k
      const formattedCount = formatNumberInK(count);
      
      // Update viewer display with animation
      const oldCount = viewerCount.textContent;
      if (formattedCount !== oldCount) {
        viewerCount.style.animation = 'none';
        viewerCount.offsetHeight; // Trigger reflow
        viewerCount.style.animation = 'countUp 0.5s ease-out';
        viewerCount.textContent = formattedCount;
      } else {
        viewerCount.textContent = formattedCount;
      }
    }

    // Handle likes
    if (likeBtn && likeCount) {
      const likes = parseInt(localStorage.getItem('totalLikes') || '0');
      
      // Update like count display
      likeCount.textContent = likes;
      
      // Add like button handler
      likeBtn.addEventListener('click', function() {
        const currentLikes = parseInt(localStorage.getItem('totalLikes') || '0');
        const newLikes = currentLikes + 1;
        localStorage.setItem('totalLikes', newLikes.toString());
        likeCount.textContent = newLikes;
        
        // Animate the like button
        likeBtn.classList.add('liked');
        setTimeout(() => {
          likeBtn.classList.remove('liked');
        }, 1000);
      });

      // Handle likes display
      if (likeBtn && likeCount) {
        const likes = parseInt(localStorage.getItem('totalLikes') || '0');
        likeCount.textContent = formatNumberInK(likes);
        
        likeBtn.addEventListener('click', function() {
          const currentLikes = parseInt(localStorage.getItem('totalLikes') || '0');
          const newLikes = currentLikes + 1;
          localStorage.setItem('totalLikes', newLikes.toString());
          likeCount.textContent = formatNumberInK(newLikes);
          
          // Animate the like button
          likeBtn.classList.add('liked');
          setTimeout(() => {
            likeBtn.classList.remove('liked');
          }, 1000);
        });
      }

      // Handle comments
      const commentBtn = document.getElementById('commentBtn');
      const commentCount = document.getElementById('commentCount');
      if (commentBtn && commentCount) {
        const comments = parseInt(localStorage.getItem('totalComments') || '0');
        commentCount.textContent = formatNumberInK(comments);
        
        commentBtn.addEventListener('click', function() {
          alert('Comments feature coming soon!');
        });
      }
    }
  }
  
  // Initialize counts when page loads
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
