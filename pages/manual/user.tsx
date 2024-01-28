export const User = () => {
	return (
		<div>
			<form>
				<label htmlFor="username">Username</label>
				<input id="username" type="text" />
				<label htmlFor="firstName">First Name</label>
				<input id="firstName" type="text" />
				<label htmlFor="lastName">Last Name</label>
				<input id="lastName" type="text" />
				<label htmlFor="email">Email</label>
				<input id="email" type="email" />
				<button type="submit">Submit</button>
			</form>
		</div>
	);
};
