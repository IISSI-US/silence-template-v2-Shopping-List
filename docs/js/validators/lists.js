"use strict";

// Client side validation for the list object.
const listValidator = {
    validateList: function (form) {
        let listName = form.get("name");

        let errors = [];

        if (listName.length < 5) {
            errors.push("The list's name must be at least 5 characters long.");
        }

        return errors;
    },
};

export { listValidator };