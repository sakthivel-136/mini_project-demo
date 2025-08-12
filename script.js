// script.js
const map = L.map('map').setView([11.0, 78.0], 7);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
const markerCluster = L.markerClusterGroup();
let allMarkers = [];

function iconHTML(type){
  if(type==="Food") return `<div class="marker-div icon-food"><i class="fa-solid fa-utensils"></i></div>`;
  if(type==="Water") return `<div class="marker-div icon-water"><i class="fa-solid fa-droplet"></i></div>`;
  if(type==="Shelter") return `<div class="marker-div icon-shelter"><i class="fa-solid fa-house"></i></div>`;
  return `<div class="marker-div icon-med"><i class="fa-solid fa-briefcase-medical"></i></div>`;
}

function createMarkers(data){
  markerCluster.clearLayers();
  allMarkers = [];
  data.forEach(r=>{
    const icon = L.divIcon({html:iconHTML(r.type),className:'',iconSize:[42,42]});
    const marker = L.marker([r.lat,r.lng],{icon});
    const popup = `<div class="popup-title">${r.name}</div>
    <em>${r.type}</em> — ${r.city}<br>
    Contact: <strong>${r.contactName}</strong><br>
    <a class="call-large" href="tel:${r.contactPhone}"><i class="fa-solid fa-phone"></i> Call ${r.contactPhone}</a>`;
    marker.bindPopup(popup);
    markerCluster.addLayer(marker);
    allMarkers.push({marker,data:r});
  });
  map.addLayer(markerCluster);
  document.getElementById('totalCount').innerText = data.length;
  renderList(data);
}

function renderList(data){
  const c = document.getElementById('listContainer');
  c.innerHTML = '';
  data.forEach(r=>{
    const div=document.createElement('div'); div.className='resource-item';
    const iconBox=document.createElement('div'); iconBox.className='icon-box';
    if(r.type==="Food") iconBox.classList.add('icon-food');
    if(r.type==="Water") iconBox.classList.add('icon-water');
    if(r.type==="Shelter") iconBox.classList.add('icon-shelter');
    if(r.type==="Medical") iconBox.classList.add('icon-med');
    iconBox.innerHTML = iconHTML(r.type);
    const meta=document.createElement('div'); meta.className='rmeta';
    meta.innerHTML=`<strong>${r.name}</strong><br><small>${r.type} • ${r.city}</small><br>${r.contactName} — <a href="tel:${r.contactPhone}">${r.contactPhone}</a>`;
    const call=document.createElement('button'); call.className='call-btn'; call.innerHTML='<i class="fa-solid fa-phone"></i>';
    call.onclick=(e)=>{e.stopPropagation(); window.location.href=`tel:${r.contactPhone}`;};
    div.append(iconBox,meta,call);
    div.onclick=()=>{ const f=allMarkers.find(m=>m.data===r); if(f){ map.setView([r.lat,r.lng],13); f.marker.openPopup();}};
    c.appendChild(div);
  });
}

document.getElementById('applyBtn').onclick=()=>{
  const type=document.getElementById('filterType').value;
  const city=document.getElementById('citySearch').value.trim().toLowerCase();
  const filtered=window.resources.filter(r=>{
    const okType = (type==='All')||r.type===type;
    const okCity = city===''||r.city.toLowerCase().includes(city);
    return okType && okCity;
  });
  createMarkers(filtered);
};

document.getElementById('resetBtn').onclick=()=>{
  document.getElementById('filterType').value='All';
  document.getElementById('citySearch').value='';
  createMarkers(window.resources);
};

createMarkers(window.resources);
