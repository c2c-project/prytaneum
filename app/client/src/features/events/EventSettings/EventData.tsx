import { Button } from '@mui/material';
import { useFragment, graphql } from 'react-relay';

import { EventDataFragment$key } from '@local/__generated__/EventDataFragment.graphql';

export interface EventDataProps {
    fragmentRef: EventDataFragment$key;
}

export const EVENT_DATA_FRAGMENT = graphql`
    fragment EventDataFragment on Event {
        liveFeedback {
            edges {
                node {
                    createdBy {
                        firstName
                        lastName
                        email
                    }
                    message
                }
            }
        }
        questions {
            edges {
                node {
                    createdBy {
                        firstName
                        lastName
                        email
                    }
                    question
                }
            }
        }
    }
`;

// Converts array of objects into a CSV-formatted string.
function toCSV(data: Object[]) {
    let content = 'data:text/csv;charset=utf-8';
    const keys = Object.keys(data[0]);

    // Load the header
    for (const key of keys) content += `,${key}`;
    content += '\r\n';

    // Load each entry
    data.forEach(function(rowObj) {
        let row = '';
        for (let i = 0; i < keys.length; i++) row += `${rowObj[keys[i] as keyof typeof rowObj]},`;
        content += row + '\r\n';
    })

    return content;
}

// Accepts a CSV-formatted string, and desired filename, and downloads to client.
function downloadCSV(data: string, filename: string) {
    const encodedUri = encodeURI(data);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
}

export function EventData({ fragmentRef }: EventDataProps) {
    const data = useFragment(EVENT_DATA_FRAGMENT, fragmentRef);
    const feedback = data.liveFeedback?.edges ?? [];
    const questions = data.questions?.edges ?? [];

    const feedbackArray = feedback.map(({ node }) => ({
        FirstName: node.createdBy?.firstName,
        LastName: node.createdBy?.lastName,
        Email: node.createdBy?.email,
        Message: node.message,
    }));

    const questionArray = questions.map(({ node }) => ({
        FirstName: node.createdBy?.firstName,
        LastName: node.createdBy?.lastName,
        Email: node.createdBy?.email,
        Question: node.question,
    }));

    // Load feedback and questions into csv format
    const feedbackContent = toCSV(feedbackArray);
    const questionContent = toCSV(questionArray);

    return (
        <div>
            <Button onClick={() => { downloadCSV(feedbackContent, 'feedback.csv') }}>
                Download Event Feedback
            </Button>
            <br />
            <Button onClick={() => { downloadCSV(questionContent, 'questions.csv') }}>
                Download Event Questions
            </Button>
        </div>
        
    );
}