function init() {
    window.onresize = ("resize", resize);
    renderMainContent();
    renderBasketPrice();
}


function renderMainContent() {
    let section_content = document.getElementById('section_content');

    section_content.innerHTML = '';

    for (let index = 0; index < dishes.length; index++) {
        section_content.innerHTML +=
            getSectionHTML(index);
        renderDishes(index);
    }
}

function renderDishes(index) {
    let dish_content = document.getElementById(`dish_content${index}`);

    dish_content.innerHTML = '';

    for (let dishIndex = 0; dishIndex < dishes[index].menus.length; dishIndex++) {
        dish_content.innerHTML += getDishHTML(dishIndex, index);
    }
}


function renderBasketDishes() {
    let basketCard = document.getElementById('side_basket');

    basketCard.innerHTML = '';
    for (let basketIndex = 0; basketIndex < basketDishname.length; basketIndex++) {
        basketCard.innerHTML += getBasketDishHTML(basketIndex);
    }
    renderBasketPrice();
}


function renderBasketPrice() {
    let basketPriceCard = document.getElementById('side_basket');
    basketPriceCard.innerHTML += getBasketPriceHTML();
}


// function renderMobileBasketDishes() {
//     let mobileBasketCard = document.getElementById('mobile_basket_div');

//     mobileBasketCard.innerHTML = '';
//     for (let basketIndex = 0; basketIndex < basketDishname.length; basketIndex++) {
//         mobileBasketCard.innerHTML += getBasketDishHTML(basketIndex);
//     }
//     renderBasketPrice();
// }


// function renderMobileBasketPrice() {
//     let mobileBasketPriceCard = document.getElementById('mobile_basket_div');
//     mobileBasketPriceCard.innerHTML += getBasketPriceHTML();
// }


function addItemToBasket(index, dishIndex) {
    let price = dishes[index].menus[dishIndex].price;
    let dishName = dishes[index].menus[dishIndex].name;

    pushToBasketArrays(dishName, price.toFixed(2) + "€");
    getPrices();
}


function pushToBasketArrays(dishName, price) {
    let newMenu = dishName;
    let newPrice = price;
    let menuIndex = getMenuIndex(newMenu);

    if (menuIndex == -1) {
        basketDishname.push(newMenu);
        basketPrice.push(newPrice);
        basketAmount.push(dishes.amount = 1);
    } else {
        countUpAmount(menuIndex)
    }
    renderBasketDishes();
}


function getMenuIndex(newMenu) {
    return basketDishname.indexOf(newMenu);
}


function countUpAmount(basketIndex) {
    if (basketAmount[basketIndex] >= 10) {
        alert("Bitte melde dich bei einer so großen Bestellung telefonisch bei uns.")
    } else {
        basketAmount[basketIndex]++;
    }
    renderBasketDishes();
    getPrices();
}


function countDownAmount(basketIndex) {
    basketAmount[basketIndex]--;
    if (basketAmount[basketIndex] == 0) {
        basketDishname.splice(basketIndex, 1);
        basketAmount.splice(basketIndex, 1);
        basketPrice.splice(basketIndex, 1);
    }
    renderBasketDishes();
    getPrices();
}


function getPrices() {
    let sum = 0;

    for (let i = 0; i < basketPrice.length; i++) {
        const subTotal = parseFloat(basketPrice[i]) * basketAmount[i];
        sum += subTotal;
    }
    let finalSum = (sum + 5.00).toFixed(2);
    if (finalSum > 200) {
        alert('Du würdest einen Gesamtbetrag von 200€ überschreiten, melde dich bitte telefonisch wenn du eine so große Bestellung vornimmst');
    }
    document.getElementById(`subtotal`).innerHTML = (sum.toFixed(2) + "€").replace(".", ",");
    document.getElementById('finalSum').innerHTML = (finalSum + '€').replace(".", ",");
}



function spliceBasketDishes(basketIndex) {
    basketDishname.splice(basketIndex, 1);
    basketAmount.splice(basketIndex, 1);
    basketPrice.splice(basketIndex, 1);

    if (basketDishname == 0) {
        renderBasketDishes();
    } else {
        renderBasketDishes();
        getPrices();
    }
}


function orderDish() {
    if (basketDishname == 0) {
        alert("Du musst schon was in den Warenkorb packen. :)")
    } else {
        addDialogs();
    }
    document.getElementById('side_basket').innerHTML = '';
    basketDishname = [];
    basketAmount = [];
    basketPrice = [];
    renderBasketPrice();
}


function openMobileBasket() {
    let basket = document.getElementById('fullscreen_basket');
    let section_content = document.getElementById('section_content');
    let footer = document.getElementById('footer');

    section_content.classList.toggle(`d-none`);
    basket.classList.toggle(`d-flex-clm-c`);
    basket.classList.toggle('side_basket');
    footer.classList.toggle('position-fixed');
}


function resize() {
    let basket = document.getElementById('fullscreen_basket');
    let section_content = document.getElementById('section_content');
    let footer = document.getElementById('footer');

    if (window.innerWidth > 1200 && window.getComputedStyle(section_content).visibility === "d-none", "max-width") {
        section_content.classList.remove(`d-none`);
        basket.classList.remove(`d-flex-clm-c`);
        basket.classList.add('side_basket');
        footer.classList.remove('position-fixed');
    } if (window.innerHeight > 1990) {
        footer.classList.add('position-fixed');
    }
}


function addDialogs() {
    let dialog = document.getElementById('dialogs');
    let orderDialog = document.getElementById('order_dialog');

    dialog.classList.remove('d-none');
    orderDialog.innerHTML  += '<div class="d-flex-c-c dialog_text dialogs_window">Deine Bestellung wurde aufgegeben und wird in kürze zu dir geliefert.</div>';
}


function removeDialogs() {
    let dialog = document.getElementById('dialogs');
    
    dialog.classList.add('d-none');
}