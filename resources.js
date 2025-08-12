// resources.js
(function(){
  const cityCenters = [
    {city:"Chennai", lat:13.0827, lng:80.2707},
    {city:"Coimbatore", lat:11.0168, lng:76.9558},
    {city:"Madurai", lat:9.9252, lng:78.1198},
    {city:"Tiruchirappalli", lat:10.7905, lng:78.7047},
    {city:"Salem", lat:11.6643, lng:78.1460},
    {city:"Erode", lat:11.3410, lng:77.7172},
    {city:"Vellore", lat:12.9165, lng:79.1325},
    {city:"Thanjavur", lat:10.7867, lng:79.1378},
    {city:"Kanchipuram", lat:12.8342, lng:79.7036},
    {city:"Thoothukudi", lat:8.7642, lng:78.1348},
    {city:"Nagercoil", lat:8.1789, lng:77.4308},
    {city:"Dindigul", lat:10.3626, lng:77.9819},
    {city:"Hosur", lat:12.7440, lng:77.8256},
    {city:"Karur", lat:10.9601, lng:78.0766},
    {city:"Ramanathapuram", lat:9.3736, lng:78.8300},
    {city:"Pudukkottai", lat:10.3791, lng:78.8202},
    {city:"Sivakasi", lat:9.4506, lng:77.7904},
    {city:"Cuddalore", lat:11.7486, lng:79.7640},
    {city:"Tirunelveli", lat:8.7139, lng:77.7560},
    {city:"Ooty", lat:11.4064, lng:76.6932}
  ];
  const types = ["Food","Water","Shelter","Medical"];
  const names = ["Kumar","Arun","Ramesh","Priya","Anitha","Vijay","Lakshmi","Mani","Radha","Suriya","Kavya","Ravi","Geetha","Selvam","Kavitha","Sathish"];
  const arr = [];
  while(arr.length<250){
    const base = cityCenters[arr.length % cityCenters.length];
    const lat = +(base.lat+(Math.random()-0.5)*0.1).toFixed(6);
    const lng = +(base.lng+(Math.random()-0.5)*0.1).toFixed(6);
    const type = types[Math.floor(Math.random()*types.length)];
    const name = `${base.city} ${type} Point ${Math.floor(Math.random()*900+100)}`;
    const contactName = names[Math.floor(Math.random()*names.length)]+" "+Math.floor(Math.random()*90+10);
    const contactPhone = "9"+Math.floor(600000000+Math.random()*399999999);
    arr.push({name,type,lat,lng,contactName,contactPhone,city:base.city});
  }
  window.resources = arr;
})();
