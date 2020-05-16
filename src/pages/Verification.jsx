import React from 'react';
import Container from '@material-ui/core/Container';
import { useHistory, useParams } from 'react-router-dom';
import useSnack from '../hooks/useSnack';

export default function VerificationPage() {
	const history = useHistory();
	const {userId} = useParams();
	const [snack] = useSnack();

	fetch('/api/users/verification', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			userId: userId
		})
	}).then(res => {
		if(res.status === 200) {
			snack('Successfully Verified!', 'success');
			history.push('/login');
		} else {
			snack(`Error: ${res.statusText}`, 'error');
			history.push('/login');
			//Figure out best way to handle problem in the page
		}
	})

	//Todo implement some sort of verification page for verification failure with ability to re-send link?
	return (
		<Container>
		</Container>
	)
}


