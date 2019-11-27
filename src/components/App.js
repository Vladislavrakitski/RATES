import React, { Component } from 'react';
import axios from 'axios';

export default class App extends React.Component{
  constructor(props){
    super(props)
    this.getCoins = this.getCoins.bind(this)
    this.setIndex = this.setIndex.bind(this)
    this.state = {
      coins: [],
      index: 0,
      updating: false,
      isLoading: false
    }
  }
  componentDidMount(){
    this.getCoins()
  }
  componentDidUpdate(prevProps, prevState){
    if(prevState.index !== this.state.index){
      if(this.state.isShowingTooltip){
        this.setState({isShowingTooltip: false})
      }       
      this.setState({updating: true})
      setTimeout(() => {
        this.setState({updating: false})
      }, 200)
    }
  }
  getCoins(){
    this.setState({isLoading: true})
    axios.get('https://api.coinmarketcap.com/v1/ticker/')
      .then(res => {
        const coins = this.mapCoins(res.data)
        this.setState({coins})
        this.setState({isLoading: false})
      })
      .catch(err => {
        console.error('Error loading data from Coin Market Cap')
        console.error(err)
      })
  }
  mapCoins(coins){
    return coins.map(coin => ({
      name: coin.name,
      symbol: coin.symbol,
      price: formatNum(coin.price_usd)
    }))
  }
  setIndex(index){
    this.setState({index})
  }
  render(){
    const {
      coins, 
      index, 
      updating,
      isLoading
    } = this.state

    let card = null

    if(isLoading){
      card = (
        <div id="card-loading">
          <div id="card-loading-spinner"/>
        </div>
      )   
    }
    else if(coins.length > 0){
      card = (
        <Card 
          coins={coins} 
          index={index}
          setIndex={this.setIndex}
        />
      )  
    }
    
    return(
      <div id="app" className={updating ? 'updating' : ''}>
        {card}
      </div>
    )
  }
}

class Card extends React.Component{
  render(){
    const {coins, index} = this.props,
          coin = coins[index]
    return(
      <div id="card-wrapper">

        <div id="coin-header">

          <div id="coin-name">
            <h1>{coin.name}</h1>
          </div>

          <div id="coin-symbol">
            <h1>{coin.symbol}</h1>
          </div>

        </div>

        <div id="coin-price">
          <h1>${coin.price}</h1>
        </div>

      </div>
    )
  }
}



const formatNum = num => {
  const splitNum = num.split('.'),
        firstHalf = splitNum[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        secondHalf = splitNum[1] ? splitNum[1].substring(0, 2) : splitNum[1]

  return secondHalf ? `${firstHalf}.${secondHalf}` : firstHalf
}



