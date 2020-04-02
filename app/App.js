import React from 'react';

/**
 * Default class for react Application
 * @class App
 */
export default class App extends React.Component {
	componentDidMount() {}

	/**
	 * Renders the current react component.
	 * @method render
	 */
	render() {
		return <div>{this.props.children}</div>;
	}
}
