const exampleFunction = () =>
{
    return process.env.SERVICE_NAME || 'testService';
};

module.exports = { exampleFunction };
