const dayjs = require('dayjs');

describe('template spec', () => {
  it('tests booking top 3 challenge for 2 people', () => {
    cy.visit('https://paajt.github.io/ESC-Hacker-Escape-Rooms/');
    cy.wait(1000);//For API to load
    cy.get('.roomIndividual').contains('Book this room').click({force: true});//Click button
    cy.get('.dateTitle').should('have.text', 'What date would you like to come?');
    cy.get('.bookingInput').type(dayjs().format('YYYY-MM-DD'));//Gets current date
    cy.get('button').contains('Search available times').click({force: true});//Click button
    cy.wait(1000);
    cy.get('#nameValue').should('have.text', '').type('Joel Jansson');//Checks input values are 0 and
    cy.get('#emailValue').should('have.text', '').type('jollepolle95@gmail.com');// types some info
    cy.get('#timeValue').select(0);//Click on dropdown menu and choose 1st option
    cy.get('.amountOfPeopleInput').type(2);
    cy.get('.submitButton').click({force: true});//Click button
    cy.wait(1000);
    cy.get('.submittedTitle').should('be.visible');
    cy.get('.submittedButton').should('be.visible').click({force: true});
  })

  it('tests booking from challenges page, for 2 people', () => {
    cy.visit('https://paajt.github.io/ESC-Hacker-Escape-Rooms/');
    cy.wait(1000);//For API to load
    cy.get('.challengesBtn').contains('See all challenges').click({force: true});//Click button
    cy.get('.roomIndividual').contains('Book this room').click({force: true});//Click button
    cy.get('.dateTitle').should('have.text', 'What date would you like to come?');
    cy.get('.bookingInput').type(dayjs().format('YYYY-MM-DD'));//Gets current date
    cy.get('button').contains('Search available times').click({force: true});//Click button
    cy.wait(1000);
    cy.get('#nameValue').should('have.text', '').type('Joel Jansson');//Checks input values are 0 and
    cy.get('#emailValue').should('have.text', '').type('jollepolle95@gmail.com');// types some info
    cy.get('#timeValue').select(0);//Click on dropdown menu and choose 1st option
    cy.get('.amountOfPeopleInput').type(2);
    cy.get('.submitButton').click({force: true});//Click button
    cy.wait(1000);
    cy.get('.submittedTitle').should('be.visible');
    cy.get('.submittedButton').should('be.visible').click({force: true});
  })
})