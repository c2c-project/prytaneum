import React from 'react';
import {
    Grid,
    Typography,
    IconButton,
    Input,
    FormControl,
    InputProps,
    FormHelperText,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';

const useStyles = makeStyles((theme) => ({
    root: {
        widht: '100%',
        height: '100%',
        marginBottom: '1em',
    },
    text: {
        flexGrow: 1,
    },
    label: {
        marginRight: theme.spacing(2),
    },
    helperText: {
        marginBottom: '-2em', // I'm not sure where this comes from
    },
    form: {
        top: '-0.35rem', // visual testing, probably the height of the underline + its margin
    },
}));

interface Props {
    value: string;
    label: string;
    onChange: (s: string) => void;
    // eslint-disable-next-line react/require-default-props
    inputProps?: InputProps;
    // eslint-disable-next-line react/require-default-props
    helperText?: string;
}

export default function EditableText({
    value,
    onChange,
    label,
    inputProps,
    helperText,
}: Props) {
    const [isEditing, setIsEditing] = React.useState(false);
    const ref = React.useRef<HTMLInputElement | null>(null);
    const classes = useStyles();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsEditing(!isEditing);
    };

    return (
        <form className={classes.root} onSubmit={handleSubmit}>
            <Grid container alignItems='center'>
                <Typography variant='subtitle1' className={classes.label}>
                    {`${label}:`}
                </Typography>
                <div className={classes.text}>
                    {isEditing ? (
                        <FormControl className={classes.form}>
                            <Input
                                ref={ref}
                                id='component-simple'
                                autoFocus
                                onFocus={({ currentTarget }) =>
                                    currentTarget.select()
                                }
                                value={value}
                                onChange={(e) => {
                                    const { value: textFieldValue } = e.target;
                                    onChange(textFieldValue);
                                }}
                                // eslint-disable-next-line react/jsx-props-no-spreading
                                {...inputProps}
                            />
                            <FormHelperText
                                id='component-helper-text'
                                className={classes.helperText}
                            >
                                {helperText}
                            </FormHelperText>
                        </FormControl>
                    ) : (
                        <>
                            {value && <Typography>{value}</Typography>}
                            {!value && (
                                <Typography color='textSecondary' component='i'>
                                    Empty
                                </Typography>
                            )}
                        </>
                    )}
                </div>
                <IconButton type='submit' edge='end'>
                    {isEditing ? <SaveIcon /> : <EditIcon />}
                </IconButton>
            </Grid>
        </form>
    );
}
