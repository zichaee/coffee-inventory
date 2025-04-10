import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Alert,
  Card,
  Button,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  CssBaseline,
  Collapse,
  Box,
  Divider,
  useMediaQuery,
  ThemeProvider,
  Stack,
  Avatar,
  Container,
  TextField,
  Skeleton,
  InputAdornment,
  Select,
  InputLabel,
  SelectChangeEvent,
  FormControl,
  Tabs,
  Tab,
  Tooltip,
  Menu,
  MenuItem,
  ListItemIcon,
} from "@mui/material";
import ListSubheader from "@mui/material/ListSubheader";
import {
  CustomPaper,
  CustomDataGrid,
  Spinner,
  FormDialog,
} from "./components.jsx"
import {
  columnsSuppliers,
  columnsInventory,
  columnsOrders,
  columnsOrderDetails,
  columnsSales,
  columnsSaleDetails,
  columnsUsers,
} from "./data.jsx"
import {
  BrowserRouter,
  Routes,
  Route,
  useSearchParams,
  useNavigate
} from 'react-router-dom';
import { customTheme } from "./theme.jsx"
import { fetchGet, fetchPut } from "./controller.jsx"
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from '@mui/icons-material/Person';
import companyLogo from "./assets/logo.png";
import PropTypes from 'prop-types';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { Add, Remove } from "@mui/icons-material";
import CloseIcon from '@mui/icons-material/Close';

import './App.css'
import { localStorageAvailable } from "@mui/x-data-grid/internals";

const drawerWidth = 240;

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (username === '' || password === '') {
      alert('Your username or password cannot be empty.');
    } else {
      try {
        const token = await fetchGet(`/api/auth/credentials/${username}/${password}`);
        localStorage.setItem('auth_token', token);
        location.reload();
      } catch(e) {
        alert('Wrong username or password.');
      }
    }
  };

  const [tokenValidity, setTokenValidity] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const storedToken = localStorage.getItem('auth_token');

  if (storedToken !== null) {
    useEffect(() => {
      setIsLoading(true);
      fetchGet(`/api/auth/token/${storedToken}`)
        .then((data) => {
          setTokenValidity(data);
        })
        .catch((error) => {
          console.error('Error fetching data: ', error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }, []);
  }

  if (isLoading) {
    return <Spinner />;
  }

  if (tokenValidity === false) {
    return (
      <ThemeProvider theme={customTheme}>
        <Login
          setUsername={(e) => setUsername(e.target.value)}
          setPassword={(e) => setPassword(e.target.value)}
          handleLogin={handleLogin}
        />
      </ThemeProvider>
    );
  } else {
    return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Landing content={<Home />} />} />
          <Route path='/suppliers' element={<Landing content={<Suppliers />} />} />
          <Route path='/inventory' element={<Landing content={<Inventory />} />} />
          <Route path='/orders' element={<Landing content={<Orders />} />} />
          <Route path='/sales' element={<Landing content={<Sales />} />} />
          <Route path='/users' element={<Landing content={<Users />} />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export function Login(props) {
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

function Landing(props) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const isLargeScreen = useMediaQuery(customTheme.breakpoints.up("md"));
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const toggleDrawer = (open) => () => {
    setIsDrawerOpen(open);
  };

  const drawerContent = (
    <div>
      <List>
        <ListItem button component="a" href="/">
          <ListItemText primary="Home" />
        </ListItem>
        {[
          "Suppliers",
          "Inventory",
          "Orders",
          "Invoices",
          "Sales",
        ].map((text) => (
          <ListItem button key={text} component="a" href={`/${text.toLowerCase().replace(/ /g, "-")}`}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleProfileClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    location.replace('/');
  }
  const handleManageOtherAccounts = () => {
    location.replace('/users');
  }

  return (
    <ThemeProvider theme={customTheme}>
      <Stack direction="column">
        <CssBaseline />
        <AppBar position="fixed" sx={{ zIndex: 1300, ml: isLargeScreen ? `${drawerWidth}px` : 0 }}>
          <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "flex-start" }}>
            <Toolbar>
              {!isLargeScreen && (
                <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)} sx={{ mr: 2 }}>
                  <MenuIcon />
                </IconButton>
              )}
              <Avatar alt='Company Logo' src={companyLogo} sx={{ width: 182, height: 60, p: '5px' }} variant='square'/>
            </Toolbar>
            <Toolbar>
              <Tooltip>
                <IconButton
                  onClick={handleProfileClick}
                  size="small"
                  sx={{ ml: 2 }}
                  aria-controls={open ? 'account-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                >
                  <Avatar>
                    <PersonIcon />
                  </Avatar>
                </IconButton>
              </Tooltip>
            </Toolbar>
          </Stack>
        </AppBar>

        {isLargeScreen ? (
          <>
            <AppBar position="fixed" sx={{ mt: '64px' }}>
              <Tabs value={false} role="navigation" centered>
                <Tab component="a" label="Home" index={2} href="/" />
                <Tab component="a" label="Suppliers" index={2} href="/suppliers" />
                <Tab component="a" label="Inventory" href="/inventory" />
                <Tab component="a" label="Orders" href="/orders" />
                <Tab component="a" label="Sales" href="/sales" />
              </Tabs>
            </AppBar>
            <Box sx={{ height: '64px' }}></Box>
          </>
        ) : (
          <Drawer
            anchor="left"
            open={isDrawerOpen}
            onClose={toggleDrawer(false)}
            variant="temporary"
            sx={{ "& .MuiDrawer-paper": { width: drawerWidth } }}
          >
            <Toolbar />
            {drawerContent}
          </Drawer>
        )}

        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleProfileClose}
          onClick={handleProfileClose}
          slotProps={{
            paper: {
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0, 0, 0, 0.32))',
                mt: 6,
                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                '&::before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 19,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
        >
          <MenuItem onClick={handleProfileClose}>
            <Avatar /> My account
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleManageOtherAccounts}>
            <ListItemIcon>
              <PersonAdd fontSize="small" />
            </ListItemIcon>
            Manage Other Accounts
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            mt: 8,
            p: 3,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Stack spacing={2} sx={{ maxWidth: "1200px", width: "100%" }}>
            {props.content}
          </Stack>
        </Box>
      </Stack>
    </ThemeProvider>
  );
}

function Home() {
  return (
    <Stack spacing={2} sx={{ textAlign: "left" }}>
      <Typography variant="h4" >Insights</Typography>
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
      </Stack>
    </Stack>
  );
}

function Suppliers() {
  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const onSubmitContent = (event) => {
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const token = localStorage.getItem('auth_token');

    fetchPut(`/api/put/suppliers/${token}/${formJson.name}/${formJson.phone_number}/${formJson.email}/${formJson.address}`)
      .then((_) => {
        location.reload();
      })
      .catch((error) => {
        console.error('Error adding supplier data: ', error);
      });
  };

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    fetchGet(`/api/get/suppliers/${token}`)
      .then((data) => {
        setRows(data);
      })
      .catch((error) => {
        console.error('Error fetching suppliers data:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <Stack spacing={2} sx={{ textAlign: "left" }}>
      <Typography variant="h4" >Suppliers</Typography>
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
          columns={columnsSuppliers}
          rows={rows}
          getRowId={(row) => row.supplier_id}
          onRowSelectionModelChange={() => {}}
          sx={{ maxWidth: 'calc(100vw - 112px)' }}
        />
        <Button variant="outlined" onClick={handleClickOpen}>
          Add Supplier
        </Button>
        <FormDialog
          onSubmitContent={onSubmitContent}
          open={open}
          title='Add Supplier'
          contentText="You can add or edit the details of your suppliers here."
          content={
            <Box>
              <TextField
                autoFocus
                required
                margin="dense"
                id="name"
                name="name"
                label="Name"
                type="text"
                fullWidth
                variant="filled"
              />
              <TextField
                required
                margin="dense"
                id="name"
                name="phone_number"
                label="Phone Number"
                type="text"
                fullWidth
                variant="filled"
              />
              <TextField
                required
                margin="dense"
                id="name"
                name="email"
                label="Email"
                type="text"
                fullWidth
                variant="filled"
              />
              <TextField
                required
                margin="dense"
                id="name"
                name="address"
                label="Address"
                type="text"
                fullWidth
                variant="filled"
              />
            </Box>
          }
          handleClose={handleClose}
          submitLabel='Add Supplier'
        />
      </Stack>
    </Stack>
  );
}

function Inventory() {
  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    fetchGet(`/api/get/inventory/${token}`)
      .then((data) => {
        setRows(data);
      })
      .catch((error) => {
        console.error('Error fetching inventory data:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <Stack spacing={2} sx={{ textAlign: "left" }}>
      <Typography variant="h4" >Inventory</Typography>
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
          columns={columnsInventory}
          rows={rows}
          getRowId={(row) => row.inventory_id}
          onRowSelectionModelChange={() => {}}
          sx={{ maxWidth: 'calc(100vw - 112px)' }}
        />
      </Stack>
    </Stack>
  );
}

function Orders() {
  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [fields, setFields] = useState([""]);
  const [supplierNames, setSupplierNames] = useState([]);
  const [supplierName, setSupplierName] = useState('');

  const handleChangeSupplierName = (event) => {
    setSupplierName(event.target.value);
  }
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setSupplierName('');
  };
  const onSubmitContent = (event) => {
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const token = localStorage.getItem('auth_token');

    fetchPut(`/api/put/orders/${token}/${formJson.note}/${formJson.supplier_id}`)
      .then((response) => {
        const maxItemNumber = Math.max(...Object.keys(formJson)
          .filter(key => key.startsWith('item_name_'))
          .map(key => parseInt(key.replace('item_name_', '')))) + 1;

        for (let i = 0; i < maxItemNumber; i++) {
          fetchPut(`/api/put/order_details/${token}/${response.meta.last_row_id}/${formJson['item_name_' + i]}/${formJson['quantity_' + i]}/${formJson['unit_' + i]}`)
            .then((_) => {})
            .catch((error) => {
              console.error('Error creating order details: ', error);
            });
        }

        handleClose();
        location.reload();
      })
      .catch((error) => {
        console.error('Error creating order: ', error);
      });

    handleClose();
  }
  const handleAddField = () => {
    setFields([...fields, ""]);
  };
  const handleRemoveField = (index) => {
    setFields(fields.filter((_, i) => i !== index));
  };
  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    fetchGet(`/api/get/orders/${token}`)
      .then((data) => {
        setRows(data);
      })
      .catch((error) => {
        console.error('Error fetching orders data:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
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
      <Typography variant="h4" >Orders</Typography>
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
          columns={columnsOrders}
          rows={rows}
          getRowId={(row) => row.order_id}
          onRowSelectionModelChange={() => {}}
          sx={{ maxWidth: 'calc(100vw - 112px)' }}
        />
        <Button variant="outlined" onClick={handleClickOpen}>
          Create Order
        </Button>
        <FormDialog
          onSubmitContent={onSubmitContent}
          open={open}
          title='Create Order'
          contentText="The order you submit will appear in the selected supplier's dashboard. Based on your order, the supplier can then create an invoice, which you can choose to approve or deny."
          content={
            <Box>
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
              <TextField
                multiline
                rows={5}
                maxRows={50}
                fullWidth
                margin="dense"
                variant="filled"
                name="note"
                label="Note to Supplier"
              />
              <Stack>
                <Typography variant='h6' sx={{ mt: 2 }}>
                  Items
                </Typography>
                {fields.map((field, index) => (
                  <Box key={index}>
                    <CustomPaper sx={{ mt: 1 }}>
                      <Stack>
                        <Typography variant='overline'>
                          {`Item ${index + 1}`}
                        </Typography>
                        <TextField
                          size="small"
                          fullWidth
                          required
                          margin="dense"
                          variant="filled"
                          name={`item_name_${index}`}
                          label={`Name`}
                        />
                        <TextField
                          size="small"
                          fullWidth
                          required
                          margin="dense"
                          variant="filled"
                          name={`quantity_${index}`}
                          label={`Quantity`}
                          type="number"
                        />
                        <TextField
                          size="small"
                          fullWidth
                          required
                          margin="dense"
                          variant="filled"
                          name={`unit_${index}`}
                          label={`Unit`}
                        />
                      </Stack>
                      <Button sx={{ mt: 1.5 }} variant="text" disabled={fields.length === 1} startIcon={<Remove />} onClick={() => handleRemoveField(index)} color="error">
                        Remove Item
                      </Button>
                    </CustomPaper>
                  </Box>
                ))}
                <Button sx={{ mt: 1 }} variant="outlined" startIcon={<Add />} onClick={handleAddField}>
                  Add More Item
                </Button>
              </Stack>
            </Box>
          }
          handleClose={handleClose}
          submitLabel='Submit'
        />
      </Stack>
    </Stack>
  );
}

function Sales() {
  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    fetchGet(`/api/get/sales/${token}`)
      .then((data) => {
        setRows(data);
      })
      .catch((error) => {
        console.error('Error fetching sales data:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <Stack spacing={2} sx={{ textAlign: "left" }}>
      <Typography variant="h4" >Sales</Typography>
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
          columns={columnsSales}
          rows={rows}
          getRowId={(row) => row.sale_id}
          onRowSelectionModelChange={() => {}}
          sx={{ maxWidth: 'calc(100vw - 112px)' }}
        />
      </Stack>
    </Stack>
  );
}

function Users() {
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

export default App;
