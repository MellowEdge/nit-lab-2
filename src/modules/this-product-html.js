import $ from "jquery";
import {addToCart} from "../index.js";
import {mainPageView} from "../index.js";

export const _makeProductPage = ({
                     id,
                     name,
                     image_url,
                     description,
                     price,
                     special_price
                 }) => {
    let $product = $(`<div class="card" data-product-id="${id}">`);
    $product.append($(`<img src="${image_url}" alt="${name}" class="img-fluid product-image" >`));
    $product.append($(`<span class="product-title">`).text(name));
    $product.append($(`<span class="product-description">`).text(description));
    if (special_price) {
        $product.append($(`<span class="product-discounted-price">`).text(price));
    } else
        $product.append($(`<span class="product-price">`).text(price));
    $product.append($(`<span class="product-special-price">`).text(special_price));
    $product.append($(`<button type="button" id="return-to-main">`).text("Return"));
    $product.find('#return-to-main').click(function(){
        mainPageView();
    });
    $product.append($(`<button type="button" id="add-to-cart">`).text("Add to cart"));
    $product.find('#add-to-cart').click(function(){
        addToCart(id);
    });
    return $product;
};

