(function() {
  'use strict';

  var globals = typeof global === 'undefined' ? self : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};
  var aliases = {};
  var has = {}.hasOwnProperty;

  var expRe = /^\.\.?(\/|$)/;
  var expand = function(root, name) {
    var results = [], part;
    var parts = (expRe.test(name) ? root + '/' + name : name).split('/');
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function expanded(name) {
      var absolute = expand(dirname(path), name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var hot = hmr && hmr.createHot(name);
    var module = {id: name, exports: {}, hot: hot};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var expandAlias = function(name) {
    var val = aliases[name];
    return (val && name !== val) ? expandAlias(val) : name;
  };

  var _resolve = function(name, dep) {
    return expandAlias(expand(dirname(name), dep));
  };

  var require = function(name, loaderPath) {
    if (loaderPath == null) loaderPath = '/';
    var path = expandAlias(name);

    if (has.call(cache, path)) return cache[path].exports;
    if (has.call(modules, path)) return initModule(path, modules[path]);

    throw new Error("Cannot find module '" + name + "' from '" + loaderPath + "'");
  };

  require.alias = function(from, to) {
    aliases[to] = from;
  };

  var extRe = /\.[^.\/]+$/;
  var indexRe = /\/index(\.[^\/]+)?$/;
  var addExtensions = function(bundle) {
    if (extRe.test(bundle)) {
      var alias = bundle.replace(extRe, '');
      if (!has.call(aliases, alias) || aliases[alias].replace(extRe, '') === alias + '/index') {
        aliases[alias] = bundle;
      }
    }

    if (indexRe.test(bundle)) {
      var iAlias = bundle.replace(indexRe, '');
      if (!has.call(aliases, iAlias)) {
        aliases[iAlias] = bundle;
      }
    }
  };

  require.register = require.define = function(bundle, fn) {
    if (bundle && typeof bundle === 'object') {
      for (var key in bundle) {
        if (has.call(bundle, key)) {
          require.register(key, bundle[key]);
        }
      }
    } else {
      modules[bundle] = fn;
      delete cache[bundle];
      addExtensions(bundle);
    }
  };

  require.list = function() {
    var list = [];
    for (var item in modules) {
      if (has.call(modules, item)) {
        list.push(item);
      }
    }
    return list;
  };

  var hmr = globals._hmr && new globals._hmr(_resolve, require, modules, cache);
  require._cache = cache;
  require.hmr = hmr && hmr.wrap;
  require.brunch = true;
  globals.require = require;
})();

(function() {
var global = typeof window === 'undefined' ? this : window;
var process;
var __makeRelativeRequire = function(require, mappings, pref) {
  var none = {};
  var tryReq = function(name, pref) {
    var val;
    try {
      val = require(pref + '/node_modules/' + name);
      return val;
    } catch (e) {
      if (e.toString().indexOf('Cannot find module') === -1) {
        throw e;
      }

      if (pref.indexOf('node_modules') !== -1) {
        var s = pref.split('/');
        var i = s.lastIndexOf('node_modules');
        var newPref = s.slice(0, i).join('/');
        return tryReq(name, newPref);
      }
    }
    return none;
  };
  return function(name) {
    if (name in mappings) name = mappings[name];
    if (!name) return;
    if (name[0] !== '.' && pref) {
      var val = tryReq(name, pref);
      if (val !== none) return val;
    }
    return require(name);
  }
};
require.register("App.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _semanticUiReact = require('semantic-ui-react');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_Component) {
	_inherits(App, _Component);

	function App(props) {
		_classCallCheck(this, App);

		return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));
	}

	_createClass(App, [{
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				_semanticUiReact.Container,
				{ fluid: true },
				this.props.children
			);
		}
	}]);

	return App;
}(_react.Component);

exports.default = App;
});

require.register("components/Layout/Layout.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _reactRouterDom = require('react-router-dom');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _semanticUiReact = require('semantic-ui-react');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Layout = function (_Component) {
	_inherits(Layout, _Component);

	function Layout() {
		_classCallCheck(this, Layout);

		return _possibleConstructorReturn(this, (Layout.__proto__ || Object.getPrototypeOf(Layout)).apply(this, arguments));
	}

	_createClass(Layout, [{
		key: 'registrationSuccess',
		value: function registrationSuccess() {
			return _react2.default.createElement(
				_semanticUiReact.Message,
				{ info: true },
				'Registration Successful, check your emails.\xA0',
				_react2.default.createElement(
					'p',
					null,
					'Back to ',
					_react2.default.createElement(
						'a',
						{ href: 'http://localhost:8080/homepage/' },
						'Homepage'
					)
				)
			);
		}
	}, {
		key: 'render',
		value: function render() {
			var _props = this.props,
			    title = _props.title,
			    optionalLink = _props.optionalLink,
			    optionalLinkTitle = _props.optionalLinkTitle,
			    optionalLinkText = _props.optionalLinkText,
			    error = _props.error,
			    success = _props.success;


			return _react2.default.createElement(
				_semanticUiReact.Grid,
				{ columns: 2 },
				_react2.default.createElement(
					_semanticUiReact.Grid.Row,
					{ style: { height: '100vh', paddingBottom: 0 } },
					_react2.default.createElement(
						_semanticUiReact.Grid.Column,
						{ width: 8, color: 'black', only: 'computer' },
						_react2.default.createElement(
							_semanticUiReact.Grid,
							{ textAlign: 'center', style: { height: '100vh' }, verticalAlign: 'middle' },
							_react2.default.createElement(
								_semanticUiReact.Grid.Column,
								{ style: { maxWidth: 350 } },
								_react2.default.createElement(_semanticUiReact.Image, { src: '/auth/shipyard_logo_full.png' })
							)
						)
					),
					_react2.default.createElement(
						_semanticUiReact.Grid.Column,
						{ mobile: 16, computer: 8 },
						_react2.default.createElement(
							_semanticUiReact.Grid,
							{ textAlign: 'center', style: { height: '100vh' }, verticalAlign: 'middle' },
							_react2.default.createElement(
								_semanticUiReact.Grid.Column,
								{ style: { maxWidth: 350 } },
								_react2.default.createElement(
									_semanticUiReact.Segment,
									{ raised: true },
									_react2.default.createElement(
										_semanticUiReact.Responsive,
										_semanticUiReact.Responsive.onlyMobile,
										_react2.default.createElement(
											_semanticUiReact.Segment,
											{ basic: true, padded: true },
											_react2.default.createElement(_semanticUiReact.Image, { src: '/auth/shipyard_logo_icon_inverted.png' })
										)
									),
									_react2.default.createElement(
										_semanticUiReact.Responsive,
										_semanticUiReact.Responsive.onlyTablet,
										_react2.default.createElement(
											_semanticUiReact.Segment,
											{ basic: true, padded: true },
											_react2.default.createElement(_semanticUiReact.Image, { src: '/auth/shipyard_logo_icon_inverted.png' })
										)
									),
									_react2.default.createElement(
										_semanticUiReact.Header,
										{ as: 'h4' },
										title
									),
									this.props.children,
									_react2.default.createElement(
										_semanticUiReact.Divider,
										{ horizontal: true },
										'Or'
									),
									_react2.default.createElement(
										_reactRouterDom.NavLink,
										{ to: optionalLink },
										optionalLinkTitle
									),
									' ',
									optionalLinkText
								),
								success && this.registrationSuccess(),
								error && _react2.default.createElement(
									_semanticUiReact.Message,
									{ negative: true },
									error
								)
							)
						)
					)
				)
			);
		}
	}]);

	return Layout;
}(_react.Component);

exports.default = (0, _reactRouterDom.withRouter)(Layout);
});

require.register("components/Layout/index.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Layout = undefined;

var _Layout = require('./Layout');

var _Layout2 = _interopRequireDefault(_Layout);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = { Layout: _Layout2.default };
exports.Layout = _Layout2.default;
});

require.register("components/index.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Layout = undefined;

var _Layout = require('./Layout');

exports.default = { Layout: _Layout.Layout };
exports.Layout = _Layout.Layout;
});

require.register("containers/Home/Home.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _storage = require('./../../utils/storage');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Home = function (_Component) {
	_inherits(Home, _Component);

	function Home(props) {
		_classCallCheck(this, Home);

		var _this = _possibleConstructorReturn(this, (Home.__proto__ || Object.getPrototypeOf(Home)).call(this, props));

		_this.state = {};
		return _this;
	}

	_createClass(Home, [{
		key: 'componentDidMount',
		value: function componentDidMount() {}
	}, {
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'div',
				null,
				'auth...'
			);
		}
	}]);

	return Home;
}(_react.Component);

exports.default = Home;
});

require.register("containers/Home/index.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Home = undefined;

var _Home = require('./Home');

var _Home2 = _interopRequireDefault(_Home);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = { Home: _Home2.default };
exports.Home = _Home2.default;
});

require.register("containers/Login/Login.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _reactRouterDom = require('react-router-dom');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _storage = require('./../../utils/storage');

var _semanticUiReact = require('semantic-ui-react');

var _Layout = require('../../components/Layout/Layout');

var _Layout2 = _interopRequireDefault(_Layout);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Login = function (_Component) {
	_inherits(Login, _Component);

	function Login(props) {
		_classCallCheck(this, Login);

		var _this = _possibleConstructorReturn(this, (Login.__proto__ || Object.getPrototypeOf(Login)).call(this, props));

		_this.state = {
			token: '',
			loginError: '',
			email: '',
			password: ''
		};
		return _this;
	}

	_createClass(Login, [{
		key: 'handleInputChange',
		value: function handleInputChange(e) {
			this.setState(_defineProperty({}, e.target.name, e.target.value));
		}
	}, {
		key: 'onLogin',
		value: function onLogin() {
			var _this2 = this;

			var _state = this.state,
			    email = _state.email,
			    password = _state.password;


			this.setState({
				loginError: ''
			}, function () {
				fetch('/auth/api/login', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						email: email,
						password: password
					})
				}).then(function (res) {
					return res.json();
				}).then(function (json) {
					if (json.success) {
						(0, _storage.setInStorage)('botany-bay', { token: json.token });

						window.location.replace('http://localhost:8080/dashboard/');

						_this2.setState({
							loginError: '',
							email: '',
							password: '',
							token: json.token
						});
					} else {
						_this2.setState({
							loginError: json.message
						});
					}
				});
			});
		}
	}, {
		key: 'render',
		value: function render() {
			var _state2 = this.state,
			    email = _state2.email,
			    password = _state2.password,
			    loginError = _state2.loginError;


			return _react2.default.createElement(
				_Layout2.default,
				{
					title: 'Sign in',
					optionalLink: '/auth/register',
					optionalLinkTitle: 'Register',
					optionalLinkText: 'a new Account.',
					error: loginError
				},
				_react2.default.createElement(
					_semanticUiReact.Form,
					{ size: 'large' },
					_react2.default.createElement(_semanticUiReact.Form.Input, {
						fluid: true,
						icon: 'user',
						iconPosition: 'left',
						type: 'email',
						name: 'email',
						value: email,
						onChange: this.handleInputChange.bind(this),
						placeholder: 'E-Mail Address'
					}),
					_react2.default.createElement(_semanticUiReact.Form.Input, {
						fluid: true,
						icon: 'lock',
						iconPosition: 'left',
						placeholder: 'Password',
						type: 'password',
						name: 'password',
						value: password,
						onChange: this.handleInputChange.bind(this)
					}),
					_react2.default.createElement(
						_semanticUiReact.Button,
						{ primary: true, fluid: true, size: 'large', onClick: this.onLogin.bind(this) },
						'Login'
					)
				)
			);
		}
	}]);

	return Login;
}(_react.Component);

exports.default = (0, _reactRouterDom.withRouter)(Login);
});

require.register("containers/Login/index.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Login = undefined;

var _Login = require('./Login');

var _Login2 = _interopRequireDefault(_Login);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = { Login: _Login2.default };
exports.Login = _Login2.default;
});

require.register("containers/Register/Register.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _reactRouterDom = require('react-router-dom');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _storage = require('./../../utils/storage');

var _semanticUiReact = require('semantic-ui-react');

var _Layout = require('../../components/Layout/Layout');

var _Layout2 = _interopRequireDefault(_Layout);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Register = function (_Component) {
	_inherits(Register, _Component);

	function Register(props) {
		_classCallCheck(this, Register);

		var _this = _possibleConstructorReturn(this, (Register.__proto__ || Object.getPrototypeOf(Register)).call(this, props));

		_this.state = {
			signUpError: '',
			registrationSuccess: false,
			email: '',
			password: '',
			passwordValidation: ''
		};
		return _this;
	}

	_createClass(Register, [{
		key: 'handleInputChange',
		value: function handleInputChange(e) {
			this.setState(_defineProperty({}, e.target.name, e.target.value));
		}
	}, {
		key: 'onSignUp',
		value: function onSignUp() {
			var _this2 = this;

			var _state = this.state,
			    email = _state.email,
			    password = _state.password,
			    passwordValidation = _state.passwordValidation;


			if (password === passwordValidation) {
				fetch('/auth/api/register', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						email: email,
						password: password
					})
				}).then(function (res) {
					return res.json();
				}).then(function (json) {
					if (json.success) {
						_this2.setState({
							signUpError: json.message,
							registrationSuccess: true,
							email: '',
							password: ''
						});
					} else {
						_this2.setState({
							signUpError: json.message
						});
					}
				});
			} else {
				this.setState({
					signUpError: 'Passwords did not match!'
				});
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var _state2 = this.state,
			    email = _state2.email,
			    password = _state2.password,
			    passwordValidation = _state2.passwordValidation,
			    registrationSuccess = _state2.registrationSuccess,
			    signUpError = _state2.signUpError;


			return _react2.default.createElement(
				_Layout2.default,
				{
					title: 'Register a new Account',
					optionalLink: '/auth/login',
					optionalLinkTitle: 'Login',
					optionalLinkText: 'to your Account.',
					error: signUpError,
					success: registrationSuccess
				},
				_react2.default.createElement(
					_semanticUiReact.Form,
					{ size: 'large' },
					_react2.default.createElement(_semanticUiReact.Form.Input, {
						fluid: true,
						icon: 'user',
						iconPosition: 'left',
						type: 'email',
						name: 'email',
						value: email,
						onChange: this.handleInputChange.bind(this),
						placeholder: 'E-mail address'
					}),
					_react2.default.createElement(_semanticUiReact.Form.Input, {
						fluid: true,
						icon: 'user',
						iconPosition: 'left',
						placeholder: 'Password',
						type: 'password',
						name: 'password',
						value: password,
						onChange: this.handleInputChange.bind(this)
					}),
					_react2.default.createElement(_semanticUiReact.Form.Input, {
						fluid: true,
						icon: 'user',
						iconPosition: 'left',
						placeholder: 'Repeat Password',
						type: 'password',
						name: 'passwordValidation',
						value: passwordValidation,
						onChange: this.handleInputChange.bind(this)
					}),
					_react2.default.createElement(
						_semanticUiReact.Button,
						{ primary: true, fluid: true, size: 'large', onClick: this.onSignUp.bind(this) },
						'Register'
					)
				)
			);
		}
	}]);

	return Register;
}(_react.Component);

exports.default = (0, _reactRouterDom.withRouter)(Register);
});

require.register("containers/Register/index.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Register = undefined;

var _Register = require('./Register');

var _Register2 = _interopRequireDefault(_Register);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = { Register: _Register2.default };
exports.Register = _Register2.default;
});

require.register("containers/index.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Register = exports.Login = exports.Home = undefined;

var _Home = require('./Home');

var _Login = require('./Login');

var _Register = require('./Register');

exports.default = { Home: _Home.Home, Login: _Login.Login, Register: _Register.Register };
exports.Home = _Home.Home;
exports.Login = _Login.Login;
exports.Register = _Register.Register;
});

require.register("initialize.js", function(exports, require, module) {
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouterDom = require('react-router-dom');

var _App = require('./App');

var _App2 = _interopRequireDefault(_App);

var _containers = require('./containers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_reactDom2.default.render(_react2.default.createElement(
	_reactRouterDom.BrowserRouter,
	null,
	_react2.default.createElement(
		_App2.default,
		null,
		_react2.default.createElement(
			_reactRouterDom.Switch,
			null,
			_react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/auth/', component: _containers.Home }),
			_react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/auth/login', component: _containers.Login }),
			_react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/auth/register', component: _containers.Register }),
			_react2.default.createElement(_reactRouterDom.Route, {
				render: function render() {
					window.location.replace('http://localhost:8080/notfound/');
					return null;
				}
			})
		)
	)
), document.querySelector('#root'));
});

require.register("utils/storage.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.getFromStorage = getFromStorage;
exports.setInStorage = setInStorage;
function getFromStorage(key) {
	if (!key) {
		return null;
	}

	try {
		var valueStr = localStorage.getItem(key);

		if (valueStr) {
			return JSON.parse(valueStr);
		}

		return null;
	} catch (err) {
		return null;
	}
}

function setInStorage(key, obj) {
	if (!key) {
		console.error('Error: Key is missing');
	}

	try {
		localStorage.setItem(key, JSON.stringify(obj));
	} catch (err) {
		console.error(err);
	}
}
});

;require.alias("node-browser-modules/node_modules/buffer/index.js", "buffer");
require.alias("process/browser.js", "process");process = require('process');require.register("___globals___", function(exports, require, module) {
  
});})();require('___globals___');


//# sourceMappingURL=app.js.map