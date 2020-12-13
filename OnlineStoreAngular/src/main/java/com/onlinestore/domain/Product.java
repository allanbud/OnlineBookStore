package com.onlinestore.domain;

import org.springframework.web.multipart.MultipartFile;

import javax.persistence.*;
import java.io.Serializable;

public class Product implements Serializable {
    private static final long serialVersionUID=456784L;


    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;

    private String productTitle;
    private String productCategory;
    private int listPrice;
    private boolean active;
    private String productType;
    private String productAuthor;

    //use text to overcome VARCHAR 255 charecter limit
    @Column(columnDefinition="text")
    private String productDescription;
    private int inStockNumber;

    //store image on server (could be cloud but not today) instead of DB
    @Transient
    private MultipartFile productImage;

    public static long getSerialVersionUID() {
        return serialVersionUID;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getProductTitle() {
        return productTitle;
    }

    public void setProductTitle(String productTitle) {
        this.productTitle = productTitle;
    }

    public String getProductCategory() {
        return productCategory;
    }

    public void setProductCategory(String productCategory) {
        this.productCategory = productCategory;
    }

    public int getListPrice() {
        return listPrice;
    }

    public void setListPrice(int listPrice) {
        this.listPrice = listPrice;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public String getProductType() {
        return productType;
    }

    public void setProductType(String productType) {
        this.productType = productType;
    }

    public String getProductAuthor() {
        return productAuthor;
    }

    public void setProductAuthor(String productAuthor) {
        this.productAuthor = productAuthor;
    }

    public String getProductDescription() {
        return productDescription;
    }

    public void setProductDescription(String productDescription) {
        this.productDescription = productDescription;
    }

    public int getInStockNumber() {
        return inStockNumber;
    }

    public void setInStockNumber(int inStockNumber) {
        this.inStockNumber = inStockNumber;
    }

    public MultipartFile getProductImage() {
        return productImage;
    }

    public void setProductImage(MultipartFile productImage) {
        this.productImage = productImage;
    }
}
