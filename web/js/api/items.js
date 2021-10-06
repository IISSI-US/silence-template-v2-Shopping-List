'use_strict';

import { BASE_URL, requestOptions } from './common.js';

const itemsAPI = {
    getByListPurchased: async function (ListId){
        let response = await axios.get(`${BASE_URL}/lists/${ListId}/items/purchased`,requestOptions);
        return response.data;
    },

    getByListUnpurchased: async function (ListId){
        let response = await axios.get(`${BASE_URL}/lists/${ListId}/items/unpurchased`,requestOptions);
        return response.data;
    },

    // this makes a database call each time you increse 
    // or decrease the quantity of items to buy
    // this is obviously suboptimal, 
    // the corect thing to do would be update with the new ammount and set it
    // but for the purposes of this template this will suffice.
    increaseQuantity: async function (ItemId){
        let response = await axios.put(`${BASE_URL}/items/${ItemId}/increase`,requestOptions);
        return response.data[0];
    },

    decreaseQuantity: async function (ItemId){
        let response = await axios.put(`${BASE_URL}/items/${ItemId}/decrease`,requestOptions);
        return response.data[0];
    },

    purchase: async function (ItemId){
        let response = await axios.put(`${BASE_URL}/items/${ItemId}/purchase`,requestOptions);
        return response.data[0];
    },
};

// The export keyword creates a new javascript module
export { itemsAPI };