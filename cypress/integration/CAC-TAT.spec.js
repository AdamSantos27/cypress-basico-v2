/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function () {

  beforeEach(function () {
    cy.visit('./src/index.html')
  })
  
  it('verifica o título da aplicação', function () {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
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
  cy.get('#lastName').should('be.visible').type('Santos')
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
    cy.get('#phone-checkbox').check()
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

  it('envia o formulario com sucesso usando um comando customizado.', () => {
    cy.fillMandatoryFieldsAndSubmit() 
    cy.get('.success').should('be.visible')
  })

  it('selecionando  o campo suspenso (YouTube) por seu texto', () => {
    cy.get('#product')
    .select('YouTube').should('have.value', 'youtube')
  })

  it('selecionando o campo suspenso (mentoria) por seu valor (value)', () => {
    cy.get('#product')
    .select('mentoria').should('have.value', 'mentoria')
  })
  
  it('selecionando o campo suspenso (Blog) por seu índice', () => {
    cy.get('#product')
    .select(1).should('have.value', 'blog')
  })

  it('Marcar o tipo de atendimento feedback', () => {
    cy.get('input[value="feedback"]')
      .check()
      .should('have.value', 'feedback')
  })

  it('Marcar cada tipo de atendimento', () => {
    cy.get('input[type="radio"]')
      .should('have.length', 3)
      .each(function($radio) {
        cy.wrap($radio).check()
        cy.wrap($radio).should('be.checked')
    })
  })

  it('Marcar ambos os checkbox e desmarcar o ultimo', () => {
    cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')
      .last().uncheck()
      .should('not.be.checked')
  })
  
  it('seleciona um arquivo da pasta fixtures', () => {
    cy.get('input[type="file"]')
      .should('not.have.value')
      .selectFile('./cypress/fixtures/example.json')
      .should(function ($input){
        expect($input[0].files[0].name).to.equal('example.json')
      })
  })

  it('seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('input[type="file"]')
      .should('not.have.value')
      .selectFile('./cypress/fixtures/example.json', {action: 'drag-drop'})
      .should(function ($input){
        expect($input[0].files[0].name).to.equal('example.json')})
  })

  it('seleciona um arquivo utilizando um caminho para a qual foi dada um alias', () => {
    cy.fixture('example.json').as('aquivo')
    cy.get('input[type="file"]')
    .selectFile('@aquivo').should(function ($input){
      expect($input[0].files[0].name).to.equal('example.json')})
  })

  it('verifica se o link políticas de privacidade abre em outra aba', () => {
    cy.get('#privacy a').should('have.attr', 'target', '_blank')
  })

  it('acessa o link da política de privacidade removendo o target e clicando no link', () => {
    cy.get('#privacy a')
      .invoke('removeAttr', 'target')
      .click()
      cy.title().should('be.equal','Central de Atendimento ao Cliente TAT - Política de privacidade')
  })
})
