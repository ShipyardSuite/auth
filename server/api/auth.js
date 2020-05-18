'use strict';

const { User, UserSession } = require('./../models');

module.exports = (app, logger, serviceName) => {
	// Register new User
	app.post(`/${serviceName}/api/register`, (req, res) => {
		const { body } = req;
		const { email, password } = body;

		let userEmail = email;

		if (!userEmail) {
			return res.json({
				success: false,
				message: 'Error: Email cannot be blank.'
			});
		}

		if (!password) {
			return res.json({
				success: false,
				message: 'Error: Password cannot be blank.'
			});
		}

		userEmail.toLowerCase();
		userEmail.trim();

		User.find({ email: userEmail }, (err, previousUsers) => {
			if (err) {
				logger.error(err);

				return res.json({
					success: false,
					message: 'Error: Server error'
				});
			} else if (previousUsers.length > 0) {
				logger.error(`Account already exist for email ${userEmail}`);

				return res.json({
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
					logger.error(err);
					return res.json({
						success: false,
						message: err.message
					});
				}

				res.status(200);

				logger.info(`Account created for email ${userEmail}`, { status: res.statusCode });
				return res.json({
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
			return res.json({
				success: false,
				message: 'Error: Email cannot be blank.'
			});
		}

		if (!password) {
			return res.json({
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
					logger.error(err);
					return res.send({
						success: false,
						message: 'Error: server error.'
					});
				}

				if (!user) {
					return res.send({
						success: false,
						message: 'Error: Username or Password incorrect.'
					});
				} else {
					if (!user.validPassword(password)) {
						logger.error(`Unsuccessful login attempt for user ${user.email}`);
						return res.send({
							success: false,
							message: 'Error: Username or Password incorrect.'
						});
					}

					if (user.validPassword(password)) {
						user.lastLogin = new Date();
						user.save();

						const userSession = new UserSession();
						userSession.userId = user._id;

						userSession.save((err, doc) => {
							if (err) {
								logger.error(err);
								return res.send({
									success: false,
									message: 'Error: server error.'
								});
							}

							logger.info(`User ${user.email} logged in`);
							return res.send({
								success: true,
								message: 'Valid sign in.',
								token: doc._id
							});
						});
					}
				}
			}
		);
	});

	// 	User.findOne(
	// 		{
	// 			email: email
	// 		},
	// 		(err, user) => {
	// 			if (err) {
	// 				logger.error(err);
	// 				return res.json({
	// 					success: false,
	// 					message: 'Error: server error'
	// 				});
	// 			}

	// 			if (user) {
	// 				if (!user.validPassword(password)) {
	// 					return res.json({
	// 						success: false,
	// 						message: 'Error: Username or Password incorrect.'
	// 					});
	// 				}

	// 				user.lastLogin = new Date();
	// 				user.save();

	// 				const userSession = new UserSession();
	// 				userSession.userId = user._id;

	// 				userSession.save((err, session) => {
	// 					if (err) {
	// 						logger.error(err);

	// 						return res.json({
	// 							success: false,
	// 							message: 'Error: server error'
	// 						});
	// 					}

	// 					logger.info(`User ${user.email} logged in`);
	// 					return res.json({
	// 						success: true,
	// 						message: 'Valid sign in',
	// 						token: session._id
	// 					});
	// 				});
	// 			} else {
	// 				logger.error(`Unsuccessful login attempt for user ${user.email}`);
	// 				return res.json({
	// 					success: false,
	// 					message: 'User/Password combination does not exist'
	// 				});
	// 			}
	// 		}
	// 	);
	// });

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
					logger.error(err);

					return res.json({
						success: false,
						message: 'Error: Server error'
					});
				}

				if (sessions.length != 1) {
					logger.error(`Invalid session`);
					return res.json({
						success: false,
						message: 'Error: Invalid'
					});
				} else {
					logger.info('User verified successfully');
					return res.json({
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
					logger.error(err);

					return res.json({
						success: false
					});
				}

				return res.json({
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
					logger.error(err);

					return res.send({
						success: false,
						message: 'Error: Server error'
					});
				}

				logger.info(`Log-out succesful`);
				return res.send({
					success: true,
					message: 'Logout successful'
				});
			}
		);
	});
};
