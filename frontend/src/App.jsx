import { useEffect, useState } from "react";
import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import ProductService from "./service/axios/ProductService";
import Tables from "./components/Tables";

function App() {
  const [product, setProduct] = useState({
    id: 0,
    name: "",
    stock: 0,
    price: 0,
    description: "",
  });
  const [uploadDisable, setUploadDisable] = useState(true);
  const uploadProduct = async (product) => {
    try {
      const response = await ProductService.uploadProduct(product);
      // reseteo el formulario
      setProduct({
        name: "",
        stock: 0,
        price: 0,
        description: "",
      });
      const res = await ProductService.getAllProducts();
      setProducts(res);
      console.log("Product uploaded successfully:", response);
    } catch (error) {
      console.error("Error uploading product:", error);
    }
  };

  const [products, setProducts] = useState([]);
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
    if (
      product &&
      product.name &&
      product.stock &&
      product.price &&
      product.description
    ) {
      setUploadDisable(false);
    } else {
      setUploadDisable(true);
    }
  }, [product]);

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: 2,
        height: "100vh",
      }}
    >
      <Grid container>
        <Grid size={12}>
          <Typography variant="h4" component="h1">
            DevOps Project
          </Typography>
        </Grid>
        <Grid size={12} container>
          <Grid size={12}>
            <TextField
              label="Product Name"
              fullWidth
              margin="normal"
              value={product && product.name}
              onChange={(e) => setProduct({ ...product, name: e.target.value })}
            />
          </Grid>
          <Grid size={12}>
            <TextField
              label="Stock"
              fullWidth
              margin="normal"
              value={product && product.stock}
              onChange={(e) =>
                setProduct({ ...product, stock: Number(e.target.value) })
              }
            />
          </Grid>
          <Grid size={12}>
            <TextField
              label="Price"
              fullWidth
              type="number"
              margin="normal"
              value={product && product.price}
              onChange={(e) =>
                setProduct({ ...product, price: Number(e.target.value) })
              }
            />
          </Grid>
          <Grid size={12}>
            <TextField
              label="Description"
              fullWidth
              margin="normal"
              value={product && product.description}
              onChange={(e) =>
                setProduct({ ...product, description: e.target.value })
              }
            />
          </Grid>
          <Grid size={12}>
            <Button
              onClick={() => uploadProduct(product)}
              disabled={uploadDisable}
            >
              Upload
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid container>
        <Tables products={products} />
      </Grid>
    </Container>
  );
}

export default App;
