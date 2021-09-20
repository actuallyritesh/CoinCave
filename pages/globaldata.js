import React from 'react'
import { render } from 'react-dom'
import CoinGecko from 'coingecko-api';


const CoinGeckoClient = new CoinGecko();
const perFormat = num =>
  `${new Number(num).toFixed(2)}%`

export default class GlobalData extends React.Component{
    

    state = {
        loading: true,
        dominance : null,
        dominance1 : null,
        market_change : null
    };
    async componentDidMount(){
        const data = await CoinGeckoClient.global();
        this.setState({dominance: data.data.data.market_cap_percentage.btc,loading:false});
        this.setState({dominance1: data.data.data.market_cap_percentage.eth,loading:false});
        this.setState({market_change: data.data.data.market_cap_change_percentage_24h_usd});
    }

render(){
    return (<div className="container">
        <div className="text-center">
        {this.state.loading || !this.state.dominance? <span>loading...</span>:<span>
            <span>Bitcoin dominance: {perFormat(this.state.dominance)}&nbsp;&nbsp;&nbsp;&nbsp;</span>
           </span>}
        {this.state.loading || !this.state.dominance1? <span>loading...</span>:<span>
            <span>Etherium dominance: {perFormat(this.state.dominance1)}&nbsp;&nbsp;&nbsp;&nbsp;</span>
            </span>}
        <span>24H Market Change: </span><span className={this.state.market_change> 0 ?
                ('text-success'):'text-danger'}>{perFormat(this.state.market_change)}</span>
        </div>
        </div>);

}
}