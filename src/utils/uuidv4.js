const { v4: uuidv4 } = require('uuid');

function generateID () {
    ID = uuidv4()

    return ID
}

module.exports = {generateID}