import * as React from 'react';

import { Container, Grid, Box, Link } from '@material-ui/core';

export function Footer() {
    return (
        <footer>
            <Box px={{ xs: 3, sm: 10 }} py={{ xs: 5, sm: 10 }}>
                <Container maxWidth='lg'>
                    <Grid container spacing={5}>
                        <Grid item xs={12} sm={4}>
                            <Box borderBottom={1}>Learn More</Box>
                            <Box>
                                <Link href='/'>Home</Link>
                            </Box>
                            <Box>
                                <Link href='/aboutus'>About Us</Link>
                            </Box>
                            <Box>
                                <Link href='/'>Mission</Link>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Box borderBottom={1}>Account</Box>
                            <Box>
                                <Link href='/'>Login</Link>
                            </Box>
                            <Box>
                                <Link href='/'>Sign Up</Link>
                            </Box>
                            <Box>
                                <Link href='/'>Privacy</Link>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Box borderBottom={1}>Support</Box>
                            <Box>
                                <Link href='/'>FAQ</Link>
                            </Box>
                            <Box>
                                <Link href='/'>Contact</Link>
                            </Box>
                            <Box>
                                <Link href='/'>Privacy</Link>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </footer>
    );
}
