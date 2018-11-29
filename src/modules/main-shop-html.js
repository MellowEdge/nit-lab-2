import {singleView} from '../index.js'
import {addToCart} from '../index.js'
import $ from "jquery";

export const _makeShop = ({
                     id,
                     name,
                     image_url,
                     description,
                     price,
                     special_price
                 }, mode, categoryId) => {
    let $product = $(`<div class="card col-xs-12 col-sm-4 col-md-3" data-product-id="${id}">`);
    $product.append($(`<span class="product-title show-more">`).text(name));
    $product.append($(`<img src="${image_url}" alt="${name}" class="img-fluid product-image show-more">`));
    //$product.append($(`<span class="product-description">`).text(description));
    if (special_price) {
        $product.append($(`<span class="product-old-price show-more">`).text(price));
        $product.append($(`<span class="product-special-price show-more">`).text(special_price));
    } else
        $product.append($(`<span class="product-price show-more">`).text(price));
    $product.find(".show-more").click(function(){
        // console.log("Clicked show more");
        singleView(id, mode, categoryId);
    });
    // $(".show-more-"+id).click(function(){
    //     console.log("Clicked show more");
    //     singleView(id);
    // });
    $product.append($(`<button type="button" class="add-to-cart">`).text("Add to cart"));
    $product.find('.add-to-cart').click(function(){
        addToCart(id);
    });
    return $product;
};

