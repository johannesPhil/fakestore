import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../css/Cart.css";

export default class Checkout extends Component {
	constructor(props) {
		super(props);
		this.state = {
			total: this.props.total,
			paid: false,
			error: null,
		};
		this.paypalRef = React.createRef();
	}

	clearCartRedirect = () => {
		console.log(localStorage.removeItem("cart"));
	};

	componentDidMount() {
		console.log(this.state.total);

		window.paypal
			.Buttons({
				createOrder: (data, actions) => {
					return actions.order.create({
						intent: "CAPTURE",
						purchase_units: [
							{
								description: "Your description",
								amount: {
									currency_code: "USD",
									value: this.state.total,
								},
							},
						],
					});
				},
				onApprove: async (data, actions) => {
					const order = await actions.order.capture();
					// this.state.paid = true;
					this.setState({ paid: true });
					console.log(order);
				},
				onError: (err) => {
					//   setError(err),
					console.error(err);
				},
			})
			.render(this.paypalRef.current);
	}

	render() {
		// If the payment has been made
		if (this.state.paid) {
			return (
				<div className="confirmPay">
					<div>Payment successful!</div>
					{this.clearCartRedirect()}
					<Link to="/" className="link redirect my-2">
						Ok
					</Link>
				</div>
			);
		}

		// If any error occurs
		if (this.state.error) {
			return (
				<div>Error Occurred in processing payment.! Please try again.</div>
			);
		}

		// Default Render
		return (
			<div className="price">
				<h4>Total Amount in $ : {this.props.total}</h4>
				<div ref={this.paypalRef} />
			</div>
		);
	}
}
