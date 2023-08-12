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
      .should('be.visible').type('adam',{delay:0}).should('have.value', 'adam')
    cy.get('#lastName').should('be.visible').type('Santos',{delay:0}).should('have.value', 'Santos')
    cy.get('#email').should('be.visible').type('adam.santos@gmail.com', {delay:0}).should('have.value', 'adam.santos@gmail.com')
    cy.get('#open-text-area').should('be.visible').type('htfchgcxyticlvçkvkvlvvvljhvjbhbbsabdsvadgvgvgvd',{delay:0}).should('have.value', 'htfchgcxyticlvçkvkvlvvvljhvjbhbbsabdsvadgvgvgvd')
    cy.get('button[type="submit"]').should('be.visible', 'button[type="submit"]').click().should('be.visible', 'span[class="success"]')
  })

it('exibe mensagem de erro ao passar email com formato incorreto', () => {
  cy.get('#firstName').type('adam')
  cy.get('#lastName').should('be.visible').type('Santos',)
  cy.get('#email').should('be.visible').type('adam.santos,com')
  cy.get('#open-text-area').type('htfchgcxyticlvçkvkvlvvvljhvjbhbbsabdsvadgvgvgvd',{delay:0})
  cy.get('button[type="submit"]').click().should('be.visible')
  cy.get('.error').should('be.visible')
})
  
  it('campo de telefone continua vazio quando preenchido com valores não númericos', () => {
    cy.get('#phone')
    .type('asdasffasf').should('have.value', '')
  })

  it('exibe mensagem de erro quando o telefone estiver marcado como obrigatório', () => {
    cy.get('#firstName').type('adam')
    cy.get('#lastName').type('Santos')
    cy.get('#email').type('adamsantos@gmail.com')
    cy.get('#phone-checkbox').click()
    cy.get('#open-text-area').type('htfchgcxyticlvç')
    cy.get('button[type="submit"]').click().should('be.visible')
    cy.get('.error').should('be.visible')
  })

  it('preenche e limpa todos os input de texto', () => {
    cy.get('#firstName')
      .type('adam')
      .should('have.value', 'adam').clear()
      .should('have.value', '')
    cy.get('#lastName')
      .type('Santos')
      .should('have.value', 'Santos').clear()
      .should('have.value', '')
    cy.get('#email')
      .type('adamsantos@gmail.com')
      .should('have.value', 'adamsantos@gmail.com').clear()
      .should('have.value', '')
    cy.get('#phone')
      .type('8587564587')
      .should('have.value', '8587564587').clear()
      .should('have.value', '')
    cy.get('#open-text-area')
      .type('htfchgcxyticlvç')
      .should('have.value', 'htfchgcxyticlvç').clear()
      .should('have.value', '')
  })

  it('acessar a aplicação e verificar se campos obrigatórios funcionam', () => {
    cy.get('.button').click()
    cy.get('.error').should('be.visible')
  })

  it.only('envia o formulario com sucesso usando um comando customizado', () => {
    cy.fillMandatoryFieldsAndSubmit() 
    cy.get('.success').should('be.visible')
  })
})
