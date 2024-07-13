function getSectionHTML(index) {
    return `
    <section class="section_pad">
        <div id="${dishes[index].category}" class="d-flex-st-st d-clm"><img class="dish_imgs" src="${dishes[index].image}"></div>
        <h3>${dishes[index].category}</h3>
        <div id="dish_content${index}"></div>
    </section>
    `;
}


function getDishHTML(dishIndex, index) {
    return `
        <article class="d-flex-bw-st dish_box div_margin">
            <div class="d-clm">
                <h4>${dishes[index].menus[dishIndex].name}</h4>
                <p>${dishes[index].menus[dishIndex].description}</p>
                <span">${(dishes[index].menus[dishIndex].price.toFixed(2) + "€").replace(".", ",")}</span>
            </div>
            <div>
                <img onclick="addItemToBasket(${index},${dishIndex})" class="order_img_content" src="./assets/icons/plus_content.png">
            </div>
        </article>
    `;
}


function getBasketDishHTML(basketIndex) {
    return `
        <div>
            <h5>${basketDishname[basketIndex]}</h5>
        </div>
        <div class="d-flex-bw-c">
            <div class="d-flex-c-c">
                <img onclick="countDownAmount(${basketIndex})" class="basket_imgs" src="./assets/icons/minus.png" alt="">
                <span>${basketAmount[basketIndex]}</span>
                <img onclick="countUpAmount(${basketIndex})" class="basket_imgs" src="./assets/icons/plus.png" alt="">
            </div>
            <div>
                <span">${((parseFloat(basketPrice[basketIndex]) * (basketAmount[basketIndex])).toFixed(2)).replace(".", ",")} €</span>
            </div>
            <div>
                <img onclick="spliceBasketDishes(${basketIndex})" class="basket_imgs" src="./assets/icons/trash.png" alt="">
            </div>
        </div>    
    `;
}


function getBasketPriceHTML() {
    return `
    <div>
        <div class="d-flex-bw-c basket_price_section" id="display_order">
            <div class="d-clm">
                <span>Zwischensumme</span>
                <span>Lieferkosten</span>
                <span><b>Gesamt</b></span>
            </div>
            <div class="d-clm d-flex-c-end">
                <span id="subtotal">0,00 €</span>
                <span>5,00 €</span>
                <span id="finalSum">0,00 €</span>
            </div>
        </div>
        <div class="d-flex-c-c basket_price_section">
            <button onclick="orderDish()" class="basket_btn d-flex-c-c btn_font"><b>Bestellen</b></button>
        </div>
    </div>
    `;
}
