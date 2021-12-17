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
//import SearchBar from './SearchBar.jsx'

class TodoApp extends Component {
    render() {
        return (
            <div className="TodoApp">
                <Router>
                    <>
                        <HeaderComponent/>
                        <Switch>
                            <Route path="/" exact component={WelcomeComponent}/>  
                            <Route path="/welcome" exact component={WelcomeComponent}/>                     
                            <Route path="/register" component={RegistrationComponent}/>
                            <Route path="/login" component={LoginComponent}/>
                            <Route path="/jjlz" component={JJLZ}/>
                            <Route path="/userDetail" component={UserComponent}/>
                            <Route path="/stock" component={StockComponent}/>
                            <AuthenticatedRoute path="/welcome/:name" component={WelcomeComponent}/>
                            <AuthenticatedRoute path="/watchlist" component={WatchListComponent}/>
                            <AuthenticatedRoute path="/logout" component={LogoutComponent}/>
                            <Route component={ErrorComponent}/>
                        </Switch>
                        <FooterComponent/>
                    </>
                </Router>
            </div>
        )
    }
}

export default TodoApp