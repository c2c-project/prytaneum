import { graphql, useFragment } from 'react-relay';
import { Card } from '@mui/material';

import type { QuestionQuoteFragment$key } from '@local/__generated__/QuestionQuoteFragment.graphql';
import { QuestionAuthor } from './QuestionAuthor';
import { QuestionContent } from './QuestionContent';

export const QUESTION_QUOTE_FRAGMENT = graphql`
    fragment QuestionQuoteFragment on EventQuestion @argumentDefinitions(lang: { type: "String!" }) {
        id
        ...QuestionAuthorFragment
        ...QuestionContentFragment @arguments(lang: $lang)
    }
`;

export interface QuestionQuoteProps {
    fragmentRef: QuestionQuoteFragment$key;
}

export function QuestionQuote({ fragmentRef }: QuestionQuoteProps) {
    const data = useFragment(QUESTION_QUOTE_FRAGMENT, fragmentRef);

    return (
        <Card
            sx={{ margin: (theme) => theme.spacing(2), border: (theme) => `1px solid ${theme.palette.divider}` }}
            elevation={0}
        >
            <QuestionAuthor fragmentRef={data} />
            <QuestionContent fragmentRef={data} />
        </Card>
    );
}
