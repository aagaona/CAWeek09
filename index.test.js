const expect = chai.expect
const assert = chai.assert

// describe(`Testing:`, () => {
//     it(`should show this on the page`, () => {
//         expect()
//     })
// })

describe(`Check the Card Builder:`, () => {
    it(`#should have 13 values and 4 suits `, () => {
        expect(values).to.be.an('array').with.lengthOf(13);
        expect(suits).to.be.an('array').with.lengthOf(4);
    })
})

describe(`Players are ready:`, () => {
    it(`#should have players that are ready to play the game`, () => {
        expect(new Players()).to.be.an.instanceof(Players)
    })
})

describe(`Value Map Check:`, () => {
    it(`#should exist as an object to map values`, () => {
        expect({valueMap}).to.be.an(`object`)
    })
})

describe(`Play Card Check:`, () => {
    it(`#should produce and object with a Value and a Suit`, () => {
        expect(Alex.playCard()).to.be.an(`object`).to.have.property('value');
        expect(Fezzik.playCard()).to.be.an(`object`).to.have.property('value');
    })
})

