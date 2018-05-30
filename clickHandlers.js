const chartHeader = document.getElementById('chartHeader')
const mainChartContainer = document.getElementById('mainChartContainer')
const tableContainer = document.getElementById('tableContainer')
const chartTitle = document.getElementById('chartTitle')
const chartDescription = document.getElementById('chartDescription')
const tutorial = document.getElementById('tutorial')


var showingChart = false
var showingTable = false
var prevBtn = null

handleButtonClick = (buttonID) => {

	var dataDescription = null

	switch(buttonID){
		case 'crimesBtn':
			selectedGraph = 'crimes'
			showGraph(buttonID, crimesPerDistrict, false)
			dataDescription = datasetDescriptions.crimes
			break
		case 'trafficBtn':
			selectedGraph = 'traffic'
			showGraph(buttonID, trafficPerDistrict, false)
			dataDescription = datasetDescriptions.traffic
			break
		case 'pollutionBtn':
			selectedGraph = 'pollution'
			showGraph(buttonID, pollutionPerDistrict, false)
			dataDescription = datasetDescriptions.pollution
			break
		case 'distanceBtn':
			selectedGraph = 'distance'
			showGraph(buttonID, distancePerDistrict, false)
			dataDescription = datasetDescriptions.distance
			break
		case 'tableBtn':
			showTable()
			dataDescription = datasetDescriptions.crimes
			break
		default:
			break
	}

	chartTitle.innerHTML = dataDescription.title
	chartDescription.innerHTML = dataDescription.description

	prevBtn = buttonID
	
}

showGraph = (buttonID, dataToGraph, districtClickedFlag) => {
	d3.select('svg').remove()

	if(districtClickedFlag) {
		drawBarsGraph(dataToGraph)
		return
	}


	if(showingTable==true) {
		tableContainer.style.display = 'none'
		showingTable = false
	}

	if(showingChart==false) {

		chartHeader.style.display = 'inline-block'
		mainChartContainer.style.display = 'inline-block'
		drawBarsGraph(dataToGraph)
		showingChart = true

	} else if(prevBtn==buttonID) {

		chartHeader.style.display = 'none'
		mainChartContainer.style.display = 'none'
		showingChart = false
		
	} else {
		drawBarsGraph(dataToGraph)
	}

}

showTable = () => {

	if(showingChart) {
		d3.select('svg').remove()
		chartHeader.style.display = 'none'
		mainChartContainer.style.display = 'none'
		showingChart = false
	}


	if(showingTable==true) {
		tableContainer.style.display = 'none'
		showingTable = false
	} else {
		tableContainer.style.display = 'inline-block'
		showingTable = true
	}
}

hideTutorial = () => {
	tutorial.style.display = 'none'
}
