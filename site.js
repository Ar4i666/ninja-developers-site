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
