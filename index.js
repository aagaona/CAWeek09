//Overview:
//Building out WAR! Game
//Players flip cards from the the top of deck high number wins, Aces are High
//Ties result in no point
//Win gives that player 1 point
//Play continues until all cards have been used (cards are not reshuffled into the deck, 1 round uses 52 cards)

//Plan:
//Players need to play cards from hand
//Players need to recieve cards
//Deck must be shuffled (Rnd.Numbers)
//Cards must be given to players (Rnd)
//Track Score
//Could display name of winner per flip and current score
//Display Winner and Score at the end


class Cards {
    constructor (value, suit){
        this.value = value;
        this.suit = suit;
    }
}

let suits = [`♥`, `♠`, `♣`, `♦`]
let values = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]


//Need players
class Players {
    constructor (name){
        this.player = name;
        //Players need hands
        this.hand = [];
    }

    recieveCard(card){
        this.hand.push(card)
    }

    playCard(card){
       return this.hand.shift(card)
    }
}


let Alex = new Players (`Alex`);
console.log(`Welcome Player 1: ${Alex.player} get ready for the War!`)
let John = new Players (`John Bon Jovi`);
console.log(`Welcome Player 2: ${John.player} get ready for the War!`)


class Decks {
    constructor (){
        this.deck = [];
        this.generateDeck();      
    }

    //genrates 52 cards with value and suit - called when deck is created
    generateDeck (){
        let newDeck = values.flatMap((value) => 
            suits.map((suit) => new Cards(value,suit))
        );
        
        this.deck = newDeck
    };

    // //used to randmoize array before dealing cards to players
    // //upon research discoverd the Fisher-Yates Algorithm that was reccomended to randmize position in an array
    shuffleDeck () {
        for (let i = this.deck.length - 1; i > 0; i--){
            let newIndex = Math.floor(Math.random() * (i + 1))
            let oldValue = this.deck[newIndex]
            this.deck[newIndex] = this.deck[i]
            this.deck[i] = oldValue
        }
    }
    
}

class Game{
    constructor(Player1, Player2, Deck){
        this.player1 = Player1
        this.player2 = Player2
        this.deck = Deck
    }

    start (){
        dealCards();

    }

    dealCards(){
        
        console.log(this.deck.length)
    }


}












let deckOfCards = new Decks ();
deckOfCards.shuffleDeck();
console.log(deckOfCards);
console.log(`The deck is shuffled and ready!`)
let warGame = new Game(Alex, John, deckOfCards)



// deckOfCards.dealCards(Alex,John)
// console.log(Alex.hand)
// console.log(John.hand)

