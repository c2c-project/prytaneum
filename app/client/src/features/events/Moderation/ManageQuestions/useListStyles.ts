import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    listItem: {
        marginBottom: theme.spacing(3),
    },
    card: {
        position: 'relative',
        overflow: 'visible',

        // NOTE: leaving this here so that this comment makes sense
        // setting margin here will cause the drop to hang for a bit
        // instead set the margin on the dragarea
        // margin: 7,
    },
}));
