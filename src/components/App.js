import React, { Component } from 'react';
import Card from './card.js'
import axios from 'axios';

export default class App extends Component{
  constructor(props){
    super(props)
    this.getCoins = this.getCoins.bind(this)
    this.state = { 
      coins: [],
      updating: false,
      isLoading: false
    }
  }

  componentDidMount(){
    this.getCoins()
  }

  getCoins(){
    this.setState({isLoading: true})
    axios.get('https://api.coinmarketcap.com/v1/ticker/')
    .then(res => {
      const coins = this.mapCoins(res.data);
      this.setState({coins});
      setTimeout(
        function() {
          this.setState({isLoading: false});
        }
        .bind(this),
        2000
      );
    })
    .catch(err => {
      console.error('Error loading data from Coin Market Cap')
      console.error(err)
    })
  }

  mapCoins(coins){
    return coins.map(coin => ({
      symbol: coin.symbol,
      price: parseInt(coin.price_usd * 1000) / 1000,
    }))
  }

  render(){

    const { coins, isLoading } = this.state;
    let card = null;

    if(isLoading){
      card = (
        <div id="card-loading">
          <div id="card-loading-spinner"/>
        </div>
      )   
    }
    else if(coins.length > 0){
      card = (
        <Card coins={coins} />
      )  
    }
    
    return(
      <div className='api-data'>
        {card}
      </div>
    )
  }
}

