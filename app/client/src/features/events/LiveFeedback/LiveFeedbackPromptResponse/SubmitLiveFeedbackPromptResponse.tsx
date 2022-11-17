// import * as React from 'react';
// import { Button, DialogContent } from '@mui/material';
// import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
// import LockIcon from '@mui/icons-material/Lock';
// import { useMutation, graphql } from 'react-relay';

// import type { SubmitLiveFeedbackPromptMutation } from '@local/__generated__/SubmitLiveFeedbackPromptMutation.graphql';
// import { ResponsiveDialog, useResponsiveDialog } from '@local/components/ResponsiveDialog';
// import { useUser } from '@local/features/accounts';
// import { LiveFeedbackPromptForm, TLiveFeedbackPromptFormState } from './LiveFeedbackPromptForm';

// interface Props {
//     className?: string;
//     eventId: string;
// }

// export const SUBMIT_LIVE_FEEDBACK_PROMPT_MUTATION = graphql`
//     mutation SubmitLiveFeedbackPromptMutation($input: CreateFeedbackPrompt!) {
//         createFeedbackPrompt(input: $input) {
//             isError
//             message
//             body {
//                 cursor
//                 node {
//                     id
//                     createdAt
//                     prompt
//                 }
//             }
//         }
//     }
// `;

// export function SubmitLiveFeedbackPrompt({ className, eventId }: Props) {
//     const [isOpen, open, close] = useResponsiveDialog();
//     const [user] = useUser();
//     const [commit] = useMutation<SubmitLiveFeedbackPromptMutation>(SUBMIT_LIVE_FEEDBACK_PROMPT_MUTATION);

//     function handleSubmit(form: TLiveFeedbackPromptFormState) {
//         commit({
//             variables: { input: { ...form, eventId } },
//             onCompleted: close,
//         });
//     }

//     return (
//         <>
//             <ResponsiveDialog open={isOpen} onClose={close}>
//                 <DialogContent>
//                     <LiveFeedbackPromptForm onCancel={close} onSubmit={handleSubmit} />
//                 </DialogContent>
//             </ResponsiveDialog>

//             <Button
//                 className={className}
//                 disabled={!user}
//                 variant='contained'
//                 color='primary'
//                 onClick={open}
//                 startIcon={user ? <QuestionAnswerIcon /> : <LockIcon />}
//             >
//                 {user ? 'Submit Live Feedback' : 'Sign in to submit live feedback'}
//             </Button>
//         </>
//     );
// }
