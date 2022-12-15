const Wallet = require("./Wallet")

const {generateID} = require('../utils/uuidv4')

class Player {
    constructor (name){
        this.id = generateID();
        this.name = name;
        this. wallet = new Wallet()
    }

    getTable(){
        return this.table
    }

}

module.exports = Player