"use strict";

import { parseHTML } from '../utils/parseHTML.js';

const itemRenderer = {

    // Converts an item into a badge
    asBadge: function (item) {
        let html = `<span class="badge badge-secondary badge-item">
                        ${item.name} (${item.quantity})
                    </span>`;
        let badge = parseHTML(html);
        return badge;
    },

    // Converts several items into a group of badges
    asBadgeGroup: function (items) {
        let html = `<div class="item-group"></div>`;
        let group = parseHTML(html);

        // Load the items
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
                html+=`<button id="${item.itemId}" class="decrease btn btn-primary">-</button>`;    
            }
            html+=`<button id="${item.itemId}" class="setPurchased btn btn-primary">✓</button>`;
            html+=`<button id="${item.itemId}" class="increase btn btn-primary">+</button>`;
            html+=`<button id="${item.itemId}" class="delete btn btn-danger">X</button>`;
        };

        html +=`</li>`;                                
        return html;
    },

    // Converts an array of items into a list
    asList: function (items, showPurchaseButton) {
        let html = `<ul id="shoppingList" class="list-group list-group-flush">`

        // Fill in the elements
        for (let i of items) {
            let row = this.aslistElement(i, showPurchaseButton);
            html += row;
        }

        html += `</ul>`;
        return html;
    }
};



export { itemRenderer };