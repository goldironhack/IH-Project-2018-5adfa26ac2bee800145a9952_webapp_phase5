drawBarsGraph = (dataPerDistrict) => {
	var data = []
	var max = -1
	var min = 999999999999

	for(var key of Object.keys(dataPerDistrict)) {
		
		const districtID = key
		const amount = dataPerDistrict[key]

		data.push({
			amount,
			districtID
		})

		if(amount > max) max = amount
		if(amount < min) min = amount
	}

	data.sort((a, b) => a.amount-b.amount )

	var margin = {
		top: 5,
		right: 5,
		bottom: 5,
		left: 40
	}

	var colors = {
	    '1': 'rgba(0, 255, 0, 0.6)',
	    '2': 'rgba(255, 165, 0, 0.6)',
	    '3': 'rgba(255, 0, 0, 0.6)',
	    '4': 'rgba(255, 255, 0, 0.6)',
	    '5': 'rgba(128, 0, 128, 0.6)'
	  }

	var barWidth = 8
	var barSpacing = 1

	var selectedDistrictWidth = 40
	
	var selectedDistrictIndex = -1
	for (var i = 0; i < data.length; i++) {
		if(data[i].districtID == selectedDistrict) {
			selectedDistrictIndex = i
			break
		}
	}

	var height = 280 - margin.top - margin.bottom
	var width = data.length*(barWidth + barSpacing) + selectedDistrictWidth-barWidth
	var animateDuration = 700
	var animateDelay = 500/data.length

	var tooltip = d3.select('body')
		.append('div')
			.style('position', 'absolute')
			.style('background', 'black')
			.style('color', 'lightblue')
			.style('padding', '5 15px')
			.style('border', '1px solid #333')
			.style('border-radius', '5px')
			.style('opacity', '0')
			.style('z-index', '800')

String.prototype.replaceAt=function(index, replacement) {
    return this.substr(0, index) + replacement+ this.substr(index + replacement.length);
}

	var getColor = (d) => {
 
		if(d.districtID==selectedDistrict) {
			return 'lightblue'
		}
		return colors[d.districtID.charAt(0)]
	}

	var chart = d3.select('#mainChart')
	.append('svg')
		.attr('width', width + margin.left + margin.right)
		.attr('height', height)
		.append('g')
			.attr('transform', 'translate('+margin.left+','+margin.top+')')
		.selectAll('rect')
			.data(data)
			.enter()
			.append('rect')
				.style('fill', (d) => getColor(d))
				.attr('width', (d) => {
					if(d.districtID == selectedDistrict)
						return selectedDistrictWidth
					return barWidth
				})
				.attr('height', (d) => {
					return d.amount*height/max
				})
				.attr('x', (d, i) => {
					if(i > selectedDistrictIndex)
						return (barWidth + barSpacing)*i + selectedDistrictWidth - barWidth
					else return (barWidth + barSpacing)*i
				})
				.attr('y', height)

		.on('mouseover', function(d){
			tooltip.transition()
				.style('opacity', 1)

			tooltip.html(d.amount.toFixed(1))
				.style('left', (d3.event.pageX)+'px')
				.style('top', (d3.event.pageY+'px'))

			d3.select(this)
				.style('opacity', 0.5)

		})
		.on('mouseout', function(d){
			tooltip.transition()
				.style('opacity', 0)

			d3.select(this)
				.style('opacity', 1)
		})
		.on('click', function(d){
			handleDistrictSelection(d.districtID)
			tooltip.transition()
				.style('opacity', 0)
		})

	chart.transition()
		.attr('height', function(d) {
			return d.amount*height/max
		})
		.attr('y', function(d) {
			return height - d.amount*height/max
		})
		.duration(animateDuration)
		
		.delay(function(d, i) {
			return i*animateDelay
		})
		.ease(d3.easeElastic)

	// set the ranges
	var y = d3.scaleLinear().range([height, 0])
	// Scale the range of the data
	y.domain([0, max])

	// Add the y Axis
	d3.select('svg')
		.append('g')
		.attr('transform', 'translate('+(margin.left)+', '+margin.top+')')
	  .call(d3.axisLeft(y))

	return Promise.resolve()
}