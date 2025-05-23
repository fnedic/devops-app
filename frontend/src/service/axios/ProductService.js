import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

class ProductService {
  getAllProducts() {
    return axios
      .get(API_URL + "/products")
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        throw error;
      });
  }
  uploadProduct(product) {
    return axios
      .post(API_URL + "/upload", product)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error("Error uploading product:", error);
        throw error;
      });
  }
  deleteProduct(id) {
    return axios
      .delete(API_URL + "/products/" + id)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
        throw error;
      });
  }
}

export default new ProductService();
