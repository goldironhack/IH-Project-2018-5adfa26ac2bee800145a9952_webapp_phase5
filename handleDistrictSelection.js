const selectedDistrictFrame = document.getElementById('selectedDistrictFrame')

var selectedDistrict = -1
var selectedGraph = '-1'

handleDistrictSelection = (districtID) => {

	const key = districtID.toString()
	selectedDistrictFrame.innerHTML = districtNames[key.charAt(0)] + ' ' + key.substr(1)
	selectedDistrictFrame.style.zIndex = '33'

	map.panTo(districtCentroids[districtID])
  map.setZoom(13)
  clearDistricts()

	.then(() => {
		selectedDistrict = districtID
		drawDistrictGeoshapes(districtGeoshapes, 0.3)
	}).then(() => {
		if(selectedGraph == 'crimes'){
			showGraph('crimesBtn', trafficPerDistrict, true)
		}
		if(selectedGraph == 'traffic'){
			showGraph('trafficBtn', trafficPerDistrict, true)
		}
		if(selectedGraph == 'pollution'){
			showGraph('pollutionBtn', pollutionPerDistrict, true)
		}
		if(selectedGraph == 'distance'){
			showGraph('distanceBtn', distancePerDistrict, true)
		}
	})

}


clearDistricts = () => {

	for(var key of Object.keys(polygonPaths)) {
		for(var i=0; i<polygonPaths[key].length; i++) {
			polygonPaths[key][i].newPolygon.setMap(null)
		}
	}
	polygonPaths = {}
	return Promise.resolve()
}

