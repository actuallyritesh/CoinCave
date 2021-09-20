import 'bootstrap/dist/css/bootstrap.min.css';
import GlobalData from './globaldata';
import Header from './header';

function MyApp({ Component, pageProps }) {
   
  return (
    
    <div className="bg-dark text-white">
      <Header/>
    <GlobalData {...pageProps}/>
  <Component {...pageProps} />
  </div>
)
}

export default MyApp
