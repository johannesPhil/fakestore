import React from "react";
import "../assets/cart.svg";
import { Link } from "react-router-dom";
export default function Header(props) {
	return (
		<div className="wrapper">
			<header className="container">
				<div className="header py-2">
					<div className="grid">
						<Link to="/" className="link">
							<h1 className="brand">ShoppY!</h1>
						</Link>
						<div className="formContainer">
							<form className="search">
								<div className="form-control">
									<input
										type="text"
										placeholder="Search Items..."
										onChange={props.search}
									/>
								</div>
							</form>
						</div>
						<Link
							to={props.cart.length < 1 ? "/" : "/cart"}
							className="link headerCart"
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
				</div>
			</header>
		</div>
	);
}
