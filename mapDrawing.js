var map

var polygonPaths = {}

initMap = () => {
	map = new google.maps.Map(document.getElementById('map'), {
		zoom: 12,
		center: SCHOOL_COORDS,
		styles: mapStyle
	})

	var marker = new google.maps.Marker({
    position: SCHOOL_COORDS,
    map: map,
    title: 'NYU Stern School of Business'
  })
  return Promise.resolve()
}

drawPolygon = (paths, map, boroughID, fillOpacity) => {

  if(!polygonPaths.hasOwnProperty(boroughID)) {
    polygonPaths[boroughID] = []
  }

  var colors = {
    '1': 'green',
    '2': 'orange',
    '3': 'red',
    '4': 'yellow',
    '5': 'purple'
  }

  var fillColor = colors[boroughID.toString().charAt(0)]

  var newPolygon

  if(boroughID != selectedDistrict) {
    newPolygon = new google.maps.Polygon({
      paths,
      strokeColor: 'lightblue',
      strokeOpacity: 0.8,
      strokeWeight: 1,
      fillColor,
      fillOpacity,
    })
  } else {
    newPolygon = new google.maps.Polygon({
      paths,
      strokeColor: 'lightblue',
      strokeOpacity: 0.8,
      strokeWeight: 1,
      fillColor: 'lightblue',
      fillOpacity: 0.9,
    })
  }

  google.maps.event.addListener(newPolygon, 'click', function (event) {
    handleDistrictSelection(boroughID)
  })

  newPolygon.setMap(map)

  polygonPaths[boroughID].unshift({ paths, newPolygon })

  return Promise.resolve()
}

var districtCentroids = {}

drawDistrictGeoshapes = (districtGeoshapes, fillOpacity) => {

  for(var i=0; i<districtGeoshapes.length; i++) {

    var paths = []
    
    var boroughID = districtGeoshapes[i].properties.BoroCD

    var bounds = new google.maps.LatLngBounds()

    if(districtGeoshapes[i].geometry.type==="Polygon") {

      for(var j=0; j<districtGeoshapes[i].geometry.coordinates[0].length; j++) {

        const lat = districtGeoshapes[i].geometry.coordinates[0][j][1]
        const lng = districtGeoshapes[i].geometry.coordinates[0][j][0]

        paths.push({
          lat, lng
        })

        bounds.extend( new google.maps.LatLng(lat, lng))
      }

      const center = bounds.getCenter()
      districtCentroids[boroughID] = {
        lat: center.lat(),
        lng: center.lng()
      }
      
      drawPolygon(paths, map, boroughID, fillOpacity)
    }

    else if(districtGeoshapes[i].geometry.type==="MultiPolygon") {
      for(var j=0; j<districtGeoshapes[i].geometry.coordinates.length; j++) {
        paths = []
        for(var k=0; k<districtGeoshapes[i].geometry.coordinates[j][0].length; k++) {

          const lat = districtGeoshapes[i].geometry.coordinates[j][0][k][1]
          const lng = districtGeoshapes[i].geometry.coordinates[j][0][k][0]

          paths.push({
            lat, lng
          })

          bounds.extend( new google.maps.LatLng(lat, lng))
        }
        drawPolygon(paths, map, boroughID, fillOpacity)
      }

      const center = bounds.getCenter()
        districtCentroids[boroughID] = {
          lat: center.lat(),
          lng: center.lng()
        }
      }
    }

  //console.log(districtCentroids)
  return Promise.resolve()
}

createMarker = (position, title, icon, id) => {
  var marker = new google.maps.Marker({       
    position, 
    map,
    title,
    icon      
  })
  google.maps.event.addListener(marker, 'click', function() {
    getInfoWindow(id).open(map, marker)
    displayRoute(position, SCHOOL_COORDS)
  })

  return marker;
}

drawHouseIcons = (housingData) => {
  var icon = 'https://i.imgur.com/HajNVvb.png'

  for(var i=0; i<housingData.length; i++) {

    var id = housingData[i][1]
    var lat = parseFloat(housingData[i][23])
    var lng = parseFloat(housingData[i][24])
    var title = housingData[i][9]

    createMarker({lat, lng}, title, icon, id)

    housingDataById[id] = {
      lat,
      lng,
      title,
      desc: housingData[i][28] + " - " + housingData[i][30],
      street: housingData[i][9],
      number: housingData[i][13],
      startDate: housingData[i][10],
      completionDate: housingData[i][11],     
      borough: housingData[i][15],
      zipCode: housingData[i][8],
    }

  }
}

getInfoWindow = (id) => {

  data = housingDataById[id]
  var contentString =
  '<div style="max-width: 340px;">'+
  '<h1>'+data.title+'</h1>'+
  '<p>'+data.desc+'</p>'+
  '<p><b>Street:</b> '+data.street+'</p>'+
  '<p><b>Borough:</b> '+data.borough+'</p>'+
  '<p><b>ZIP Code:</b> '+data.zipCode+'</p>'+
  "<p><b>Project's start date:</b> " +data.startDate+"</p>"+
  "<p><b>Project's completion date:</b> " +data.completionDate+"</p>"+
  '</div>'

  return new google.maps.InfoWindow({ content: contentString })
}

drawNeighborhoodIcons = () => {
  var icon = 'https://i.imgur.com/unttYak.png'
  console.log(neighborhoods)

  for(var i=0; i<neighborhoods.length; i++) {

    var lat = parseFloat(neighborhoods[i].lat)
    var lng = parseFloat(neighborhoods[i].lng)

    new google.maps.Marker({
      position: {
        lat,
        lng
      },
      map,
      icon
    }
    )

  }
  
}


var directionsDisplay
var directionsService

displayRoute = (origin, destination) => {

  if(directionsDisplay != null) {
    directionsDisplay.setMap(null);
    directionsDisplay = null;
  }

  directionsDisplay = new google.maps.DirectionsRenderer()
  directionsDisplay.setMap(map)

  var request = {
    origin,
    destination,
    travelMode : google.maps.TravelMode.DRIVING
  }

  directionsService = new google.maps.DirectionsService()
  directionsService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
    }
  })
}
/*
var delayFactor = 0;

getRouteDistance = (key) => {

  origin = districtCentroids[key]
  destination = SCHOOL_COORDS

  var request = {
    origin,
    destination,
    travelMode : google.maps.TravelMode.DRIVING
  }

  directionsService = new google.maps.DirectionsService()

  directionsService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK){
      //distancePerDistrict[key] = response.routes[0].legs[0].distance
      console.log(key + " " + response.routes[0].legs[0].duration.text)
    } else if (status === google.maps.DirectionsStatus.OVER_QUERY_LIMIT) {
      delayFactor++;
      setTimeout(function () {
        getRouteDistance(key);
      }, delayFactor * 1000);
    }
  })

}


getRouteDistance = (key) => {

  origin = districtCentroids[key]
  destination = SCHOOL_COORDS

  fetch('https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial' +
    '&origins=41.43206,-81.38992' +
    '&destinations=-33.86748,151.20699' + 
    '&key=AIzaSyC96XkMS5O1gMAUvm3D3CMHfy8mePxKc5U')
  .then(response => console.log(response))

}
*/


