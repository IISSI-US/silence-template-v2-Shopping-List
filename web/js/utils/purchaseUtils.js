"use strict";

import { itemsAPI } from '/js/api/items.js';
import { messageRenderer } from '/js/renderers/messages.js';
import { itemRenderer } from '/js/renderers/items.js';

const purchaseUtils = {

loadUnpurchased: async function (list_id){
    const shoppingList = document.getElementById("shoppingList");
    try{
        let items = await itemsAPI.getByListUnpurchased(list_id)
        let list = itemRenderer.asList(items, true);
        // shoppingList.innerHTML = "";
        shoppingList.appendChild(list);
    }catch(e){
        messageRenderer.showErrorAsAlert("error loading unpurchased list.", e)
    }
},

loadPurchased: async function (list_id){
    const removedList = document.getElementById("removedList");
    try{
        let items = await itemsAPI.getByListPurchased(list_id)
        let list = itemRenderer.asList(items, false);
        removedList.appendChild(list);
    }catch(e){
        messageRenderer.showErrorAsAlert("error loading purchased list.", e)
    }
}

}

export {purchaseUtils};