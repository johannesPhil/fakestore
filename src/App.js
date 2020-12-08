import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./Pages/Home";
import Product from "./Pages/Product";
import Cart from "./Pages/Cart";
// import Checkout from "./Pages/Checkout";

export default class App extends Component {
	// constructor(props) {
	// 	super(props);
	// 	this.state = {
	// 		checkout: false,
	// 	};
	// }
	render() {
		return (
			<BrowserRouter>
				<Switch>
					<Route path="/" exact component={Home} />
					<Route path="/product/:id" exact component={Product} />
					<Route path="/cart" exact component={Cart} />
					{/* <Route path="/checkout/:total" exact component={Checkout} /> */}

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
