import { UserSession } from './../models';

export const verify = (app, logger, serviceName) =>
{
    app.get(`/${serviceName}/api/verify`, (req, res) =>
    {
        const { query } = req;
        const { token } = query;

        UserSession.find({ _id: token, isDeleted: false }, (err, sessions) => 
        {
            if (err)
            {
                logger.error(err);

                return res.json({
                    success: false,
                    message: 'Error: Server error'
                });
            }

            if (sessions.length != 1)
            {
                logger.error('Invalid session');

                return res.json({
                    success: false,
                    message: 'Error: Invalid'
                });
            }
            else
            {
                logger.info('User verified successfully');

                return res.json({
                    success: true,
                    message: 'Verification successful'
                });
            }
        });
    });
};
