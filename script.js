const WA='https://wa.me/919845885250';
const data={
 brands:['Apple MacBook','Dell','HP','Lenovo','ASUS','Acer','MSI','Toshiba','Samsung','Microsoft Surface','Fujitsu','LG','Huawei','Xiaomi','Other Brand'],
 models:{
  'Apple MacBook':['A2141','A1990','A2458','A2179','A1286','A1707','A1706','A1398','A1989','A2251','A2337','MacBook Air 13-inch','MacBook Air 15-inch','iMac','Other / Enter model manually'],
  Dell:['Latitude 7490','Latitude 7400','Latitude 5420','Latitude 5511','Latitude E7490','Latitude 5420','Inspiron Series','Vostro Series','Precision Series','XPS Series','Other / Enter model manually'],
  HP:['EliteBook 440 G3','EliteBook 440 G8','EliteBook 840 G5','EliteBook 840 G6','EliteBook 840 G7','EliteBook 840 G8','ProBook Series','ZBook Firefly G8','ZBook G14','Pavilion Series','Other / Enter model manually'],
  Lenovo:['ThinkPad T480','ThinkPad T490','ThinkPad T440p','ThinkPad L470','ThinkPad L480','ThinkPad X270','ThinkPad T470','ThinkPad T14','IdeaPad Series','ThinkCentre Series','Other / Enter model manually'],
  ASUS:['VivoBook Series','ZenBook Series','ROG Series','TUF Gaming Series','ExpertBook Series','Other / Enter model manually'],
  Acer:['Aspire Series','TravelMate Series','Swift Series','Nitro Series','Predator Series','Other / Enter model manually'],
  MSI:['Modern Series','Prestige Series','GF Series','Katana Series','Stealth Series','Other / Enter model manually'],
  Toshiba:['Tecra Series','Satellite Series','Portégé Series','Other / Enter model manually'],
  Samsung:['Galaxy Book Series','Notebook Series','Other / Enter model manually'],
  'Microsoft Surface':['Surface Laptop','Surface Pro','Surface Book','Surface Go','Other / Enter model manually'],
  Fujitsu:['LIFEBOOK Series','CELSIUS Series','Other / Enter model manually'],LG:['Gram Series','Other / Enter model manually'],Huawei:['MateBook Series','Other / Enter model manually'],Xiaomi:['RedmiBook Series','Mi Notebook Series','Other / Enter model manually'],
  'Other Brand':['Enter model manually']
 },
 problems:['Not Turning On','Screen / Display Problem','Battery Problem','Keyboard Problem','Charging Problem','SSD / HDD Problem','RAM Problem','Overheating','Windows / Software Problem','Motherboard Problem','Water / Liquid Damage','Speaker / Audio Problem','Wi-Fi / Bluetooth Problem','USB / Port Problem','Laptop Cleaning / Service','Other Problem'],
 upgrades:['RAM Upgrade','SSD Upgrade','CPU Upgrade','Display Upgrade / Replacement','Battery Replacement','Keyboard Replacement','Windows Upgrade','macOS Upgrade','Cooling Upgrade','Other Upgrade'],
 adapterTypes:['Laptop Charger / Adapter','USB-C Laptop Charger','MacBook USB-C Charger','MacBook MagSafe Charger','Dell Type-C Charger','HP Type-C Charger','Lenovo Type-C Charger','Gaming Laptop Charger','Universal Laptop Adapter','Power Adapter / Brick Only','Adapter + Power Cable','Other / Not Sure'],
 wattages:['45W','65W','90W','120W','135W','150W','170W','180W','200W','230W','240W','Not Sure']
};
const products={monitors:[
 {name:'Dell 24” Monitor',spec:'Full HD · IPS · Used',price:6500,img:'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=700&q=85'},
 {name:'Samsung 27” Monitor',spec:'Full HD · IPS · Used',price:9500,img:'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=700&q=85'},
 {name:'LG 22” Monitor',spec:'Full HD · LED · Used',price:5800,img:'https://images.unsplash.com/photo-1585792180666-f7347c490ee2?auto=format&fit=crop&w=700&q=85'}],
 desktop:[
 {name:'Dell OptiPlex',spec:'i5 8th Gen · 8GB · 256GB SSD',price:12000,img:'https://images.unsplash.com/photo-1587831990711-23ca6441447b?auto=format&fit=crop&w=700&q=85'},
 {name:'HP Desktop',spec:'i5 8th Gen · 8GB · 512GB SSD',price:15000,img:'https://images.unsplash.com/photo-1593642634315-48f5414c3ad9?auto=format&fit=crop&w=700&q=85'},
 {name:'Apple iMac',spec:'24-inch · Apple Silicon · Used',price:0,img:'https://www.apple.com/v/imac/v/images/overview/welcome/welcome_hero__f23bdvt2rzam_xlarge.jpg'}]};

const $=s=>document.querySelector(s);const flowModal=$('#flowModal');const flowContent=$('#flowContent');
function openModal(){flowModal.hidden=false;document.body.style.overflow='hidden'}function closeModal(){flowModal.hidden=true;document.body.style.overflow=''}
function esc(v){return String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function wa(text){window.open(WA+'?text='+encodeURIComponent(text),'_blank','noopener')}
function header(title,step,total){return `<div class="step-head"><div><div class="step">STEP ${step} OF ${total}</div><h2>${title}</h2></div></div>`}
function choices(items,attr='choice'){return `<div class="choice-grid">${items.map((x,i)=>`<button class="choice" data-${attr}="${esc(x)}">${esc(x)}</button>`).join('')}</div>`}
function customerForm(title,summary,onSubmit){flowContent.innerHTML=header(title,summary.step,summary.total)+`<div class="summary">${summary.html}</div><form class="form" id="customerFlow"><input name="name" required placeholder="Your Name"><input name="phone" required placeholder="Phone Number"><input name="area" placeholder="Area / Location" value="Benson Town, Bangalore 560046"><textarea name="notes" placeholder="Additional notes (optional)"></textarea><div class="flow-actions"><button type="button" class="btn outline" data-back>← Back</button><button class="btn primary" type="submit">Send Request on WhatsApp →</button></div></form>`;$('#customerFlow').addEventListener('submit',e=>{e.preventDefault();const f=new FormData(e.target);onSubmit(f)})}
function brandFlow(kind){flowContent.innerHTML=header(kind==='buy'?'Buy Laptops':kind==='sell'?'Sell Your Laptop':kind==='repair'?'Laptop Repair':'Laptop & CPU Upgrade',1,kind==='repair'?4:3)+`<p class="muted">Select your laptop brand.</p>${choices(data.brands,'brand')}`;document.querySelectorAll('[data-brand]').forEach(b=>b.onclick=()=>modelFlow(kind,b.dataset.brand))}
function modelFlow(kind,brand){const models=data.models[brand]||['Enter model manually'];flowContent.innerHTML=header('Select Exact Model',2,kind==='repair'?4:3)+`<p class="muted">Brand: <b>${esc(brand)}</b></p><input id="modelSearch" class="form" placeholder="Search model...">${choices(models,'model')}`;const search=$('#modelSearch');search.addEventListener('input',()=>document.querySelectorAll('[data-model]').forEach(b=>b.style.display=b.textContent.toLowerCase().includes(search.value.toLowerCase())?'':'none'));document.querySelectorAll('[data-model]').forEach(b=>b.onclick=()=>nextForKind(kind,brand,b.dataset.model))}
function nextForKind(kind,brand,model){if(kind==='repair')problemFlow(brand,model);else if(kind==='sell')sellCondition(brand,model);else if(kind==='upgrade')upgradeChoice(brand,model);else customerForm('Request this laptop', {step:3,total:3,html:`<b>${esc(brand)}</b> · ${esc(model)}<br>Tell us which laptop you want.`},f=>wa(`Hello LapXpert Pro, I want to buy a laptop.\nBrand: ${brand}\nModel: ${model}\nName: ${f.get('name')}\nPhone: ${f.get('phone')}\nArea: ${f.get('area')}\nNotes: ${f.get('notes')||'None'}`))}
function problemFlow(brand,model){flowContent.innerHTML=header('What’s the problem?',3,4)+`<p class="muted">${esc(brand)} · ${esc(model)}</p>${choices(data.problems,'problem')}`;document.querySelectorAll('[data-problem]').forEach(b=>b.onclick=()=>customerForm('Your Details',{step:4,total:4,html:`<b>Brand:</b> ${esc(brand)}<br><b>Model:</b> ${esc(model)}<br><b>Problem:</b> ${esc(b.dataset.problem)}`},f=>wa(`Hello LapXpert Pro, I want to book a repair.\nBrand: ${brand}\nModel: ${model}\nProblem: ${b.dataset.problem}\nName: ${f.get('name')}\nPhone: ${f.get('phone')}\nArea: ${f.get('area')}\nNotes: ${f.get('notes')||'None'}`)))}
function sellCondition(brand,model){const cond=['Excellent','Good','Average','Damaged / Faulty','Not Working'];flowContent.innerHTML=header('Laptop Condition',3,3)+`<p class="muted">${esc(brand)} · ${esc(model)}</p>${choices(cond,'condition')}`;document.querySelectorAll('[data-condition]').forEach(b=>b.onclick=()=>customerForm('Sell Your Laptop',{step:3,total:3,html:`<b>Brand:</b> ${esc(brand)}<br><b>Model:</b> ${esc(model)}<br><b>Condition:</b> ${esc(b.dataset.condition)}`},f=>wa(`Hello LapXpert Pro, I want to sell my laptop.\nBrand: ${brand}\nModel: ${model}\nCondition: ${b.dataset.condition}\nName: ${f.get('name')}\nPhone: ${f.get('phone')}\nArea: ${f.get('area')}\nNotes: ${f.get('notes')||'None'}`)))}
function upgradeChoice(brand,model){flowContent.innerHTML=header('What do you want to upgrade?',3,5)+`<p class="muted">${esc(brand)} · ${esc(model)}</p>${choices(data.upgrades,'upgrade')}`;document.querySelectorAll('[data-upgrade]').forEach(b=>b.onclick=()=>upgradeDetails(brand,model,b.dataset.upgrade))}
function upgradeDetails(brand,model,upgrade){let options=['Not Sure'];if(upgrade==='RAM Upgrade')options=['4GB → 8GB','8GB → 16GB','16GB → 32GB','Not Sure'];if(upgrade==='SSD Upgrade')options=['256GB','512GB','1TB','2TB','Not Sure'];if(upgrade==='CPU Upgrade')options=['CPU replacement','CPU performance upgrade','Need compatibility check','Not Sure'];if(upgrade==='Display Upgrade / Replacement')options=['HD','Full HD','Higher resolution','Not Sure'];flowContent.innerHTML=header(upgrade,4,5)+choices(options,'detail');document.querySelectorAll('[data-detail]').forEach(b=>b.onclick=()=>customerForm('Your Details',{step:5,total:5,html:`<b>Brand:</b> ${esc(brand)}<br><b>Model:</b> ${esc(model)}<br><b>Upgrade:</b> ${esc(upgrade)}<br><b>Details:</b> ${esc(b.dataset.detail)}`},f=>wa(`Hello LapXpert Pro, I want an upgrade.\nBrand: ${brand}\nModel: ${model}\nUpgrade: ${upgrade}\nDetails: ${b.dataset.detail}\nName: ${f.get('name')}\nPhone: ${f.get('phone')}\nArea: ${f.get('area')}\nNotes: ${f.get('notes')||'None'}`)))}
function adapterFlow(){
  flowContent.innerHTML=header('Adapters & Chargers',1,4)+`<p class="muted">Select brand.</p>${choices(data.brands.filter(x=>x!=='Other Brand'),'adapterbrand')}`;
  document.querySelectorAll('[data-adapterbrand]').forEach(b=>b.onclick=()=>{
    const brand=b.dataset.adapterbrand;
    flowContent.innerHTML=header('Adapter Type',2,4)+choices(data.adapterTypes,'adaptertype');
    document.querySelectorAll('[data-adaptertype]').forEach(t=>t.onclick=()=>{
      const type=t.dataset.adaptertype;
      flowContent.innerHTML=header('Wattage',3,4)+choices(data.wattages,'wattage');
      document.querySelectorAll('[data-wattage]').forEach(w=>w.onclick=()=>{
        const watt=w.dataset.wattage;
        const requirements=['Buy New','Buy Used','Need Original','Need Compatible','Need Replacement','Not Sure'];
        flowContent.innerHTML=header('Requirement',4,4)+choices(requirements,'requirement');
        document.querySelectorAll('[data-requirement]').forEach(r=>r.onclick=()=>{
          customerForm('Your Details',{step:4,total:4,html:`<b>Brand:</b> ${esc(brand)}<br><b>Type:</b> ${esc(type)}<br><b>Wattage:</b> ${esc(watt)}<br><b>Requirement:</b> ${esc(r.dataset.requirement)}`},f=>wa(`Hello LapXpert Pro, I need an adapter.\nBrand: ${brand}\nType: ${type}\nWattage: ${watt}\nRequirement: ${r.dataset.requirement}\nName: ${f.get('name')}\nPhone: ${f.get('phone')}\nArea: ${f.get('area')}\nNotes: ${f.get('notes')||'None'}`));
        });
      });
    });
  });
}
function productFlow(type){const list=products[type];flowContent.innerHTML=header(type==='monitors'?'Monitors':'CPU / Desktop',1,1)+`<p class="muted">New and used products. Ask for current availability.</p><div class="product-list">${list.map(x=>`<article class="product"><img src="${x.img}" alt="${esc(x.name)}"><h4>${esc(x.name)}</h4><small>${esc(x.spec)}</small><div class="price">${x.price?`₹${x.price.toLocaleString('en-IN')}`:'Ask Price'}</div><button class="btn primary full" data-product="${esc(x.name)}">Ask on WhatsApp</button></article>`).join('')}</div>`;document.querySelectorAll('[data-product]').forEach(b=>b.onclick=()=>wa(`Hello LapXpert Pro, I am interested in ${b.dataset.product}. Please share availability and price.`))}
function runFlow(type){openModal();if(['buy','sell','repair','upgrade'].includes(type))brandFlow(type);else if(type==='adapter')adapterFlow();else if(type==='monitors'||type==='desktop')productFlow(type)}
document.addEventListener('click',e=>{const flow=e.target.closest('[data-flow]');if(flow)runFlow(flow.dataset.flow);if(e.target.closest('[data-close]'))closeModal();if(e.target===flowModal)closeModal();if(e.target.closest('[data-back]'))brandFlow('repair')});document.querySelector('.menu-toggle').addEventListener('click',()=>{const n=$('#navLinks');n.classList.toggle('open');document.querySelector('.menu-toggle').setAttribute('aria-expanded',n.classList.contains('open'))});document.querySelectorAll('.nav-links a').forEach(a=>a.addEventListener('click',()=>$('#navLinks').classList.remove('open')));
