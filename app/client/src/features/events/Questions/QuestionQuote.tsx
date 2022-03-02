import { graphql, useFragment } from 'react-relay';
import { Card } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import clsx from 'clsx';

import type { QuestionQuoteFragment$key } from '@local/__generated__/QuestionQuoteFragment.graphql';
import { QuestionAuthor } from './QuestionAuthor';
import { QuestionContent } from './QuestionContent';

export const QUESTION_QUOTE_FRAGMENT = graphql`
    fragment QuestionQuoteFragment on EventQuestion {
        id
        ...QuestionAuthorFragment
        ...QuestionContentFragment
    }
`;

export interface QuestionQuoteProps {
    fragmentRef: QuestionQuoteFragment$key;
    className?: string;
}

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(2),
        border: `1px solid ${theme.palette.divider}`,
    },
}));

export function QuestionQuote({ fragmentRef, className }: QuestionQuoteProps) {
    const data = useFragment(QUESTION_QUOTE_FRAGMENT, fragmentRef);
    const classes = useStyles();

    return (
        <Card className={clsx(className, classes.root)} elevation={0}>
            <QuestionAuthor fragmentRef={data} />
            <QuestionContent fragmentRef={data} />
        </Card>
    );
}
