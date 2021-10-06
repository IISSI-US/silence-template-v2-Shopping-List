'use_strict';

import { BASE_URL, requestOptions } from './common.js';

const listsAPI = {
    getByUser: async function (userId){
        let response = await axios.get(`${BASE_URL}/lists/${userId}`,requestOptions);
        return response.data[0];
    },
};

// The export keyword creates a new javascript module
export { listsAPI };