'use strict';

import express = require('express');
import mongoose = require('mongoose');
import SHA256 = require('crypto-js/sha256');

import User, { IUser } from './../../models/User';
import UserSession from './../../models/UserSession';
import UserProfile from './../../models/UserProfile';

const serviceName: string = process.env.SERVICE_NAME || 'undefined';

module.exports = (app: express.Application) => {
	// Register new User
	app.post(`/${serviceName}/api/register`, (req, res, next) => {
		const { body } = req;
		const { email, password } = body;

		let userEmail: string = '';

		if (!email) {
			return res.send({
				success: false,
				message: 'Error: Email cannot be blank.'
			});
		} else {
			userEmail = email.toLowerCase();
			userEmail.trim();
		}

		if (!password) {
			return res.send({
				success: false,
				message: 'Error: Password cannot be blank.'
			});
		}

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
			newUser.verificationToken = SHA256(email).toString();
			newUser.profile = new UserProfile();

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

	// Log-In current User
	app.post(`/${serviceName}/api/login`, (req, res, next) => {
		const { body } = req;
		const { email, password } = body;

		let userEmail: string = '';

		if (!email) {
			return res.send({
				success: false,
				message: 'Error: Email cannot be blank.'
			});
		} else {
			userEmail = email.toLowerCase();
			userEmail.trim();
		}

		if (!password) {
			return res.send({
				success: false,
				message: 'Error: Password cannot be blank.'
			});
		}

		User.findOne(
			{
				email: email
			},
			(err, user: IUser) => {
				if (err) {
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
								return res.send({
									success: false,
									message: 'Error: server error.'
								});
							}

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

	// Verify User
	app.get(`/${serviceName}/api/verify`, (req, res, next) => {
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
	app.get(`/${serviceName}/api/token`, (req, res, next) => {
		const { query } = req;

		UserSession.findById(query.id, (err, data: any) => {
			User.findById(data.userId, (err, user: any) => {
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
	app.get(`/${serviceName}/api/logout`, (req, res, next) => {
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
