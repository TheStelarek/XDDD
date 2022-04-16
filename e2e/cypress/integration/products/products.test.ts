/// <reference types="Cypress" />

context('Home page - Products', () => {
	beforeEach(() => {
		cy.visit(Cypress.env().baseUrl);
	});

	it('Display products', () => {
		cy.wait(1000);
		cy.get('main > ul > li').should('length', 8);
	});

	it('Visits login page', () => {
		cy.get('button span').contains('Login').click();
		cy.url().should('be', Cypress.env().baseUrl + '/login');
	});

	it('Filter products by active checkbox', () => {
		cy.get('label').contains('Active').click();
		cy.get('main > ul > li').find('button').contains('Unavailable').should('not.exist');
	});

	it('Filter products by promo checkbox', () => {
		cy.get('label').contains('Promo').click();
		cy.get('main > ul > li').find('span').contains('Promo').should('exist');
	});

	it('Filter products by Search', () => {
		cy.get('input[placeholder="Search"]').type('pizza');
		cy.wait(1000);
		cy.get('main > ul > li').should('not.be.empty');
	});

	it('Filter products by promo and active checkbox', () => {
		cy.get('label').contains('Promo').click();
		cy.get('label').contains('Active').click();
		cy.get('main > ul > li').find('span').contains('Promo').should('exist');
		cy.get('main > ul > li').find('button').contains('Unavailable').should('not.exist');
	});

	it('Filter products by promo, active checkbox and search text', () => {
		cy.get('label').contains('Promo').click();
		cy.get('label').contains('Active').click();
		cy.get('main > ul > li').find('span').contains('Promo').should('exist');
		cy.get('main > ul > li').find('button').contains('Unavailable').should('not.exist');
		cy.get('input[placeholder="Search"]').type('pizza');
		cy.wait(1000);
		cy.get('main > ul > li').should('not.be.empty');
	});

	it('Show empty list info if no products', () => {
		cy.get('input[placeholder="Search"]').type('qwertyuiop');
		cy.wait(1000);
		cy.get('span').contains(/There are no products on the list/);
	});

	it('Show modal window', () => {
		cy.get('main > ul > li').find('button').contains('Show details').click();
		cy.get('div[role="dialog"]').find('h1').should('not.be.empty');
		cy.get('div[role="dialog"]').find('p').should('not.be.empty');
		cy.get('div[role="dialog"]').find('img').should('have.attr', 'src');
	});

	it('Close modal window', () => {
		cy.get('main > ul > li').find('button').contains('Show details').click();
		cy.get('div[role="dialog"]').find('button').click();
		cy.get('div[role="dialog"]').should('not.be.visible');
	});

	it('Go to last page', () => {
		cy.get('a[role="last"]').contains('Last').click();
		cy.get('main > ul > li').should('length', 4);
	});

	it('Back to first page', () => {
		cy.get('a[role="last"]').contains('Last').click();
		cy.get('main > ul > li').should('length', 4);
		cy.get('a[role="first"]').contains('First').click();
		cy.get('main > ul > li').should('length', 8);
	});
});
