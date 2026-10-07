const MODELS={"Apple":["A1278","A1286","A1297","A1369","A1370","A1398","A1425","A1465","A1466","A1502","A1503","A1706","A1707","A1708","A1989","A1990","A2141","A2179","A2251","A2337","A2442","A2485","Other / Enter Model Manually"],"Dell":["Latitude E5450","Latitude E5470","Latitude E5570","Latitude 5480","Latitude 5490","Latitude 7490","Latitude 7400","Latitude 7410","Latitude 5420","Latitude 5520","Latitude 7420","Latitude 7430","Latitude 5440","Latitude 5540","Latitude 7480","Inspiron 14 3000","Inspiron 14 5000","Inspiron 15 3000","Inspiron 15 5000","Inspiron 15 7000","Vostro 14","Vostro 15","XPS 13","XPS 15","Precision 3540","Precision 3550","Precision 5560","Other / Enter Model Manually"],"HP":["ProBook 440 G3","ProBook 440 G4","ProBook 440 G5","ProBook 440 G6","ProBook 440 G7","ProBook 440 G8","ProBook 440 G9","EliteBook 840 G3","EliteBook 840 G5","EliteBook 840 G6","EliteBook 840 G7","EliteBook 840 G8","EliteBook 840 G9","EliteBook 850 G5","EliteBook 850 G6","EliteBook 850 G7","ZBook 14 G2","ZBook 14u G5","ZBook Firefly 14 G8","ZBook Firefly 14 G9","Pavilion 14","Pavilion 15","Envy 13","Envy 15","Other / Enter Model Manually"],"Lenovo":["ThinkPad T440p","ThinkPad T450","ThinkPad T460","ThinkPad T470","ThinkPad T480","ThinkPad T490","ThinkPad T14 Gen 1","ThinkPad T14 Gen 2","ThinkPad T14 Gen 3","ThinkPad L440","ThinkPad L460","ThinkPad L470","ThinkPad L480","ThinkPad L490","ThinkPad X240","ThinkPad X250","ThinkPad X260","ThinkPad X270","ThinkPad X280","ThinkPad X390","IdeaPad 3","IdeaPad 5","Other / Enter Model Manually"],"ASUS":["VivoBook 14","VivoBook 15","VivoBook S15","VivoBook Pro 15","ZenBook 13","ZenBook 14","ExpertBook B1","ROG Strix G15","ROG Strix G16","TUF Gaming F15","TUF Gaming A15","Other / Enter Model Manually"],"Acer":["Aspire 3","Aspire 5","Aspire 7","Swift 3","Swift 5","TravelMate P2","Extensa 15","Nitro 5","Nitro 7","Other / Enter Model Manually"],"MSI":["Modern 14","Modern 15","Prestige 14","Prestige 15","GF63 Thin","Katana 15","Cyborg 15","Other / Enter Model Manually"],"Toshiba":["Tecra A50","Tecra Z50","Satellite Pro C50","Satellite C50","Dynabook Tecra A40","Other / Enter Model Manually"],"Samsung":["Galaxy Book","Galaxy Book2","Galaxy Book3","Galaxy Book4","Notebook 9","Other / Enter Model Manually"],"Microsoft Surface":["Surface Laptop 2","Surface Laptop 3","Surface Laptop 4","Surface Laptop 5","Surface Pro 6","Surface Pro 7","Surface Pro 8","Surface Pro 9","Other / Enter Model Manually"],"Fujitsu":["Lifebook E558","Lifebook E559","Lifebook U748","Lifebook U749","Other / Enter Model Manually"],"LG":["LG Gram 14","LG Gram 15","LG Gram 16","LG Ultra PC","Other / Enter Model Manually"],"Huawei":["MateBook D14","MateBook D15","MateBook 13","MateBook 14","Other / Enter Model Manually"],"Xiaomi":["RedmiBook 15","RedmiBook Pro 15","Mi Notebook 14","Mi Notebook Horizon","Other / Enter Model Manually"],"Other Brand":["Other / Enter Brand & Model Manually"]};
const PROBLEMS=["Not turning on","Screen / Display problem","Battery problem","Keyboard problem","Charging problem","SSD / HDD problem","RAM problem","Overheating","Windows / Software problem","Motherboard problem","Water / Liquid damage","Other"];
const WA="919845885250";
let currentFlow="";

const $=id=>document.getElementById(id);
function esc(s){return String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));}

function populateQuickBrands(){
  $("quickBrand").innerHTML=Object.keys(MODELS).map(b=>`<option value="${esc(b)}">${b==="Apple"?" Apple":esc(b)}</option>`).join("");
  updateQuickModels();
}
function updateQuickModels(){
  const brand=$("quickBrand").value, list=MODELS[brand]||[];
  $("quickModelButtons").innerHTML=list.slice(0,8).map(m=>`<button type="button" data-model="${esc(m)}">${esc(m)}</button>`).join("");
  $("quickModelButtons").querySelectorAll("button").forEach(b=>b.addEventListener("click",()=>{ $("quickModel").value=b.dataset.model; }));
  $("quickModelList").innerHTML=list.map(m=>`<option value="${esc(m)}">`).join("");
}
function openModal(){
  $("modal").style.display="flex"; $("modal").setAttribute("aria-hidden","false");
}
function closeModal(){ $("modal").style.display="none"; $("modal").setAttribute("aria-hidden","true"); }
$("closeModal").addEventListener("click",closeModal);
$("modal").addEventListener("click",e=>{if(e.target===$("modal"))closeModal();});
$("quickBrand").addEventListener("change",updateQuickModels);
$("quickOther").addEventListener("click",()=>{ $("quickModel").value=""; $("quickModel").focus(); });
$("quickBook").addEventListener("click",()=>{
  const b=$("quickBrand").value,m=$("quickModel").value.trim();
  if(!m){alert("Please select or enter your exact model.");return;}
  openModal(); renderProblems(b,m);
});

function renderBrandFlow(type){
  currentFlow=type;
  openModal();
  $("flow").innerHTML=`<h2 class="flow-title">${type==="repair"?"Book a Repair":"Select Brand"}</h2>
  <div class="flow-grid">${Object.keys(MODELS).map(b=>`<button class="flow-btn" data-brand="${esc(b)}">${b==="Apple"?" Apple":esc(b)}</button>`).join("")}</div>`;
  $("flow").querySelectorAll("[data-brand]").forEach(btn=>btn.addEventListener("click",()=>renderModels(currentFlow,btn.dataset.brand)));
}
function renderModels(type,brand){
  $("flow").innerHTML=`<h2 class="flow-title">${esc(brand)} Model</h2>
  <div class="flow-grid">${MODELS[brand].map(m=>`<button class="flow-btn" data-model="${esc(m)}">${esc(m)}</button>`).join("")}</div>
  <button class="back" id="backBtn">← Back</button>`;
  $("flow").querySelectorAll("[data-model]").forEach(btn=>btn.addEventListener("click",()=>{
    if(btn.dataset.model.includes("Other / Enter")) renderManual(type,brand);
    else if(type==="repair" || type==="apple") renderProblems(brand,btn.dataset.model);
    else renderCustomer(type,brand,btn.dataset.model,"");
  }));
  $("backBtn").addEventListener("click",()=>renderBrandFlow(type));
}
function renderProblems(brand,model){
  $("flow").innerHTML=`<h2 class="flow-title">${esc(brand)} • ${esc(model)}</h2>
  <p>Select the problem:</p>
  <div class="flow-grid">${PROBLEMS.map(p=>`<button class="flow-btn" data-problem="${esc(p)}">${esc(p)}</button>`).join("")}</div>
  <button class="back" id="backProblem">← Back</button>`;
  $("flow").querySelectorAll("[data-problem]").forEach(btn=>btn.addEventListener("click",()=>renderCustomer("Laptop Repair",brand+" • "+model,btn.dataset.problem)));
  $("backProblem").addEventListener("click",()=>renderModels("repair",brand));
}
function renderManual(type,brand){
  $("flow").innerHTML=`<h2 class="flow-title">${esc(brand)} • Enter Model</h2>
  <div class="form"><input id="manualModel" placeholder="Enter exact model number / name"><button id="manualContinue">Continue →</button></div>
  <button class="back" id="manualBack">← Back</button>`;
  $("manualContinue").addEventListener("click",()=>{
    const m=$("manualModel").value.trim(); if(!m){alert("Please enter the model.");return;}
    if(type==="repair"||type==="apple") renderProblems(brand,m); else renderCustomer(type,brand,m,"");
  });
  $("manualBack").addEventListener("click",()=>renderModels(type,brand));
}
function renderCustomer(service,model,problem){
  $("flow").innerHTML=`<h2 class="flow-title">Customer Details</h2>
  <p><b>${esc(model)}</b>${problem?`<br>${esc(problem)}`:""}</p>
  <div class="form"><input id="custName" placeholder="Your name" required><input id="custPhone" placeholder="Phone number" inputmode="tel" required>
  <textarea id="custNote" rows="4" placeholder="Additional details"></textarea><button id="sendRequest">Send Request on WhatsApp →</button></div>
  <button class="back" id="customerBack">← Back</button>`;
  $("sendRequest").addEventListener("click",()=>{
    const n=$("custName").value.trim(), ph=$("custPhone").value.trim(), note=$("custNote").value.trim();
    if(!n||!ph){alert("Please enter your name and phone number.");return;}
    const text=`Hi LapXpert Pro,%0AName: ${encodeURIComponent(n)}%0APhone: ${encodeURIComponent(ph)}%0AService: ${encodeURIComponent(service)}%0AModel: ${encodeURIComponent(model)}%0AProblem/Details: ${encodeURIComponent(problem+" "+note)}`;
    window.open("https://wa.me/"+WA+"?text="+text,"_blank");
  });
  $("customerBack").addEventListener("click",()=>renderProblems(model.split(" • ")[0],model.split(" • ").slice(1).join(" • ")||model));
}
function renderSimple(type,title,placeholder){
  openModal();
  $("flow").innerHTML=`<h2 class="flow-title">${esc(title)}</h2>
  <div class="form"><input id="simpleName" placeholder="Your name"><input id="simplePhone" placeholder="Phone number" inputmode="tel"><textarea id="simpleNote" rows="5" placeholder="${esc(placeholder)}"></textarea><button id="simpleSend">Send Request on WhatsApp →</button></div>`;
  $("simpleSend").addEventListener("click",()=>{
    const n=$("simpleName").value.trim()||"Customer", ph=$("simplePhone").value.trim()||"", note=$("simpleNote").value.trim()||"";
    const text=`Hi LapXpert Pro,%0AName: ${encodeURIComponent(n)}%0APhone: ${encodeURIComponent(ph)}%0AService: ${encodeURIComponent(title)}%0ADetails: ${encodeURIComponent(note)}`;
    window.open("https://wa.me/"+WA+"?text="+text,"_blank");
  });
}
document.querySelectorAll("[data-flow]").forEach(btn=>btn.addEventListener("click",()=>{
  const type=btn.dataset.flow;
  if(type==="repair"||type==="apple") renderBrandFlow(type);
  else if(type==="sell") renderSimple(type,"Sell Your Laptop","Brand, exact model, condition and expected price");
  else if(type==="upgrade") renderSimple(type,"Laptop & CPU Upgrade","RAM / SSD / CPU / desktop upgrade required");
  else if(type==="adapter") renderSimple(type,"Adapters & Chargers","Brand, model and required wattage");
  else renderSimple(type,"Buy Laptops","Brand, exact model, RAM/SSD preference and budget");
}));

populateQuickBrands();
