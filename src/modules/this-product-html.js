import $ from "jquery";
import {addToCart} from "../index.js";
import {mainPageView} from "../index.js";
import {categoryPageView} from "../index";

export const _makeProductPage = ({
                     id,
                     name,
                     image_url,
                     description,
                     price,
                     special_price
                 }, mode, categoryId) => {
    let $product = $(`<div class="card container" data-product-id="${id}">`);
    $product.append($(`<span class="single-product-title">`).text(name));
    $product.append($(`<img src="${image_url}" alt="${name}" class="img-fluid product-image" >`));
    $product.append($(`<span class="product-description">`).text(description));
    if (special_price) {
        $product.append($(`<hr>`));
        $product.append($(`<span class="product-old-price">`).text("Old price: "+price));
        $product.append($(`<hr>`));
        $product.append($(`<span class="product-special-price">`).text("Special price: "+special_price));
    } else {
        $product.append($(`<hr>`));
        $product.append($(`<span class="product-price">`).text("Price: "+price));
    }
    $product.append($(`<button type="button" id="return-to-main" class="back-button">`).text("Return"));
    $product.find('#return-to-main').click(function(){
        if (mode === 0)
            mainPageView();
        else
            categoryPageView(categoryId);
    });
    $product.append($(`<button type="button" id="add-to-cart">`).text("Add to cart"));
    $product.find('#add-to-cart').click(function(){
        addToCart(id);
    });
    return $product;
};

