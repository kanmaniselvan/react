import React from 'react';

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

    // Filter Products By matching name and then set the state
    // for App with the filtered products.
    filterProductsByName(search_text) {
        let products = {};
        for(let key in this.props.products) {
            let product = this.props.products[key];
            let matched_name = product.name.match(new RegExp(".*?" + search_text + ".*?", "i"));
            if(matched_name != [''] && matched_name != null) {
                products[key] = product
            } else if (search_text == '') {
                products[key] = product
            }
        }

        this.setState({products: products, cart_product: undefined})
    }

    // Whenever a add to cart button is clicked, this will update the cart_product
    // state of App component to the clicked product.
    updateCartProducts(product_sku) {
        let cart_product;

        for(let key in this.props.products) {
            let product = this.props.products[key]
            if(product.sku == product_sku) {
                cart_product = product;
                break;
            }
        }

        this.setState({cart_product: cart_product})
    }

    render() {

        let group_products = {};
        for(let key in this.state.products){
            let product = this.state.products[key];
            if(group_products[product.category] === undefined) {
                group_products[product.category] = [product]
            } else {
                group_products[product.category].push(product)
            }
        }

        let render_products = [];
        for(let key in group_products) {
            let category_products = group_products[key];
            render_products.push(<Grouper grouperName={key} key={key}/>)

            for(let i = 0; i < category_products.length; i++ ) {
                let category_product = category_products[i]
                render_products.push(<Product key={category_product.sku} product={category_product} updateCartProducts={this.updateCartProducts.bind(this)} />)
            }
        }

        let Appstyle = {
            width: '60%',
            borderRight: '1px solid #bfbfbf',
            display: 'inline-block'
        }

        let cartStyle = {
            width: '35%',
            display: 'inline-block',
            verticalAlign: 'top',
            marginLeft: '4px'
        }

        let parentContainer = {
            fontFamily: 'sans-serif',
        }

        return (
			<div unselectable="on" style={parentContainer}>
				<div style={Appstyle}>
                    <EvilInc />
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
    handleFilterChange(e) {
        this.props.updateFilter(e.target.value);
    }

    render() {
        let filterStyle = {
            marginRight: '10px',
            borderRadius: '8%',
            padding: '4px',
            borderStyle: 'none',
            borderBottom: '1px dotted #bfbfbf',
            outline: 'none'
        };

        let filterWrapper = {
        	width: '50%',
        	float: 'right',
        	display: 'inline-block',
        	textAlign: 'right'
        }

        return (
			<div style={filterWrapper}>
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
        let addButtonStyle = {
            border: '1px solid #fb641b',
            background: '#fb641b',
            borderRadius: '2px',
            cursor: 'pointer',
            padding: '8px',
            color: '#ffffff',
            float: 'right',
            marginRight: '10%',
            outline: 'none'
        };

        let productName = {
            fontWeight: 'bold',
            fontSize: '20px',
            color: '#070e3d',
            fontVariant: 'small-caps',
            marginBottom: '3px',
            display: 'inline-block',
            width: '150px'
        };

        let priceStyle = {
            marginLeft: '10px',
            fontWeight: 'bold',
            color: '#009b67'
        };

        let category = {
            textTransform: 'capitalize'
        };

        let buttonContainer = {
            color: '#888889',
            fontWeight: 'bold',
            fontSize: '12px'
        };

        return (

			<div>
				<span style={productName}>{this.props.product.name} </span> <span style={priceStyle}>₹{this.props.product.price} </span>
				<div style={buttonContainer}>
					<span >{this.props.product.brand} </span> - <span style={category}>{this.props.product.category} </span>
					<button style={addButtonStyle} onClick={this.handleCartChange.bind(this)} ref='addToCartButton' value={this.props.product.sku}> Add to cart </button>
				</div>
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

    // When cart component receives a props, that means new item is added to the cart
    // Then check whether the product already exists, if it does, update only the
    // quantity, else add with the product with its quantity of 1.
    componentWillReceiveProps(next_props) {
        if(next_props.product === undefined) {
            return false;
        }

        let products = this.state.products;
        let products_length = products.length;
        if(products.length == 0) {
            next_props.product.quantity = 1;
            products.push(next_props.product)
        } else {
            let existing_product;
            for(let i=0; i<products_length; i++) {
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

    // Based on the clicked button, it will add or subtracts the
    // quantity of the item.
    // If the item quantity is 0, then its removed from the cart.
    updateCardProductsQuantity(product_sku, operation) {
        let products = this.state.products;
        let updated_products = [];

        for(let i=0; i<products.length; i++) {
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
        let cart_products = [];
        let total_price = 0;
        let total_cart_items = 0;
        for(let i=0; i<this.state.products.length; i++) {
            let product = this.state.products[i];
            cart_products.push(<CartProduct key={i} product={product} updateCardProductsQuantity={this.updateCardProductsQuantity.bind(this)} />)
            total_price += (product.price * product.quantity);
            total_cart_items += product.quantity
        }

        let num_times = {
            fontSize: '20px',
            fontWeight: 'bold',
            marginLeft: '5px',
            marginRight: '20px'
        }

        let totalPrice = {
            fontSize: '26px',
            fontWeight: 'bold',
            marginLeft: '5px',
            color: '#005104'
        }

        let cartTitle = {
            background: '#000000',
            color: '#ffffff',
            padding: '5px',
            textAlign: 'center'
        }

        return (
			<div style={this.props.style}>
				<h3 style={cartTitle}> Items in Cart </h3>

				&nbsp; Total Items: <span style={num_times}>{total_cart_items}</span> Total Price: <span style={totalPrice}>{total_price}</span>
				<br />
                {cart_products}
			</div>
        )
    }
}

class CartProduct extends React.Component {
    handleProductQuantityChange(operation) {
        let product_sku;
        if('add' == operation) {
            product_sku = this.refs.addQuantity.value
        } else {
            product_sku = this.refs.removeQuantity.value
        }

        this.props.updateCardProductsQuantity(product_sku, operation)
    }

    render() {

        let addcartButton = {
            background: '#9aff99',
            borderRadius: '50%',
            border: 'none',
            cursor: 'pointer',
            outline: 'none'
        }

        let removecartButton = {
            background: '#ff8884',
            borderRadius: '50%',
            border: 'none',
            cursor: 'pointer',
            outline: 'none'
        }

        let outerBorder = {
            borderBottom: '1px solid #bfbfbf',
            padding: '5px',
            marginLeft: '10px',
            marginTop: '15px'
        }

        let productName = {
            fontSize: '17px',
            fontWeight: 'bold',
            color: '#361359'
        }

        let quantity = {
            color: '#a8a8a8'
        }

        let quantityValue = {
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

class Grouper extends React.Component {
    render() {
        let grouperStyle = {
            textTransform: 'uppercase',
            background: '#000000',
            padding: '5px',
            fontWeight: 'bold',
            color: '#ffffff',
            marginBottom: '5px',
            textAlign: 'left',
            width: '98%'
        }

        return (
			<div style={grouperStyle}>
                {this.props.grouperName}
			</div>
        )
    }
}

class EvilInc extends React.Component {
    render() {
    	let evilStyle = {
    		verticalAlign: 'middle',
    		fontWeight: 'bold',
    		fontSize: '20px'
    	}

        return (
        	<span style={evilStyle}> <img src="evil.jpg" /> Evil Inc.</span>
        )
    }
}

export default App;
