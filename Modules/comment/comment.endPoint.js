const { Roles } = require ("../../middleware/auth");

const endpoint = {

    createComment:[Roles.admin , Roles.user],
    like: [Roles.admin , Roles.user],
    updateAndDelete :[Roles.admin, Roles.user]
   
    
}

module.exports = endpoint