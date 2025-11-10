package com.example.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class WebController {

    @GetMapping("/carts")
    public String carts(Model model) {
        model.addAttribute("message", "발주 장바구니");
        return "carts";
    }

    @GetMapping("/orderlist")
    public String ordersPage() {
        return "orderlist";   // templates/orderlist.html
    }

    @GetMapping("/products")
    public String productsPage() {
        return "products";
    }

} 