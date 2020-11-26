import React, { Component } from "react";
import Item from "../Components/Item";

export default class Home extends Component {
	state = {
		loading: true,
		products: [],
		cart: [],
	};

	async componentDidMount() {
		const response = await fetch("https://fakestoreapi.com/products");
		const result = await response.json();
		this.setState({ products: result, loading: false });
	}

	addToCart = (product) => {
		if (localStorage.getItem("cart") === null) {
			var savedCart = [];
			savedCart.push(product);
			localStorage.setItem("cart", JSON.stringify(savedCart));
		} else {
			savedCart = JSON.parse(localStorage.getItem("cart"));
			// if (!(savedCart instanceof Array)) savedCart = [];
			savedCart.push(product);
			localStorage.setItem("cart", JSON.stringify(savedCart));
		}

		this.setState({ cart: JSON.parse(localStorage.getItem("cart")) });

		console.log(this.state.cart);
	};

	render() {
		return (
			<div className="products my-5">
				<div className="container">
					<div className="grid">
						{this.state.loading ? (
							<div className={"loader"}></div>
						) : (
							this.state.products.map((product) => (
								<Item product={product} add={this.addToCart} key={product.id} />
							))
						)}
					</div>
				</div>
			</div>
		);
	}
}
