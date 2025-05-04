import { fetchGet, fetchPut } from "../controller.jsx"
import {
  CustomPaper,
  CustomDataGrid,
  FormDialog,
} from "../components.jsx"
import {
  columnsUsers,
} from "../data.jsx"

import React, { useState, useEffect } from "react";
import {
  Alert,
  Button,
  IconButton,
  Typography,
  Collapse,
  Box,
  Stack,
  TextField,
  Select,
  InputLabel,
  FormControl,
  MenuItem,
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export default function Users() {
  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [userRoleNames, setUserRoleNames] = useState([]);
  const [userRoleName, setUserRoleName] = useState('');
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const handleChangeUserRoleName = (event) => {
    setUserRoleName(event.target.value);
  }
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setUserRoleName('');
    setOpenAlert(false);
  };
  const onSubmitContent = async (event) => {
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const usernameExists = await fetchGet(`/api/auth/username_exists/${formJson.username}`);

    if (formJson.password !== formJson.repeated_password) {
      setAlertMessage('Your password must be exactly the same in both fields.');
      setOpenAlert(true);
    } else if (usernameExists) {
      setAlertMessage('Username is already taken. Try a different one.');
      setOpenAlert(true);
    } else {
      const token = localStorage.getItem('auth_token');
      fetchPut(`/api/put/users/${token}/${formJson.username}/${formJson.password}/${formJson.user_role_name}`)
        .then((_) => {
          handleClose();
          location.reload();
        })
        .catch((error) => {
          console.error('Error adding new user: ', error);
        });
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    fetchGet(`/api/get/users/${token}`)
      .then((data) => {
        setRows(data);
      })
      .catch((error) => {
        console.error('Error fetching users data:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);
  useEffect(() => {
    fetchGet('/api/get/user_roles')
      .then((data) => {
        setUserRoleNames(data)
      })
      .catch((error) => {
        console.error('Error fetching user role data:', error);
      })
      .finally(() => {});
  }, []);

  return (
    <Stack spacing={2} sx={{ textAlign: "left" }}>
      <Typography variant="h4" >Users</Typography>
      <Stack spacing={2}>
        <CustomPaper>
          <Typography variant="body1">
            Anda dapat menambahkan pengguna baru di halaman ini.
          </Typography>
        </CustomPaper>
        <CustomDataGrid
          columns={columnsUsers}
          rows={rows}
          getRowId={(row) => row.username}
          onRowSelectionModelChange={() => {}}
          sx={{ maxWidth: 'calc(100vw - 112px)' }}
        />
        <Button variant="contained" onClick={handleClickOpen}>
          Buat Pengguna Baru
        </Button>
        <FormDialog
          onSubmitContent={onSubmitContent}
          open={open}
          title='Buat Pengguna Baru'
          contentText="Anda dapat memasukkan nama dan kata sandi untuk membuat pengguna baru di sini."
          submitLabel='Buat Pengguna Baru'
          handleClose={handleClose}
          content={
            <Box>
              <FormControl autoFocus variant="filled" margin="dense" fullWidth required>
                <InputLabel id="user-role-name-label">Peran Pengguna</InputLabel>
                <Select
                  labelId="user-role-name-label"
                  label="User Role"
                  value={userRoleName}
                  onChange={handleChangeUserRoleName}
                  name="user_role_name"
                >
                  {[...userRoleNames].map((_, i) =>
                    <MenuItem value={userRoleNames[i].user_role_name}>{userRoleNames[i].user_role_name}</MenuItem>
                  )}
                </Select>
              </FormControl>
              <TextField
                required
                margin="dense"
                id="name"
                name="username"
                label="Username"
                type="text"
                fullWidth
                variant="filled"
              />
              <TextField
                required
                margin="dense"
                id="name"
                name="password"
                label="Kata Sandi"
                type="password"
                fullWidth
                variant="filled"
              />
              <TextField
                required
                margin="dense"
                id="name"
                name="repeated_password"
                label="Ulangi Kata Sandi"
                type="password"
                fullWidth
                variant="filled"
              />
              <Collapse in={openAlert}>
                <Alert
                  severity="error"
                  variant="filled"
                  action={
                    <IconButton aria-label="close" color="inherit" size="small" onClick={() => { setOpenAlert(false); }}>
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  }
                  sx={{ mt: 1 }}
                >
                  {alertMessage}
                </Alert>
              </Collapse>
            </Box>
          }
        />
      </Stack>
    </Stack>
  );
}
