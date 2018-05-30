const districtNames = {
	'1': 'Manhattan',
	'2': 'Bronx',
	'3': 'Brooklyn',
	'4': 'Queens',
	'5': 'Staten Island',
}

populateTable = () => {

	const table = document.getElementById('comparisonTable')

	appendTableHeader(table)

	for(var key of Object.keys(crimesPerDistrict)) {
		const crimesAmount = crimesPerDistrict[key]
		const trafficAmount = trafficPerDistrict[key]
		const pollutionAmount = pollutionPerDistrict[key]
		const distanceAmount = distancePerDistrict[key]

		appendTableRow(
			table,
			key,
			crimesAmount,
			trafficAmount,
			pollutionAmount,
			distanceAmount
		)
	}

}


appendTableHeader = (table) => {
	const tableHeaderRow = document.createElement('tr')

	const nameHeader = document.createElement('td')
	const crimesHeader = document.createElement('td')
	const trafficHeader = document.createElement('td')
	const pollutionHeader = document.createElement('td')
	const distanceHeader = document.createElement('td')

	nameHeader.classList.add('tableHeader')
	crimesHeader.classList.add('tableHeader')
	trafficHeader.classList.add('tableHeader')
	pollutionHeader.classList.add('tableHeader')
	distanceHeader.classList.add('tableHeader')

	nameHeader.innerHTML = 'DISTRICT'
	crimesHeader.innerHTML = 'CRIMES (NYPD COMPLAINTS)'
	trafficHeader.innerHTML = 'TRAFFIC (AVMT)'
	pollutionHeader.innerHTML = 'POLLUTION (CONCENTRATION)'
	distanceHeader.innerHTML = 'DISTANCE (MINUTES DRIVING)'

	tableHeaderRow.appendChild(nameHeader)
	tableHeaderRow.appendChild(crimesHeader)
	tableHeaderRow.appendChild(trafficHeader)
	tableHeaderRow.appendChild(pollutionHeader)
	tableHeaderRow.appendChild(distanceHeader)

	table.appendChild(tableHeaderRow)
}

appendTableRow = (
	table,
	key,
	crimesAmount,
	trafficAmount,
	pollutionAmount,
	distanceAmount
	) => {

	const tableRow  = document.createElement('tr')

	const name = document.createElement('td')
	const crimesNumber = document.createElement('td')
	const trafficNumber = document.createElement('td')
	const pollutionNumber = document.createElement('td')
	const distanceNumber = document.createElement('td')

	name.classList.add('tableItem1')
	crimesNumber.classList.add('tableItem')
	trafficNumber.classList.add('tableItem')
	pollutionNumber.classList.add('tableItem')
	distanceNumber.classList.add('tableItem')

	name.innerHTML = districtNames[key.charAt(0)] + ' ' + key.substr(1)
	crimesNumber.innerHTML = crimesAmount
	trafficNumber.innerHTML = trafficAmount.toFixed(3)
	pollutionNumber.innerHTML = pollutionAmount.toFixed(3)
	distanceNumber.innerHTML = distanceAmount

	tableRow.appendChild(name)
	tableRow.appendChild(crimesNumber)
	tableRow.appendChild(trafficNumber)
	tableRow.appendChild(pollutionNumber)
	tableRow.appendChild(distanceNumber)

	//toEdit

	table.appendChild(tableRow)

}



var dService = new google.maps.DirectionsService
var dRenderer = new google.maps.DirectionsRenderer
dRenderer.setMap(map)

function calculateAndDisplayRoute(dService, dRenderer, point) {
	const pointAsLatLng = new google.maps.LatLng(point.lat, point.lng)
	console.log(pointAsLatLng)
	dService.route({
		origin: pointAsLatLng,
		destination: SCHOOL_COORDS,
		avoidTolls: true,
		avoidHighways: false,
		travelMode: google.maps.TravelMode.DRIVING
	}, function (response, status) {
		if (status == google.maps.DirectionsStatus.OK) {
			dRenderer.setDirections(response)
		} else {
			window.alert('Directions request failed due to ' + status);
		}
	})
}
