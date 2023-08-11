/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function () {

  beforeEach(function () {
    cy.visit('./src/index.html')
  })
  
  it('verifica o título da aplicação', function () {
    cy.title().should('be.equal', 'Central de atendimento ao cliente TAT')
  })

  it('Preenche os campos obrigatórios e envia o formulário', function () {
    cy.get('#firstName')
      .should('be.visible').type('adam',{delay:0}).should('have.text', '')
      cy.get('#lastName').should('be.visible').type('Santos',{delay:0}).should('have.text', '')
        cy.get('#email').should('be.visible').type('adam.santos@gmail.com', {delay:0}).should('have.text', '')
          cy.get('#open-text-area').should('be.visible').type('htfchgcxyticlvçkvkvlvvvljhvjbhbbsabdsvadgvgvgvd',{delay:0}).should('have.text', '')
    cy.get('button[type="submit"]').should('be.visible', 'button[type="submit"]').click().should('be.visible', 'span[class="success"]')
  })

it.only('', () => {
  cy.get('#firstName').type('adam')
      cy.get('#lastName').should('be.visible').type('Santos',)
        cy.get('#email').should('be.visible').type('adam.santos.com')
          cy.get('#open-text-area').type('htfchgcxyticlvçkvkvlvvvljhvjbhbbsabdsvadgvgvgvd',{delay:0})
  cy.get('button[type="submit"]').click().should('be.visible', 'span[class="error"]')
  cy.get('.error').should('be.visible')
});
})
