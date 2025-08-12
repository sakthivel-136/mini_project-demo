// resources.js
// This script creates a variable `resources` with ~250 resource entries across Tamil Nadu.
// Each entry: { name, type, lat, lng, contactName, contactPhone, city }

(function () {
    const cityCenters = [
        { city: "Chennai", lat: 13.0827, lng: 80.2707 },
        { city: "Coimbatore", lat: 11.0168, lng: 76.9558 },
        { city: "Madurai", lat: 9.9252, lng: 78.1198 },
        { city: "Tiruchirappalli", lat: 10.7905, lng: 78.7047 },
        { city: "Salem", lat: 11.6643, lng: 78.1460 },
        { city: "Erode", lat: 11.3410, lng: 77.7172 },
        { city: "Vellore", lat: 12.9165, lng: 79.1325 },
        { city: "Thanjavur", lat: 10.7867, lng: 79.1378 },
        { city: "Kanchipuram", lat: 12.8342, lng: 79.7036 },
        { city: "Thoothukudi", lat: 8.7642, lng: 78.1348 }, // Tuticorin
        { city: "Nagercoil", lat: 8.1789, lng: 77.4308 },
        { city: "Dindigul", lat: 10.3626, lng: 77.9819 },
        { city: "Hosur", lat: 12.7440, lng: 77.8256 },
        { city: "Karur", lat: 10.9601, lng: 78.0766 },
        { city: "Ramanathapuram", lat: 9.3736, lng: 78.8300 },
        { city: "Pudukkottai", lat: 10.3791, lng: 78.8202 },
        { city: "Sivakasi", lat: 9.4506, lng: 77.7904 },
        { city: "Cuddalore", lat: 11.7486, lng: 79.7640 },
        { city: "Tirunelveli", lat: 8.7139, lng: 77.7560 },
        { city: "Ooty", lat: 11.4064, lng: 76.6932 },
        { city: "Kumbakonam", lat: 10.9601, lng: 79.3880 },
        { city: "Mayiladuthurai", lat: 11.1035, lng: 79.6528 },
        { city: "Erode (Perundurai)", lat: 11.4333, lng: 77.6167 },
        { city: "Nagapattinam", lat: 10.7642, lng: 79.8449 },
        { city: "Salem (Mettur)", lat: 11.7780, lng: 77.8224 },
        { city: "Viluppuram", lat: 11.9493, lng: 79.4880 },
        { city: "Krishnagiri", lat: 12.5199, lng: 78.2138 },
        { city: "Thoothukudi (Kovilpatty)", lat: 8.7710, lng: 78.1500 },
        { city: "Gudiyatham", lat: 12.7904, lng: 78.9994 },
        { city: "Arakkonam", lat: 13.0829, lng: 79.9799 },
        { city: "Tenkasi", lat: 8.9596, lng: 77.3150 },
        { city: "Panruti", lat: 11.77, lng: 79.55 },
        { city: "Ambur", lat: 12.7753, lng: 78.7045 },
        { city: "Ponneri", lat: 13.3480, lng: 80.1590 },
        { city: "Kovilpatti", lat: 9.1655, lng: 77.8659 }
    ];

    const types = ["Food", "Water", "Shelter", "Medical"];
    const firstNames = ["Kumar","Arun","Ramesh","Priya","Sathish","Anitha","Vijay","Lakshmi","Mani","Radha","Suriya","Kavya","Ravi","Geetha","Selvam","Kavitha"];
    const resourcesArr = [];

    // target total pins
    const TOTAL = 250;
    let count = 0;
    let cityIndex = 0;

    // distribute pins across cityCenters in round robin to reach TOTAL
    while (count < TOTAL) {
        const base = cityCenters[cityIndex % cityCenters.length];
        // small random offset in ~0.0x degrees (~few km)
        const latOffset = (Math.random() - 0.5) * 0.12; // +/- ~0.06 deg
        const lngOffset = (Math.random() - 0.5) * 0.12;
        const lat = +(base.lat + latOffset).toFixed(6);
        const lng = +(base.lng + lngOffset).toFixed(6);
        const type = types[Math.floor(Math.random() * types.length)];
        const fname = firstNames[Math.floor(Math.random() * firstNames.length)];
        const contactNum = "9" + Math.floor(600000000 + Math.random() * 399999999); // 9xxxxxxxxx
        const name = `${base.city} ${type} Point ${Math.floor(Math.random() * 900 + 100)}`;

        resourcesArr.push({
            name: name,
            type: type,
            lat: lat,
            lng: lng,
            contactName: fname + " " + (Math.floor(Math.random()*90)+10),
            contactPhone: contactNum,
            city: base.city
        });

        count++;
        cityIndex++;
    }

    // expose globally
    window.resources = resourcesArr;
    console.log("Generated resources:", resourcesArr.length);
})();
