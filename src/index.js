import './scss/main.scss';

// import 'bootstrap';	// with JS!!
// import 'bootstrap/dist/css/bootstrap.min.css';	// only minified CSS

import $ from 'jquery';
window.jQuery = $;
window.$ = $;

import {_makeShop} from './modules/main-shop-html';
import {_makeProductPage} from './modules/this-product-html';
import {_allProducts, _makeCategories} from "./modules/categories-html";
import {_makeCart} from "./modules/cart-html";

$( document ).ready(function() {
    mainPageView();
    categories();
    $(document).find('#show-cart').click(function(){
        var productContainer = $('.product-container');
        productContainer.empty();
        productContainer.append(_makeCart());
    });
});

export const mainPageView = function() {
    jQuery.ajax({
        url: 'https://nit.tron.net.ua/api/product/list',
        method: 'get',
        dataType: 'json',
        success: function (json) {
            console.log('Loaded via AJAX!');
            // console.log(json);
            console.table(json);
            var productContainer = $('.product-container');
            productContainer.empty();
            json.forEach(product => productContainer.append(_makeShop(product)));
            console.log('Added to grid');
        },
        error: function (xhr) {
            alert("An error occured: " + xhr.status + " " + xhr.statusText);
        },
    })
};

export const categoryPageView = function(id) {
    jQuery.ajax({
        url: 'https://nit.tron.net.ua/api/product/list/category/'+id,
        method: 'get',
        dataType: 'json',
        success: function (json) {
            console.log('Loaded via AJAX!');
            // console.log(json);
            console.table(json);
            var productContainer = $('.product-container');
            productContainer.empty();
            json.forEach(product => productContainer.append(_makeShop(product)));
            console.log('Added to grid');
        },
        error: function (xhr) {
            alert("An error occured: " + xhr.status + " " + xhr.statusText);
        },
    })
};


export const singleView = function(product_id){
    jQuery.ajax({
        url: 'https://nit.tron.net.ua/api/product/'+product_id,
        method: 'get',
        dataType: 'json',
        success: function(json){
            console.log('Loaded via AJAX!');
            console.log(json);
            var productContainer = $('.product-container');
            productContainer.empty();
            productContainer.append(_makeProductPage(json));
            console.log('Added to page');
        },
        error: function(xhr){
            alert("An error occured: " + xhr.status + " " + xhr.statusText);
        },
    });
};

const categories = function(){
    jQuery.ajax({
        url: 'https://nit.tron.net.ua/api/category/list',
        method: 'get',
        dataType: 'json',
        success: function(json){
            console.log('Loaded via AJAX!');
            console.log(json);
            var categoryContainer = $('.categories');
            categoryContainer.empty();
            categoryContainer.append(_allProducts());
            json.forEach(category => categoryContainer.append(_makeCategories(category)));
            console.log('Added categories');
        },
        error: function(xhr){
            alert("An error occured: " + xhr.status + " " + xhr.statusText);
        },
    });
};

export const addToCart = function(id) {
    var productName = 'products['+id+']';
    if (localStorage.getItem(productName) != null){
        var productInCart = parseInt(localStorage.getItem(productName), 10);
        productInCart++;
        localStorage.setItem(productName, ''+productInCart);
    }
    else
        localStorage.setItem(productName,'1');
};








