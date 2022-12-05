function initMap() {
    console.log('initMap');
    const map = L.map('map').setView([38.9897, -76.9378], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    return map;
  }

function markerPlace(array, map) {
    // Credit market artwork: https://github.com/pointhi/leaflet-color-markers
    const redIcon = new L.Icon({
        iconUrl: 'marker-icon-red.png',
        shadowUrl: 'marker-shadow.png',
        iconSize: [25, 41],
        shadowSize: [41, 41]
      })      
    map.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
            layer.remove();
        }
    });
    array.forEach((item, index) => {
        const combined = [item.location.longitude, item.location.latitude]
        //console.log(combined[0])
        L.marker([combined[1], combined[0]], {icon : redIcon}).addTo(map);
        if (index === 0) {
            map.setView([combined[1], combined[0]], 10);
            }
    });
} 

async function getData(typeofaccident) {
    const url = 'https://data.princegeorgescountymd.gov/resource/wb4e-w4nf.json';
    const options = {
        method: 'GET',
        headers: {
            'X-App-Token' : 'p8Rl1y4OiXdivi1GqWe4NG1Xe'
        }
    };
    const request = await fetch(url, options); 
    const json = await request.json();
    if (typeofaccident.includes("|")){
        console.log("Contains |")
        const split = typeofaccident.split("|")
        const reply2 = json.filter((item) => item.clearance_code_inc_type === split[0])
        const reply3 = json.filter((item) => item.clearance_code_inc_type === split[1])
        return reply2.concat(reply3)  
    }
    const reply = json.filter((item) => item.clearance_code_inc_type === typeofaccident) 
    //const reply = json.filter((item) => Boolean(item.clearance_code_inc_type)).filter((item) => Boolean(item.location));
    return reply;
}

async function mainEvent() {

    const pageMap = initMap();
    const dropdown = document.getElementById('dropdown');
    const submits = document.querySelector('#button')
    console.log(submits);
    dropdown.addEventListener('click', async function(event) {
        const values = event.target.value.toUpperCase()
        const jsonData = await getData(values)
        submits.addEventListener('click', (submitEvent) => {
            submitEvent.preventDefault();
            console.log("please")
            markerPlace(jsonData, pageMap)
    })
    });
}

document.addEventListener('DOMContentLoaded', async () => mainEvent());