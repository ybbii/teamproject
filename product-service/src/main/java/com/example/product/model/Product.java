package com.example.product.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "PRODUCT")
@Data
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private Double price;
    private String size;
    private String calorie;
    private String description;
    private String allergy;
    private String fat;
    private String sugar;
    private String sodium;
    private String protein;
    private String caffeine;
    private String imageUrl;
}