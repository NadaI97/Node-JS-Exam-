const { Roles } = require ("../../middleware/auth");

const endpoint = {

    creatProduct:[Roles.admin , Roles.user],
    softDelete: [Roles.admin, Roles.user],
    updateProduct: [Roles.user, Roles.admin],
    
}

module.exports = endpoint