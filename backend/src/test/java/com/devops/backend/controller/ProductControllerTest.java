package com.devops.backend.controller;

import com.devops.backend.dto.ProductDto;
import com.devops.backend.service.ProductService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;


import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ProductControllerTest {

    @Mock
    private ProductService productService;

    @InjectMocks
    private ProductController productController;

    @Test
    void testGetProducts() {
        List<ProductDto> mockProducts = List.of(
                new ProductDto("1", "Producto A", 100, 10.0, "Descripción A"),
                new ProductDto("2", "Producto B", 50, 20.0, "Descripción B")
        );

        when(productService.getProducts()).thenReturn(mockProducts);

        List<ProductDto> result = productController.getProducts();

        assertEquals(2, result.size());
        assertEquals("Producto A", result.get(0).getName());
        assertEquals(100, result.get(0).getStock());
    }

    @Test
    void testUploadProduct() {
        ProductDto productDto = new ProductDto("3", "Producto C", 200, 30.0, "Descripción C");

        ResponseEntity<?> response = productController.uploadProduct(productDto);

        verify(productService).uploadProduct(productDto);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Product uploaded successfully", response.getBody());
    }

    @Test
    void testUploadProduct_whenServiceThrowsException() {
        ProductDto productDto = new ProductDto("4", "Producto D", 150, 40.0, "Descripción D");

        doThrow(new RuntimeException("Internal error")).when(productService).uploadProduct(productDto);

        assertThrows(RuntimeException.class, () -> productController.uploadProduct(productDto));
        verify(productService).uploadProduct(productDto);
    }
}
