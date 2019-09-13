import React,{Component} from 'react';
import Header from './componentes/Header';
import Formulario from './componentes/Formulario';
import Resultado from './componentes/Resultado';
import axios  from 'axios'


class App extends Component {

  token = 'c038e725-203b-44e6-a47e-4e8d8dcafedf';

  state = {
    monedas: {},
    cotizacion: {},
    monedaCotizada: '',
    cargando: false,
  }
 
 async componentDidMount() {
   this.obtenerMonedas();
 }
  
  obtenerMonedas = async () => {
    const url = `https://api.coinmarketcap.com/v2/ticker/`;

    await axios.get(url)
      .then(respuesta => {
        this.setState({
          monedas: respuesta.data.data,
        })
      })
      .catch(error => {
        console.log(error);
      })

  }

  //cotizar una crypto en vase a una monedas
  convercionMonedas = async (monedas) => {
    const { moneda, cryptoMoneda } = monedas;
    
    const url = `https://api.coinmarketcap.com/v2/ticker/${cryptoMoneda}/?convert=${moneda}`

    await axios.get(url)
      .then(respuesta => {
        this.setState({
          cargando: true
        })
        setTimeout(() => {
          this.setState({
          cotizacion: respuesta.data.data,
          monedaCotizada: moneda,
          cargando: false
       })
        }, 3000);
      })
      .catch(error => {
          console.log(error);
        })
  }

  render() {

    const cargando = this.state.cargando;
    let resultado;

    if (cargando) {
      resultado = <div className="sk-folding-cube">
                      <div className="sk-cube1 sk-cube"></div>
                      <div className="sk-cube2 sk-cube"></div>
                      <div className="sk-cube4 sk-cube"></div>
                      <div className="sk-cube3 sk-cube"></div>
                  </div>
    } else {
      resultado =  <Resultado
                      cotizacion={this.state.cotizacion}
                      monedaCotizada = {this.state.monedaCotizada}
                    />
    }

    return (
    <div className="container">
      <Header
        titulo = "Cotizador de CryptoMonedas"
      />
      <div className="row justify-content-center">
        <div className="col-md-6 bg-light pb-4 contenido-principal">
            <Formulario
              monedas={this.state.monedas}
              convercionMonedas = {this.convercionMonedas}
            />
            {resultado}
        </div>
      </div>
    </div>
  );
  }
  
}

export default App;
