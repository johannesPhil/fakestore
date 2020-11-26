import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class RelatedCard extends Component {
	render() {
		console.log(this.props);
		return (
			<div>
				<div className="card">
					<div className="grid">
						<div className="image">
							<img src={this.props.related.image} alt="" />
						</div>
						<Link to={"/" + this.props.related.id} className="title">
							{this.props.related.title}
						</Link>
						<div className="details flex">
							<span className="price">${this.props.related.price}</span>
						</div>
					</div>
				</div>
				;
			</div>
		);
	}
}
