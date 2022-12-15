const {generateID} = require('../utils/uuidv4')
class Table {
    constructor (){
        this.id = generateID();
        this.players = []
        this.maxPlayers = 9
        this.currentPlayers = this.players.length
    }

    getId(){
        return this.id
    }
    getPlayers(){
        return this.players
    }

    playerToTable(player) {
        this.players.push(player)
    }
}

module.exports = Table