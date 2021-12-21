import React, {Component} from 'react'
import AuthenticationService from './AuthenticationService.js'
import axios from 'axios'
class LoginComponent extends Component {
    
    constructor(props) {
        super(props)
        
        this.state = this.initialState
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.login = this.login.bind(this)
        this.refreshPage = this.refreshPage.bind(this)
    }

    handleChange(event) {
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
    initialState={
            username: "",
            password: ""
       }
    login() {
        this.props.history.push(`/welcome/${this.state.username}`)
        const loggedUser = {
            username: this.state.username,
            password: this.state.password
           }  
           axios.post('http://localhost:8080/logged', loggedUser)
          .then((response) => {
              if(response.data != null)
              AuthenticationService.registerSuccessfulLogin(this.state.username,this.state.password)  
                this.setState(this.initialState)     
               alert("You have logged in Successfully")                
           }).catch(() => 
           alert("User not exsit"),  
            this.refreshPage()
           )

           //*************** */
        //     // if(this.state.username==='zeyad' && this.state.password==='zeyad'){
        //     //     AuthenticationService.registerSuccessfulLogin(this.state.username,this.state.password)
        //     //     this.props.history.push(`/welcome/${this.state.username}`)
        //     //     //this.setState({showSuccessMessage:true})
        //     //     //this.setState({hasLoginFailed:false})
        //     // }
        //     // else {
        //     //     this.setState({showSuccessMessage:false})
        //     //     this.setState({hasLoginFailed:true})
        //     // }
    
        //     AuthenticationService
        //     .executeBasicAuthenticationService(this.state.username, this.state.password)
        //     .then(() => {
        //         AuthenticationService.registerSuccessfulLogin(this.state.username,this.state.password)
        //         this.props.history.push(`/welcome/${this.state.username}`)
        //     }).catch( () =>{
        //         this.setState({showSuccessMessage:false})
        //         this.setState({hasLoginFailed:true})
        //     })
        // }

           //************************* */
                         
    }

     refreshPage() {
        window.location.reload(false);
      }
    
    render() {
        return (
            <div>
                <h1>Login</h1>
                <div className="container">
                <form onSubmit={this.handleSubmit} >
                    {/*<ShowInvalidCredentials hasLoginFailed={this.state.hasLoginFailed}/>*/}
                    {/* {this.state.hasLoginFailed && <div className="alert alert-warning">Invalid Credentials</div>}
                    {this.state.showSuccessMessage && <div>Login Sucessful</div>} */}
                    {/*<ShowLoginSuccessMessage showSuccessMessage={this.state.showSuccessMessage}/>*/}
                    UserName: <input type="text" name="username" value={this.state.username} placeholder='Enter username' onChange={this.handleChange}/>
                    Password: <input type="password" name="password" value={this.state.password} placeholder='Enter password' onChange={this.handleChange}/>
                    <button className="btn btn-success " onClick={this.login} >Login</button><br />
                    </form>
                </div>
            </div>
        )
    }
}

    
export default LoginComponent
