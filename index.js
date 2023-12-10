//Overview:
//Building out WAR! Game
//Players flip cards from the the top of deck high number wins, Aces are High
//Ties result in no point > return card to the player to avoid loosing a card from the deck
//Win gives that player 1 point
//Play continues until all cards have been used (in the real game cards are added back to the bottom of your deck > this may result in an infinte game)
    //to avoid this added a point cap

//Plan:
//Players need to play cards from hand
//Players need to recieve cards whern they win
//Deck must be shuffled (Rnd.Numbers)
//Cards must be given to players - "dealt in" (Rnd)
//Track Score to determine a winner
//Could display name of winner per flip 
//Display Winner and Score at the end

let suits = [`♥`, `♠`, `♣`, `♦`]
let values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']


//this was the most efficent way I could come up with to resolve the comapring values instead of using values 2-14
const valueMap = {
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "10": 10,
    "J": 11,
    "Q": 12,
    "K": 13,
    "A": 14,
}


class Cards {
    constructor (value, suit){
        this.value = value;
        this.suit = suit;
    }
}



//Need players
class Players {
    constructor (name){
        this.player = name;
        //Players need hands
        this.hand = [];
        //added score to be able to run the game with a finite end avoiding an infinite loop
        this.score = 0;
    }


    recieveCard(card){
        this.hand.push(card)
    }


    playCard(){
       return this.hand.shift();
    }


    cardsLeft (){
        return this.hand.length
    }

    shuffleHand () {
        for (let i = this.hand.length - 1; i > 0; i--){
            let newIndex = Math.floor(Math.random() * (i + 1))
            let oldValue = this.hand[newIndex]
            this.hand[newIndex] = this.hand[i]
            this.hand[i] = oldValue
        }
    }
}




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


   numberOfCards (){
    return this.deck.length
   }


   dealCard (){
    return this.deck.pop();
   }

   //required to be able to call the slice function later
   slice(start, end){
    return this.deck.slice(start, end);
   }

    
}

class Game{
    constructor(Player1, Player2, Deck){
        this.player1 = Player1;
        this.player2 = Player2;
        this.deck = Deck;
    }
    

    startGame (){
        console.log(`Welcome Player 1: ${this.player1.player} get ready for the War!`)
        console.log(`Welcome Player 2: ${this.player2.player} get ready for the War!`)
        this.deck.shuffleDeck();
        console.log(`The deck is shuffled and ready!`)
        this.dealInPlayers();
        console.log(`Get Ready`)
        console.log(`🥊Fight!🥊`)
        this.endGame();
        
    }


    //Works as long as the deck is even will not work with odd number deck
    dealInPlayers (){
        let deckMid = this.deck.numberOfCards() /2
        let player1Deck = this.deck.slice(0, deckMid);
        let player2Deck = this.deck.slice(deckMid, this.deck.numberOfCards());

        this.player1.hand = player1Deck;
        this.player2.hand = player2Deck;      
    }


    playCards (){
        let player1card = this.player1.playCard();
        let player2card = this.player2.playCard();

        console.log(player1card);
        console.log(player2card);

        this.determineWinner(player1card, player2card)

        
    }


    determineWinner (player1card, player2card){
        if (this.player1.cardsLeft() === 0){
            this.player2.recieveCard(player1card);
            this.player2.recieveCard(player2card);
            this.player2.score = 1000
        } else if (this.player2.cardsLeft() === 0){
            this.player1.recieveCard(player1card);
            this.player1.recieveCard(player2card);
            this.player1.score = 1000
        } else if (valueMap[player1card.value] > valueMap[player2card.value]){
            console.log (`${this.player1.player} wins the round!`);
                this.player1.recieveCard(player1card);
                this.player1.recieveCard(player2card);
                this.player1.score++;
        } else if (valueMap[player2card.value] > valueMap[player1card.value]){
            console.log (`${this.player2.player} wins the round!`);
                this.player2.recieveCard(player1card);
                this.player2.recieveCard(player2card);
                this.player2.score++;
        } else {
            this.player2.recieveCard(player2card);
            this.player1.recieveCard(player1card);
            console.log(`it's a tie...`);
        }
        //Shows the current hand of the player to check for cheating
        // console.log(this.player1.hand)
        // console.log(this.player2.hand)
    };


    //created loop to end the game if no one gets all the cards, 1000 seems to be a high a enough score to play most of the cards
    endGame (){           
        while (this.player1.score < 1000 && this.player2.score < 1000){
        this.playCards();
       } 

       if (this.player1.score === 1000 || (this.player1.score > this.player2.score)){
            console.log(`🎆${this.player1.player} has won the War!🎆`)
            console.log(`${this.player1.player}'s Final Score: ${this.player1.score} 👑`)
            console.log(`${this.player2.player}'s Final Score: ${this.player2.score} 💀`)
        } else if (this.player2.score === 1000 || (this.player2.score > this.player1.score)){
            console.log(`🎆${this.player2.player} has won the War!🎆`)
            console.log(`${this.player1.player}'s Final Score: ${this.player1.score} 💀`)
            console.log(`${this.player2.player}'s Final Score: ${this.player2.score} 👑`)
        } else {console.log(`This war had no winners...`)};
    };
};

let Alex = new Players (`Alex`);
let Fezzik = new Players (`Fezzik`);
// was going to include a prompt so viewer could enter the game, this worked but for testing removed this to make it quicker to refresh
    // let Player2 =  prompt(`Enter you name:`)
    // let newPlayer = new Players (Player2);
let deckOfCards = new Decks ();
console.log(deckOfCards);
let warGame = new Game(Alex, Fezzik, deckOfCards)
warGame.startGame();






