describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:5173');
  });

  it('can get data', () => {
    cy.visit('http://localhost:5173');
    cy.get('table').should('contain', 'test');
  });

  it('can get data', () => {
    cy.visit('http://localhost:5173');
    cy.get('table').should('contain', 'test');
  });

  it('can add new data', () => {
    cy.visit('http://localhost:5173');
    cy.get('input[type="file"]').selectFile('cypress/fixtures/test.png');
    cy.get('input[name="name"]').type('test-name');
    cy.get('input[name="email"]').type('test-email');
    cy.get('button[type="submit"]').click();
    cy.get('table').should('contain', 'test-name');
  });
});
