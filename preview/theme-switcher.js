// Floating theme switcher for design-system preview pages.
// Usage: <body data-theme="lore-light"> + <script src="theme-switcher.js" defer></script>
(function(){
  const THEMES = [
    {id:'lore-light',   label:'Hearth',    dot:'#F2EADB', ring:'#141613'},
    {id:'lore-dark',    label:'Midnight',  dot:'#0E1410', ring:'#D4F24B'},
    {id:'revenant-light',label:'Rev·L',   dot:'#F1EEEB', ring:'#FF4F00'},
    {id:'revenant-dark', label:'Rev·D',   dot:'#0E0F0C', ring:'#FF4F00'},
    {id:'rolr-light',    label:'ROLR·L',  dot:'#FFFBF0', ring:'#6664FC'},
    {id:'rolr-dark',     label:'ROLR·D',  dot:'#0B0B0E', ring:'#6664FC'},
    {id:'kiosk',         label:'Kiosk',   dot:'#F5F5EF', ring:'#E8F520'},
    {id:'primitive',     label:'Prim',    dot:'#FFFFFF', ring:'#111111'}
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
