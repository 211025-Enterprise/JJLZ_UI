import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import AuthenticationService from './AuthenticationService.js'
class WelcomeComponent extends Component {
    render() {
        const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
        return (
            
            <>
                <h1>Welcome To JJLZ!</h1>
                <div className="container">    
                {/* Welcome {this.props.match.params.name}. You can manage your todos <Link to="/watchlist">Watch List</Link>. */}
                Welcome {this.props.match.params.name}. You can manage your Stocks.
                <br/><br/>
                {!isUserLoggedIn &&<Link className="nav-link text-info" to="/register">Register</Link>}
                {!isUserLoggedIn &&<Link className="nav-link text-info" to="/login">Login</Link>}
                </div>       
            </>        
        )        
    }
}
export default WelcomeComponent