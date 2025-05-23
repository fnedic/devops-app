import { DataGrid } from "@mui/x-data-grid";
import ProductService from "../service/axios/ProductService";
import {
  Alert,
  Grid,
  IconButton,
  Paper,
  Snackbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useState } from "react";

export default function Tables({ products }) {
  const [open, setOpen] = useState(false);
  const [mssg, setMsg] = useState("");
  const handleClose = () => {
    setOpen(false);
  };

  const deleteProduct = async (id) => {
    try {
      await ProductService.deleteProduct(id);
    } catch (error) {
      setMsg("This is a controlled error message!");
      setOpen(true);
      console.error("Error deleting product:", error);
    }
  };

  const columns = [
    { field: "name", headerName: "Name", width: 200 },
    { field: "stock", headerName: "Stock", width: 150 },
    { field: "price", headerName: "Price", width: 150 },
    { field: "description", headerName: "Description", width: 300 },
    {
      field: "action",
      headerName: "Action",
      renderCell: (params) => (
        <Tooltip
          onClick={() => {
            deleteProduct(params.row.id);
          }}
        >
          <IconButton>
            <Delete sx={{ color: "red" }} />
          </IconButton>
        </Tooltip>
      ),
    },
  ];
  return (
    <Grid
      size={8}
      container
      spacing={2}
    >
      <Grid size={12}>
        <Paper
          sx={{
            padding: 2,
            backgroundColor: "#e6e6e6",
            boxShadow: 0,
            borderRadius: 4,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Typography sx={{ fontWeight: "bold", fontSize: 30 }}>
            Product List
          </Typography>
        </Paper>
      </Grid>
      <Grid size={12}>
        <DataGrid
          rows={products}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Grid>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleClose}
          severity="error"
          variant="filled"
          sx={{ width: "100%", fontWeight: "bold" }}
        >
          {mssg}
        </Alert>
      </Snackbar>
    </Grid>
  );
}
