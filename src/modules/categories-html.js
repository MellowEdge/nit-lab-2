import $ from "jquery";
import {categoryPageView, mainPageView} from "../index";

export const _makeCategories = ({
                                     id,
                                     name,
                                     description
                                 }) => {
    let $category = $(`<div class="category" data-product-id="${id}">`);
    $category.append($(`<span class="category-title">`).text(name));
    $category.find('.category-title').click(function(){
        categoryPageView(id);
    });
    return $category;
};

export const _allProducts = () => {
    let $category = $(`<div class="category">`);
    $category.append($(`<span class="category-title">`).text("All products"));
    $category.find('.category-title').click(function(){
        mainPageView();
    });
    return $category;
};