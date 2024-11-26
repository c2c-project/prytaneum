export default function TranslatedQuestionContent() {
    return null;
}

// import React, { useCallback, useEffect } from 'react';
// import { graphql, useRefetchableFragment } from 'react-relay';
// import { Button, CardContent, CardContentProps, Typography, TypographyProps } from '@mui/material';

// import type { TranslatedQuestionContentFragment$key } from '@local/__generated__/TranslatedQuestionContentFragment.graphql';
// import type { TranslatedQuestionContentFragmentRefetchQuery } from '@local/__generated__/TranslatedQuestionContentFragmentRefetchQuery.graphql';
// import { useUser } from '@local/features/accounts';

// export type Props = {
//     fragmentRef: TranslatedQuestionContentFragment$key;
//     typographyProps?: TypographyProps;
// } & CardContentProps;

// export const QUESTION_CONTENT_FRAGMENT = graphql`
//     fragment TranslatedQuestionContentFragment on EventQuestion
//     @refetchable(queryName: "TranslatedQuestionContentFragmentRefetchQuery")
//     @argumentDefinitions(lang: { type: "String!" }) {
//         question
//         lang
//         questionTranslated(lang: $lang)
//     }
// `;

// export function TranslatedQuestionContent({ fragmentRef, typographyProps = {}, ...props }: Props) {
//     const { user } = useUser();
//     const [showOriginal, setShowOriginal] = React.useState(false);

//     const toggleShowOriginal = useCallback(() => setShowOriginal((prev) => !prev), []);

//     const [questionContentData] = useRefetchableFragment<
//         TranslatedQuestionContentFragmentRefetchQuery,
//         TranslatedQuestionContentFragment$key
//     >(QUESTION_CONTENT_FRAGMENT, fragmentRef);

//     useEffect(() => {
//         console.log(questionContentData);
//     }, [questionContentData]);

//     const preferredLang = React.useMemo(() => user?.preferredLang ?? 'EN', [user?.preferredLang]);

//     const question = React.useMemo(() => {
//         if (showOriginal) return questionContentData.question;
//         if (questionContentData.lang === preferredLang) {
//             return questionContentData.question;
//         } else {
//             return questionContentData.questionTranslated;
//         }
//     }, [
//         showOriginal,
//         questionContentData.question,
//         questionContentData.lang,
//         questionContentData.questionTranslated,
//         preferredLang,
//     ]);

//     const isTranslated = React.useMemo(
//         () => !showOriginal && questionContentData.lang !== preferredLang,
//         [showOriginal, questionContentData.lang, preferredLang]
//     );

//     const isLanguagesMatch = React.useMemo(
//         () => questionContentData.lang === preferredLang,
//         [questionContentData.lang, preferredLang]
//     );

//     if (!questionContentData) return null;

//     return (
//         <React.Suspense fallback='Loading...'>
//             <CardContent {...props} sx={{ margin: (theme) => theme.spacing(-2, 0, -1, 0) }}>
//                 <Typography variant='inherit' style={{ wordBreak: 'break-word' }} {...typographyProps}>
//                     {question}
//                     {isTranslated ? ' (Translated)' : ''}
//                 </Typography>
//             </CardContent>
//             {isLanguagesMatch ? null : (
//                 <Button onClick={toggleShowOriginal}>{showOriginal ? 'Show Translated' : 'Show Original'}</Button>
//             )}
//         </React.Suspense>
//     );
// }
