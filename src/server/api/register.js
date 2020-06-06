import { User } from './../models';

export const register = (app, logger, serviceName) =>
{
    app.post(`/${serviceName}/api/register`, (req, res) =>
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
        
        User.find({ email: userEmail }, (err, previousUsers) =>
        {
            if (err)
            {
                logger.error(err);

                return res.json({
                    success: false,
                    message: 'Error: Server error'
                });
            }
            else if (previousUsers.length > 0)
            {
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

            newUser.save((err) =>
            {
                if (err)
                {
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
                    data: 
                    {
                        email: userEmail
                    }
                });
            });
        });
    });
};
