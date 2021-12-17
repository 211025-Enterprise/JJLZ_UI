import React, {Component} from 'react'
//import DataService from '../../api/todo/DataService.js'
import SearchBar  from './SearchBar.jsx'
import axios from 'axios'

class UserComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            users : []
        };
    }
componentDidMount(){
this.getUser();
}
getUser(){
    axios.get("http://localhost:8080/users")
    //.then(response => console.log(response.data))
    .then(response => response.data)
    .then((response) => {
          this.setState({users : response.data})
     })
}
render() {
    return (
        <div>
             <h1>User Detail</h1>
              <SearchBar/> 
             <div className="container">
                <table className="table">
                    <thead>
                        <tr>
                            <th>FirstName</th>
                            <th>LastName</th>
                            <th>Balance</th>                   
                        </tr>
                    </thead>
                    <tbody>
                    {
                       
                        this.state.users.map (
                            user =>
                                <tr key={user.userId}>
                                    <td>{user.firstName}</td>
                                    <td>{user.lastName}</td>
                                    <td>{user.balance}</td>
                                </tr>
                        )
                        }
                    </tbody>
                </table>
             </div>
        </div>
    )
  }
}

export default UserComponent