import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from "react-redux";
import * as actionCreators from "../Actions/index.js"
import { pricingInfo } from '../Data/products'
import { isNull } from 'util';

class Product extends Component {
    constructor(){
      super();
      this.state = {
        name:"",
        pricingTier:"",
        priceRange:"",
        weight:"",
        availability:"",
        productUrl:"",
        isEditable:"",
        budgetVals:null,

      }
    }

    componentDidMount(){
      //if user tries to load page directly without any product
      //redirect to home page
      if(isNull(this.props.singleProduct)){
        this.props.history.push('/')
      }
      //otherwise create local copy for editing
      else{
        this.setState({
          name:this.props.singleProduct.name,
          pricingTier:this.props.singleProduct.pricingTier,
          priceRange:this.props.singleProduct.priceRange,
          weight:this.props.singleProduct.weight,
          availability:this.props.singleProduct.availability,
          isEditable:this.props.singleProduct.isEditable,
          productUrl:this.props.singleProduct.productUrl,
          budgetVals:pricingInfo[this.props.singleProduct.pricingTier]
        })
      }
      
    }

    //on Input Box Change
    change(event){
      this.setState({
        [event.target.name]:event.target.value
      })
    }

    //On Radio Button Change
    changeRadio(event){
      if(event.target.type === "radio"){
        this.setState({
          [event.target.name]:event.target.value,
          budgetVals:pricingInfo[event.target.value]
        })
      }
    }

    //On CheckBox change
    onCheckBox(event){
      this.setState({
        [event.target.name]:!event.target.value
      }) 
    }

    
    //On Form Submit
    submit(event){
      event.preventDefault();
      const product = {
        name: this.state.name,
        pricingTier: this.state.pricingTier,
        priceRange: this.state.priceRange,
        weight: this.state.weight,
        availability: this.state.availability,
        productUrl: this.state.productUrl,
        isEditable: this.state.isEditable
      }
      console.log(product);
      this.props.updateProduct(this.props,product)
      this.props.history.push('/')
    }

    //On Cancelling Form Submit
    cancel(){
      this.props.history.push('/')
    }


  render() { 
    const tier = this.state.budgetVals;
    return (
      this.state.name !== null & tier !==null ? 
      <div className="container">
      <h3>Product Details</h3>
      <form onSubmit= {(e) => this.submit(e)}>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label >Product Name</label>
            <input type="text" className="form-control" id="prod-name" name="name"placeholder="Name" value={this.state.name} onChange={(e) => this.change(e)}required/>
          </div>
          <div className="form-group col-md-6">
            <label >Weight</label>
            <input type="number" className="form-control" id="prod-weight" name="weight" value={this.state.weight} onChange={(e) => this.change(e)} placeholder="Weight" required/>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label >Availablity</label>
            <input type="number" className="form-control" id="prod-avail" name="availability" value={this.state.availability} onChange={(e) => this.change(e)} placeholder="Availablity"/>
          </div>
          <div className="form-group col-md-6">
            <label >Product Url</label>
            <input type="text" className="form-control" id="prod-url" name="productUrl" value={this.state.productUrl} onChange={(e) => this.change(e)} placeholder="https://" required/>
          </div>
        </div>
 
 
        <div className="form-row">
          <div className="form-group col-md-6">
             <label >Price Tier</label>
      
        
              <div className="form-check">
                <input 
                  className="form-check-input"  
                  checked = {this.state.pricingTier === "premier"}
                  onChange = {(e) => this.changeRadio(e)}
                  type="radio" 
                  name="pricingTier" 
                  id="gridRadios1" 
                  value="premier"/> 
                  <label className="form-check-label">
                    Premier
                  </label><br></br>
                <input 
                className="form-check-input"  
                checked = {this.state.pricingTier === "budget"}
                onChange = {(e) => this.changeRadio(e)}
                type="radio" 
                name="pricingTier" 
                id="gridRadios2" 
                value="budget"/> 
                <label className="form-check-label">
                  Budget
                </label>
              </div>
            </div>


            <div className="form-group col-md-2">
              <label >Price Range</label>
              <select className="form-control" name="priceRange" onChange={(e) => this.change(e)} required> 
              { 
                tier.map(val => {
                  return(
                    <option key={val} selected={this.state.priceRange === val}>{val}</option>
                  )
                })
              }
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-check">
              <input className="form-check-input" type="checkbox" name="isEditable" defaultChecked={this.state.isEditable} value = {this.state.isEditable} onClick={(e) => this.onCheckBox(e)} id="prod-edit"/>
              <label className="form-check-label">
                Editable
              </label>
            </div>
          </div>

          <button type="submit" className="btn btn-success">Save</button>
          <button type="submit" className="btn btn-danger" onClick={() =>this.cancel()}>cancel</button>
        </form>
      </div>
      :
      <div></div>
    );
  }
}

const mapStateToProps=(state)=>{
    return state
  };

export default withRouter(connect(mapStateToProps,actionCreators)(Product));

