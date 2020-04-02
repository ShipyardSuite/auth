'use strict';

var cryptoJS = require('crypto-js');

const { User, UserSession } = require('./../models');

module.exports = (app, serviceName) => {
	// Register new User
	app.post(`/${serviceName}/api/register`, (req, res) => {
		const { body } = req;
		const { email, password } = body;

		let userEmail = email;

		if (!userEmail) {
			return res.send({
				success: false,
				message: 'Error: Email cannot be blank.'
			});
		}

		if (!password) {
			return res.send({
				success: false,
				message: 'Error: Password cannot be blank.'
			});
		}

		userEmail.toLowerCase();
		userEmail.trim();

		User.find({ email: userEmail }, (err, previousUsers) => {
			if (err) {
				return res.send({
					success: false,
					message: 'Error: Server error'
				});
			} else if (previousUsers.length > 0) {
				return res.send({
					success: false,
					message: 'Error: Account already exist.'
				});
			}

			const newUser = new User();
			newUser.email = userEmail;
			newUser.password = newUser.generateHash(password);
			newUser.verificationToken = newUser.generateToken();
			// newUser.profile = new UserProfile();

			newUser.save((err, user) => {
				if (err) {
					return res.send({
						success: false,
						message: err.message
					});
				}
				return res.send({
					success: true,
					data: {
						email: userEmail
					}
				});
			});
		});
	});

	// Log-In User
	app.post(`/${serviceName}/api/login`, (req, res) => {
		const { body } = req;
		const { email, password } = body;

		let userEmail = email;

		if (!userEmail) {
			return res.send({
				success: false,
				message: 'Error: Email cannot be blank.'
			});
		}

		if (!password) {
			return res.send({
				success: false,
				message: 'Error: Password cannot be blank.'
			});
		}

		userEmail.toLowerCase();
		userEmail.trim();

		User.findOne(
			{
				email: email
			},
			(err, user) => {
				if (err) {
					console.log(err);
					return res.send({
						success: false,
						message: 'Error: server error'
					});
				}

				if (user) {
					if (!user.validPassword(password)) {
						return res.send({
							success: false,
							message: 'Error: Invalid'
						});
					}

					user.lastLogin = new Date();
					user.save();

					const userSession = new UserSession();
					userSession.userId = user._id;

					userSession.save((err, session) => {
						if (err) {
							console.log(err);
							return res.send({
								success: false,
								message: 'Error: server error'
							});
						}
						return res.send({
							success: true,
							message: 'Valid sign in',
							token: session._id
						});
					});
				} else {
					return res.send({
						success: false,
						message: 'User/Password combination does not exist'
					});
				}
			}
		);
	});

	// Verify User
	app.get(`/${serviceName}/api/verify`, (req, res) => {
		const { query } = req;
		const { token } = query;

		UserSession.find(
			{
				_id: token,
				isDeleted: false
			},
			(err, sessions) => {
				if (err) {
					console.log(err);

					return res.send({
						success: false,
						message: 'Error: Server error'
					});
				}

				if (sessions.length != 1) {
					return res.send({
						success: false,
						message: 'Error: Invalid'
					});
				} else {
					return res.send({
						success: true,
						message: 'Verification successful'
					});
				}
			}
		);
	});

	// Get user by Token
	app.get(`/${serviceName}/api/token`, (req, res) => {
		const { query } = req;
		const { token } = query;

		UserSession.findById(token, (err, data) => {
			User.findById(data.userId, (err, user) => {
				if (err) {
					console.log(err);

					return res.send({
						success: false
					});
				}

				return res.send({
					success: true,
					data: {
						user
					}
				});
			});
		});
	});

	// Log-Out current User
	app.get(`/${serviceName}/api/logout`, (req, res) => {
		const { query } = req;
		const { token } = query;

		UserSession.findOneAndUpdate(
			{
				_id: token,
				isDeleted: false
			},
			{
				$set: {
					isDeleted: true
				}
			},
			(err, session) => {
				if (err) {
					console.log(err);

					return res.send({
						success: false,
						message: 'Error: Server error'
					});
				}

				return res.send({
					success: true,
					message: 'Logout successful'
				});
			}
		);
	});
};
