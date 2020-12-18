package com.onlinestore.Controllers;

import com.onlinestore.domain.Product;
import com.onlinestore.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.util.Iterator;

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
                BufferedOutputStream stream = new BufferedOutputStream(new FileOutputStream(new File("src/main/image/product/"+fileName)));
                stream.write(bytes);
                stream.close();

                return new ResponseEntity("Image" + fileName + ".png Uploaded Successfully!", HttpStatus.OK);
            } catch (Exception e) {
                e.printStackTrace();
                return new ResponseEntity("Image Uploaded  failed!", HttpStatus.BAD_REQUEST);
            }
        }
}

