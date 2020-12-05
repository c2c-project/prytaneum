import React from 'react';
// import Grid from '@material-ui/core/Grid';
// import DialogContent from '@material-ui/core/DialogContent';

// import useEndpoint from 'hooks/useEndpoint';
// import Dialog, { DialogProps } from 'components/Dialog';
// import InvalidLink from 'components/InvalidLink';
// import Loader from 'components/Loader';
// import history from 'utils/history';

// import { TownhallContext } from 'domains/Townhall/Contexts/Townhall';

// import API from '../api';

// type InvalidInviteDialogProps = Omit<DialogProps, 'children'>;
// function InvalidInviteDialog(props: InvalidInviteDialogProps) {
//     const { open, onClose } = props;
//     return (
//         <Dialog open={open} onClose={onClose} title='Error'>
//             <DialogContent>
//                 <InvalidLink errorMessage='Invalid Invite Link' />
//             </DialogContent>
//         </Dialog>
//     );
// }

interface Props {
    inviteToken: string;
}

// FIXME:
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function HandleInviteLink({ inviteToken }: Props) {
    // console.log(inviteToken);
    // const townhall = useContext(TownhallContext);
    // const [open, setOpen] = useState(false);
    // const loginRequest = useCallback(() => API.loginWithJWT(inviteToken), [
    //     inviteToken,
    // ]);
    // const handleClose = () => {
    //     history.push('/');
    // };
    // const [sendLoginRequest] = useEndpoint(loginRequest, {
    //     onSuccess() {
    //         history.push(`/townhalls/${townhall._id}`);
    //     },
    //     onFailure(e) {
    //         console.error(e);
    //         setOpen(true);
    //     },
    // });
    // const validateRequest = useCallback(() => API.validateJWT(inviteToken), [
    //     inviteToken,
    // ]);
    // const [sendValidateRequest] = useEndpoint(validateRequest, {
    //     onSuccess() {
    //         sendLoginRequest();
    //     },
    //     onFailure(e) {
    //         console.error(e);
    //         setOpen(true);
    //     },
    // });
    // useEffect(() => {
    //     if (!inviteToken || inviteToken === '') {
    //         history.push('/');
    //     }
    //     sendValidateRequest();
    // }, []);
    // return (
    //     <Grid container justify='center'>
    //         <InvalidInviteDialog open={open} onClose={handleClose} />
    //         <Loader />
    //     </Grid>
    // );

    // TODO: convert to middleware if possible
    return <div />;
}
