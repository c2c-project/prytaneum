import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Grow from '@material-ui/core/Grow';
import useSnack from '../hooks/useSnack';

const useStyles = makeStyles(theme => ({
	root: {
		height: '100%'
	},
	paper: {
		// not necessary anymore?
		// marginTop: '64-px', // slight offset to make the component feel more vertically centered
		padding: theme.spacing(2)
	}
}));

export default function ResetPasswordPage() {
	const classes = useStyles();
	const history = useHistory();
	const [form, setForm] = React.useState({
		password: '',
		confirmPassword: ''
	});
	const {token} = useParams();
	const [snack] = useSnack();

	const handleChange = (e, id) => {
		e.preventDefault();
		const { value } = e.target;
		setForm(state => ({ ...state, [id]: value }));
		console.log(form);
	};

	const handleSubmit = e => {
		e.preventDefault();
		fetch('/api/users/consume-password-reset-token', {
				method: 'POST',
				body: JSON.stringify({ form, token }),
				headers: {
					'Content-Type': 'application/json'
				}
		}).then(res => {
			if (res.status === 200) {
				history.push('/login');
				snack('Password Changed', 'success');
			} else {
				snack(`Error: ${res.statusText}`, 'error');
			}
			console.log(res);
		});
	};

	return (
		<Container maxWidth='md' className={classes.root}>
			<Grow timeout={300} in>
				<Grid
					container
					direction='column'
					className={classes.root}
					alignContent='center'
					justify='center'
				>
					<Paper className={classes.paper}>
						<form onSubmit={handleSubmit}>
							<Grid
								container
								spacing={2}
								className={classes.root}
								alignContent='center'
							>
								<Grid item xs={12}>
									<TextField
										required
										fullWidth
										variant='outlined'
										type='password'
										value={form.password}
										onChange={e =>
											handleChange(e, 'password')
										}
										label='Password'
									/>
									</Grid>
									<Grid item xs={12}>
										<TextField
											required
											fullWidth
											variant='outlined'
											type='password'
											value={form.confirmPassword}
											onChange={e =>
												handleChange(e, 'confirmPassword')
											}
											label='Confirm Password'
										/>
									</Grid>
									<Grid
										container
										item
										item
										xs={12}
										justify='space-between'
									>
										<Button
											onClick={e => {
												e.preventDefault();
												history.push('/login');
											}}
											variant='text'
										>
											Login
										</Button>
										<Button
											type='submit'
											variant='contained'
											color='primary'
										>
											Reset Password
										</Button>
									</Grid>
							</Grid>
						</form>
					</Paper>
				</Grid>
			</Grow>
		</Container>
	);
}
