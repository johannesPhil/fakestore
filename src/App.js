import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Pages/Home";
import Product from "./Pages/Product";
import Cart from "./Pages/Cart";

export default class App extends Component {
	// state = {
	// 	loading: true,
	// 	products: [],
	// 	cart: [],
	// };

	// async componentDidMount() {
	// 	const response = await fetch("https://fakestoreapi.com/products");
	// 	const result = await response.json();
	// 	this.setState({ products: result, loading: false });
	// 	console.log(this.state.products);
	// }

	// addToCart = (product) => {
	// 	console.log(product);
	// };

	render() {
		return (
			<BrowserRouter>
				<Header />
				<Switch>
					<Route path="/" exact component={Home} />
					<Route path="/product/:id" exact component={Product} />
					<Route path="/cart" exact component={Cart} />

					{/* <div className="products my-5">
						<div className="container">
							<div className="grid">
								{this.state.loading ? (
									<div className={"loader"}></div>
								) : (
									this.state.products.map((product, index) => (
										<Item product={product} add={this.addToCart} key={index} />
									))
								)}
							</div>
						</div>
					</div> */}
				</Switch>
			</BrowserRouter>
		);
	}
}
