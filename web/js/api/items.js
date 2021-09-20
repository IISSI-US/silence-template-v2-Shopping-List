'use_strict';

import { BASE_URL, requestOptions } from './common.js';

const itemsAPI = {
    getByListPurchased: function (ListId){
        return new Promise(function (resolve, reject) {
            axios
                .get(`${BASE_URL}/lists/${ListId}/items/purchased`, requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        });
    },

    getByListUnpurchased: function (ListId){
        return new Promise(function (resolve, reject) {
            axios
                .get(`${BASE_URL}/lists/${ListId}/items/unpurchased`, requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        });
    },

    // this makes a database call each time you increse or dicrease the quantity of items to buy
    // this is obviously suboptimal, the corect thing to do would be update with the new ammount and set it
    increaseQuantity: function (ItemId){
        return new Promise(function (resolve, reject) {
            axios
                .put(`${BASE_URL}/items/${ItemId}/increase`, requestOptions)
                .then(response => resolve(response.data[0]))
                .catch(error => reject(error.response.data.message));
        });
    },

    decreaseQuantity: function (ItemId){
        return new Promise(function (resolve, reject) {
            axios
                .put(`${BASE_URL}/items/${ItemId}/decrease`, requestOptions)
                .then(response => resolve(response.data[0]))
                .catch(error => reject(error.response.data.message));
        });
    },

    purchase: function (ItemId){
        return new Promise(function (resolve, reject) {
            axios
                .put(`${BASE_URL}/items/${ItemId}/purchase`, requestOptions)
                .then(response => resolve(response.data[0]))
                .catch(error => reject(error.response.data.message));
        });
    },
};

// The export keyword creates a new javascript module
export { itemsAPI };