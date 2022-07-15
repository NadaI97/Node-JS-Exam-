const { Roles } = require ("../../middleware/auth");

const endpoint = {

    deleteUser:[Roles.admin , Roles.user],
    softDelete: [Roles.admin],
    updateProfile: [Roles.user, Roles.admin],
    
}

module.exports = endpoint