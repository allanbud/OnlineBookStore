package com.onlinestore.controllers;

import com.onlinestore.domain.Product;
import com.onlinestore.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Iterator;
import java.util.List;

@RestController
    @RequestMapping("/product")
    public class ProductController {

        @Autowired
        private ProductService productService;

        @RequestMapping (value="/add", method = RequestMethod.POST)
        public Product addProductPost(@RequestBody Product product) {
            return productService.saveProduct(product);
        }

        @RequestMapping(value="/add/image", method=RequestMethod.POST)
        public ResponseEntity upload(
                @RequestParam("id") Long id,
                HttpServletResponse response, HttpServletRequest request
        ){
            try {
                Product product = productService.findOneProduct(id);
                MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;
                Iterator<String> it = multipartRequest.getFileNames();
                MultipartFile multipartFile = multipartRequest.getFile(it.next());
                String fileName = id+".png";


                byte[] bytes = multipartFile.getBytes();
                BufferedOutputStream stream = new BufferedOutputStream(new FileOutputStream(new File("src/main/resources/static/image/product/"+fileName)));
                stream.write(bytes);
                stream.close();

                return new ResponseEntity("Image" + fileName + ".png Uploaded Successfully!", HttpStatus.OK);
            } catch (Exception e) {
                e.printStackTrace();
                return new ResponseEntity("Image Uploaded  failed!", HttpStatus.BAD_REQUEST);
            }
        }

//TODO not really updating image
    @RequestMapping(value="/update/image", method=RequestMethod.POST)
    public ResponseEntity updateImage(
            @RequestParam("id") Long id,
            HttpServletResponse response, HttpServletRequest request
    ){
        try {
            Product product = productService.findOneProduct(id);
            MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;
            Iterator<String> it = multipartRequest.getFileNames();
            MultipartFile multipartFile = multipartRequest.getFile(it.next());
            String fileName = id+".png";

            //Because new file with same name cannot be created
            Files.delete(Paths.get("src/main/resources/static/image/product/"+fileName));

            byte[] bytes = multipartFile.getBytes();
            BufferedOutputStream stream = new BufferedOutputStream(
                    new FileOutputStream(new File("src/main/resources/static/image/product/"+fileName)));
            stream.write(bytes);
            stream.close();

            return new ResponseEntity("Image" + fileName + ".png Updated Successfully!", HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity("Image Update failed!", HttpStatus.BAD_REQUEST);
        }
    }


    @RequestMapping(value="/remove", method=RequestMethod.POST)
    public ResponseEntity remove(
            @RequestBody String id
    )throws IOException {
//TODO Request processing failed; nested exception is org.springframework.dao.EmptyResultDataAccessException: No class com.onlinestore.domain.Product entity with id 11 exists
        System.out.println("id to remove: " + id);
        productService.removeOneProduct(Long.parseLong(id));
        String fileName = id+".png";
        Files.delete(Paths.get("src/main/resources/static/image/product/" + fileName));

        return new ResponseEntity("Successfully Removed!", HttpStatus.OK);
    }


        @RequestMapping("/productList")
        public List<Product> getProductList() {
            System.out.println("Getting product list");
            return productService.findAllProduct();
        }

        //Hibernate looks by id if the product exist and then choose create new or edit existing
        @RequestMapping(value="/update", method=RequestMethod.POST)
        public Product updateProductPost(@RequestBody Product product) {
            return productService.saveProduct(product);
        }

        @RequestMapping("/{id}")
        public Product getProduct(@PathVariable("id") Long id){
            Product product = productService.findOneProduct(id);
            return product;
    }


}

