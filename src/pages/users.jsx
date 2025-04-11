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

export default function Users() {
  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [userRoleNames, setUserRoleNames] = useState([]);
  const [userRoleName, setUserRoleName] = useState('');
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [supplierNames, setSupplierNames] = useState([]);
  const [supplierName, setSupplierName] = useState('');
  const [openSupplierChoice, setOpenSupplierChoice] = useState(false);

  const handleChangeSupplierName = (event) => {
    setSupplierName(event.target.value);
  }
  const handleChangeUserRoleName = (event) => {
    setUserRoleName(event.target.value);

    if (event.target.value === 'supplier') {
      setOpenSupplierChoice(true);
    } else {
      setOpenSupplierChoice(false);
    }
  }
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setUserRoleName('');
    setSupplierName('');
    setOpenSupplierChoice(false);
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
  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    fetchGet(`/api/get/suppliers/${token}`)
      .then((data) => {
        setSupplierNames(data)
      })
      .catch((error) => {
        console.error('Error fetching orders data:', error);
      })
      .finally(() => {});
  }, []);

  return (
    <Stack spacing={2} sx={{ textAlign: "left" }}>
      <Typography variant="h4" >Users</Typography>
      <Stack spacing={2}>
        <Stack
          spacing={{ xs: 2, sm: 2 }}
          direction="row"
          useFlexGap
          sx={{ flexWrap: "wrap", alignItems: "stretch" }}
        >
          <CustomPaper>
            <Typography variant="body1">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </Typography>
          </CustomPaper>
          <CustomPaper>
            <Typography variant="body1">
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Typography>
          </CustomPaper>
        </Stack>
        <CustomPaper>
          <Typography variant="body1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </Typography>
        </CustomPaper>
        <CustomDataGrid
          columns={columnsUsers}
          rows={rows}
          getRowId={(row) => row.username}
          onRowSelectionModelChange={() => {}}
          sx={{ maxWidth: 'calc(100vw - 112px)' }}
        />
        <Button variant="outlined" onClick={handleClickOpen}>
          Create New User
        </Button>
        <FormDialog
          onSubmitContent={onSubmitContent}
          open={open}
          title='Create New User'
          contentText="You can add a user by filling in their details here."
          submitLabel='Create User'
          handleClose={handleClose}
          content={
            <Box>
              <FormControl autoFocus variant="filled" margin="dense" fullWidth required>
                <InputLabel id="user-role-name-label">User Role</InputLabel>
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
              <Collapse in={openSupplierChoice}>
                <FormControl autoFocus variant="filled" margin="dense" fullWidth required>
                  <InputLabel id="supplier-name-label">Supplier Name</InputLabel>
                  <Select
                    labelId="supplier-name-label"
                    label="Supplier Name"
                    value={supplierName}
                    onChange={handleChangeSupplierName}
                    name="supplier_id"
                  >
                    {[...supplierNames].map((_, i) =>
                      <MenuItem value={supplierNames[i].supplier_id}>{`${supplierNames[i].supplier_id} - ${supplierNames[i].supplier_name}`}</MenuItem>
                    )}
                  </Select>
                </FormControl>
              </Collapse>
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
                label="Password"
                type="password"
                fullWidth
                variant="filled"
              />
              <TextField
                required
                margin="dense"
                id="name"
                name="repeated_password"
                label="Repeat Password"
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
