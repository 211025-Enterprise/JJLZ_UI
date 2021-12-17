import React, {Component} from 'react'
//import DataService from '../../api/todo/DataService.js'
import SearchBar  from './SearchBar.jsx'

class WatchListComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            todos : 
            [
             {id: 1, stockname : 'Amazon',price: '$700' , targetDate: new Date()},
             {id: 2, stockname : 'Home Depo',price: '$300' , targetDate: new Date()},
             {id: 3, stockname : 'Revature',price: '$400' , targetDate: new Date()}
            ]
        }
    }

    render() {
        return (
            <div>
                 <h1>Watch List</h1>
                  <SearchBar/> 
                 <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Stock Name</th>
                                <th>Price</th>
                                <th>Target Date</th>                   
                            </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.todos.map (
                                todo =>
                                    <tr key={todo.id}>
                                        <td>{todo.stockname}</td>
                                        <td>{todo.price}</td>
                                        <td>{todo.targetDate.toString()}</td>
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

// function SearchBar(){

//     return (<form action="/welcome/name" method="get">
//     <label htmlFor="header-search">
//         <span className="visually-hidden">Search Stock Name</span>
//     </label>
//     <input
//         type="text"
//         id="header-search"
//         placeholder="Search blog posts"
//         name="s" 
//     />
//     <button type="submit">Search</button>
//     </form>)
    
//     }
export default WatchListComponent