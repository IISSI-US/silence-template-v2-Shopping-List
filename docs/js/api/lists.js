'use_strict';

import { BASE_URL, requestOptions } from './common.js';

const listsAPI = {
    getByUser: function (userId){
        return new Promise(function (resolve, reject) {
            axios
                .get(`${BASE_URL}/lists/${userId}`, requestOptions)
                .then(response => resolve(response.data[0]))
                .catch(error => reject(error.response.data.message));
        });
    },
};

// The export keyword creates a new javascript module
export { listsAPI };