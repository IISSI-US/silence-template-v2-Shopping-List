"use strict";

import { parseHTML } from '../utils/parseHTML.js';
import { listsAPI } from '../api/lists.js';
import { listsAPI_auto } from '../api/lists_auto.js';

const userRenderer = {

    // Converts a user into a table row,
    // queries the List API to get the id of the lists it belongs to
    // and adds a link to view each one.
    asTableRow: function (user) {
        let html = `<table><tr>
                        <td>${user.userId}</td>
                        <td>${user.username}</td>
                        <td>${user.name}</td>
                        <td>${user.surnames}</td>
                    </tr></table>`;
        let row = parseHTML(html).querySelector("tr");
        // findLists(row, user.userId);
        return row;
    },

    // Converts an array of employees into a table
    asTable: function (users) {
        let html = `<table class="table">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Username</th>
                                <th scope="col">Name</th>
                                <th scope="col">Surname</th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>`;
        let table = parseHTML(html);
        let tableBody = table.querySelector("tbody");

        // Fill in the users
        for (let u of users) {
            let row = this.asTableRow(u);
            tableBody.appendChild(row);
        }
        return table;
    }
};

// Aux function to put links to all list of a user in a table row.
function findLists(row, userId) {
    let tdList = row.querySelector("td.lists");

    if (userId === null) {
        tdList.textContent = "No lists for this user.";
    } else {
        listsAPI.getByUser(userId)
            .then(lists => {
                let content = ``;
                for(let li of lists){
                    let aux = `<a href = display_list.html>
                                    ${li.name}
                                </a><br>`;
                    content.concat(aux);
                };
                
                tdList.textContent = content;
            });
    }
}

export { userRenderer };