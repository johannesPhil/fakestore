import React, { Component } from "react";
import { Link } from "react-router-dom";
import Checkout from "../Components/Checkout";
import "../css/Cart.css";

export default class Cart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			cart: "",
			subTotal: "",
			shipping: 25,
			total: "",
			checkout: false,
		};
	}

	add = (id, BasePrice) => {
		this.setState({
			cart: this.state.cart.map((item) => {
				if (item.id === id) {
					item.qty += 1;
					item.price = BasePrice * item.qty;
				}

				return item;
			}),
		});

		let subTotal = this.calculateCart();

		this.setState((state) => ({
			subTotal: subTotal,
			total: subTotal + state.shipping,
		}));
	};

	reduce = (id, BasePrice) => {
		this.setState({
			cart: this.state.cart.map((item) => {
				if (item.id === id) {
					item.qty -= 1;
					item.price = BasePrice * item.qty;
				}

				return item;
			}),
		});

		let subTotal = this.calculateCart();

		this.setState((state) => ({
			subTotal: subTotal,
			total: subTotal + state.shipping,
		}));
	};

	remove = (id) => {
		this.setState(
			(state) => ({
				cart: state.cart.filter((item) => item.id !== id),
			}),
			() => {
				localStorage.setItem("cart", JSON.stringify(this.state.cart));
			}
		);
	};

	calculateCart = () => {
		let cartContent = this.state.cart;
		const price = [];
		cartContent.forEach((item) => {
			price.push(item.price);
		});

		let subTotal = price.reduce((acc, curVal) => {
			return acc + curVal;
		}, 0);

		return this.round(subTotal, 2);
	};

	round = (value, decimals) => {
		return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
	};

	changeTotal = () => {
		let subTotal = this.calculateCart();

		this.setState((state) => ({
			subTotal: subTotal,
			total: subTotal + state.shipping,
		}));
	};

	async componentDidMount() {
		if (localStorage.getItem("cart") !== null) {
			const newCart = await JSON.parse(localStorage.getItem("cart"));
			newCart.forEach((item) => {
				item.BasePrice = item.price;
				item.qty = 1;
			});

			this.setState({
				cart: newCart,
				loading: false,
			});
			let subTotal = await this.calculateCart();

			this.setState((state) => ({
				subTotal: subTotal,
				total: subTotal + state.shipping,
			}));
		}
	}

	async componentDidUpdate(prevProps, prevState) {
		let prev = prevState.cart.length,
			currentState = this.state.cart.length;
		if (currentState < prev) {
			this.changeTotal();
		}
	}

	showCartItems = () => {
		return this.state.cart.map((item) => (
			<div className="item" key={item.id}>
				<div className="grid py-3">
					<div className="itemImage">
						<img src={item.image} alt="" />
					</div>
					<div className="itemDesc">
						<div className="title">
							<Link to={"/product/" + item.id} className="titleLink">
								{item.title}
							</Link>
						</div>
						<span className="price">${this.round(item.price, 2)}</span>
						{/* <div className="remove">Remove</div> */}
					</div>
					<div className="itemControl flex">
						<div>
							<button
								onClick={() => {
									this.add(item.id, item.BasePrice);
								}}
								className="addQty"
							>
								+
							</button>
							<span className="mx-1">{item.qty}</span>
							<button
								onClick={this.reduce.bind(this, item.id, item.BasePrice)}
								className="removeQty"
							>
								-
							</button>
							<div
								className="remove my-1"
								onClick={() => {
									this.remove(item.id);
								}}
							>
								Remove
							</div>
						</div>
					</div>
				</div>
			</div>
		));
	};

	render() {
		return (
			<div className="cartWrapper">
				<div className="container">
					{this.state.cart.length >= 1 ? (
						<div className="grid my-5">
							<div className="cartItem p-3">
								<h2>Order Summary</h2>
								{this.showCartItems()}
							</div>
							<div className="payment p-3">
								<h2>Payment Summary</h2>
								<div className="summary py-3 my-2">
									<div className="flex py-1">
										<span>Subtotal:</span>
										<span className="price">${this.state.subTotal}</span>
									</div>
									<div className="flex py-1">
										<span>Shipping Fee:</span>
										<span className="price">${this.state.shipping}</span>
									</div>
									<div className=" flex py-1">
										<span>Total:</span>
										<span className="price">
											$
											{this.round(this.state.subTotal + this.state.shipping, 2)}
										</span>
									</div>
								</div>
								{this.state.checkout === true ? (
									<div className="payment-div">
										<Checkout total={this.round(this.state.total, 2)} />
									</div>
								) : (
									<div>
										<button
											className="confirmBtn"
											onClick={() => {
												this.setState({ checkout: true });
											}}
										>
											Pay
										</button>
									</div>
								)}
							</div>
						</div>
					) : (
						<div className="error">
							<p>&#9432; Cart is empty</p>
						</div>
					)}
				</div>
			</div>
		);
	}
}
