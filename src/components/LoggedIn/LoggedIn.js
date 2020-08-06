"use strict";
exports.__esModule = true;
var react_1 = require("react");
var prop_types_1 = require("prop-types");
var react_router_dom_1 = require("react-router-dom");
// import useJwt from '../hooks/useJwt';
var NODE_ENV = process.env.NODE_ENV;
/**
 * @description redirects to the login page if the user is not logged in
 * ie they were trying to access a page that, at minimum, requires the user to be logged in
 */
function LoggedIn(_a) {
    var children = _a.children, jwt = _a.jwt;
    //const jwt = '';//{ _id: '' }; // useJwt();
    if (NODE_ENV === 'development') {
        console.log('not redirecting');
        return react_1["default"].createElement(react_1["default"].Fragment, null, children);
    }
    //console.log('redirecting');
    // assumption is that if there is no jwt, then they are not logged in
    return jwt ? react_1["default"].createElement(react_1["default"].Fragment, null, children) : react_1["default"].createElement(react_router_dom_1.Redirect, { to: '/logout' });
}
exports["default"] = LoggedIn;
LoggedIn.propTypes = {
    children: prop_types_1["default"].oneOfType([prop_types_1["default"].node, prop_types_1["default"].array]).isRequired
};
