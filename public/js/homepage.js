var contentWrapper = null
var totalValue
var fullName

var checkExist = setInterval(function() {
	if ($('#content-wrapper').length) {
		contentWrapper = document.getElementById('content-wrapper')

		document.getElementById('create').onclick = function() {createForm()}
		document.getElementById('logIn').onclick = function() {logInForm()}
		clearInterval(checkExist);
	}
}, 100);   

 
function createForm() {
	removeAllChildNodes(contentWrapper)
	newElement('p', 'title', contentWrapper)
	newElement('form', 'createForm', contentWrapper)
	var form = document.getElementById('createForm')
	form.setAttribute('class', 'homepageForm')
	createInput('text', 'fname', form, "First Name:")
	createInput('text', 'lname', form, "Last Name:")
	createInput('text', 'uname', form, "New Username:")
	createInput('password', 'pass', form, "New Password:")
	newElement('div', 'formControl', form)
	var formControl = document.getElementById('formControl')
	newElement('p', 'back', formControl)
	newElement('p', 'submit', formControl)
	newElement('p', 'spacer', formControl)
	document.getElementById('submit').innerHTML = "Register"
	document.getElementById('back').onclick = function() {goHome()}
	document.getElementById('submit').onclick = function() {createUser()}

	document.getElementById('title').style.marginBottom = '2rem'
	addBlurryBackground(form, contentWrapper)
}

function logInForm() {
	removeAllChildNodes(contentWrapper)
	newElement('p', 'title', contentWrapper)
	newElement('form', 'logInForm', contentWrapper)
	var form = document.getElementById('logInForm')
	form.setAttribute('class', 'homepageForm')
	createInput('text', 'username', form, "Username:")
	createInput('password', 'password', form, "Password:")
	newElement('div', 'formControl', form)
	var formControl = document.getElementById('formControl')
	newElement('p', 'back', formControl)
	newElement('p', 'submit', formControl)
	newElement('p', 'spacer', formControl)
	document.getElementById('submit').innerHTML = "Log In"
	document.getElementById('back').onclick = function() {goHome()}
	document.getElementById('submit').onclick = function() {logIn()}

	document.getElementById('title').style.marginBottom = '2rem'
	addBlurryBackground(form, contentWrapper)
}

function goHome() {
	removeAllChildNodes(contentWrapper)
	newElement('p', 'title', contentWrapper)
	newElement('p', 'create', contentWrapper)
	newElement('p', 'logIn', contentWrapper)
	document.getElementById('create').onclick = function() {createForm()}
	document.getElementById('logIn').onclick = function() {logInForm()}
}

function addBlurryBackground(formElement, parentElement) {
	var rect = formElement.getBoundingClientRect()
	var formBackground = document.createElement('div')
	formBackground.setAttribute('id', 'formBackground')
	formBackground.style.left = rect.left + 'px'
	formBackground.style.top = rect.top + 'px'
	formBackground.style.width = (rect.right - rect.left) + 'px'
	formBackground.style.height = (rect.bottom - rect.top) + 'px'
	formBackground.style.setProperty('--formPos', '-' + rect.left + 'px -' + rect.top + 'px')
	parentElement.appendChild(formBackground)
}

function createUser() {
	var formData = {
		firstName: $("#fname").val(),
		lastName: $("#lname").val(),
		username: $("#uname").val(),
		password: $("#pass").val()
	}

	//console.log('creating user')
	$.ajax({
		type: "POST",
		contentType: "application/json",
		url: "http://krakenmeister.com:8080/createUser",
		data: JSON.stringify(formData),
		dataType: 'json',
		success: function (result) {
			if (result.status == "success") {
				removeAllChildNodes(contentWrapper)
				newElement('p', 'title', contentWrapper)
				newElement('p', 'register-success', contentWrapper)
				newElement('p', 'back', contentWrapper)
				document.getElementById('back').onclick = function() {goHome()}
			} else {
				removeAllChildNodes(contentWrapper)
				newElement('p', 'title', contentWrapper)
				newElement('p', 'register-fail', contentWrapper)
				newElement('p', 'back', contentWrapper)
				document.getElementById('back').onclick = function() {goHome()}
			}
		},
		error: function (e) {
			removeAllChildNodes(contentWrapper)
			newElement('p', 'title', contentWrapper)
			newElement('p', 'register-fail', contentWrapper)
			newElement('p', 'back', contentWrapper)
			document.getElementById('back').onclick = function() {goHome()}
		}
	})
}

function logIn() {
	var formData = {
		username: $("#username").val(),
		password: $("#password").val()
	}

	$.ajax({
		type: "POST",
		contentType: "application/json",
		url: "http://krakenmeister.com:8080/logged",
		data: JSON.stringify(formData),
		dataType: 'text',
		success: function (result) {
			console.log(result)
			if (result != "invalid") {
				window.localStorage.setItem("accountToken", result)
				removeAllChildNodes(contentWrapper)
				contentWrapper.setAttribute('class', 'userpage')

				var header = document.createElement('div')
				header.setAttribute('id', 'header')

				var logoIcon = document.createElement('div')
				logoIcon.setAttribute('id', 'logo-icon')

				var logoText = document.createElement('div')
				logoText.setAttribute('id', 'logo-text')
				logoText.innerHTML = 'JJLZ Algos'

				var margin = document.createElement('div')
				margin.setAttribute('id', 'margin')

				var dropdown = document.createElement('div')
				dropdown.setAttribute('id', 'account')
				dropdown.setAttribute('class', 'dropdown')

				var dropBtn = document.createElement('div')
				dropBtn.setAttribute('id', 'settingsBtn')
				dropBtn.setAttribute('class', 'dropbtn')
				dropBtn.onclick = function() {showSettings()}

				var settingsDropdown = document.createElement('div')
				settingsDropdown.setAttribute('id', 'settingsDropdown')
				settingsDropdown.setAttribute('class', 'dropdown-content')

				var logOutBtn = document.createElement('div')
				logOutBtn.setAttribute('id', 'logOutBtn')
				logOutBtn.innerHTML = "Log Out"
				logOutBtn.onclick = function() {logOut()}

				var accountBtn = document.createElement('div')
				accountBtn.setAttribute('id', 'accountBtn')
				accountBtn.innerHTML = "Account"
				accountBtn.onclick = function() {displayAccount()}

				var stocksBtn = document.createElement('div')
				stocksBtn.setAttribute('id', 'stocksBtn')
				stocksBtn.innerHTML = "Manage Stocks"
				stocksBtn.onclick = function() {displayStocks()}

				var watchlistBtn = document.createElement('div')
				watchlistBtn.setAttribute('id', 'watchlistBtn')
				watchlistBtn.innerHTML = "View Watchlist"
				watchlistBtn.onclick = function() {displayWatchlist()}

				settingsDropdown.appendChild(logOutBtn)
				settingsDropdown.appendChild(accountBtn)
				settingsDropdown.appendChild(stocksBtn)
				settingsDropdown.appendChild(watchlistBtn)

				dropdown.appendChild(dropBtn)
				dropdown.appendChild(settingsDropdown)

				header.appendChild(logoIcon)
				header.appendChild(logoText)
				header.appendChild(margin)
				header.appendChild(dropdown)

				var root = document.getElementById('root')
				root.appendChild(header)

				$.ajax({
					type: "POST",
					contentType: "application/json",
					url: "http://krakenmeister.com:8080/fullname",
					headers: { 'Authorization': window.localStorage.getItem("accountToken") },
					dataType: 'text',
					success: function (result) {
						fullName = result
						if (document.getElementById('settingsBtn')) {
							document.getElementById('settingsBtn').innerHTML = fullName
						}
					},
					error: function (e) {
						console.log(e)
						//logOut()
					}
				})
				displayAccount()
			} else {
				removeAllChildNodes(contentWrapper)
				newElement('p', 'title', contentWrapper)
				newElement('p', 'login-fail', contentWrapper)
				newElement('p', 'back', contentWrapper)
				document.getElementById('back').onclick = function() {goHome()}
			}
		},
		error: function (e) {
			console.log(e)
			removeAllChildNodes(contentWrapper)
			newElement('p', 'title', contentWrapper)
			newElement('p', 'login-fail', contentWrapper)
			newElement('p', 'back', contentWrapper)
			document.getElementById('back').onclick = function() {goHome()}
		}
	}
	)
}

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
