import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../public/cart.svg";

export default class Item extends Component {
	addToCart = () => {
		this.props.add(this.props.product);
	};
	render() {
		return (
			<div className="card">
				<div className="grid">
					<div className="image">
						<img src={this.props.product.image} alt="" />
					</div>
					<Link to={"/product/" + this.props.product.id} className="title">
						{this.props.product.title}
					</Link>
					<div className="details flex">
						<span className="price">${this.props.product.price}</span>
						<span className="cart" onClick={this.addToCart}>
							<img src="cart.svg" alt="" />
						</span>
					</div>
				</div>
			</div>
		);
	}
}
