import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import FormBase from '../FormBase';

interface DefaultProps {
    townhallId: string;
}
interface FormProps {
    title: string;
    mainDescription: string;
    icon: JSX.Element;
    reportType: 'Feedback' | 'Bug';
    townhallId?: string;
}

export default function ReportForm({
    title,
    mainDescription,
    icon,
    reportType,
    townhallId,
}: FormProps & DefaultProps) {
    return (
        <Grid container spacing={5}>
            <Grid item xs={12}>
                <Typography variant='h4' align='center'>
                    {title}
                    {icon}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant='body1'>{mainDescription}</Typography>
            </Grid>
            <Grid item xs={12}>
                <FormBase
                    submitType='create'
                    reportType={reportType}
                    townhallId={townhallId}
                />
            </Grid>
        </Grid>
    );
}

ReportForm.defaultProps = {
    townhallId: '',
};

ReportForm.propTypes = {
    townhallId: PropTypes.string,
};
