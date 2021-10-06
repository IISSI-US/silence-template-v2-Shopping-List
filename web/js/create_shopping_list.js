"use strict";

import { listsAPI } from '/js/api/lists.js';
import { listsAPI_auto } from '/js/api/_lists.js';

import { listValidator } from '/js/validators/lists.js';
import { messageRenderer } from '/js/renderers/messages.js';

// DOM elements that we will use
const errorsDiv = document.getElementById("errors");
const listForm = document.getElementById("list-form");

// Main function that will run when the page is ready
function main() {
    // Handle the form's submit event
    listForm.addEventListener("submit", function (event) {
        handleSendList(event);
    });
}

document.addEventListener("DOMContentLoaded", function() {
    main();
});

///////////////////////////////////////////////////////////////////////////////

async function handleSendList(event) {
    // Prevent the browser from sending the form on its own,
    // because we'll do it using AJAX
    event.preventDefault();
    errorsDiv.innerHTML = "";

    let formData = new FormData(listForm);
    let errors = listValidator.validateList(formData);
    console.log(formData)
    
    if (errors.length === 0) {
        // No errors, create the department
        try{
            await listsAPI_auto.create(formData);
        }catch(e){
            messageRenderer.showErrorAsAlert("Error creating the shopping list.", error);
        }
        window.location.href = "index.html";
    } else {
        // Errors, display them
        for (let err of errors) {
            messageRenderer.showErrorAsAlert(err);
        }
    }
}
