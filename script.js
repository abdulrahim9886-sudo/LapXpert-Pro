const nav=document.getElementById("nav"), menuBtn=document.getElementById("menuBtn");
menuBtn?.addEventListener("click",()=>{const open=nav.classList.toggle("open");menuBtn.setAttribute("aria-expanded",open)});
document.querySelectorAll("#nav a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));

const defaultProducts=[
{type:"monitor",brand:"Dell",name:'24" Monitor',size:'24"',price:6500,condition:"Used"},
{type:"monitor",brand:"HP",name:'22" Monitor',size:'22"',price:5800,condition:"Used"},
{type:"monitor",brand:"Samsung",name:'27" Monitor',size:'27"',price:9500,condition:"Used"},
{type:"desktop",brand:"Dell",name:"OptiPlex",spec:"i5 6th Gen | 8GB | 256GB SSD",price:12000,condition:"Used"},
{type:"desktop",brand:"HP",name:"Desktop",spec:"i5 8th Gen | 8GB | 512GB SSD",price:15000,condition:"Used"},
{type:"desktop",brand:"Lenovo",name:"ThinkCentre",spec:"i5 8th Gen | 8GB | 256GB SSD",price:14000,condition:"Used"}];
const products=JSON.parse(localStorage.getItem("lapxpert_products")||"null")||defaultProducts;
const money=n=>"₹"+Number(n).toLocaleString("en-IN");
function renderProducts(){
 const mg=document.getElementById("monitorGrid"),dg=document.getElementById("desktopGrid");
 const card=p=>`<article class="product"><div class="photo">${p.type==="monitor"?"🖥️":"🖥️"}</div><h3>${p.brand} ${p.name}</h3><div class="tags">${p.type==="monitor"?(p.size+" · "+p.condition):(p.spec+" · "+p.condition)}</div><div class="price">${money(p.price)}</div><a class="btn call" style="margin-top:12px;width:100%" target="_blank" rel="noopener" href="https://wa.me/919845885250?text=${encodeURIComponent("Hello LapXpert Pro, I am interested in "+p.brand+" "+p.name+" priced at "+money(p.price))}">WhatsApp to Buy</a></article>`;
 mg.innerHTML=products.filter(p=>p.type==="monitor").map(card).join("");
 dg.innerHTML=products.filter(p=>p.type==="desktop").map(card).join("");
}
renderProducts();

document.querySelectorAll("[data-service]").forEach(b=>b.addEventListener("click",()=>{document.getElementById("service").value=b.dataset.service;document.getElementById("booking").scrollIntoView({behavior:"smooth"});}));
document.getElementById("bookingForm").addEventListener("submit",e=>{e.preventDefault();const t=`Repair Request\nService: ${service.value}\nBrand: ${brand.value}\nModel: ${model.value}\nProblem: ${problem.value}\nName: ${name.value}\nPhone: ${phone.value}\nArea: ${area.value}\nPreferred: ${datetime.value}`;window.open("https://wa.me/919845885250?text="+encodeURIComponent(t),"_blank")});
document.getElementById("sellForm").addEventListener("submit",e=>{e.preventDefault();const t=`Sell Device Request\nType: ${sellType.value}\nBrand: ${sellBrand.value}\nModel: ${sellModel.value}\nCondition: ${condition.value}\nNotes: ${sellNotes.value}\nName: ${sellName.value}\nPhone: ${sellPhone.value}\nArea: ${sellArea.value}`;window.open("https://wa.me/919845885250?text="+encodeURIComponent(t),"_blank")});
document.getElementById("trackBtn").addEventListener("click",()=>{const id=document.getElementById("jobId").value.trim().toUpperCase(),r=document.getElementById("trackResult");r.innerHTML=id?`<b>${id}</b><br><br>🟢 Received → 🔵 Diagnosing → 🔵 Repairing → ⚪ Ready for Delivery<br><small>Demo status flow. Connect this to your live repair database for real tracking.</small>`:"Please enter your repair/job number.";});
