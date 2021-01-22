import React from 'react';
import {
    Grid,
    FormControlLabel,
    Switch,
    Typography,
    Button,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import useTownhall from 'hooks/useTownhall';

// TODO: credits settings
// export const CreditsSettings = React.memo(function CreditsSettings({
//     onChange,
//     value,
// }: Props<'credits'>) {
//     const classes = useStyles();
//     const ref = useRef(value);
//     const handleChange = (key: keyof typeof value) => (
//         e: React.ChangeEvent<HTMLInputElement>
//     ) => {
//         const { checked } = e.target;
//         if (key === 'enabled') {
//             if (ref.current.enabled === checked) onChange(ref.current);
//             else
//                 onChange({
//                     enabled: checked,
//                     list: value.list,
//                 });
//         } else onChange({ ...value, [key]: checked });
//     };
//     return (
//         <SettingsList>
//             <SettingsItem helpText={text.credits.enabled} name='Enabled'>
//                 <Switch
//                     onChange={handleChange('enabled')}
//                     checked={value.enabled}
//                 />
//             </SettingsItem>
//             <Collapse in={value.enabled} className={classes.fullWidth}>
//                 <SettingsItem name='TODO' helpText='TODO'>
//                     <div>TODO</div>
//                 </SettingsItem>
//             </Collapse>
//         </SettingsList>
//     );
// },
// areEqual);

export function Registration() {
    // const townhall = React.useContext(TownhallContext);
    // const [state, setState] = React.useState(
    //     townhall.settings.registration.reminders
    // );
    // const buildHandler = buildSwitchUpdate<typeof state>(setState);
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <FormControlLabel
                    control={
                        <Switch
                            // checked={state.enabled}
                            // onChange={buildHandler('enabled')}
                            name='credits-enabled-checkbox'
                        />
                    }
                    label='Enabled'
                />
            </Grid>
            {/* <Collapse in={state.enabled}>
                <Grid item xs={12}>
                    <UploadField onChange={console.log} />
                </Grid>
            </Collapse> */}
            <div>TODO: upload registrants</div>
        </Grid>
    );
}

export function Attachments() {
    const [townhall] = useTownhall();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [state, setState] = React.useState(
        townhall.settings.attachments.list
    );

    // function buildHandler(idx: number, key: 'name' | 'url') {
    //     return (e: React.ChangeEvent<HTMLInputElement>) => {
    //         e.preventDefault();
    //         const { value } = e.target;
    //         setState(
    //             [...state].splice(idx, 1, { ...state[idx], [key]: value })
    //         );
    //     };
    // }

    // function handleAdd(attachment: TownhallAttachment) {
    //     setState([...state, attachment]);
    // }

    // function handleRemove(idx: number) {
    //     setState([...state].splice(idx, 1));
    // }

    // FIXME:
    return (
        <Grid container>
            {state.length === 0 && (
                <Grid item xs={12}>
                    <Typography>No Links to display</Typography>
                </Grid>
            )}
            {/* {state.map(({ name, type }, idx) => (
                <Grid container item xs={12} alignItems='center'>
                    <Grid item xs={11} container spacing={2}>
                        <Grid item xs={6}>
                            <TextField
                                label='Name'
                                value={name}
                                onChange={buildHandler(idx, 'name')}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label='URL'
                                value={url}
                                onChange={buildHandler(idx, 'url')}
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs='auto' style={{ flexGrow: 1 }}>
                        <Grid container justify='flex-end' item xs='auto'>
                            <IconButton
                                onClick={() => handleRemove(idx)}
                                edge='end'
                            >
                                <CloseIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Grid>
            ))} */}
            <Grid item xs={12}>
                <Button
                    // eslint-disable-next-line no-console
                    onClick={() => console.log('unimplemented')}
                    startIcon={<AddIcon />}
                >
                    Add Link
                </Button>
            </Grid>
        </Grid>
    );
}
