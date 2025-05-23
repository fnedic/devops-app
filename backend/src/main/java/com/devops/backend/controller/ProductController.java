package com.devops.backend.controller;

import com.devops.backend.dto.ProductDto;
import com.devops.backend.service.ProductService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/")
public class ProductController {

    final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("products")
    public List<ProductDto> getProducts() {
        return productService.getProducts();
    }

    // endpoint for uploading a product
    @PostMapping("upload")
    public ResponseEntity<?> uploadProduct(@RequestBody ProductDto productDto) {
        // Call the service to upload the product
        productService.uploadProduct(productDto);
        return ResponseEntity.ok("Product uploaded successfully");
    }
}
