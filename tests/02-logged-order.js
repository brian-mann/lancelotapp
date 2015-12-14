// describe('WebApp Loged order [000]',function(){
// 	before(function(){
// 		cy.login()
// 		cy.E2ECookie();
// 	});
// 	beforeEach(function(){
// 		Cypress.Cookies.preserveOnce("e2eTest")
// 	})
// 	describe('Usage [001]',function(){
// 		it('Goes to the order page and shows a popup[002]',function(){
// 			 cy
// 			.server({force404: false, stub: false})
// 			.route({url: new RegExp(Cypress.env('apiURL')+'/1/staffr_types.*') }).as('staffr_types')
// 			.route({ url: new RegExp(Cypress.env('apiURL')+'/1/places/autocomplete.*') }).as('autocomplete')

// 			.get('.customer-menu')
// 			.find('a[href="#/order/staffrs"]')
// 			.click()
// 			.get('.order-header-title').contains('What type of staff do you need?')
// 			.wait('@staffr_types')
// 			//Select the suggested city
// 			.get('.es-modal-event-city')
// 			.find('.city-event-body')
// 			.find('input[type="text"]')
// 			.type('miami')
// 			.wait('@autocomplete')
// 			.get('.city-select-list')
// 			.find('ul li:first-child')
// 			.click()
// 			.get('.city-event-body')
// 			.find('.es-modal-btn')
// 			.click({force:true})
// 			.get(".es-modal-event-city").should("not.exist")
// 			//Clicks a card and fills it
// 			.get('.staffr-body .card:first-child')
// 			.click()
// 			.get('.order-view')
// 			.find('.staffr-add')
// 			.click()
// 			.get('.order-view')
// 			.find('.gender-box:nth-child(2)').click()
// 			.get('.staffr-btn').click()
// 			//TODO check values
// 			//Fills the event details
// 			.get('.order-sidebar')
// 			.find('button[href="#/order/details"]')
// 			.click()
// 			.hash().should("eq", "#/order/details")
// 			.get('.order-header-title').contains('Event Details')
// 			.get('input[placeholder="Event Venue"]').type('Miami Airport')
// 			.focus()
// 			.get('textarea[placeholder="Enter a description of your event (required)"]').type('Lorem ipsum dolor sit amet')
// 			.get('input[placeholder="Mobile Number"').type('5555555555')
// 			.get('textarea[placeholder="Enter the staffs duties"]').type('foo bar baz bar')
// 			.get('.order-details-footer')
// 			.find('button')
// 			.click()
// 			//Fills the payment information
// 			.server({force404: false, stub: false})
// 			.route({url: new RegExp(Cypress.env('apiURL')+'/1/customers/.*/cards') }).as('getCards')
// 			.route({url: new RegExp(Cypress.env('apiURL')+'/1/customers/.*/cards') ,method:'post'}).as('cards')
// 			.route({url: new RegExp(Cypress.env('apiURL')+'/1/customers/.*/orders') ,method:'post'}).as('create')
// 			.route({url: new RegExp(Cypress.env('apiURL')+'/1/customers/.*/orders/.*/pay_deposit') ,method:'post'}).as('payDeposit')
// 			.get('.es-modal-payment')
// 			.find('input[placeholder="Card number"]').type('4242424242424242')
// 			.get('.es-modal-payment')
// 			.find('input[placeholder="MM/YY"]').type('08/25')
// 			.get('.es-modal-payment')
// 			.find('input[placeholder="CVC"]').type('123')
// 			.get('.es-modal-payment')
// 			.find('.payment-footer')
// 			.find('.es-modal-btn')
// 			.click()
// 			.wait('@cards')
// 			.wait('@create')
// 			.wait('@payDeposit')
// 			.waitForAngular()
// 			.hash().should("match", new RegExp('#/order/complete.*'))
// 		});
// 	});

// });
