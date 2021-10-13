'use_strict';

import { BASE_URL, requestOptions } from './common.js';

const listsAPI = {
    getByUser: async function (userId){
        let response = await axios.get(`${BASE_URL}/lists/${userId}`,requestOptions);
        return response.data[0];
    },
    /**
    * Deletes an existing entry in 'items' by its primary key, only if the role is super.
    */
    delete: async function(itemId){
        let response = await axios.delete(`${BASE_URL}/lists/authdel/${itemId}`,requestOptions);
        return response.data;
    },
};

// The export keyword creates a new javascript module
export { listsAPI };