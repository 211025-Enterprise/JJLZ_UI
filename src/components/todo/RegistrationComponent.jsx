import React, {Component} from 'react'
//import AuthenticationService from './AuthenticationService.js'
import axios from 'axios'
class RegistrationComponent extends Component {
    
    constructor(props) {
        super(props)
        this.state = this.initialState
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.register = this.register.bind(this)
    }

   initialState={
    firstName: '',
    lastName: '',
    username: '',
    password: ''
   }

   register(){
    const user = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        username: this.state.username,
        password: this.state.password
       }
       axios.post('http://localhost:8080/createUser', user)
      .then((response) => {
          if(response.data != null)
            this.setState(this.initialState)
            alert("User Created Successfully")
       })
       this.props.history.push('/login') 
   }


    handleChange(event) {
        //console.log(this.state);
        this.setState(
            {
                [event.target.name]
                  :event.target.value
            }
        )
    }
    handleSubmit(event) {
        // Process submit from this.state
        event.preventDefault(); // Need to stop DOM from generating a POST
        }
    render() {
        return (
            <div>
                <h1>Registration</h1>
                <div className="container">
                    <form onSubmit={this.handleSubmit}>
                    First Name: <input type="text" name="firstName" value={this.state.firstName} placeholder='Enter First Name' onChange={this.handleChange}/><br/>
                    Last Name: <input type="text" name="lastName" value={this.state.lastName}  placeholder='Enter Last Name' onChange={this.handleChange}/><br/>
                    UserName: <input type="text" name="username" value={this.state.username} placeholder='Enter username'  onChange={this.handleChange}/><br/>
                    Password: <input type="password" name="password" value={this.state.password}  placeholder='Enter password' onChange={this.handleChange}/><br/><br/>
                    <button className="btn btn-success " onClick={this.register}>Register</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default RegistrationComponent