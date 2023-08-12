Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function () {
  cy.get('#firstName').type('adam')
  cy.get('#lastName').type('Santos')
  cy.get('#email').type('adamsantos@gmail.com')
  cy.get('#open-text-area').type('teste')
  cy.get('button[type="submit"]').click()
})