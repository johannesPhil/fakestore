import React, { Component } from "react";
import Header from "../Components/Header";
import Item from "../Components/Item";

export default class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			products: [],
			cart: [],
			searchTerm: "",
		};

		this.searchProducts = this.searchProducts.bind(this);
	}

	async searchProducts(event) {
		let searchTerm = event.target.value;
		console.log(searchTerm);
		this.setState((state) => ({
			products: state.products.filter((product) => {
				return product.title.toLowerCase().includes(searchTerm);
			}),
		}));

		if (searchTerm === "") {
			const response = await fetch("https://fakestoreapi.com/products");
			const result = await response.json();
			this.setState({ products: result, loading: false });
		}
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

	async componentDidMount() {
		const response = await fetch("https://fakestoreapi.com/products");
		const result = await response.json();
		this.setState({ products: result, loading: false });

		if (localStorage.getItem("cart") !== null) {
			this.setState({ cart: JSON.parse(localStorage.getItem("cart")) });
		}
	}

	render() {
		return (
			<>
				<Header cart={this.state.cart} search={this.searchProducts} />
				<div className="container">
					<div className="products my-5">
						<div className="grid">
							{this.state.loading ? (
								<div className={"loader"}></div>
							) : (
								this.state.products.map((product) => (
									<Item
										product={product}
										add={this.addToCart}
										key={product.id}
									/>
								))
							)}
						</div>
					</div>
				</div>
			</>
		);
	}
}
