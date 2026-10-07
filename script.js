const WA='https://wa.me/919845885250';
const defaults={
 monitors:[
  {name:'Dell 24” Monitor',spec:'Full HD | IPS',price:6500,condition:'Used'},
  {name:'Samsung 27” Monitor',spec:'Full HD | IPS',price:9500,condition:'Used'},
  {name:'LG 22” Monitor',spec:'Full HD | LED',price:5800,condition:'Used'},
  {name:'Acer 24” Monitor',spec:'Full HD | IPS',price:7500,condition:'Used'}
 ],
 desktops:[
  {name:'Dell OptiPlex',spec:'i5 8th Gen | 8GB | 256GB SSD',price:12000,condition:'Used'},
  {name:'HP Desktop',spec:'i5 8th Gen | 8GB | 512GB SSD',price:15000,condition:'Used'},
  {name:'Lenovo ThinkCentre',spec:'i5 8th Gen | 8GB | 256GB SSD',price:14000,condition:'Used'}
 ]
};
const $=s=>document.querySelector(s); const $$=s=>document.querySelectorAll(s);
/* LapXpert Pro product image fix */
document.head.insertAdjacentHTML('beforeend', `<style>
.product-img{display:flex;align-items:center;justify-content:center;overflow:hidden;background:#eef6ff;min-height:180px;border-radius:16px}
.product-img .product-svg{display:block;width:100%;height:auto;max-height:220px}
.product-img img{display:block;max-width:100%}
</style>`);

function products(){let data;try{data=JSON.parse(localStorage.getItem('lxpProducts')||'null')}catch(e){}return data||defaults}
function productArt(name,desktop=false){
 const n=String(name||'').toLowerCase();
 const monitor=!desktop;
 if(monitor){
  const colors=n.includes('samsung')?'#111827':n.includes('lg')?'#334155':n.includes('acer')?'#0f766e':'#1d4ed8';
  return `<svg class="product-svg" viewBox="0 0 640 360" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${escapeHtml(name)}"><defs><linearGradient id="g${monitor?'m':'d'}" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#dbeafe"/><stop offset="1" stop-color="#eff6ff"/></linearGradient></defs><rect width="640" height="360" rx="28" fill="url(#g${monitor?'m':'d'})"/><rect x="120" y="55" width="400" height="230" rx="12" fill="#111827"/><rect x="136" y="71" width="368" height="198" rx="6" fill="${colors}"/><path d="M155 235 Q300 120 485 235 V260 H155Z" fill="#ffffff" opacity=".22"/><rect x="285" y="285" width="70" height="18" rx="9" fill="#64748b"/><path d="M235 315 H405 L425 330 H215Z" fill="#475569"/><circle cx="490" cy="88" r="6" fill="#22c55e"/></svg>`;
 }
 return `<svg class="product-svg" viewBox="0 0 640 360" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${escapeHtml(name)}"><defs><linearGradient id="pcg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#dbeafe"/><stop offset="1" stop-color="#e0f2fe"/></linearGradient></defs><rect width="640" height="360" rx="28" fill="url(#pcg)"/><rect x="205" y="42" width="230" height="275" rx="22" fill="#1e293b"/><rect x="228" y="66" width="184" height="205" rx="10" fill="#0f172a"/><circle cx="320" cy="105" r="42" fill="#2563eb" opacity=".9"/><circle cx="320" cy="105" r="22" fill="#0f172a"/><circle cx="270" cy="205" r="28" fill="#38bdf8" opacity=".9"/><circle cx="370" cy="205" r="28" fill="#60a5fa" opacity=".9"/><rect x="265" y="278" width="110" height="10" rx="5" fill="#64748b"/><rect x="165" y="317" width="310" height="10" rx="5" fill="#334155"/></svg>`;
}
function renderProducts(){const p=products(); const card=(x,desktop=false)=>`<article class="product"><div class="product-img ${desktop?'desktop-img':''}">${productArt(x.name,desktop)}</div><h4>${escapeHtml(x.name)}</h4><small>${escapeHtml(x.spec||'Quality checked')} · ${escapeHtml(x.condition||'Available')}</small><div class="price">₹${Number(x.price||0).toLocaleString('en-IN')}</div><button class="btn btn-primary full buy-product" data-name="${escapeHtml(x.name)}">Ask on WhatsApp</button></article>`;$('#monitorProducts').innerHTML=p.monitors.map(x=>card(x)).join('');$('#desktopProducts').innerHTML=p.desktops.map(x=>card(x,true)).join('')}
function escapeHtml(v){return String(v).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]))}
function openModal(id){const el=$('#'+id+'Modal');if(el)el.hidden=false;document.body.classList.add('modal-open')}
function closeModals(){ $$('.modal').forEach(m=>m.hidden=true);document.body.classList.remove('modal-open') }
function wa(text){window.open(WA+'?text='+encodeURIComponent(text),'_blank','noopener')}

document.addEventListener('click',e=>{
 const open=e.target.closest('[data-open]'); if(open) openModal(open.dataset.open);
 if(e.target.matches('[data-close]')) closeModals();
 const svc=e.target.closest('[data-service]'); if(svc){openModal('booking');$('#bookingService').value=svc.dataset.service}
 const buy=e.target.closest('.buy-product'); if(buy) wa(`Hello LapXpert Pro, I am interested in ${buy.dataset.name}. Please share availability and price.`);
 if(e.target.matches('.modal')) closeModals();
});
$$('.menu-toggle').forEach(btn=>btn.addEventListener('click',()=>{const links=$('.nav-links');const open=links.classList.toggle('open');btn.setAttribute('aria-expanded',open)}));
$$('.nav-links a').forEach(a=>a.addEventListener('click',()=>$('.nav-links').classList.remove('open')));
$('#bookingForm').addEventListener('submit',e=>{e.preventDefault();const f=new FormData(e.target);wa(`Hello LapXpert Pro, I want to book a repair.\nService: ${f.get('service')}\nModel: ${f.get('model')}\nName: ${f.get('name')}\nPhone: ${f.get('phone')}\nArea: ${f.get('area')||'Bangalore'}\nMode: ${f.get('mode')}\nProblem: ${f.get('details')||'Not specified'}`);closeModals()});
$('#sellForm').addEventListener('submit',e=>{e.preventDefault();const f=new FormData(e.target);wa(`Hello LapXpert Pro, I want to sell my device.\nType: ${f.get('type')}\nBrand/Model: ${f.get('brand')}\nCondition: ${f.get('condition')||'Not specified'}\nExpected: ${f.get('expected')||'Not specified'}\nName: ${f.get('name')}\nPhone: ${f.get('phone')}\nArea: ${f.get('area')||'Bangalore'}\nNotes: ${f.get('notes')||'None'}`);closeModals()});
$('#contactForm').addEventListener('submit',e=>{e.preventDefault();const f=new FormData(e.target);wa(`Hello LapXpert Pro.\nName: ${f.get('name')}\nPhone: ${f.get('phone')}\nNeed: ${f.get('need')}\nMessage: ${f.get('message')||'Please contact me.'}`)});
$('#trackForm').addEventListener('submit',e=>{e.preventDefault();const id=new FormData(e.target).get('job').trim().toUpperCase();$('#trackResult').innerHTML=`<div class="track-id">Job ID: ${escapeHtml(id)}</div><div class="track-line active">✓ Received / Job Created</div><div class="track-line">2 · Diagnosing</div><div class="track-line">3 · Repairing</div><div class="track-line">4 · Ready</div><div class="track-line">5 · Delivered</div><small>Status shown here is a demo until connected to your repair database.</small>`});
renderProducts();