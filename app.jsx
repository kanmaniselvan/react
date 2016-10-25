import React from 'react';
import ReactDom from 'react-dom';

class App extends React.Component {
	constructor () {
		super();

		this.state = {
			products: {
	"SD2014-CF-P":{
		"category": "electronics",
		"name":"Nexus 6",
		"price": 3500,
		"brand": "LG",
		"sku": "SD2014-CF-P"
	},
	"SD2015-CF-P":{
		"category": "electronics",
		"name":"Apple Watch",
		"price": 6000,
		"brand":"Apple",
		"sku":"SD2015-CF-P"
	},
	"SD2016-CF-P":{
		"category": "electronics",
		"name":"Havels Switch",
		"price": 120,
		"brand":"Havels",
		"sku":"SD2016-CF-P"
	},
	"SD2017-CF-P":{
		"category": "electronics",
		"name":"Laser Mouse",
		"price": 450,
		"brand":"Logitech",
		"sku":"SD2017-CF-P"
	},
	"SD2018-CF-P":{
		"category": "electronics",
		"name":"Mini Keyboard",
		"price": 850,
		"brand":"Logitech",
		"sku":"SD2018-CF-P"
	},
	"SD2019-CF-P":{
		"category": "clothing",
		"name":"Tracks",
		"price": 120,
		"brand":"Nike",
		"sku":"SD2019-CF-P"
	},
	"SD2020-CF-P":{
		"category": "clothing",
		"name":"Swim Suit",
		"price": 120,
		"brand":"Puma",
		"sku":"SD2020-CF-P"
	}
   }
};

}


	filterProductsByName(search_text) {
		var products = {}
		for(var key in this.props.products) {
			var product = this.props.products[key]
			var matched_name = product.name.match(new RegExp(".*?" + search_text + ".*?", "i"))
			if(matched_name != [''] && matched_name != null) {
				products[key] = product
			} else if (search_text == '') {
				products[key] = product
			}
		}

		this.setState({products: products, cart_product: undefined})
	}

	updateCartProducts(product_sku) {
		var cart_product;

		for(var key in this.props.products) {
			var product = this.props.products[key]
			if(product.sku == product_sku) {
				 cart_product = product;
				break;
			}
		}

		this.setState({cart_product: cart_product})
	}

   render() {

  	var group_products = {};
   	for(var key in this.state.products){
   		var product = this.state.products[key];
   		if(group_products[product.category] === undefined) {
   			group_products[product.category] = [product]
   		} else {
   			group_products[product.category].push(product)
   		}
   	}

	var render_products = [];
   	for(var key in group_products) {
			var category_products = group_products[key];

			for(var i = 0; i < category_products.length; i++ ) {
				var category_product = category_products[i]
				render_products.push(<Product key={category_product.sku} product={category_product} updateCartProducts={this.updateCartProducts.bind(this)} />)
			}
   	}

			var Appstyle = {
					width: '60%',
					borderRight: '1px solid #bfbfbf',
					display: 'inline-block'
			}

			var cartStyle = {
				width: '35%',
				display: 'inline-block',
				verticalAlign: 'top',
				marginLeft: '4px'
			}

			var parentContainer = {
				fontFamily: 'sans-serif'
			}

      return (
         <div style={parentContainer}>
	         <div style={Appstyle}>
	         	<Filter updateFilter={this.filterProductsByName.bind(this)} />
	            {render_products}
	         </div>
            <Cart style={cartStyle} product={this.state.cart_product}/>
						<hr />
         </div>
      );
   }
}

App.defaultProps = {
   	products: {
	"SD2014-CF-P":{
		"category": "electronics",
		"name":"Nexus 6",
		"price": 3500,
		"brand": "LG",
		"sku": "SD2014-CF-P"
	},
	"SD2015-CF-P":{
		"category": "electronics",
		"name":"Apple Watch",
		"price": 6000,
		"brand":"Apple",
		"sku":"SD2015-CF-P"
	},
	"SD2016-CF-P":{
		"category": "electronics",
		"name":"Havels Switch",
		"price": 120,
		"brand":"Havels",
		"sku":"SD2016-CF-P"
	},
	"SD2017-CF-P":{
		"category": "electronics",
		"name":"Laser Mouse",
		"price": 450,
		"brand":"Logitech",
		"sku":"SD2017-CF-P"
	},
	"SD2018-CF-P":{
		"category": "electronics",
		"name":"Mini Keyboard",
		"price": 850,
		"brand":"Logitech",
		"sku":"SD2018-CF-P"
	},
	"SD2019-CF-P":{
		"category": "clothing",
		"name":"Tracks",
		"price": 120,
		"brand":"Nike",
		"sku":"SD2019-CF-P"
	},
	"SD2020-CF-P":{
		"category": "clothing",
		"name":"Swim Suit",
		"price": 120,
		"brand":"Puma",
		"sku":"SD2020-CF-P"
	}
   }
}

class Filter extends React.Component {
	handleFilterChange() {
		this.props.updateFilter(this.refs.filterIp.value);
	}

	render() {
		var filterStyle = {
				float: 'right',
				marginRight: '10px',
				borderRadius: '8%',
	    	padding: '4px',
				border: '1px solid #bfbfbf'
		}

		return (
			<div>
				<input style={filterStyle} ref='filterIp' placeholder='Filter products...' onChange={this.handleFilterChange.bind(this)} />
				<br />
				<br />
			</div>
		)
	}
}

class Product extends React.Component {
	handleCartChange() {
		this.props.updateCartProducts(this.refs.addToCartButton.value);
	}

	render() {
		return (

		<div>
			<span className='productName'>{this.props.product.name} </span>
			<br />
			<span>
				<span className='productName'>{this.props.product.brand} </span> - <span className='productName'>{this.props.product.price} </span>
				<button onClick={this.handleCartChange.bind(this)} ref='addToCartButton' value={this.props.product.sku}> Add to cart </button>
			</span>
			<br />
			<br />
		</div>

		)
	}
}

class Cart extends React.Component {
	constructor(props) {
		super(props);
		this.state = { products: [] }
	}

	componentWillReceiveProps(next_props, dex) {
		if(next_props.product === undefined) {
				return false;
		}

		var products = this.state.products;
		var products_length = products.length;
		if(products.length == 0) {
			next_props.product.quantity = 1;
			products.push(next_props.product)
		} else {
			var existing_product;
			for(var i=0; i<products_length; i++) {
				if(products[i].sku == next_props.product.sku) {
						existing_product = true;
						products[i].quantity += 1;
						break;
				}
			}

			if(!existing_product) {
				next_props.product.quantity = 1;
					products.push(next_props.product)
			}
		}

		this.setState({products: products})
	}

	updateCardProductsQuantity(product_sku, operation) {
		var products = this.state.products;
		var updated_products = [];
		for(var i=0; i<products.length; i++) {
			if(products[i].sku == product_sku) {
				if('add' == operation) {
						products[i].quantity += 1;
				} else {
					products[i].quantity -= 1;
				}

				if(products[i].quantity !=0 ) {
					updated_products.push(products[i])
				}
			} else {
				updated_products.push(products[i])
			}
		}

		this.setState({products: updated_products})
	}

	render() {
		var cart_products = [];
		var total_price = 0;
		var total_cart_items = 0;
		for(var i=0; i<this.state.products.length; i++) {
			var product = this.state.products[i];
			cart_products.push(<CartProduct key={i} product={product} updateCardProductsQuantity={this.updateCardProductsQuantity.bind(this)} />)
			total_price += (product.price * product.quantity);
			total_cart_items += product.quantity
		}

		var num_times = {
				fontSize: '20px',
				fontWeight: 'bold',
				marginLeft: '5px',
				marginRight: '20px'
		}

		var totalPrice = {
			fontSize: '26px',
			fontWeight: 'bold',
			marginLeft: '5px',
			color: '#005104'
		}

		return (
			<div style={this.props.style}>
			<h3> Items in Cart </h3>

				No. items: <span style={num_times}>{total_cart_items}</span> Total Price: <span style={totalPrice}>{total_price}</span>
			<br />
			<br />
				{cart_products}
			</div>
			)
	}
}

class CartProduct extends React.Component {
	handleProductQuantityChange(operation) {
		if('add' == operation) {
			var product_sku = this.refs.addQuantity.value
		} else {
			var product_sku = this.refs.removeQuantity.value
		}

		this.props.updateCardProductsQuantity(product_sku, operation)
	}

	render() {
		  var container = {
        			textAlign: 'center'
     			 }

		      var addcartButton = {
		       	background: '#029e00',
		       	borderRadius: '50%',
		       	border: 'none'
		      }

		      var removecartButton = {
		       	background: '#ff3932',
		       	borderRadius: '50%',
		       	border: 'none'
		      }

					var outerBorder = {
						border: '1px solid #bfbfbf',
						padding: '5px',
						marginLeft: '10px',
						marginTop: '5px'
					}

					var productName = {
						fontSize: '17px',
						fontWeight: 'bold',
						color: '#361359'
					}

					var quantity = {
						color: '#a8a8a8'
					}

					var quantityValue = {
						color: '#7f7f7f'
					}
		return (
			<div style={outerBorder}>
				<span style={productName}> {this.props.product.name}</span>
				<br />
				<span style={quantity}>Quantity:</span> <span style={quantityValue}>{this.props.product.quantity}</span>
				&nbsp; &nbsp;
				<button style={addcartButton} ref="addQuantity" value={this.props.product.sku} onClick={this.handleProductQuantityChange.bind(this, 'add')}>+</button>
				&nbsp;
				<button style={removecartButton} ref="removeQuantity" value={this.props.product.sku} onClick={this.handleProductQuantityChange.bind(this, 'remove')}>-</button>
			</div>
			)
	}
}

export default App;
