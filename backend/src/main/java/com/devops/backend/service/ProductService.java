package com.devops.backend.service;


import com.devops.backend.dto.ProductDto;
import com.devops.backend.entities.Product;
import com.devops.backend.exception.CustomException;
import com.devops.backend.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<ProductDto> getProducts() {
        List<Product> products = productRepository.findAll();
        if (products.isEmpty()) {
            throw new CustomException("No products found");
        }
        List<ProductDto> productDtos = products.stream()
                .map(product -> new ProductDto(product.getId(), product.getName(), product.getStock(), product.getPrice(), product.getDescription()))
                .toList();
        return productDtos;
    }

    // service for uploading a product
    public void uploadProduct(ProductDto productDto) {
        try {
            Product product = new Product();
            product.setName(productDto.getName());
            product.setStock(productDto.getStock());
            product.setPrice(productDto.getPrice());
            product.setDescription(productDto.getDescription());
            productRepository.save(product);
        } catch (Exception e) {
            throw new CustomException("Error uploading product", e);
        }
    }

}
