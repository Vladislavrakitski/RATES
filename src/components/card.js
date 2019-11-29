import React, { Component } from 'react';

export default class Card extends Component{
  render(){
    let {coins} = this.props;

    let btc = coins[0];
    let eth = coins[1];
    let xrp = coins[2];
    let bch = coins[4];
    let ltc = coins[5];

    return(
      <div className='container rates'>

          <div className='rates-str row col-sm-8 col-md-6 '>
            <div className="crypto-name col-6">
              <h1>{btc.symbol}</h1>
            </div>
            <div className="crypto-rate col-6">
              <h1>{btc.price}$</h1>
            </div>  
          </div>

          <div className='rates-str row col-sm-8 col-md-6 '>
            <div className="crypto-name col-6">
              <h1>{eth.symbol}</h1>
            </div>
            <div className="crypto-rate col-6">
              <h1>{eth.price}$</h1>
            </div>  
          </div>

          <div className='rates-str row col-sm-8 col-md-6 '>
            <div className="crypto-name col-6">
              <h1>{xrp.symbol}</h1>
            </div>
            <div className="crypto-rate col-6">
              <h1>{xrp.price}$</h1>
            </div>  
          </div>

          <div className='rates-str row col-sm-8 col-md-6 '>
            <div className="crypto-name col-6">
              <h1>{bch.symbol}</h1>
            </div>
            <div className="crypto-rate col-6">
              <h1>{bch.price}$</h1>
            </div>  
          </div>

          <div className='rates-str row col-sm-8 col-md-6 '>
            <div className="crypto-name col-6">
              <h1>{ltc.symbol}</h1>
            </div>
            <div className="crypto-rate col-6">
              <h1>{ltc.price}$</h1>
            </div>  
          </div>
          
      </div>
    )
  }
}