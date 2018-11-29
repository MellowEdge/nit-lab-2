import $ from "jquery";
import {_makeProductPage} from "./this-product-html";
import {mainPageView, singleView} from "../index";

export const _makeCart = () => {
    let $cart = $(`<div class="cart container">`);
    $cart.append($(`<button id="back-from-cart" class="back-button">`).text("Back to main page"));
    $cart.find("#back-from-cart").click(function(){
        $('.show-cart').css("display", "block");
        mainPageView();
    });
    if (localStorage.length === 0){
        $cart.append($(`<span class="empty-cart-message">`).text("The cart is empty at the moment."));
    }
    else {
        $cart.append($(`<div class="products-in-cart">`));
        let $products = $cart.find(".products-in-cart");
        for (var i = 0; i < localStorage.length; i++) {
            var currentKey = localStorage.key(i);
            var currentId = parseInt(currentKey.slice(9, -1), 10);
            var currentItem = localStorage.getItem(currentKey);
            getProduct(currentId, currentItem, $products);

        }
        $cart.append($(`<form id="cart-form" class="cart-form">`));
        let $form = $cart.find("#cart-form");
        var $nameInput = $(`<div class="cart-input">`);
        $nameInput.append($(`<label class="cart-input-label">`).text('Enter name: '));
        $nameInput.append($(`<input type="text" class="cart-form-input" id="form-name" required>`));
        $form.append($nameInput);
        var $phoneInput = $(`<div class="cart-input">`);
        $phoneInput.append($(`<label class="cart-input-label">`).text('Enter phone number: '));
        $phoneInput.append($(`<input type="number" class="cart-form-input" id="form-number" required>`));
        $form.append($phoneInput);
        var $emailInput = $(`<div class="cart-input">`);
        $emailInput.append($(`<label class="cart-input-label">`).text('Enter e-mail: '));
        $emailInput.append($(`<input type="email" class="cart-form-input" id="form-email" required>`));
        $form.append($emailInput);
        $form.append($(`<button type="submit" id="cart-form-submit" class="checkout-button">`).text('Checkout'));
        $form.submit(function (e) {

            e.preventDefault();

            var form = $form;
            var name = form.find('#form-name').val();
            var phone = form.find('#form-number').val();
            var email = form.find('#form-email').val();
            var productList = '';
            for (var i = 0; i < localStorage.length; i++) {
                productList += localStorage.key(i) + '=' + localStorage.getItem(localStorage.key(i)) + '&';
            }
            var token = 'rn7YVoZGF-ds_TeeXMdD';
            $.ajax({
                type: "POST",
                url: 'https://nit.tron.net.ua/api/order/add',
                data: 'name=' + name + '&phone=' + phone + '&email=' + email + '&' + productList + 'token=' + token, // serializes the form's elements.
                success: function (data) {
                    if (data.status === 'error')
                        alert("The cart is empty!"); // show response from the php script.
                    else {
                        $products.empty();
                        localStorage.clear();
                        $('.product-container').empty();
                        $('.product-container').append(_makeCart());
                        alert("Bought succesfully!");
                    }
                },
                error: function (xhr) {
                    console.log("An error occured: " + xhr.status + " " + xhr.statusText);
                },
            });
        });
    }
    return $cart;
};

function incrementCount(cnt, id, $products) {
    var productName = 'products['+id+']';
    if (localStorage.getItem(productName) != null){
        var productInCart = parseInt(localStorage.getItem(productName), 10);
        if (productInCart + cnt > 0) {
            productInCart += cnt;
            localStorage.setItem(productName, ''+productInCart);
            $products.find("#product-count-"+id).text(productInCart);
        }
    }
}

function getProduct(currentId, currentItem, $products){
    jQuery.ajax({
        url: 'https://nit.tron.net.ua/api/product/'+currentId,
        method: 'get',
        dataType: 'json',
        success: function(json){
            // console.log('Loaded via AJAX!');
            // console.log(json);
            $products.append($(`<div id="product-${currentId}" class="cart-item-container">`));
            var $thisProduct = $products.find("#product-"+currentId);
            $thisProduct.append($(`<img src="${json.image_url}" alt="${json.name}" class="product-image cart-item-image" >`));
            $thisProduct.append($(`<div id="cart-righthand-${currentId}" class="cart-righthand">`));
            var $cartRightHand = $thisProduct.find("#cart-righthand-"+currentId);
            $cartRightHand.append($(`<span class="product-title cart-item-title">`).text(json.name));
            $cartRightHand.append($(`<div id="cart-counts-${currentId}" class="cart-counts">`));
            var $cartCounts = $cartRightHand.find("#cart-counts-"+currentId);
            $cartCounts.append($(`<button id="decrease-count-${currentId}">`).text('-'));
            $cartCounts.find("#decrease-count-"+currentId).click(function(){
                incrementCount(-1, currentId, $thisProduct);
            });
            $cartCounts.append($(`<span id="product-count-${currentId}" class="product-count">`).text(currentItem));
            $cartCounts.append($(`<button id="increase-count-${currentId}">`).text('+'));
            $cartCounts.find("#increase-count-"+currentId).click(function(){
                incrementCount(+1, currentId, $thisProduct);
            });
            $cartRightHand.append($(`<button id="remove-from-cart-${currentId}" class="remove-from-cart">`).text('Remove'));
            $cartRightHand.find("#remove-from-cart-"+currentId).click(function(){
                localStorage.removeItem('products['+currentId+']');
                $thisProduct.remove();
                if (localStorage.length === 0){
                    $('.product-container').empty();
                    $('.product-container').append(_makeCart());
                }
            })

        },
        error: function(xhr){
            alert("An error occured: " + xhr.status + " " + xhr.statusText);
        },
    });}