initMap()
.then(() => {

	fetchHousingData()
	.then(() => drawHouseIcons(housingData))

}).then(() => {

	Promise.all([

		fetchDistrictGeoshapes()
		.then(() => drawDistrictGeoshapes(districtGeoshapes, 0.3)),

		fetchCrimes(),

		fetchPollution()
		.then(() => treatPollution(pollution))
		.then(()=> treatTraffic(traffic))

	]).then(() => {
		
		Promise.all([

		mapCrimesToDistricts(crimes, districtCentroids),
		
		mapUHF42ToDistricts(pollutionPerUHF42, UHF42ToDistricts, pollutionPerDistrict),

		mapUHF42ToDistricts(trafficPerUHF42, UHF42ToDistricts, trafficPerDistrict)
		
		]).then(() => {
			populateTable()
		})

	})
})

fetchNeighborhoods()




