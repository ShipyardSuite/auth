import { UserSession } from './../models';

export const logout = (app, logger, serviceName) =>
{
    app.get(`/${serviceName}/api/logout`, (req, res) => 
    {
        const { query } = req;
        const { token } = query;

        UserSession.findOneAndUpdate({ _id: token, isDeleted: false }, {
            $set: 
            {
                isDeleted: true
            }
        }, (err) =>
        {
            if (err)
            {
                logger.error(err);

                return res.send({
                    success: false,
                    message: 'Error: Server error'
                });
            }

            logger.info('Log-out successful');

            return res.send({
                success: true,
                message: 'Logout successful'
            });
        });
    });
};
