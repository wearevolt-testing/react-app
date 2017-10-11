import React from 'react';
import { Modal, Button, FormGroup, ControlLabel, FormControl, Form, Radio, Table } from 'react-bootstrap';
import store from './../store';
import AllCustomersForSelect from './allCustomersForSelect';
import AllProductsForSelect from './allProductsForSelect';
import QuanityCell from './quanityCell';

class CreateInvoicesModal extends React.Component{
	constructor(){
		super();
		this.state={
			id:'',
			customer: 'rrr',
			productName: '',
      productPrice: '',
      productQuanity: '',
			products: [],
			discount: 0,
      total: []
		}
		this.changeCustomer = this.changeCustomer.bind(this);
		this.changeProduct = this.changeProduct.bind(this);
		this.addQuanityCell = this.addQuanityCell.bind(this);
		this.spCell = this.spCell.bind(this);
    this.countTotal = this.countTotal.bind(this);
    this.changeDiscount = this.changeDiscount.bind(this);
	}
	changeCustomer(e){
		this.setState({
			customer: e.target.value
		});
	}
	changeProduct(e){
    this.setState({
      productName: e.target.value
    });
    this.props.productsReducer.dataProducts.filter((value)=>{
      if(e.target.value == value.name){
        this.setState({
          productPrice: +value.price
        });
      }
    });
	}
  changeDiscount(e){
    this.setState({
      discount: +e.target.value,
      total: ''
    });
  }
	addQuanityCell(){
    this.props.productsReducer.dataProducts.filter((value)=>{
      if(this.productValue.value == value.name){
        this.setState({
          productPrice: value.price,
          products: [...this.state.products, {name: this.productValue.value, price: value.price, quanity: 1}],
          total: [...this.state.total, value.price]
        });
      }
    });
  }
  countTotal(){
    this.setState({
      total: !this.state.products.length ? '00.00' : +this.state.products.map((value)=>(value.price * value.quanity) - ((value.price * value.quanity) / 100 * this.state.discount)).reduce( (a, b) => a + b).toFixed(2)
    });
  }
	spCell(){
	let products = this.state.products.map((value, index)=>{
    		return <QuanityCell {...value} num={index} key={index} />
    	});
	return products;
	}
	render(){
    console.log(this.state.discount);

		return(
			<Modal show={this.props.invoicesReducer.editInvoicesModal} onHide={()=>{
				store.dispatch({type: "CLOSE_INVOICES_MODAL", payload: false});
			}}>
          		<Modal.Header closeButton>
            		<Modal.Title>Add Invoice</Modal.Title>
          		</Modal.Header>
          		<Modal.Body>
					<Form>
						<FormGroup controlId="discountValueModal">
							<ControlLabel> Discount (%) </ControlLabel>
							<FormControl onChange={this.changeDiscount}></FormControl>
						</FormGroup>
						<FormGroup controlId="customerSelectModal">
      						<ControlLabel>Customers</ControlLabel>
      						<FormControl componentClass="select" placeholder="select" value={this.state.customer} onChange={this.changeCustomer} inputRef={(input) => {this.customerValue = input}}>
      							{
      								this.props.customersReducer.dataCustomers.map((value, index, arr)=>{
      							
      									return <AllCustomersForSelect key={index.toString()} customer = {value.name}/>
      								})
      							}
      						</FormControl>
    					</FormGroup>
    					<FormGroup controlId="productSelectModal" style={{display: 'inline-block', width:"70%"}} >
      						<ControlLabel>Add Product</ControlLabel>
      						<FormControl componentClass="select" placeholder="select" onChange={this.changeProduct} inputRef={(input) => {this.productValue = input}}>
      							{
      								this.props.productsReducer.dataProducts.map((value, index, arr)=>{
      	
      									return <AllProductsForSelect key={index.toString()} product = {value.name} />
      								})
      							}
      							</FormControl>
    					</FormGroup>
    					<Button style={{display: 'inline-block', width:"27%", marginLeft: "2%"}}
    							 bsStyle="success"
    	             onClick = {this.addQuanityCell}
    					>Add</Button>
    				</Form>
    				<Table>
    					<thead>
    						<tr>
    							<th>Name</th>
    							<th>Price</th>
    							<th>Qty</th>
    						</tr>
    					</thead>
    					<tbody>
    						{
    							(this.state.products.length === 0) ? (<tr><td><h3>No Products</h3></td></tr>) : this.spCell()
    						}
    					</tbody>
    				</Table>
    				<h2>Total: {
              
                  !this.state.total.length ? '00.00' : this.state.total.reduce((a,b) => a + b)
              } </h2>
            
    				<Button bsStyle="success">Create New Invoice</Button>
          		</Modal.Body>
          		<Modal.Footer>
            		<Button onClick={()=>{store.dispatch({type: "CLOSE_INVOICES_MODAL", payload: false})}}>Close</Button>
          		</Modal.Footer>
        	</Modal>
		);
	}
}
export default CreateInvoicesModal;