import React from 'react';
import PropTypes from 'prop-types';

import SectionList from 'components/SectionList';
import { FeedbackReport, BugReport } from '../api';

interface Props {
    Reports: FeedbackReport[] | BugReport[];
}
export default function ReportList({ Reports }: Props) {
    return <SectionList sections={{ title: 'Test', sectionData: Reports }} />;
}
