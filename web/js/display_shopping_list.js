"use strict";

import { itemsAPI_auto } from '/js/api/_items.js';
import { itemsAPI } from '/js/api/items.js';
import { messageRenderer } from '/js/renderers/messages.js';
import { itemRenderer } from '/js/renderers/items.js';
import { itemValidator } from '/js/validators/items.js';
import { parseHTML } from '/js/utils/parseHTML.js';

// DOM elements that we will use
const errorsDiv = document.getElementById("errors");
const itemForm = document.getElementById("item-form");


// Main function that will run when the page is ready
function main() {
    //Load the corresponding items to the passed get parameter.
    let list_id = getQueryParam("list_id");

    addHiddenToForm(list_id)

    // Load the unpurchased List
    loadUnpurchased(list_id);

    // Load the purchased List
    loadPurchased(list_id);

    // Handle the form's submit event
    itemForm.addEventListener("submit", function (event) {
        handleSendList(event);
    });
}

document.addEventListener("DOMContentLoaded", function() {
    main();
});



///////////////////////////////////////////////////////////////////////////////

// Function that returns the requested get parameter value in the url.
function getQueryParam(param){
    var url_string = window.location.href
    var url = new URL(url_string);
    var id = url.searchParams.get(param);
    return id;
};

// adding hidden default parameters to form for item creation.
function addHiddenToForm(list_id){
    let aux = `<input id="listId" name="listId" type="hidden" value="${list_id}"></input>`;
    let aux2 = `<input id="purchased" name="purchased" type="hidden" value=0></input>`;
    let aux3 = `<input id="quantity" name="quantity" type="hidden" value=1></input>`;
    let child = parseHTML(aux);
    let child2 = parseHTML(aux2);
    let child3 = parseHTML(aux3);
    document.getElementById("hidden-params").appendChild(child);
    document.getElementById("hidden-params").appendChild(child2);
    document.getElementById("hidden-params").appendChild(child3);
};

async function handleSendList(event) {
    // Prevent the browser from sending the form on its own,
    // because we'll do it using AJAX
    event.preventDefault();
    errorsDiv.innerHTML = "";
    let formData = new FormData(itemForm);
    let list_id = getQueryParam("list_id");
    
    let errors = await itemValidator.validateItem(formData, list_id);

    if (errors.length === 0) {
        // No errors, create the department
        try{
            await itemsAPI_auto.create(formData)
            // loadPurchased(list_id);
            loadUnpurchased(list_id);
        }catch(e){
            messageRenderer.showErrorAsAlert("error creating item.", e)
        }
    } else {
        // Errors, display them
        for (let err of errors) {
            messageRenderer.showErrorAsAlert(err);
        }
    }
};

///////////////////////////////////////////////////////////////////////////////

async function loadUnpurchased(list_id){
    const shoppingList = document.getElementById("shoppingList");
    try{
        let items = await itemsAPI.getByListUnpurchased(list_id)
        let list = itemRenderer.asList(items, true);
        shoppingList.innerHTML = list;
        assingButtons();
        // shoppingList.appendChild(list);
    }catch(e){
        messageRenderer.showErrorAsAlert("error loading unpurchased list.", e)
    }
}

async function loadPurchased(list_id){
    const removedList = document.getElementById("removedList");
    try{
        let items = await itemsAPI.getByListPurchased(list_id)
        let list = itemRenderer.asList(items, false);
        removedList.innerHTML = list;
    }catch(e){
        messageRenderer.showErrorAsAlert("error loading purchased list.", e)
    }
}

function assingButtons(){
    let decreaseButtons = document.getElementsByClassName("decrease");
    let purchaseButtons = document.getElementsByClassName("setPurchased");
    let increaseButtons = document.getElementsByClassName("increase");
    let deleteButtons = document.getElementsByClassName("delete");

    for (let i = 0; i < purchaseButtons.length; i++) {
        let db = decreaseButtons[i];
        let pb = purchaseButtons[i];
        let ib = increaseButtons[i];
        let delB = deleteButtons[i];

        if(db != undefined){
            db.addEventListener("click", function (event) {
                decrease(event);
            });
        }

        pb.addEventListener("click", function (event) {
            setPurchased(event);
        });

        ib.addEventListener("click", function (event) {
            increase(event);
        });

        delB.addEventListener("click", function (event) {
            deleteItem(event);
        });
    }
}

// indicate that an item has been purchased.
async function setPurchased(event){
    let itemId = event.srcElement.getAttribute("id");
    let list_id = getQueryParam("list_id");
    try{
        await itemsAPI.purchase(itemId)
        loadPurchased(list_id);
        loadUnpurchased(list_id);
    }catch(e){
        messageRenderer.showErrorAsAlert("Error setting as purchased", e);
    } 
};

// decrease the number for an item.
async function decrease(event){
    let itemId = event.srcElement.getAttribute("id");
    let list_id = getQueryParam("list_id");
    try{
        await itemsAPI.decreaseQuantity(itemId)
        loadUnpurchased(list_id);
    }catch(e){
        messageRenderer.showErrorAsAlert("Error decreasing number as purchased", e);
    }
};

// increase the number for an item.
async function increase(event){
    let itemId = event.srcElement.getAttribute("id");
    let list_id = getQueryParam("list_id");
    try{
        await itemsAPI.increaseQuantity(itemId)
        loadUnpurchased(list_id);
    }catch(e){
        messageRenderer.showErrorAsAlert("Error increasing number as purchased", e);
    }
};

async function deleteItem(event){
    let itemId = event.srcElement.getAttribute("id");
    let list_id = getQueryParam("list_id");
    try{
        await itemsAPI_auto.delete(itemId)
        loadUnpurchased(list_id);
    }catch(e){
        messageRenderer.showErrorAsAlert("Error deleting item.", e);
    }
};
