import React, { Component } from "react";
import { Link } from "react-router-dom";
// import Related from "../Components/RelatedCard";
import "../css/product.css";
import "../assets/cart.svg";

export default class Product extends Component {
	state = {
		loading: true,
		product: [],
		related: [],
	};

	async getProduct(id) {
		const response = await fetch("https://fakestoreapi.com/products");
		const result = await response.json();

		const product = result.filter((product) => product.id === parseInt(id))[0];
		const category = product.category;

		const related = result.filter(
			(rel) => rel.category === category && rel.id !== parseInt(id)
		);
		return { product, related };
	}

	async showRelated(id) {
		let newState = await this.getProduct(id);
		this.setState({
			product: newState.product,
			loading: false,
			related: newState.related,
		});
	}

	async componentDidMount() {
		let id = this.props.match.params.id;
		let state = await this.getProduct(id);
		// result = result.json();

		this.setState({
			product: state.product,
			loading: false,
			related: state.related,
		});
	}

	async componentDidUpdate(prevProps, prevState) {
		let newId = parseInt(this.props.match.params.id);
		if (prevState.product.id !== newId) {
			console.log(prevState.product.id, newId);
			this.showRelated(newId);
		}
	}

	render() {
		return (
			<div className="container product">
				{this.state.loading ? (
					<div className={"loader"}></div>
				) : (
					<div>
						<div className="grid px-5 my-5">
							<div className="product-image">
								<img src={this.state.product.image} alt="" />
							</div>
							<div className="info">
								<div className="description">
									<h3>{this.state.product.title}</h3>
									<p className=" my-2">{this.state.product.description}</p>
								</div>
								<div className="details flex">
									<span className="price">${this.state.product.price}</span>
									<span className="cart" onClick={this.addToCart}>
										<img src="cart.svg" alt="" />
									</span>
								</div>
							</div>
						</div>
						<div className="container related">
							<h1>Similar Items</h1>
							<div className="grid">
								{this.state.related.map((rel, index) => (
									<div className="card" key={index}>
										<div className="grid">
											<div className="image">
												<img src={rel.image} alt="" />
											</div>
											<Link to={"" + rel.id} className="title">
												{rel.title}
											</Link>
											<div className="details flex">
												<span className="price">${rel.price}</span>
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				)}
			</div>
		);
	}
}
