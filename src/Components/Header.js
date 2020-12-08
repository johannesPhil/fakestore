import React from "react";
import "../assets/cart.svg";
import { Link } from "react-router-dom";
export default function Header(props) {
	return (
		<div>
			<header className="header py-3">
				<div className="container grid">
					<Link to="/" className="link">
						<h1 className="brand">ShoppY!</h1>
					</Link>
					<form className="search">
						<div className="form-control">
							<input
								type="text"
								placeholder="Search Items..."
								onChange={props.search}
							/>
						</div>
					</form>
					<Link
						to={props.cart.length < 1 ? "/" : "/cart"}
						className="headerCart"
					>
						<img className="cartImg" src="cart.svg" alt="" />
						{props.cart.length > 0 ? (
							<div className="cartCounter">
								{props.cart.length <= 9 ? props.cart.length : 9 + "+"}
							</div>
						) : (
							""
						)}
					</Link>
				</div>
			</header>
		</div>
	);
}
