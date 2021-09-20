import Head from 'next/head';
import coinGecko from 'coingecko-api';
import Route from "react-router-dom";


const coinGeckoClient =  new coinGecko();
export default function Home(props) {
  const {data} = props.result;
  const perFormat = num =>
  `${new Number(num).toFixed(2)}%`

  const priceFormat = (num,maxsgd)=>
  new Intl.NumberFormat(
    'en-Us',{
      style:'currency',
      currency:'usd',
      maxsgd
    }
  ).format(num);

  const CurSupFormat = (num,maxsgd) =>
  new Intl.NumberFormat(
    'en-US',{
      maxsgd
    }
  ).format(num);
  
  return (
    <div>
      <Head>
        <title>CoinCape</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <table className ='table table-hover table-dark'>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name/Symbol</th>
              <th>24H Change</th>
              <th>Price</th>
              <th>Market cap</th>
              <th>Total Cirulating Supply</th>
            </tr>
          </thead>
          <tbody>
            {data.map(coin =>(
              <tr key={coin.id}>
                <td>{coin.market_cap_rank}</td>
                <td>
                  <img
                  src = {coin.image}
                  style = {{width:25, height:25, marginRight:10}}
                  />{coin.name}</td>
                <td>
                  <span
                  className={coin.price_change_percentage_24h > 0 ?(
                    'text-success'):'text-danger'}
                  >{perFormat(coin.price_change_percentage_24h)}
                  </span></td>
                <td>{priceFormat(coin.current_price,20)}</td>
                <td>{priceFormat(coin.market_cap,12)}</td>
                <td>{CurSupFormat(coin.circulating_supply,3)}</td>
              </tr>
            ))}
          </tbody> 
        </table>
    </div>
  )
}
export async function getServerSideProps(context){
  const params = {
    order: coinGecko.ORDER.MARKET_CAP_DESC
  }
  let result = await coinGeckoClient.coins.markets({params});
  return{
    props:{
      result
    }
  };
}