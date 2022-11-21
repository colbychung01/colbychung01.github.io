function initMap() {
    console.log('initMap');
    const map = L.map('map').setView([38.9897, -76.9378], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    return map;
  }


async function getData() {
    const url = 'https://data.princegeorgescountymd.gov/resource/wb4e-w4nf.json';
    const options = {
        method: 'GET',
        headers: {
            'X-App-Token' : 'p8Rl1y4OiXdivi1GqWe4NG1Xe'
        }
    };
    const request = await fetch(url, options); 

    const json = await request.json(); 
    const reply = json.filter((item) => Boolean(item.clearance_code_inc_type));
    //const reply = json.filter((item) => Boolean(item.clearance_code_inc_type)).filter((item) => Boolean(item.location));
    return reply;
}

async function mainEvent() {

    const pageMap = initMap();
    const dropdown = document.querySelector('#dropdown');
    const form = document.querySelector('#container'); 
    const jsonData = await getData()
    const filtered = jsonData.filter
    console.table(jsonData);
    
}

document.addEventListener('DOMContentLoaded', async () => mainEvent());