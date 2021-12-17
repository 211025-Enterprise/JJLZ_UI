import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import AuthenticationService from './AuthenticationService.js'


class HeaderComponent extends Component {
    render() {
        const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
        //console.log(isUserLoggedIn);

        return (
            <header>
                <nav className="navbar navbar-expand-md navbar-dark bg-info">
                    {/* <div><a href="http://www.GOOGLE.com" className="navbar-brand">JJLZ</a></div> */}
                    {<Link className="nav-link navbar-brand" to="/jjlz">JJLZ</Link>}
                    <ul className="navbar-nav">
                        {isUserLoggedIn && <li><Link className="nav-link text-dark" to="/welcome/JJLZ">Home</Link></li>}
                        {!isUserLoggedIn && <li><Link className="nav-link text-dark" to="/welcome">Home</Link></li>}
                        {isUserLoggedIn && <li><Link className="nav-link text-dark" to="/watchlist">Watch List</Link></li>}
                        {isUserLoggedIn && <li><Link className="nav-link text-dark" to="/userDetail">UserDetail</Link></li>}
                        {isUserLoggedIn && <li><Link className="nav-link text-dark" to="/stock">Stock_Symbol</Link></li>}
                    </ul>
                    <ul className="navbar-nav navbar-collapse justify-content-end">
                        {!isUserLoggedIn &&<li><Link className="nav-link text-dark" to="/register">Register</Link></li>}
                        {!isUserLoggedIn && <li><Link className="nav-link text-dark" to="/login">Login</Link></li>}
                        {isUserLoggedIn && <li><Link className="nav-link text-dark" to="/logout" onClick={AuthenticationService.logout}>Logout</Link></li>}
                    </ul>
                </nav>
            </header>
        )
    }
}
export default HeaderComponent