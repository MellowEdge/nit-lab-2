import $ from "jquery";
import {_makeProductPage} from "./this-product-html";
import {mainPageView, singleView} from "../index";

export const _makeCart = () => {
    let $cart = $(`<div class="cart">`);
    $cart.append($(`<button id="back-from-cart">`).text("Back"));
    $cart.find("#back-from-cart").click(function(){
        mainPageView();
    });
    $cart.append($(`<div class="products-in-cart">`));
    let $products = $cart.find(".products-in-cart");
    for (var i = 0; i < localStorage.length; i++){
        var currentKey = localStorage.key(i);
        var currentId = parseInt(currentKey.slice(9,-1), 10);
        var currentItem = localStorage.getItem(currentKey);
        getProduct(currentId, currentItem, $products);

    }
    $cart.append($(`<form id="cart-form">`));
    let $form = $cart.find("#cart-form");
    $form.append($(`<label>`).text('Enter name: '));
    $form.append($(`<input type="text" class="cart-form-input" id="form-name" required>`));
    $form.append($(`<label>`).text('Enter phone number: '));
    $form.append($(`<input type="number" class="cart-form-input" id="form-number" required>`));
    $form.append($(`<label>`).text('Enter e-mail: '));
    $form.append($(`<input type="email" class="cart-form-input" id="form-email" required>`));
    $form.append($(`<button type="submit" id="cart-form-submit">`).text('Checkout'));
    $form.submit(function(e) {

        e.preventDefault();

        var form = $form;
        var name = form.find('#form-name').val();
        var phone = form.find('#form-number').val();
        var email = form.find('#form-email').val();
        var productList = '';
        for (var i = 0; i < localStorage.length; i++){
            productList += localStorage.key(i) + '=' + localStorage.getItem(localStorage.key(i))+'&';
        }
        var token = 'rn7YVoZGF-ds_TeeXMdD';
        $.ajax({
            type: "POST",
            url: 'https://nit.tron.net.ua/api/order/add',
            data: 'name='+name+'&phone='+phone+'&email='+email+'&'+productList+'token='+token, // serializes the form's elements.
            success: function(data)
            {
                if (data.status === 'error')
                    alert("The cart is empty!"); // show response from the php script.
                else{
                    $products.empty();
                    localStorage.clear();
                    alert("Bought succesfully!");
                }
            },
            error: function(xhr){
                console.log("An error occured: " + xhr.status + " " + xhr.statusText);
            },
        });
    });
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
            console.log('Loaded via AJAX!');
            console.log(json);
            $products.append($(`<div id="product-${currentId}">`));
            var $thisProduct = $products.find("#product-"+currentId);
            $thisProduct.append($(`<img src="${json.image_url}" alt="${json.name}" class="product-image" >`));
            $thisProduct.append($(`<span class="product-title">`).text(json.name));
            $thisProduct.append($(`<button id="decrease-count-${currentId}">`).text('-'));
            $thisProduct.find("#decrease-count-"+currentId).click(function(){
                incrementCount(-1, currentId, $thisProduct);
            });
            $thisProduct.append($(`<span id="product-count-${currentId}">`).text(currentItem));
            $thisProduct.append($(`<button id="increase-count-${currentId}">`).text('+'));
            $thisProduct.find("#increase-count-"+currentId).click(function(){
                incrementCount(+1, currentId, $thisProduct);
            });
            $thisProduct.append($(`<button id="remove-from-cart-${currentId}">`).text('Remove'));
            $thisProduct.find("#remove-from-cart-"+currentId).click(function(){
                localStorage.removeItem('products['+currentId+']');
                $thisProduct.remove();
            })

        },
        error: function(xhr){
            alert("An error occured: " + xhr.status + " " + xhr.statusText);
        },
    });}