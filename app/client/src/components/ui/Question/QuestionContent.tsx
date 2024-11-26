import React from 'react';
import { graphql, useFragment } from 'react-relay';
import {
    CardContent,
    CardContentProps,
    IconButton,
    Paper,
    Skeleton,
    Stack,
    Tooltip,
    Typography,
    TypographyProps,
} from '@mui/material';
import TranslateIcon from '@mui/icons-material/Translate';

import type { QuestionContentFragment$key } from '@local/__generated__/QuestionContentFragment.graphql';
import { useUser } from '@local/features/accounts';

export type QuestionContentProps = {
    fragmentRef: QuestionContentFragment$key;
    typographyProps?: TypographyProps;
    measure?: () => void;
} & CardContentProps;

export const QUESTION_CONTENT_FRAGMENT = graphql`
    fragment QuestionContentFragment on EventQuestion @argumentDefinitions(lang: { type: "String!" }) {
        question
        lang
        questionTranslated(lang: $lang)
    }
`;

export function QuestionContent({ fragmentRef, typographyProps = {}, measure, ...props }: QuestionContentProps) {
    const { user } = useUser();
    const questionContentData = useFragment(QUESTION_CONTENT_FRAGMENT, fragmentRef);
    const [showOriginalLanguage, setShowOriginalLanguage] = React.useState(false);
    const toggleShowTranslated = React.useCallback(() => {
        setShowOriginalLanguage((prev) => !prev);
    }, []);

    // Updates the size of the auto-sizer when the translation is toggled
    React.useEffect(() => {
        measure?.();
    }, [measure, showOriginalLanguage]);

    const preferredLang = React.useMemo(() => user?.preferredLang ?? 'EN', [user?.preferredLang]);
    const isQuestionTranslated = React.useMemo(
        () =>
            questionContentData.lang !== preferredLang &&
            questionContentData.questionTranslated !== questionContentData.question,
        [questionContentData.lang, questionContentData.questionTranslated, questionContentData.question, preferredLang]
    );

    function translationButton() {
        if (!questionContentData.questionTranslated) return null;
        if (!isQuestionTranslated) return null;
        return (
            <IconButton onClick={toggleShowTranslated} sx={{ padding: 0 }}>
                <Tooltip title='Translated Question'>
                    <TranslateIcon fontSize='small' />
                </Tooltip>
                <Typography variant='caption' color='black'>
                    {!showOriginalLanguage ? 'View Original' : 'Hide Original'}
                </Typography>
            </IconButton>
        );
    }

    if (!questionContentData) return null;

    return (
        <CardContent {...props} sx={{ margin: (theme) => theme.spacing(-2, 0, -1, 0) }}>
            <Typography variant='inherit' style={{ wordBreak: 'break-word' }} {...typographyProps}>
                {questionContentData.questionTranslated || questionContentData.question || <Skeleton />}
            </Typography>
            {translationButton()}
            {showOriginalLanguage ? (
                <Paper elevation={2} sx={{ padding: '0.5rem' }}>
                    <Stack direction='row' alignItems='center'>
                        <Typography variant='inherit' style={{ wordBreak: 'break-word' }} {...typographyProps}>
                            {questionContentData.question}
                        </Typography>
                    </Stack>
                </Paper>
            ) : null}
        </CardContent>
    );
}
