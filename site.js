// Language switch: saves the choice; first visit follows the browser language.
(function(){
  var d=document.documentElement, saved=null;
  try{saved=localStorage.getItem('nd-lang')}catch(e){}
  var nav=(navigator.language||'en').slice(0,2);
  var l=saved||(nav==='kk'?'kk':nav==='ru'?'ru':'en');
  function set(x){d.setAttribute('data-l',x);d.lang=x;
    document.querySelectorAll('.langs button').forEach(function(b){b.setAttribute('aria-pressed',b.dataset.l===x)});
    try{localStorage.setItem('nd-lang',x)}catch(e){}}
  set(l);
  document.addEventListener('click',function(e){var b=e.target.closest('.langs button');if(b)set(b.dataset.l)});
})();
// Blocks with class "rv" fade in once they scroll into view.
(function(){
  var els=document.querySelectorAll('.rv');
  if(!('IntersectionObserver' in window)){els.forEach(function(e){e.classList.add('in')});return}
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{rootMargin:'0px 0px -8% 0px'});
  els.forEach(function(e){io.observe(e)});
})();

// Trailer inside the hero phone: tap the middle phone to play it there, in the site language.
(function(){
  function stop(){document.querySelectorAll('.phone.playing').forEach(function(p){var v=p.querySelector('video');if(v){v.pause();v.remove()}p.classList.remove('playing')})}
  document.addEventListener('click',function(e){
    if(e.target.closest('.langs button')){stop();return}
    var ph=e.target.closest('.phone[data-trailer]');if(!ph||ph.querySelector('video'))return;
    var l=document.documentElement.getAttribute('data-l')||'ru';
    var v=document.createElement('video');
    v.src='/video/'+ph.dataset.trailer+'-'+l+'.mp4';v.controls=true;v.playsInline=true;v.setAttribute('playsinline','');
    v.addEventListener('ended',stop);
    ph.appendChild(v);ph.classList.add('playing');
    var p=v.play();if(p&&p.catch)p.catch(function(){});
  });
})();
