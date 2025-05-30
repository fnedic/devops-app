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

    @PostMapping("upload")
    public ResponseEntity<?> uploadProduct(@RequestBody ProductDto productDto) {
        productService.uploadProduct(productDto);
        return ResponseEntity.ok("Product uploaded successfully");
    }

    @DeleteMapping("products/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable Long id) {
        throw new RuntimeException("This is a controlled error message!");
    }

}
