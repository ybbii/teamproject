package com.example.product.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "CARTITEM")
@Data
public class CartItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long productId;
    private String productName;
    private Integer quantity;
    private Double price;

}