/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT - Política de privacidade', function () {

  beforeEach(function () {
    cy.visit('./src/index.html')
  })
  it.only('', () => {
    cy.visit('./src/privacy.html')
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT - Política de privacidade')
  })
  })