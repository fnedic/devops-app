import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Container,
  Grid,
  Paper,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import ProductService from "../service/axios/ProductService";
import Tables from "../components/Tables";
import { Upload } from "@mui/icons-material";

export default function Form() {
  const [open, setOpen] = useState(false);
  const [mssg, setMsg] = useState("");
  const [uploadDisable, setUploadDisable] = useState(true);

  const [product, setProduct] = useState({
    id: 0,
    name: "",
    stock: "",
    price: "",
    description: "",
  });

  const [products, setProducts] = useState([]);

  const handleClose = () => {
    setOpen(false);
  };

  const uploadProduct = async (product) => {
    try {
      const response = await ProductService.uploadProduct({
        ...product,
        stock: Number(product.stock),
        price: Number(product.price),
      });

      setProduct({
        name: "",
        stock: "",
        price: "",
        description: "",
      });

      setMsg("Product uploaded successfully");
      setOpen(true);

      const res = await ProductService.getAllProducts();
      setProducts(res);

      console.log("Product uploaded successfully:", response);
    } catch (error) {
      console.error("Error uploading product:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await ProductService.getAllProducts();
      setProducts(res);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const { name, stock, price, description } = product;
    if (name && stock && price && description) {
      setUploadDisable(false);
    } else {
      setUploadDisable(true);
    }
  }, [product]);

  return (
    <Container maxWidth="xl">
      <Grid
        container
        spacing={3}
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "row",
        }}
      >
        <Grid size={4} container>
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
                Carga de productos
              </Typography>
            </Paper>
          </Grid>
          <Grid size={12} container spacing={2} mt={1}>
            <Grid size={12}>
              <TextField
                label="Product Name"
                fullWidth
                value={product.name}
                onChange={(e) =>
                  setProduct({ ...product, name: e.target.value })
                }
              />
            </Grid>
            <Grid size={12}>
              <TextField
                label="Stock"
                fullWidth
                type="number"
                value={product.stock}
                onChange={(e) =>
                  setProduct({ ...product, stock: e.target.value })
                }
              />
            </Grid>
            <Grid size={12}>
              <TextField
                label="Price"
                fullWidth
                type="number"
                value={product.price}
                onChange={(e) =>
                  setProduct({ ...product, price: e.target.value })
                }
              />
            </Grid>
            <Grid size={12}>
              <TextField
                label="Description"
                fullWidth
                value={product.description}
                onChange={(e) =>
                  setProduct({ ...product, description: e.target.value })
                }
              />
            </Grid>
            <Grid size={12} sx={{ display: "flex", justifyContent: "center" }}>
              <Button
                startIcon={<Upload />}
                onClick={() => uploadProduct(product)}
                disabled={uploadDisable}
                size="large"
                variant="contained"
                disableElevation
                sx={{
                  backgroundColor: "#0d2c40",
                  color: "#02d35f",
                  borderRadius: 4,
                  minWidth: "100%",
                }}
              >
                Upload
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Tables products={products} />
      </Grid>

      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%", fontWeight: "bold" }}
        >
          {mssg}
        </Alert>
      </Snackbar>
    </Container>
  );
}
