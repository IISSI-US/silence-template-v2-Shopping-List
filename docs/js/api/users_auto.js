//DO NOT EDIT THIS FILE it is auto-generated, it will be updated automatically,
    //all changes done to this file will be lost upon re-running the 'silence createapi' command 
    //if you want to create new api entry points define them in a new file.

    'use_strict';
    
    import { BASE_URL, requestOptions } from './common.js';
    
    const usersAPI_auto ={

    /**
    * Gets all users
    */
    getAll: function(){
    return new Promise (function (resolve, reject) 
    {
        axios
            .get(`${BASE_URL}/users`,requestOptions)
            .then(response => resolve(response.data))
            .catch(error => reject(error.response.data.message));
        });
    },

    /**
    * Gets a users with corresponding primary key
    */
    getById: function(userId){
    return new Promise (function (resolve, reject) 
    {
        axios
            .get(`${BASE_URL}/users/${userId}`,requestOptions)
            .then(response => resolve(response.data[0]))
            .catch(error => reject(error.response.data.message));
        });
    },

    /**
    * creates a new users
    */
    create: function(formData,){
    return new Promise (function (resolve, reject) 
    {
        axios
            .post(`${BASE_URL}/users`,formData,requestOptions)
            .then(response => resolve(response.data))
            .catch(error => reject(error.response.data.message));
        });
    },

    /**
    * updates an existing users with corresponding primary key
    */
    update: function(formData,userId){
    return new Promise (function (resolve, reject) 
    {
        axios
            .put(`${BASE_URL}/users/${userId}`,formData,requestOptions)
            .then(response => resolve(response.data))
            .catch(error => reject(error.response.data.message));
        });
    },

    /**
    * deletes an existing users with corresponding primary key
    */
    delete: function(userId){
    return new Promise (function (resolve, reject) 
    {
        axios
            .delete(`${BASE_URL}/users/${userId}`,requestOptions)
            .then(response => resolve(response.data))
            .catch(error => reject(error.response.data.message));
        });
    },
};

export {usersAPI_auto};