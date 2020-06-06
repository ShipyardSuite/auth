import { User, UserSession } from './../models';

export const login = (app, logger, serviceName) =>
{
    app.post(`/${serviceName}/api/login`, (req, res) =>
    {
        const { body } = req;
        const { email, password } = body;

        let userEmail = email;

        if (!userEmail)
        {
            return res.json({
                success: false,
                message: 'Error: Email cannot be blank.'
            });
        }

        if (!password) 
        {
            return res.json({
                success: false,
                message: 'Error: Password cannot be blank.'
            });
        }

        userEmail.toLowerCase();
        userEmail.trim();

        User.findOne({ email: email }, (err, user) =>
        {
            if (err)
            {
                logger.error(err);

                return res.send({
                    success: false,
                    message: 'Error: server error.'
                });
            }

            if(user !== null)
            {
                if (!user.validPassword(password, user.password))
                {
                    logger.error(`Unsuccessful login attempt for user ${user.email}`);

                    return res.send({
                        success: false,
                        message: 'Error: Username or Password incorrect.'
                    });
                }

                if(user.validPassword(password, user.password))
                {
                    user.lastLogin = new Date();
                    user.save();

                    const userSession = new UserSession();

                    userSession.userId = user._id;

                    userSession.save((err, doc) => 
                    {
                        if (err) 
                        {
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
            else
            {
                return res.send({
                    success: false,
                    message: 'Error: Username or Password incorrect.'
                });
            }
        });
    });
};
