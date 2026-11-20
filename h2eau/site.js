// Click-to-play video covers
document.addEventListener('DOMContentLoaded',function(){
  document.querySelectorAll('.video.cover').forEach(function(box){
    var done=false;
    function play(){
      if(done) return; done=true;
      if(box.dataset.vimeo){
        box.innerHTML='<iframe src="'+box.dataset.vimeo+'" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>';
      } else if(box.dataset.src){
        box.innerHTML='<video controls autoplay playsinline><source src="'+box.dataset.src+'" type="video/mp4"></video>';
      }
      box.classList.remove('cover'); box.removeAttribute('role'); box.removeAttribute('tabindex');
    }
    box.addEventListener('click',play);
    box.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();play();}});
  });
});
