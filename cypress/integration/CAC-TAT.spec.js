/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function () {
  const TRES_SEGUNDOS_MS = 3000
  beforeEach(function () {
    cy.visit('./src/index.html')
  })
  
  it('verifica o título da aplicação', function () {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('Preenche os campos obrigatórios e envia o formulário', function () {

    cy.clock()

    cy.fillMandatoryFieldsAndSubmit()
    cy.contains('button', 'Enviar').click()
    cy.get('.success').should('be.visible')
    cy.tick(TRES_SEGUNDOS_MS)
    cy.get('.success').should('not.be.visible')
  })

  it('exibe mensagem de erro ao passar email com formato incorreto', () => {
  
  cy.clock()

  cy.get('#firstName').type('adam')
  cy.get('#lastName').type('Santos')
  cy.get('#email').type('adam.santos,com')
  cy.get('#open-text-area').type('htfchgcxyticlvçkvkvlvvvljhvjbhbbsabdsvadgvgvgvd',{delay:0})
  cy.get('button[type="submit"]').click().should('be.visible')
  cy.get('.error').should('be.visible')
  cy.tick(TRES_SEGUNDOS_MS)
  cy.get('.error').should('not.be.visible')
})
  
  it('campo de telefone continua vazio quando preenchido com valores não númericos', () => {
    cy.get('#phone')
    .type('asdasffasf').should('have.value', '')
  })

  it('exibe mensagem de erro quando o telefone estiver marcado como obrigatório', () => {

    cy.clock()
    cy.get('#phone-checkbox').check()
    cy.fillMandatoryFieldsAndSubmit()
    cy.get('#phone').type('8587564587',{delay:0}).clear()
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')
    cy.tick(TRES_SEGUNDOS_MS)
    cy.get('.error').should('not.be.visible')
  })

  it('preenche e limpa todos os input de texto', () => {

    cy.fillMandatoryFieldsAndSubmit()
    cy.get('#firstName').should('have.value', 'Adam')
    cy.get('#lastName').should('have.value', 'Santos')
    cy.get('#email').should('have.value','adamsantos@gmail.com')
    cy.get('#open-text-area').should('have.value', 'teste')
    cy.get('#phone').should('have.value', '8587564587')
    cy.clearfullinputs()
    cy.get('#firstName').should('not.have.value')
    cy.get('#lastName').should('not.have.value')
    cy.get('#email').should('not.have.value')
    cy.get('#open-text-area').should('not.have.value')
    cy.get('#phone').should('not.have.value')
  })

  it('acessar a aplicação e verificar se campos obrigatórios funcionam', () => {
    cy.get('.button').click()
    cy.get('.error').should('be.visible')
  })

  it('envia o formulario com sucesso usando um comando customizado.', () => {
    
    cy.clock()

    cy.fillMandatoryFieldsAndSubmit()
    cy.contains('button', 'Enviar').click()
    cy.get('.success').should('be.visible')
    cy.tick(TRES_SEGUNDOS_MS)
    cy.get('.success').should('not.be.visible')
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

  it('Acessa o link da política de privacidade removendo o target e clicando no link', () => {
    cy.get('#privacy a')
      .invoke('removeAttr', 'target')
      .click()
      cy.title().should('be.equal','Central de Atendimento ao Cliente TAT - Política de privacidade')
  })

  it('exibe e esconde as mesagens de sucesso e de erro', () => {
    cy.get('.success')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Mensagem enviada com sucesso.')
      .invoke('hide')
      .should('not.be.visible')
      cy.get('.error')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Valide os campos obrigatórios!')
      .invoke('hide')
      .should('not.be.visible')
  })

  it('preenche a area de texto usando o comando invoke', () => {
    const longText = Cypress._.repeat('0123456789', 50)
    cy.get('#open-text-area')
      .invoke('val', longText)
      .should('have.value', longText)
  })

  it('Faz uma requisição para a api', () => {
    cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
    .should(function(response) {
      const { status, statusText, body } = response
      expect(status).to.equal(200)
      expect(statusText).to.equal('OK')
      expect(body).to.include('CAC TAT')
    })
  })

  it('Desafio encontre o gato', () => {
    cy.get('span[id="cat"]')
    .should('not.be.visible')
    .invoke('show')
    .should('be.visible')
  })
})
