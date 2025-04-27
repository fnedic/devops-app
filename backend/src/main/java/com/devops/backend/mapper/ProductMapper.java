package com.devops.backend.mapper;

import com.devops.backend.dto.ProductDto;
import com.devops.backend.entities.Product;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ProductMapper {
    ProductDto toProductDto(Product product);
}
