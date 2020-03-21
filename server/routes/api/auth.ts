'use strict';

import express = require('express');
import mongoose = require('mongoose');
import SHA256 = require('crypto-js/sha256');

import { Logger } from '@shipyardsuite/logger';

import User, { IUser } from './../../models/User';
import UserSession from './../../models/UserSession';
import UserProfile from './../../models/UserProfile';

const serviceName: string = process.env.SERVICE_NAME || 'undefined';
const logger = new Logger();

const loggerMessage = (type: string, path: string, action: string, user: string = ''): void => {
	if (type === 'error') {
		logger.Message.error({ path, action, user }, (message: any) => {
			console.log(message);
		});
	} else if (type === 'info') {
		logger.Message.info({ path, action, user }, (message: any) => {
			console.log(message);
		});
	} else if (type === 'warning') {
		logger.Message.warning({ path, action, user }, (message: any) => {
			console.log(message);
		});
	} else if (type === 'debug') {
		logger.Message.debug({ path, action, user }, (message: any) => {
			console.log(message);
		});
	}
};

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
				loggerMessage('warning', req.route.path, 'Account ' + userEmail + ' already exist');
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
				loggerMessage('info', req.route.path, 'Account ' + userEmail + ' created');
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
					loggerMessage('error', req.route.path, err);
					return res.send({
						success: false,
						message: 'Error: server error.'
					});
				}

				if (!user) {
					loggerMessage('warning', req.route.path, 'Username not found');
					return res.send({
						success: false,
						message: 'Error: Username or Password incorrect.'
					});
				} else {
					if (!user.validPassword(password)) {
						loggerMessage('error', req.route.path, 'Username or Password incorrect');
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
								loggerMessage('error', req.route.path, err);
								return res.send({
									success: false,
									message: 'Error: server error.'
								});
							}
							loggerMessage('info', req.route.path, 'User signed in.', user._id);
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

				loggerMessage('info', req.route.path, 'token verified', user._id);
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

				loggerMessage('info', req.route.path, 'user logged out');
				return res.send({
					success: true,
					message: 'Logout successful'
				});
			}
		);
	});
};
