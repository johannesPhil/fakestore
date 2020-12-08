import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../css/product.css";
import "./cart.svg";

export default class Product extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			product: [],
			related: [],
		};
	}

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
			<div className="container">
				{this.state.loading ? (
					<div className={"loader"}></div>
				) : (
					<div className="product py-2">
						<div className="details grid p-3">
							<div className="product-image">
								<img src={this.state.product.image} alt="" />
							</div>
							<div className="info">
								<div className="description">
									<h3>{this.state.product.title}</h3>
									<p className=" my-2">{this.state.product.description}</p>
								</div>
								<div className="flex">
									<span className="price">${this.state.product.price}</span>
									<span className="cart" onClick={this.addToCart}>
										<img src="cart.svg" alt="" />
									</span>
								</div>
							</div>
						</div>
						<div className="related my-5">
							<h1 className="my-3">Similar Items</h1>
							<div className="grid">
								{this.state.related.map((rel) => (
									<div className="card" key={rel.id}>
										<div className="grid">
											<div className="image">
												<img src={rel.image} alt="" />
											</div>
											<Link to={"" + rel.id} className="link titleLink">
												{rel.title}
											</Link>
											<div className="flex">
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
