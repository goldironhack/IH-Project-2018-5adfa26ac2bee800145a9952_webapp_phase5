## webapp_phase5

1. IRONHACKS COMPARER

2. Keywords

nyc, stern, school, business, crimes, traffic, pollution, distance, housing, districts.

3. Description of the datasets and function design

 * [NYPD Complaint Data Historic] ['https://data.cityofnewyork.us/Public-Safety/NYPD-Complaint-Data-Historic/qgea-i56i/data'] [JSON] ['latitude', 'longitude'] [5000] Locations for all felony, misdemeanor and violation crimes reported to the NYPD.

 * [Neighborhood Names GIS] ['https://catalog.data.gov/dataset/neighborhood-names-gis'] [JSON] 'latitude', 'longitude'] [ALL] Neighborhood lavels as depicted in NYC: A City of Neighborhoods.

 * [NYC Community District's Geoshapes] ['https://services5.arcgis.com/GfwWNkhOj9bNBqoJ/arcgis/rest/services/nycd/FeatureServer/0/query?where=1=1&outFields=*&outSR=4326&f=geojson'] [JSON] [ALL] [ALL] District's Geoshapes used to draw the map.

 * [Housing New York Units by Building] ['https://catalog.data.gov/dataset/housing-new-york-units-by-building'] [JSON] [ALL] [ALL] buildings, units and projects in NYC that began after January 1, 2014.

 * [Air Quality] ['https://catalog.data.gov/dataset/air-quality-ef520'] [JSON] ['UHF-42'] [all] Average Benzene and Formaldehyde concentrations per District. Also retrieved Annual Vehicle Miles Traveled (for traffic).


4. Brief Description

 * Website that allows users to compare between the districts in NYC between parameters of Security, Air Pollution, Traffic and Travel Distance to the NYC Stern School of Business.

 Fill in the structued description:
 * Map View:
	1. [Y] Google Maps map centered at the NYC Stern School of Business.
	1. [Y] Style retrieved from 'https://snazzymaps.com/style/151/ultra-light-with-labels'.

 * Data Visualization:
	1. [Y] D3.js bar graps sorting the districts per Crimes, Traffic, Pollution and Distance.
	2. [Y]
		2.1 Click on a specific bar on the graphs. It will focus its corresponding district in the map, increase the bars width and change their colors.
	
 * Interaction Form:
	1. [Y] The district's name will show up at the top of the screen.
	2. [N]
	3. [N]
	4. [Y]
		4.1 The previously exposed bars graph -> map interaction.
		4.2 The opposite applies. Click on a district in the map to see the bars graph modified.
	5. [Y]
		5.1 Click on a house marker. It will draw a path between it and the business school.
		5.2 It also displays a WindowInfo with all the data about the housing project.

6. Test Case

Chrome, IE, Edge and Safari.

7. Additional information You Want to Share with Us

	* On some of the mandatory APIs there was a failure from time to time in the requests (different from exceeding their number). Thats why I had to hardcode some datasets (like district geoshapes).
	* To map the crimes inside the districts, I had to use a KDTree ('https://github.com/ubilabs/kd-tree-javascript'). I hope it's allowed since it's just an algorithm implementation.
	* I used a function from a stack-overflow topic: 'https://stackoverflow.com/questions/22317951/export-html-table-data-to-excel-using-javascript-jquery-is-not-working-properl'.



