import React from 'react';
import PropTypes from 'prop-types';
import FormTitle from 'components/FormTitle';

import FormBase from '../FormBase';

interface DefaultProps {
    townhallId: string;
}
export interface FormProps {
    reportType: 'Feedback' | 'Bug';
    townhallId?: string;
}

export default function ReportForm({ reportType, townhallId }: FormProps & DefaultProps) {
    const description =
        reportType === 'Feedback'
            ? 'Thank you for your feedback! The Prytaneum team appreciates it and will take it into consideration to improve your future virtual town hall experiences.'
            : 'Let us know what went wrong during your virtual town hall experience. We strongly appreciate your time to complete this form.';

    const title = reportType === 'Feedback' ? 'Feedback Report Form' : 'Bug Report Form';

    return (
        <div>
            <FormTitle title={title} description={description} titleTypographyProps={{ align: 'center' }} />
            <FormBase submitType='create' reportType={reportType} townhallId={townhallId} />
        </div>
    );
}

ReportForm.defaultProps = {
    townhallId: '',
};

ReportForm.propTypes = {
    townhallId: PropTypes.string,
};
