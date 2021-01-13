/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { motion } from 'framer-motion';

import { Props as TabPanelProps, TabPanels } from 'components/TabPanel';
import makeTransition from './makeTransition';

const useStyles = makeStyles(() => ({
    root: {
        width: '100%',
        height: '100%',
    },
}));

interface Props extends Pick<TabPanelProps, 'children'> {
    classes: ReturnType<typeof useStyles>;
}

const StyledTabPanel = React.memo(({ children, classes }: Props) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={makeTransition(0)}
            className={classes.root}
        >
            <TabPanels>{children}</TabPanels>
        </motion.div>
    );
});

function ContextSubscriber(props: Pick<Props, 'children'>) {
    const classes = useStyles();
    const { children } = props;
    return <StyledTabPanel classes={classes}>{children}</StyledTabPanel>;
}

export default ContextSubscriber;
