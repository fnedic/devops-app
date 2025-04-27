import { DataGrid } from "@mui/x-data-grid";
import ProductService from "../service/axios/ProductService";
import { Button } from "@mui/material";

export default function Tables({ products }) {
  const columns = [
    { field: "name", headerName: "Name", width: 150 },
    { field: "stock", headerName: "Stock", width: 150 },
    { field: "price", headerName: "Price", width: 150 },
    { field: "description", headerName: "Description", width: 250 },
    {
      field: "action",
      headerName: "Action",
      renderCell: (params) => (
        <Button
          onClick={() => {
            console.log("Edit product with ID:", params.row.id);
          }}
        >
          Edit
        </Button>
      ),
    },
  ];
  return (
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
  );
}
