Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function () {
  cy.get('#firstName').type('Adam')
  cy.get('#lastName').type('Santos')
  cy.get('#email').type('adamsantos@gmail.com')
  cy.get('#open-text-area').type('teste')
  cy.get('#phone').type('8587564587')
})

Cypress.Commands.add('clearfullinputs', function () {
  cy.get('#firstName').type('Adam',{delay:0}).clear()
  cy.get('#lastName').type('Santos',{delay:0}).clear()
  cy.get('#email').type('adamsantos@gmail.com',{delay:0}).clear()
  cy.get('#open-text-area').type('teste',{delay:0}).clear()
  cy.get('#phone').type('8587564587',{delay:0}).clear()
})