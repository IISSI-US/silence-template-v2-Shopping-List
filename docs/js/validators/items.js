"use strict";

// Client side validation for the item object.
const itemValidator = {
    validateItem: function (form) {
        let itemName = form.get("name");
        let errors = [];

        if (itemName.length < 5) {
            errors.push("The item's name must be at least 5 characters long.");
        }

        return errors;
    },
};

export { itemValidator };