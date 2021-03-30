  var citys = [{ name:'New York'},{ name:'Los Angeles'},
  { name:'Vancouver'},{ name:'Montréal'},
  { name:'Paris'},{ name:'Lyon'},{ name:'Londres'},
  { name:'Manchester'},{ name:'Pekin'},{ name:'Shanghai'},
  { name:'Bangkok'},{ name:'Chiang Mai'}, ]

var result = document.querySelector('#result');
var cityOption = document.querySelector('#city-option');


function makeOption(){
citys.forEach( city => {
    let newOption = document.createElement('option')
    newOption.innerText = city.name;
    cityOption.appendChild(newOption)
    console.log(newOption.value)
})


}
makeOption()

var xhr = new XMLHttpRequest();

var map =  document.querySelector('#map')
var lat = 10 ;
var lon = 5;
var zoom           = 1;

cityOption.addEventListener('change', function(){
    
var city = this.value;
var lang = '&lang=fr';

var key = 'bc5b2539385ffb81e2a71760c101373a';
var url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric${lang}&appid=${key}`;

xhr.onreadystatechange = ()=> {

if(xhr.readyState === 4){
    
var response = JSON.parse(xhr.responseText)
    console.log(response)
lat = response.coord.lat
lon = response.coord.lon
 let temp = response.main.temp;
let weather = response.weather[0].description;
console.log(weather)

console.log(lat,lon)
zoom           = 8;
 makeMap()
 makeList(result,city,temp,weather)
}

}
 

xhr.open('GET', url)
xhr.send();
})


function makeMap(){
   

    var fromProjection = new OpenLayers.Projection("EPSG:4326");   // Transform from WGS 1984
    var toProjection   = new OpenLayers.Projection("EPSG:900913"); // to Spherical Mercator Projection
    var position       = new OpenLayers.LonLat(lon, lat).transform( fromProjection, toProjection);

     
    var mapnik         = new OpenLayers.Layer.OSM();
    
    map.addLayer(mapnik);

    map.setCenter(position, zoom);
    

    
}
  map = new OpenLayers.Map('map'); 
makeMap()



function makeList(elt,n,t,w){

let newList = `<ul>

<li>Ville : ${n}</li>
<li>Temperature : ${t} degrés</li>
<li>En ce moment il fais : ${w}</li>
</ul>`;
elt.innerHTML = newList;


}



