import companyLogo from "../assets/logo.png";

import {
  Card,
  Button,
  Typography,
  CssBaseline,
  Box,
  Stack,
  Avatar,
  Container,
  TextField,
} from "@mui/material";

export default function Login(props) {
  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <Stack direction='column'>
          <Stack alignItems='center'>
            <Avatar alt='Company Logo' src={companyLogo} sx={{ width: 250, height: 72, m: 3 }} variant='square'/>
          </Stack>
          <Card elevation={3}>
            <Typography component='h1' variant='h5' sx={{ mt: 3 }}>
              Sign In
            </Typography>
            <Box component='form' sx={{ p: 2 }} noValidate>
              <TextField
                variant='filled'
                margin='dense'
                required
                fullWidth
                id='username'
                label='Username'
                name='username'
                autoComplete='username'
                value={props.username}
                onChange={props.setUsername}
              />
              <TextField
                variant='filled'
                margin='dense'
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                autoComplete='current-password'
                value={props.password}
                onChange={props.setPassword}
              />
              <Button
                type='button'
                fullWidth
                variant='contained'
                sx={{ mt: 1, mb: 3 }}
                onClick={props.handleLogin}
              >
                Sign In
              </Button>
            </Box>
          </Card>
        </Stack>
      </Box>
    </Container>
  );
}
