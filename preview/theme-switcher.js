// Floating theme switcher for design-system preview pages.
// Usage: <body data-theme="lore-light"> + <script src="theme-switcher.js" defer></script>
(function(){
  const THEMES = [
    {id:'lore-light',   label:'Hearth',    dot:'#F2EADB', ring:'#141613'},
    {id:'lore-dark',    label:'Midnight',  dot:'#0E1410', ring:'#D4F24B'},
    {id:'champagne',    label:'Champagne', dot:'#F7F5EF', ring:'#1846F0'},
    {id:'noir',         label:'Noir',      dot:'#050608', ring:'#0052FF'},
    {id:'garden',       label:'Garden',    dot:'#F6FBEF', ring:'#00A303'},
    {id:'popsicle',     label:'Popsicle',  dot:'linear-gradient(135deg,#FF2D87,#FFB545)'},
    {id:'mallow',       label:'Mallow',    dot:'linear-gradient(135deg,#E5D4FF,#FFEDC4)'},
    {id:'bazaar',       label:'Bazaar',    dot:'#F4E8D6', ring:'#C5442B'},
    {id:'ember',        label:'Ember',     dot:'#2A180A', ring:'#FFB24C'},
    {id:'confetti',     label:'Confetti',  dot:'#1A0F3A', ring:'#FFF100'},
    {id:'warp',         label:'Warp',      dot:'#000',    ring:'#FF6BD6'},
    {id:'cashtag',      label:'Cashtag',   dot:'#000',    ring:'#00D632'},
    {id:'neon',         label:'Neon',      dot:'#080A0E', ring:'#E8FF5C'},
    {id:'kiosk',        label:'Kiosk',     dot:'#fff',    ring:'#000'},
    {id:'tide',         label:'Tide',      dot:'#0A2E4F', ring:'#66D7FF'},
    {id:'pixeldust',    label:'Pixel',     dot:'#1a1035', ring:'#FF3D9A'},
    {id:'botanica',     label:'Botanica',  dot:'#EEEAE0', ring:'#B85D3C'},
    {id:'holo',         label:'Holo',      dot:'linear-gradient(135deg,#FFB5D8,#B5D4FF,#FFF5B5)'},
    {id:'monobrut',     label:'Mono',      dot:'#F5F4F1', ring:'#111'},
    {id:'dotmatrix',    label:'Dot',       dot:'#FFFBF0', ring:'#111'},
    {id:'sunset',       label:'Sunset',    dot:'linear-gradient(180deg,#FFB99A,#C93F8F)'},
    {id:'revenant-light',label:'Rev·L',   dot:'#F1EEEB', ring:'#FF4F00'},
    {id:'revenant-dark', label:'Rev·D',   dot:'#0E0F0C', ring:'#FF4F00'}
  ];
  const LS_KEY = 'lore.preview.theme';
  const body = document.body;
  const saved = localStorage.getItem(LS_KEY) || body.dataset.theme || 'lore-light';
  body.dataset.theme = saved;

  const bar = document.createElement('div');
  bar.className = 'theme-switch';
  bar.innerHTML = '<span class="theme-switch-label">theme</span>';
  THEMES.forEach(t=>{
    const b = document.createElement('button');
    b.type = 'button';
    b.dataset.theme = t.id;
    b.innerHTML = `<span class="dot" style="background:${t.dot}${t.ring?`;box-shadow:inset 0 0 0 1.5px ${t.ring}`:''}"></span>${t.label}`;
    if(t.id===saved) b.setAttribute('aria-current','true');
    b.addEventListener('click',()=>{
      body.dataset.theme = t.id;
      localStorage.setItem(LS_KEY, t.id);
      bar.querySelectorAll('button').forEach(x=>x.removeAttribute('aria-current'));
      b.setAttribute('aria-current','true');
      window.dispatchEvent(new CustomEvent('themechange',{detail:{theme:t.id}}));
    });
    bar.appendChild(b);
  });
  document.body.appendChild(bar);
})();
