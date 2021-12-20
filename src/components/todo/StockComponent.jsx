import React, {Component} from 'react';
import Plot from 'react-plotly.js';
import SearchBar from './SearchBar';
class StockComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stockChartXValues: [],
      stockChartYValues: [],
      searchText: ""
    }
  }

  updateSearchText = async (text) =>{
    await this.setState({searchText: text}) 
    // setState behind scenes
    
    var sda = text;
    console.log(sda)
  }

  componentDidMount=()=> {
    // console.log('mounting') 
    // this.updateSearchText()
    // console.log('states search text: ', this.state.searchText) 
    // this.fetchStock(this.state.searchText);
    // console.log(this.state.searchText);
  }


  fetchStock=(text) =>{
    const pointerToThis = this;
    console.log(pointerToThis);
    const API_KEY = 'HGJWFG4N8AQ66ICD';
    console.log(text)
    let StockSymbol = text;
    //StockSymbol = text;
    let API_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${StockSymbol}&outputsize=compact&apikey=${API_KEY}`;
    let stockChartXValuesFunction = [];
    let stockChartYValuesFunction = [];

    fetch(API_Call)
      .then(
        function(response) {
          return response.json();
        }
      )
      .then(
        function(data) {
          console.log(data);

          for (var key in data['Time Series (Daily)']) {
            stockChartXValuesFunction.push(key);
            stockChartYValuesFunction.push(data['Time Series (Daily)'][key]['1. open']);
          }

          // console.log(stockChartXValuesFunction);
          pointerToThis.setState({
            stockChartXValues: stockChartXValuesFunction,
            stockChartYValues: stockChartYValuesFunction
          });
        }
      )
  }
  
  handleBuy = () => {
    
  }

  render() {
    return (
      <div>
        <SearchBar updateFunction={this.updateSearchText, this.fetchStock} onBuy={this.handleBuy}/>
        <Plot
          data={[
            {
              x: this.state.stockChartXValues,
              y: this.state.stockChartYValues,
              type: 'scatter',
              mode: 'lines+markers',
              marker: {color: 'blue'},
            }
          ]}
          layout={{width: 720, height: 440, title: 'alc'}}
        />
      </div>
    )
  }
  
}
// function SearchBar(){

//   return (<form action="/stock" method="get" align="center">
//   <label htmlFor="header-search">
//       <span className="visually-hidden" > Search Stock Name</span>
//   </label>
//   <input  type="text"  id="header-search"  placeholder="Enter Stock Name"  name="s" />
//   <button type="submit">Search</button>
//   </form>)
//   }
export default StockComponent;