"use strict";
import { itemsAPI_auto } from '../api/_items.js';
import { itemsAPI } from '../api/items.js';

// Client side validation for the item object.
const itemValidator = {
    validateItem: async function (form, list_id) {
        let itemName = form.get("name");
        let errors = [];

        let list_p = itemsAPI.getByListPurchased(list_id);
        let list_u = itemsAPI.getByListUnpurchased(list_id);
        let lists = [await list_p, await list_u];
        let list = lists[0].concat(lists[1]);
        
        for (const e of list) {
            if(e.name == itemName){
                errors.push("The item is already on the list.");
                break;
            }
        }

        if (itemName.length < 5) {
            errors.push("The item's name must be at least 5 characters long.");
        }

        return errors;
    },
};

export { itemValidator };