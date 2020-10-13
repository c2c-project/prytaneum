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
        fontWeight: theme.typography.fontWeightBold,
        paddingRight: theme.spacing(2),
    },
    helperText: {
        marginBottom: '-2em', // I'm not sure where this comes from
    },
}));

interface Props {
    value: string;
    label: string;
    onChange: (s: string) => void;
    // eslint-disable-next-line react/require-default-props
    inputProps?: InputProps;
}

export default function EditableText({
    value,
    onChange,
    label,
    inputProps,
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
                <Typography className={classes.label}>{`${label}:`}</Typography>
                <div className={classes.text}>
                    {isEditing ? (
                        <FormControl>
                            <Input
                                ref={ref}
                                required
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
                                Some important helper text
                            </FormHelperText>
                        </FormControl>
                    ) : (
                        <Typography>{value}</Typography>
                    )}
                </div>
                <IconButton type='submit' edge='end'>
                    {isEditing ? <SaveIcon /> : <EditIcon />}
                </IconButton>
            </Grid>
        </form>
    );
}
