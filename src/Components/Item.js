import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../assets/cart.svg";

export default class Item extends Component {
	render() {
		const { id, image, title, price } = this.props.product;
		return (
			<div className="card">
				<div className="grid">
					<div className="image">
						<img src={image} alt="" />
					</div>
					<div className="title">
						<Link to={"/product/" + id} className="link titleLink">
							{title}
						</Link>
					</div>
					<div className="flex">
						<span className="price">${price}</span>
						<div
							className="cart"
							onClick={this.props.add.bind(this, this.props.product)}
						>
							<img className="cartImg" src="cart.svg" alt="" />
						</div>
					</div>
				</div>
			</div>
		);
	}
}
