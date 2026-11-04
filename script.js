document.addEventListener("DOMContentLoaded",()=>{
 const toggle=document.querySelector(".hamburger"),menu=document.querySelector(".menu");
 if(toggle&&menu){
   toggle.addEventListener("click",()=>{const open=menu.classList.toggle("show");toggle.setAttribute("aria-expanded",String(open));});
   menu.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{menu.classList.remove("show");toggle.setAttribute("aria-expanded","false");}));
 }
 document.querySelectorAll(".dropdown>button").forEach(btn=>btn.addEventListener("click",()=>{
   const box=btn.parentElement,was=box.classList.contains("open");
   document.querySelectorAll(".dropdown").forEach(d=>{d.classList.remove("open");d.querySelector("button")?.setAttribute("aria-expanded","false");});
   if(!was){box.classList.add("open");btn.setAttribute("aria-expanded","true");}
 }));
 const form=document.getElementById("quick-form"),fields=document.getElementById("dynamic-fields");
 const templates={
  "Sell Laptop":[
   ["Brand","select",["Apple","Dell","HP","Lenovo","Asus","Acer","MSI","Other"]],
   ["Exact model number","text","e.g. ThinkPad T480"],
   ["Processor family","text","Core i5 / i7 / Ryzen"],
   ["Generation / series","text","e.g. 8th Gen"],
   ["RAM","select",["4GB","8GB","16GB","32GB","64GB","Not sure"]],
   ["Storage","text","e.g. 256GB SSD"],
   ["Condition","select",["Excellent","Good","Average","Not working / for parts","Not sure"]]
  ],
  "Upgrade (RAM/SSD)":[
   ["Brand and exact laptop model","text","e.g. Dell Latitude 5420"],
   ["Upgrade required","select",["RAM Upgrade","SSD Upgrade","Both RAM and SSD"]],
   ["Current RAM","select",["4GB","8GB","16GB","32GB","Not sure"]],
   ["Desired RAM","select",["8GB","16GB","32GB","64GB","Not sure"]],
   ["SSD type","select",["2.5-inch SATA","M.2 SATA","M.2 NVMe","Not sure"]],
   ["SSD capacity","select",["256GB","512GB","1TB","2TB","Not sure"]]
  ],
  "Battery":[
   ["Brand","select",["Apple","Dell","HP","Lenovo","Asus","Acer","Other"]],
   ["Exact laptop model","text","Enter full model number"],
   ["Battery part number","text","Optional, if available"],
   ["Battery issue","select",["Low backup","Not charging","Not detected","Battery swollen","Other / Not sure"]]
  ],
  "Adapter":[
   ["Brand","select",["HP","Dell","Lenovo","Apple","Asus","Acer","Other"]],
   ["Exact laptop model","text","Enter full model number"],
   ["Connector type","select",["HP Blue Pin","HP Type-C","Dell 4.5mm","Dell 7.4mm","Lenovo Round Pin","Lenovo Square Pin","Lenovo Type-C","Apple MagSafe","USB-C PD","Other / Not sure"]],
   ["Wattage","select",["45W","65W","90W","120W","135W","150W","180W","200W","230W","Not sure"]],
   ["Adapter part number","text","Optional, if available"]
  ]
 };
 let kind="Sell Laptop";
 function renderFields(){
   if(!fields)return;
   fields.replaceChildren();
   templates[kind].forEach(([name,type,opts])=>{
     const label=document.createElement("label");label.textContent=name;
     let control;
     if(type==="select"){
       control=document.createElement("select");control.name=name;
       const first=document.createElement("option");first.value="";first.textContent="Select / Not sure";control.append(first);
       opts.forEach(v=>{const o=document.createElement("option");o.value=v;o.textContent=v;control.append(o);});
     }else{
       control=document.createElement("input");control.type="text";control.name=name;control.placeholder=opts;
       if(name.toLowerCase().includes("model"))control.required=true;
     }
     label.append(control);fields.append(label);
   });
   const title=form.querySelector(".submit");if(title)title.textContent="◉ Send "+kind+" Enquiry on WhatsApp →";
 }
 function chooseKind(next){
   if(!templates[next])return;
   kind=next;
   document.querySelectorAll(".tab").forEach(t=>t.classList.toggle("active",t.dataset.kind===kind));
   renderFields();
 }
 document.querySelectorAll(".tab").forEach(tab=>tab.addEventListener("click",()=>chooseKind(tab.dataset.kind)));
 document.querySelectorAll("[data-kind]").forEach(link=>{
   if(link.classList.contains("tab"))return;
   link.addEventListener("click",()=>chooseKind(link.dataset.kind));
 });
 renderFields();
 if(form)form.addEventListener("submit",e=>{
   e.preventDefault();if(!form.reportValidity())return;
   const lines=[`Hello LapXpert Pro, my enquiry is for: ${kind}.`];
   new FormData(form).forEach((v,k)=>{if(String(v).trim())lines.push(`${k}: ${v}`);});
   lines.push("Please guide me with availability and next steps.");
   window.open("https://wa.me/919845885250?text="+encodeURIComponent(lines.join("\n")),"_blank","noopener,noreferrer");
 });
 const year=document.getElementById("year");if(year)year.textContent=new Date().getFullYear();
});
