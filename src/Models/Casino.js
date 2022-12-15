const Table = require("./Table");


class Casino {
    constructor (name){
        this.name = name;
        this.table = new Table()
    }

    getTable(){
        return this.table
    }

    
}

module.exports = Casino