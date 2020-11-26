import React from "react";
export default function Header() {
	return (
		<div>
			<header className="header py-3">
				<div className="container grid">
					<h1 className="brand">ShoppY!</h1>
					<form className="search">
						<div className="form-control">
							<input type="search" placeholder="Search Items..." />
						</div>
					</form>
				</div>
			</header>
		</div>
	);
}
