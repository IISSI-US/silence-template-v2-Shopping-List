"use strict";

import { parseHTML } from '../utils/parseHTML.js';

const listRenderer = {

    // Converts a list into a table row,
    asTableRow: function (list) {
        let html = `<table><tr>
                        <td>${list.listId}</td>
                        <td>${list.name}</td>
                        <td><a href="display_shopping_list.html?list_id=${list.listId}">Show<a></td>
                    </tr></table>`;
        let row = parseHTML(html).querySelector("tr");
        return row;
    },

    // Converts an array of lists into a table
    asTable: function (lists) {
        let html = `<table class="table">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Name</th>
                                <th scope="col">Link</th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>`;
        let table = parseHTML(html);
        let tableBody = table.querySelector("tbody");

        // Fill in the employees
        for (let l of lists) {
            let row = this.asTableRow(l);
            tableBody.appendChild(row);
        }
        return table;
    }
};


export { listRenderer };