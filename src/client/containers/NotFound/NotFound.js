import React from 'react';

import { Layout } from './../../components';

export default class NotFound extends React.Component
{
    componentDidMount()
    {
        document.title = 'ShipyardSuite | 404 - Not found';
    }

    render()
    {
        return (
            <Layout>
                <div className="page">FILE NOT FOUND</div>
            </Layout>
        );
    }
}
