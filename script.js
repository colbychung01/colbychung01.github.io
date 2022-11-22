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
    map.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
            layer.remove();
        }
    });
    array.forEach((item, index) => {
        const combined = [item.location.longitude, item.location.latitude]
        //console.log(combined[0])
        L.marker([combined[1], combined[0]]).addTo(map);
        if (index === 0) {
            console.log('testing')
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
    const reply = json.filter((item) => item.clearance_code_inc_type === typeofaccident) 
    //const reply = json.filter((item) => Boolean(item.clearance_code_inc_type)).filter((item) => Boolean(item.location));
    return reply;
}

async function mainEvent() {

    const pageMap = initMap();
    const dropdown = document.getElementById('dropdown');
    const form = document.querySelector('#container'); 
    //const jsonData = await getData()
    //console.table(jsonData);
    dropdown.addEventListener('click', async function(event) {
        const values = event.target.value.toUpperCase()
        const jsonData = await getData(values)
        console.log(jsonData)
        markerPlace(jsonData, pageMap)

    })


    
}

document.addEventListener('DOMContentLoaded', async () => mainEvent());