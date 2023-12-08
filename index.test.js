const expect = chai.expect
const assert = chai.assert

// describe(`Testing:`, () => {
//     it(`should show this on the page`, () => {
//         expect()
//     })
// })

describe(`Check the Deck:`, () => {
    it(`should be an array with a length of 52`, () => {
        expect(new Decks).to.be.an('array').with.lengthOf(52)
    })
})

describe(`PLayers are ready:`, () => {
    it(`should have players that are ready to play the game`, () => {
        expect(new Players()).to.be.an.instanceof(Players)
    })
})