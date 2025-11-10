DROP TABLE IF EXISTS PRODUCT;

CREATE TABLE PRODUCT (
                         id BIGINT AUTO_INCREMENT PRIMARY KEY,
                         name VARCHAR(255) NOT NULL,
                         price DOUBLE NOT NULL
);
