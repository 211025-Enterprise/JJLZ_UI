import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import AuthenticatedRoute from './AuthenticatedRoute.jsx'
import LoginComponent from './LoginComponent.jsx'
import WatchListComponent from './WatchListComponent.jsx'
import ErrorComponent from './ErrorComponent.jsx'
import HeaderComponent from './HeaderComponent.jsx'
import FooterComponent from './FooterComponent.jsx'
import LogoutComponent from './LogoutComponent.jsx'
import WelcomeComponent from './WelcomeComponent.jsx'
import RegistrationComponent from './RegistrationComponent.jsx'
import UserComponent from './UserComponent.jsx'
import StockComponent from './StockComponent.jsx'
import JJLZ from './JJLZ.jsx'


class UserHome extends Component {
    render() {
        return (
            <>
        <div id="header">
        <div id="logo-icon"></div>
        <div id="logo-text">JJLZ Algos</div>
        <div id="margin"></div>
        <div class="dropdown" id="account">
                <div class="dropbtn" id="settingsBtn"></div>
                <div id="settingsDropdown" class="dropdown-content">
                        <div id="logOutBtn">Log Out</div>
                        <div id="accountBtn">Account</div>
                        <div id="stocksBtn">Manage Stocks</div>
                        <div id="watchlistBtn">View Watchlist</div>
                </div>
        </div>
</div>
<div id="content-wrapper" class="userpage">
</div>
</>
        )
    }
}

export default UserHome