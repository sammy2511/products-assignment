import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from "react-redux";
import * as actionCreators from "../Actions/index.js"

class Item extends Component {

  onEdit(item_name){
    this.props.getProduct(this.props,item_name);
    this.props.history.push('/edit-product');
  }

  render() {  
    const product = this.props.product;

    return (
      <tr>
        <td >{product.name}</td>
        <td>{product.weight}</td>
        <td>{product.availability}</td>
        {
          product.isEditable ? 
          <td>
            <button 
              className="btn btn-primary" 
              onClick = {this.onEdit.bind(this,product.name)}
            >Edit
              </button>
          </td> 
          : 
          <td></td>
        }
      </tr>
    );
  }
}

const mapStateToProps=(state)=>{
  return state
};

export default withRouter(connect(mapStateToProps,actionCreators)(Item));
