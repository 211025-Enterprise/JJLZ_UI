var totalValue
var fullName
var contentWrapper

/*getStockHistory('AMZN', (stockhistory) => {
	console.log(stockhistory)
	new Chart('stockChart', {
		type: "line",
		data: {
			labels: stockhistory['AMZN']['timestamp'],
			datasets: [{
				fill: false,
				lineTension: 0,
				backgroundColor: "rgba(0,0,255,1.0)",
				borderColor: "rgba(0,0,255,0.1)",
				data: stockhistory['AMZN']['close']
			}]
		},
		options: {
			legend: {
				display: false
			},
			scales: {
				yAxes: [{ticks: {min: 3400, max: 3500}}]
			}
		}
	})
})

$.ajax({
	type: "POST",
	contentType: "application/json",
	url: "totalvalue",
	headers: { 'Authorization': window.localStorage.getItem("accountToken") },
	dataType: 'text',
	success: function (result) {
		totalValue = result
		if (document.readyState === "complete") {
			document.getElementById('accountsummary').innerHTML = "Net Worth: $" + totalValue
		}
	},
	error: function (e) {
		logOut()
	}
})
*/
$.ajax({
	type: "POST",
	contentType: "application/json",
	url: "fullname",
	headers: { 'Authorization': window.localStorage.getItem("accountToken") },
	dataType: 'text',
	success: function (result) {
		fullName = result
		if (document.readyState === "complete") {
			document.getElementById('settingsBtn').innerHTML = fullName
		}
	},
	error: function (e) {
		logOut()
	}
})

/*
$.ajax({
	type: "POST",
	contentType: "application/json",
	url: "stocklist",
	headers: { 'Authorization': window.localStorage.getItem("accountToken") },
	dataType: 'text',
	success: function (result) {
		var stocklist = JSON.parse(result)
	},
	error: function (e) {
		logOut()
	}
})

$.ajax({
	type: "POST",
	contentType: "application/json",
	url: "watchlist",
	headers: { 'Authorization': window.localStorage.getItem("accountToken") },
	dataType: 'text',
	success: function (result) {
		var watchlist = JSON.parse(result)
	},
	error: function (e) {
		logOut()
	}
})*/

window.addEventListener("load", function() {
	contentWrapper = document.getElementById('content-wrapper')
	document.getElementById('settingsBtn').onclick = function() {showSettings()}
	document.getElementById('logOutBtn').onclick = function() {logOut()}
	document.getElementById('accountBtn').onclick = function() {displayAccount()}
	document.getElementById('stocksBtn').onclick = function() {displayStocks()}
	document.getElementById('watchlistBtn').onclick = function() {displayWatchlist()}
	if (fullName) {
		document.getElementById('settingsBtn').innerHTML = fullName
	}
	displayAccount()
/*	if (totalValue) {
		document.getElementById('accountsummary').innerHTML = "Net Worth: $" + totalValue
	}
	document.getElementById('buyBtn').onclick = function () {
		buyStock('AMZN', 1);
		getTotalValue().then(function(result) {
			document.getElementById('accountsummary').innerHTML = "Net Worth: $" + result;
		})
		getStocklist().then(function(result) {
			var stocklist = JSON.parse(result)
			console.log(stocklist)
		})
	}*/
})

function showSettings () {
	document.getElementById("settingsDropdown").classList.toggle("show");
}

window.onclick = function (event) {
	if (!event.target.matches('.dropbtn')) {
		var dropdowns = document.getElementsByClassName("dropdown-content");
		var i;
		for (i = 0; i < dropdowns.length; i++) {
			var openDropdown = dropdowns[i];
			if (openDropdown.classList.contains('show')) {
				openDropdown.classList.remove('show');
			}
		}
	}
}

function logOut () {
	window.localStorage.removeItem("accountToken")
	window.location.replace("http://krakenmeister.com:8080")
}

function displayAccount () {
	removeAllChildNodes(contentWrapper)
	var accountWrapper = document.createElement('p')
	accountWrapper.setAttribute('id', 'accountWrapper')
	accountWrapper.setAttribute('class', 'selem')
	getTotalValue().then(function(result) {
		var netWorth = document.createElement('p')
		netWorth.setAttribute('id', 'netWorth')
		netWorth.innerHTML = "Net Worth: $" + result
		accountWrapper.appendChild(netWorth)
		contentWrapper.appendChild(accountWrapper)
	})
	getBalance().then(function(result) {
		var balance = document.createElement('p')
		balance.setAttribute('id', 'cashBalance')
		balance.innerHTML = "Liquid Assets: $" + result
		accountWrapper.appendChild(balance)
	})
}

function displayStocks () {
	removeAllChildNodes(contentWrapper)

	var buyStockWrapper = document.createElement('div')
	buyStockWrapper.setAttribute('id', 'buyStockWrapper')
	buyStockWrapper.setAttribute('class', 'selem')
	createInput('text', 'stock-name', buyStockWrapper, "Stock ID:")
	createInput('text', 'stock-amount', buyStockWrapper, "Quantity:")

	var buyControl = document.createElement('div')
	buyControl.setAttribute('id', 'buyControl')

	var buyStockBtn = document.createElement('div')
	buyStockBtn.setAttribute('id', 'buyStockBtn')
	buyStockBtn.onclick = () => {
		var stock = document.getElementById('stock-name').value
		var quantity = document.getElementById('stock-amount').value
		buyStock(stock, quantity).then(function (response) {
			document.getElementById('stocklistWrapper').remove()
			var stocklistWrapper = document.createElement('div')
			stocklistWrapper.setAttribute('id', 'stocklistWrapper')
			getStocklist().then(function(result) {
				var stocklist = JSON.parse(result)
				for (var i=0; i<stocklist.length; i++) {
					createStockCard(stocklist[i].name, "stockCard" + i, stocklistWrapper, stocklist[i].quantity, () => {})
				}
				contentWrapper.appendChild(stocklistWrapper)
			})
		})
	}

	var sellStockBtn = document.createElement('div')
	sellStockBtn.setAttribute('id', 'sellStockBtn')
	sellStockBtn.onclick = () => {
		var stock = document.getElementById('stock-name').value
		var quantity = document.getElementById('stock-amount').value
		sellStock(stock, quantity).then(function (response) {
			document.getElementById('stocklistWrapper').remove()
			var stocklistWrapper = document.createElement('div')
			stocklistWrapper.setAttribute('id', 'stocklistWrapper')
			getStocklist().then(function(result) {
				var stocklist = JSON.parse(result)
				for (var i=0; i<stocklist.length; i++) {
					createStockCard(stocklist[i].name, "stockCard" + i, stocklistWrapper, stocklist[i].quantity, () => {})
				}
				contentWrapper.appendChild(stocklistWrapper)
			})
		})
	}

	buyControl.appendChild(buyStockBtn)
	buyControl.appendChild(sellStockBtn)
	buyStockWrapper.appendChild(buyControl)
	contentWrapper.appendChild(buyStockWrapper)

	var stocklistWrapper = document.createElement('div')
	stocklistWrapper.setAttribute('id', 'stocklistWrapper')
	getStocklist().then(function(result) {
		var stocklist = JSON.parse(result)
		for (var i=0; i<stocklist.length; i++) {
			createStockCard(stocklist[i].name, "stockCard" + i, stocklistWrapper, stocklist[i].quantity, () => {})
		}
		contentWrapper.appendChild(stocklistWrapper)
	})
}

function displayWatchlist () {
	removeAllChildNodes(contentWrapper)

	var searchStockWrapper = document.createElement('div')
	searchStockWrapper.setAttribute('id', 'searchStockWrapper')
	searchStockWrapper.setAttribute('class', 'selem')
	createInput('text', 'search-name', searchStockWrapper, "Stock ID:")

	var searchStockBtn = document.createElement('div')
	searchStockBtn.setAttribute('id', 'searchStockBtn')
	searchStockBtn.onclick = () => {
		var stock = document.getElementById('search-name').value
		if (document.getElementById('stockChart')) {
			document.getElementById('stockChart').remove()
		}
		createStockChart(stock, '3mo', '1wk', 'stockChart', contentWrapper, () => {})
	}

	searchStockWrapper.appendChild(searchStockBtn)
	contentWrapper.appendChild(searchStockWrapper)
}
