"use strict";

import { sessionManager } from './utils/session.js';

import { usersAPI_auto } from '/js/api/_users.js';

import { listsAPI } from '/js/api/lists.js';
import { listsAPI_auto } from '/js/api/_lists.js';

import { userRenderer } from '/js/renderers/users.js';
import { listRenderer } from '/js/renderers/lists.js';
import { messageRenderer } from '/js/renderers/messages.js';

// DOM elements that we will use
const usersContainer = document.getElementById("users");
const listsContainer = document.getElementById("lists");
const newListBtn = document.getElementById("new-list-button");

// Main function that will run when the page is ready
async function main() {
    // Hide the options that shouldn't be available for not logged users
    setLoggedOptions();

    // Load the users
    loadUsers();
    
    // Load the lists
    loadLists();
    
}

document.addEventListener("DOMContentLoaded", function () {
    main();
});

///////////

async function loadUsers(){
    try{
        let users = await usersAPI_auto.getAll();
        let table = userRenderer.asTable(users);
        usersContainer.appendChild(table);
    }catch(e){
        messageRenderer.showErrorAsAlert("error retrieving the users", error);
    }
}

async function loadLists(){
    try{
        let lists = await listsAPI_auto.getAll();
        let table = listRenderer.asTable(lists);
        listsContainer.appendChild(table);
    }catch(e){
        messageRenderer.showErrorAsAlert("error loading lists.", error);
    }
}

function setLoggedOptions() {
    // Hide the things that shouldnt be available for non authenticated users
    if (!sessionManager.isLogged()) {
        newListBtn.style.display = "none";
    }
}