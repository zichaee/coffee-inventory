import React, { useState, useEffect } from "react";
import { styled } from '@mui/material/styles';
import {
  Paper,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import {
  DataGrid,
  GridToolbar,
} from '@mui/x-data-grid';

/**
 * A `Paper` element with custom shadows
 */
const CustomPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'left',
  flex: "1",
  display: "flex",
  flexDirection: "column",
}));

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  overflowX: "scroll",
}));

/**
 * A `DataGrid` element with custom preset properties
 */
const CustomDataGrid = (props) => {
  return (
    <StyledDataGrid
      {...props}
      pageSizeOptions={[5, 10]}
      slots={{ toolbar: GridToolbar }}
      slotProps={{ toolbar: { showQuickFilter: true } }}
    />
  );
};

/**
 * A circular progress overlay that covers the whole screen
 * @return {React.JSX.Element}
 */
function Spinner() {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
      }}
    >
      <CircularProgress />
    </Box>
  );
}

/**
 * A dialog containing a form
 * @param  {(Event) => Promise<void>} props.onSubmitContent
 * @param  {String}                   props.title
 * @param  {String}                   props.contentText
 * @param  {React.JSX.Element}        props.content
 * @param  {() => void}               props.open
 * @param  {() => void}               props.handleClose
 * @param  {String}                   props.submitLabel
 * @return {React.JSX.Element}
 */
function FormDialog(props) {
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      props.onSubmitContent(event);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog
      disableEscapeKeyDown
      open={props.open}
      onClose={props.handleClose}
      slotProps={{
        paper: {
          component: 'form',
          onSubmit: onSubmit,
        },
      }}
    >
      <DialogTitle>{props.title}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {props.contentText}
          {isLoading && <Spinner />}
        </DialogContentText>
        {props.content}
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose} disabled={isLoading}>Cancel</Button>
        <Button variant="contained" type="submit" disabled={isLoading}>{props.submitLabel}</Button>
      </DialogActions>
    </Dialog>
  );
}

export { CustomPaper, CustomDataGrid, Spinner, FormDialog };
