import React from 'react';
import {
    Typography,
    Button,
    Card,
    CardHeader,
    CardContent,
    CardActions,
} from '@material-ui/core';

interface PromptProps {
    onAccept: () => void;
    onAlt: () => void;
}
export default function Prompt({ onAlt, onAccept }: PromptProps) {
    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Card style={{ maxWidth: 500 }}>
                <CardHeader title='Not Logged In!' />
                <CardContent>
                    <Typography>
                        Register or Login to gain access to do the following:
                        <ul>
                            <li>Submit Questions</li>
                            <li>Like Questions</li>
                            <li>Send Chat Messages</li>
                        </ul>
                    </Typography>
                </CardContent>
                <CardActions style={{ justifyContent: 'flex-end' }}>
                    <Button onClick={onAlt}>I just want to watch</Button>
                    <Button variant='outlined' onClick={onAccept}>
                        Register
                    </Button>
                </CardActions>
            </Card>
        </div>
    );
}
