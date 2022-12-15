const {generateID} = require('../utils/uuidv4')
class Wallet {
    constructor (){
        this.id = generateID();
        this.credits = 0
    }

    getCredits(){
        return this.credits
    }

    setCreditsAmount(amount){
        this.credits = amount
    }

    winAmount(amount){
        this.credits += amount
    }

    looseAmount(amount){
        this.credits -= amount
    }
}

module.exports = Wallet