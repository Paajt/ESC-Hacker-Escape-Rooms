describe('Homepage - Basic test', () => {
    it('Check if the webpage is running and verifies h1 content', () => {
        cy.visit('/');
        cy.get('h1').should('contain.text', 'Hacker Escape Rooms');
    });
});

describe('Challenge - Search bar test', () => {
    it('Checks if the filter search bar works', () => {
        cy.visit('/challenges');

        cy.get('button.filterBtn').click();
        cy.wait(1000);

        cy.get('input#userInput')
          .type('Shell 1994')
          .should('have.value', 'Shell 1994');

        cy.get('.roomIndividual')
          .should('be.visible')
          .within(() => {
              cy.get('.titleContainer h3.titleRoom')
                .should('contain.text', 'Shell 1994');
          });
    });
});

describe('About us - Navigation', () => {
    it('navigates to the About us page from the homepage', () => {
        cy.visit('/');
        cy.get('nav.topNav')
        .contains('About us')
        .click();

        cy.url().should('include', '/aboutus');
    });
});

describe('Challenge - Search bar test', () => {
    it('Checks if no results are shown and the "No matching challenges" message appears', () => {
        cy.visit('/challenges');

        cy.get('button.filterBtn').click();
        cy.wait(1000);

        cy.get('input#userInput')
          .type('asd')
          .should('have.value', 'asd');

        cy.get('.roomIndividual').should('not.exist'); 

        cy.get('h2').should('contain.text', 'No matching challenges');
    });
});