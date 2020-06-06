import { User, UserSession } from './../models';

export const userByToken = (app, logger, serviceName) =>
{
    app.get(`/${serviceName}/api/token`, (req, res) => 
    {
        const { query } = req;
        const { token } = query;

        UserSession.findById(token, (err, data) =>
        {
            User.findById(data.userId, (err, user) =>
            {
                if (err)
                {
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
};
