// describe('WebApp login [000]',function(){
// 	before(function(){
// 		var url = Cypress.env('webAppUrl')+"/#/signin"
// 		cy.E2ECookie().visit(url);
// 	});
// 	beforeEach(function(){
// 		Cypress.Cookies.preserveOnce("e2eTest")
// 	})
// 	describe('Layout [001]',function(){
// 		it('Has email address [002]',function(){
// 			 cy.get('input[name="signin-email"]').should("be.visible")
// 		});
// 		it('Has password field [003]',function(){
// 	 		cy.get('input[name="signin-password"]').should("be.visible")
// 		})
// 		it('Has login button  [004]',function(){
// 			 cy.get('button[name="signin-button"]').should("be.visible")
// 		})
// 	});
// 	describe('Usage [005]',function(){
// 		describe('Login [006]',function(){
// 			it('Log in successfully [007]',function(){
// 				var email = 'test@test.test'
// 				var password = 'testtesttest';
// 				var userName = 'Test Test';
// 				cy
// 				.server({force404: false, stub: false})
// 				.route({url: Cypress.env('apiURL')+'/1/me/profile'}).as('profile')
// 				.route({url: Cypress.env('apiURL')+'/1/signin' ,method:'post'}).as('signin')
// 				.route({url: new RegExp(Cypress.env('apiURL')+'/1/customers/.*/cards') }).as('getCards')

// 				.get('input[name="signin-email"]').type(email)
// 				.get('input[name="signin-password"]').type(password)
// 				.type("{enter}")
// 				.wait('@signin')
// 				.wait('@profile')
// 				.get('.user-name ').contains(userName);
// 			});
// 		});
// 	});
// });
