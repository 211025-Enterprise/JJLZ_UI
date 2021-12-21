import React, { Component } from 'react'
import AutoCompleteText from './AutoCompleteText'
import SPFiveStocks from './SPFiveStocks';
import './AutoCompleteText.css';

export default class SearchBar extends Component{
  
    constructor(props){
        super(props)
        this.state= {
            print: false
        };
    }

render(){
    return(<form action="/stock" method="get" align="center">
        <div className='SearchBar' >
           <div className="App-Component">
                <AutoCompleteText items={SPFiveStocks} updateFunction={this.props.updateFunction}/>
        </div>
        </div>
        <button type="submit" >Add to Watchlist</button>
        <button type="submit" >Buy</button>
        <button type="submit" >Sell</button>
        </form>
        
    );
};
}

// function SearchBar(){

//     return (<form action="/stock" method="get" align="center">
//     <label htmlFor="header-search">
//       <span className="visually-hidden" >  </span>
//       <AutoCompleteText />
//     </label>
//     <input
//         type="text"
//         id="header-search"
//         placeholder="Enter Stock Name"
//         name="s" 
//     />
//     <button type="submit">Search</button>
//     </form>)
//     }
