package com.example.product.controller;

import com.example.product.model.Product;
import com.example.product.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductRepository productRepository;

    // ============================
    // 🔹 상품 전체 조회
    // ============================
    @GetMapping
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    // ============================
    // 🔹 단일 상품 조회
    // ============================
    @GetMapping("/{id}")
    public Product getProduct(@PathVariable Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("상품을 찾을 수 없습니다."));
    }
}
