"use strict";

import { parseHTML } from '../utils/parseHTML.js';
import { itemsAPI } from '../api/items.js';
import { itemsAPI_auto } from '../api/items_auto.js';


const itemRenderer = {

    // Converts an item into a badge
    asBadge: function (item) {
        let html = `<span class="badge badge-secondary badge-item">
                        ${item.name} (${item.quantity})
                    </span>`;
        let badge = parseHTML(html);
        return badge;
    },

    // Converts several departments into a group of badges
    asBadgeGroup: function (items) {
        let html = `<div class="item-group"></div>`;
        let group = parseHTML(html);

        // Load the departments
        for (let item of items) {
            let badge = this.asBadge(item);
            group.appendChild(badge);
        }

        return group;
    },

    // Converts a list into a table row,
    aslistElement: function (item, showPurchaseButton) {
        let html = `<li>
                        <span>${item.name}(${item.quantity})</span>`;
        if(showPurchaseButton){
            if(item.quantity > 1){
                html+=`<button class="decrease btn btn-primary">-</button>`;    
            }
            html+=`<button class="setPurchased btn btn-primary">✓</button>`;
            html+=`<button class="increase btn btn-primary">+</button>`;     
        };
        html.concat(`</li>`);                                
        let row = parseHTML(html);
        if(showPurchaseButton){
            if(item.quantity > 1){
                row.querySelector("button.decrease").onclick = function(){decrease(item.itemId);};
            }
            row.querySelector("button.setPurchased").onclick = function(){setPurchased(item.itemId);};
            row.querySelector("button.increase").onclick = function(){increase(item.itemId);};
        }
        return row;
    },

    // Converts an array of items into a list
    asList: function (items, showPurchaseButton) {
        let html = `<ul id="shoppingList" class="list-group list-group-flush">
                        <li></li>
                    </ul>`;
        let list = parseHTML(html);
        let listElements = list.querySelector("li");

        // Fill in the elements
        for (let i of items) {
            let row = this.aslistElement(i, showPurchaseButton);
            listElements.appendChild(row);
        }
        return list;
    }
};

// Function to run when we indicate that an item has been purchased.
function setPurchased(itemId){
    // Another approach to this is to call the getByLists(Un)Purchased functions
    // but this is done upon loading the page so we do just that. 
    itemsAPI.purchase(itemId)
    .then(_ => location.reload())
};

// To run when we want to decrease the number for an item.
function decrease(itemId){
    // A better way to implement this would be to chage the html within the function 
    // to reflect the change being made in the database without actually polling it again.
    itemsAPI.decreaseQuantity(itemId)
    .then(_ => location.reload())
};

// To run when we want to increase the number for an item.
function increase(itemId){
    // A better way to implement this would be to chage the html within the function 
    //to reflect the change being made in the database without actually polling it again.
    itemsAPI.increaseQuantity(itemId)
    .then(_ => location.reload())
};

export { itemRenderer };