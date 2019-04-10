import React, { Component } from 'react';
import './App.css';
import Item from './Components/Item'
import {connect} from "react-redux";
import * as actionCreators from "./Actions/index.js"

class App extends Component {


  componentDidMount(){
    if(this.props.products.length === 0){
      console.log("no products")
      this.props.loadProducts();
    }

  }


  render() { 
  const { products } = this.props;
    return (
     products !==null ? 
     <div className="container">
     <h3>Products</h3> 
     <table className="table" >
     
<thead>
 <tr>
   
   <th scope="col">Name</th>
   <th scope="col">Weight</th>
   <th scope="col">Availablity</th>
   <th scope="col">Availabe to Edit</th>
 </tr>
</thead>
<tbody>
 { 
   products.map(product => {
     return(
       <Item key = {product.name} product = {product}></Item>
     )
   })
 }
</tbody>
</table>
   </div>:<div></div>

    );
  }
}

const mapStateToProps=(state)=>{
    return state
};

export default connect (mapStateToProps,actionCreators)(App);
