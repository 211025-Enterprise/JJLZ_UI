function removeAllChildNodes(parent) {
        while (parent.firstChild) {
                parent.removeChild(parent.firstChild)
        }
}

function newElement(type, id, parent) {
	var element = document.createElement(type)
	element.setAttribute('id', id)
	parent.appendChild(element)
}

function createInput(type, id, formElement, labelString) {
	var textWrapper = document.createElement('span')
	textWrapper.setAttribute('class', 'inputWrapper')
	var textField = document.createElement('input')
	textField.setAttribute('type', type)
	textField.setAttribute('id', id)
	textField.setAttribute('name', id)
	var textLabel = document.createElement('label')
	textLabel.setAttribute('for', id)
	textLabel.innerHTML = labelString
	textWrapper.appendChild(textLabel)
	textWrapper.appendChild(textField)
	formElement.appendChild(textWrapper)
}

function getTotalValue () {
	return $.ajax({
		type: "POST",
		contentType: "application/json",
		url: "http://krakenmeister.com:8080/totalvalue",
		headers: { 'Authorization': window.localStorage.getItem("accountToken") },
		dataType: 'text'
	})
}

function getBalance () {
	return $.ajax({
		type: "POST",
		contentType: "application/json",
		url: "http://krakenmeister.com:8080/cashbalance",
		headers: { 'Authorization': window.localStorage.getItem("accountToken") },
		dataType: 'text'
	})
}

function getStocklist () {
	return $.ajax({
		type: "POST",
		contentType: "application/json",
		url: "http://krakenmeister.com:8080/stocklist",
		headers: { 'Authorization': window.localStorage.getItem("accountToken") },
		dataType: 'text'
	})
}

function getWatchlist () {
	return $.ajax({
		type: "POST",
		contentType: "application/json",
		url: "http://krakenmeister.com:8080/watchlist",
		headers: { 'Authorization': window.localStorage.getItem("accountToken") },
		dataType: 'text'
	})
}

function getStockHistory (ticker, _callback) {
	const options = {
		method: 'GET',
		url: 'https://stock-data-yahoo-finance-alternative.p.rapidapi.com/v8/finance/spark',
		params: {symbols: ticker},
		headers: {
			'x-rapidapi-host': 'stock-data-yahoo-finance-alternative.p.rapidapi.com',
			'x-rapidapi-key': '4aa500a931msh94e1a1ed0c77b04p1ff743jsn532bb2626c19'
		}
	};

	axios.request(options).then(function (response) {
		console.log(response)
		_callback(response.data)
	}).catch(function (error) {
		_callback(null)
	});
}

function buyStock (ticker, shares) {
	return $.ajax({
		type: "POST",
		data: {
			'stockname': ticker,
			'amount': shares
		},
		url: "http://krakenmeister.com:8080/buystock",
		headers: { 'Authorization': window.localStorage.getItem("accountToken") },
		dataType: 'text'
	})
}

function sellStock (ticker, shares) {
	return $.ajax({
		type: "POST",
		data: {
			'stockname': ticker,
			'amount': shares
		},
		url: "http://krakenmeister.com:8080/sellstock",
		headers: { 'Authorization': window.localStorage.getItem("accountToken") },
		dataType: 'text'
	})
}

function createStockCard (ticker, id, parent, amount, _callback) {
	const options = {
		method: 'GET',
		url: 'https://stock-data-yahoo-finance-alternative.p.rapidapi.com/v7/finance/options/' + ticker,
		headers: {
			'x-rapidapi-host': 'stock-data-yahoo-finance-alternative.p.rapidapi.com',
			'x-rapidapi-key': '4aa500a931msh94e1a1ed0c77b04p1ff743jsn532bb2626c19'
		}
	}

	axios.request(options).then(function (response) {
		var card = document.createElement('div')
		card.setAttribute('id', id)
		card.setAttribute('class', 'stockCard')
		card.setAttribute('class', 'selem')

		var cardTitle = document.createElement('p')
		cardTitle.setAttribute('class', 'cardTitle')
		cardTitle.innerHTML = response.data["optionChain"]["result"][0]["quote"]["shortName"]

		var cardTicker = document.createElement('p')
		cardTicker.setAttribute('class', 'cardTicker')
		cardTicker.innerHTML = response.data["optionChain"]["result"][0]["quote"]["fullExchangeName"] + ": " + ticker

		var cardPrice = document.createElement('p')
		cardPrice.setAttribute('class', 'cardPrice')
		cardPrice.innerHTML = response.data["optionChain"]["result"][0]["quote"]["ask"] + " " + response.data["optionChain"]["result"][0]["quote"]["currency"]

		var cardChange = document.createElement('p')
		cardChange.setAttribute('class', 'cardChange')
		var change = String(response.data["optionChain"]["result"][0]["quote"]["regularMarketChangePercent"])
		cardChange.innerHTML = change + "% today"
		if (change.charAt(0) == '-') {
			cardChange.style.color = "red"
		} else {
			cardChange.style.color = "green"
		}

		var cardOwned = document.createElement('p')
		cardOwned.setAttribute('class', 'cardOwned')
		cardOwned.innerHTML = "Shares owned: " + amount

		card.appendChild(cardTitle)
		card.appendChild(cardTicker)
		card.appendChild(cardPrice)
		card.appendChild(cardChange)
		card.appendChild(cardOwned)

		parent.appendChild(card)
		_callback()
	}).catch(function (error) {
		console.log(error)
		_callback()
	})
}

function createStockChart (ticker, range, interval, id, parent, _callback) {
	const options = {
		method: 'GET',
		url: 'https://stock-data-yahoo-finance-alternative.p.rapidapi.com/v8/finance/spark',
		params: {symbols: ticker, range: range, interval: interval},
		headers: {
			'x-rapidapi-host': 'stock-data-yahoo-finance-alternative.p.rapidapi.com',
			'x-rapidapi-key': '4aa500a931msh94e1a1ed0c77b04p1ff743jsn532bb2626c19'
		}
	};

        axios.request(options).then(function (response) {
		var chart = document.createElement('canvas')
		chart.setAttribute('id', id)
		chart.setAttribute('class', 'stockChart')
		chart.setAttribute('class', 'selem')
		parent.appendChild(chart)

		var newChart = new Chart(id, {
			type: "line",
			data: {
				labels: response.data[ticker]['timestamp'].map(seconds => {
					var date = new Date(seconds * 1000)
					return date.toLocaleDateString('en-US')
				}),
				datasets: [{
					fill: false,
					lineTension: 0,
					borderWidth: 30,
					backgroundColor: "rgba(0,0,255,1.0)",
					borderColor: "rgba(0,0,255,0.6)",
					data: response.data[ticker]['close']
				}]
			},
			options: {
				legend: {
					display: false
				},
				scales: {
					yAxes: [{
						ticks: {
							min: Math.min(...response.data[ticker]['close']),
							max: Math.max(...response.data[ticker]['close']),
							fontColor: "darkblue",
							fontSize: 36,
							usePointStyle: true
						}
					}],
					xAxes: [{
						ticks: {
							fontColor: "darkblue",
							fontSize: 36,
							usePointStyle: true
						}
					}]
				}
			}
		})
		_callback()
	}).catch(function (error) {
		console.log(error)
		_callback()
	});
}
