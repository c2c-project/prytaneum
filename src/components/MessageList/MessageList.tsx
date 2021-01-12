import React from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        // height: '100%',
        width: '100%',
        // overflowY: 'scroll'
    },
    maxHeight: {
        height: '100%',
    },
});

interface Props {
    id?: string;
    children: JSX.Element | JSX.Element[];
}

/** Returns a list of the children, since children are JSX elements, we can pass MessageListItems in
 *  @category Component
 *  @constructor MessageList
 *  @param props
 *  @param {JSX.Element | JSX.Element[]} props.children JSX elements to list out on the page; for example, using MessageListItems
 */
export default function MessageList({ id, children }: Props) {
    const classes = useStyles();
    return (
        <div className={classes.root} id={id}>
            <List dense>{children}</List>
        </div>
    );
}

MessageList.defaultProps = {
    id: undefined,
};

MessageList.propTypes = {
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]).isRequired,
};
