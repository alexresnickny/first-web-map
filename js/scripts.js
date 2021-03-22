mapboxgl.accessToken = 'pk.eyJ1IjoiYWRyMTEiLCJhIjoiY2tsa2RpMHZlMDF6NzJwcGo4NWxhZmxuNCJ9.n5_RQ0yWxBTwjRlaZsxGaQ';

var map = new mapboxgl.Map({
  container: 'mapContainer', // container ID
  style: 'mapbox://styles/mapbox/light-v10', // style URL
  center: [-74.0060, 40.7128], // starting position [lng, lat]
  zoom: 9.3, // starting zoom
  pitch: 5
});

//adding clinic partner org practiceData

$.getJSON('./data/partnerorgs.json', function(partnerOrgs) {
  console.log(partnerOrgs)

  partnerOrgs.forEach(function(partnerOrg) {
    console.log(partnerOrg.name, partnerOrg.status)

    var html = `
      </div>
        <h3>${partnerOrg.name}</h3>
        <h4>Intake Status: ${partnerOrg.status}</h4>
        <div>${partnerOrg.contact}</div>
        <div>${partnerOrg.address}</div>
      </div>
    `

    var color = 'grey' //any organizations missing info about current status will be this color

    if (partnerOrg.status === 'Open') {
      color = 'green'
    }

    if (partnerOrg.status === 'Closed') {
      color = 'red'
    }

    if (partnerOrg.status === 'Unknown') {
      color = 'yellow'
    }

    new mapboxgl.Marker({
        color: color
      })
      .setLngLat([partnerOrg.longitude, partnerOrg.latitude])
      .setPopup(new mapboxgl.Popup().setHTML(html)) //adding first popup
      .addTo(map);
  })
})
