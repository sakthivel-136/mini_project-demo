// script.js

// Initialize map centered roughly on Tamil Nadu
const map = L.map('map').setView([11.0, 78.0], 7);

// Add OSM tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);

// marker cluster group
let markersCluster = L.markerClusterGroup();
let markerList = []; // keep track of marker references

// create markers from global `resources`
function loadMarkers(data) {
    markersCluster.clearLayers();
    markerList = [];

    data.forEach((res, idx) => {
        const popupHtml = `
            <strong>${res.name}</strong><br/>
            <em>${res.type}</em><br/>
            City: ${res.city}<br/>
            Contact: ${res.contactName} <br/>
            Phone: <a href="tel:${res.contactPhone}">${res.contactPhone}</a>
        `;

        const marker = L.marker([res.lat, res.lng]);
        marker.bindPopup(popupHtml);
        markerList.push({ marker, res });
        markersCluster.addLayer(marker);
    });

    map.addLayer(markersCluster);
    document.getElementById('totalCount').innerText = data.length;
    renderList(data);
}

// render list of visible resources (simple)
function renderList(data) {
    const container = document.getElementById('resourceList');
    container.innerHTML = "<strong>Resources (click marker to view contact)</strong>";
    data.slice(0, 200).forEach(r => { // show up to 200 in list to avoid huge DOM
        const div = document.createElement('div');
        div.className = 'resource-item';
        div.innerHTML = `<strong>${r.name}</strong> (${r.type}) — ${r.city} — ${r.contactName} — <a href="tel:${r.contactPhone}">${r.contactPhone}</a>`;
        container.appendChild(div);
    });
    if (data.length > 200) {
        const more = document.createElement('div');
        more.style.padding = '6px';
        more.style.fontStyle = 'italic';
        more.innerText = `... and ${data.length - 200} more`;
        container.appendChild(more);
    }
}

// initial load (window.resources is from resources.js)
if (window.resources && Array.isArray(window.resources)) {
    loadMarkers(window.resources);
} else {
    alert("No resources found. Make sure resources.js is loaded and defines window.resources.");
}

// filter UI
document.getElementById('applyBtn').addEventListener('click', () => {
    applyFilter();
});
document.getElementById('resetBtn').addEventListener('click', () => {
    document.getElementById('filterType').value = 'All';
    document.getElementById('citySearch').value = '';
    loadMarkers(window.resources);
});

function applyFilter() {
    const type = document.getElementById('filterType').value;
    const cityQ = document.getElementById('citySearch').value.trim().toLowerCase();

    const filtered = window.resources.filter(r => {
        const typeOK = (type === 'All') ? true : (r.type === type);
        const cityOK = cityQ === '' ? true : (r.city.toLowerCase().indexOf(cityQ) !== -1);
        return typeOK && cityOK;
    });

    // clear existing markers then add filtered ones
    // reset view if filtered small set
    if (filtered.length > 0) {
        loadMarkers(filtered);
        const first = filtered[0];
        map.setView([first.lat, first.lng], Math.max(8, Math.min(12, 10)));
    } else {
        markersCluster.clearLayers();
        document.getElementById('totalCount').innerText = 0;
        document.getElementById('resourceList').innerHTML = "<strong>No resources match your filter.</strong>";
    }
}
