import React, { Component } from 'react'


class OpcionesSelect extends Component {
  
  render() { 
    const { id, name } = this.props.moneda;
    return ( 
      <option value= {id}>
         {name}
      </option>
     );
  }
}
 
export default OpcionesSelect;