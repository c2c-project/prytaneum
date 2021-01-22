import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import FormTitle from 'components/FormTitle';

import FormBase from '../FormBase';

interface DefaultProps {
    townhallId: string;
}
interface FormProps {
    title: string;
    description: string;
    reportType: 'Feedback' | 'Bug';
    townhallId?: string;
}

export default function ReportForm({
    title,
    description,
    reportType,
    townhallId,
}: FormProps & DefaultProps) {
    return (
        <Grid container spacing={5}>
            <Grid item xs={12}>
                <FormTitle
                    title={title}
                    description={description}
                    titleTypographyProps={{ align: 'center' }}
                />
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
