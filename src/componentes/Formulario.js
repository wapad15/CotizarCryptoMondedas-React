import React, { Component } from 'react'
import OpcionesSelect from './OpcionesSelect'


class Formulario extends Component {
   
  monedaRef = React.createRef();
  CryptoMonedaRef = React.createRef();

  cotizarMonedas = (e) => {
    e.preventDefault();
   
    //leer los ref y crear el objeto
    const cotizacion = {
      moneda: this.monedaRef.current.value,
      cryptoMoneda: this.CryptoMonedaRef.current.value,
    }
    
    //enviar el objeto por proto 
    this.props.convercionMonedas(cotizacion);
    //resetear el formulario (opcional)
  }
 
  render() { 
    return ( 
      <form onSubmit = {this.cotizarMonedas}>
        <div className="form-group">
          <label>Moneda:</label>
          <select ref={this.monedaRef} className="form-control">
            <option value="" disabled defaultValue >Elige tu moneda</option>
            <option value="USD">Dolar Estadounidense</option>
            <option value="MXM">Peso Mexicano</option>
            <option value="GBP">Libras</option>
            <option value="EUR">Euro</option>
            <option value="COP">Peso Colombiano</option>
          </select>
        </div>
        <div className="form-group">
          <label>CryptoMoneda:</label>
          <select ref={this.CryptoMonedaRef} className="form-control">
            {Object.keys(this.props.monedas).map(key => (
              <OpcionesSelect
                moneda ={this.props.monedas[key]}
                key= {key}
              />
              ))}
          </select>
        </div>
        <div className="form-group">
          <input type="submit" className="btn btn-primary" value="Cotizar"/>
        </div>
      </form>
     );
  }
}
 
export default Formulario;