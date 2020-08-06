"use strict";
exports.__esModule = true;
var react_1 = require("react");
var prop_types_1 = require("prop-types");
var Fab_1 = require("@material-ui/core/Fab");
var Add_1 = require("@material-ui/icons/Add");
var Zoom_1 = require("@material-ui/core/Zoom");
var styles_1 = require("@material-ui/core/styles");
var useStyles = styles_1.makeStyles(function (theme) { return ({
    fab: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2)
    }
}); });
/**
 * @category Wrapper
 * @description Fab button that displays bottom right of screen, currently only uses a + sign
 * @arg props
 * @arg props.onClick function that runs when the fab is clicked
 */
function Fab(_a) {
    var onClick = _a.onClick;
    var classes = useStyles();
    return (<Zoom_1.default in timeout={300}>
            <Fab_1.default onClick={onClick} className={classes.fab} color='secondary'>
                <Add_1.default />
            </Fab_1.default>
        </Zoom_1.default>);
}
exports["default"] = Fab;
Fab.propTypes = {
    onClick: prop_types_1["default"].func.isRequired
};
