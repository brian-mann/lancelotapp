describe('WebApp Loged out order [02s]',function(){
	describe('Usage [02t]',function(){
		before(function(){
			cy.clearCookies()
			.E2ECookie();
		})
		beforeEach(function(){
			Cypress.Cookies.preserveOnce("e2eTest")
		})
		// it('Visits the alive URL [05m]',function(){
		// 	var url = Cypress.env('apiURL')+'/1/e2e/alive';
		// 	cy.request({url:url,cookies:true}).then(function(response){
		// 		expect(response.status).to.equal(200);
		// 	});
		// });
		it('Visits the main page [05k]',function(){
			var url = Cypress.env('webSiteUrl');
			cy

 		
 			.server({force404: false, stub: false})
			.route({ url: new RegExp(Cypress.env('apiURL')+'/1/places/autocomplete.*') }).as('autocomplete')
 		
			.route({ url: new RegExp(Cypress.env('apiURL')+'/1/places/cityserved.*') }).as('cityserved')
		
			.route({ url: Cypress.env('apiURL')+'/1/me/profile'}).as('profile')

			.route({ url: Cypress.env('apiURL')+'/1/staffr_types?limit=false'}).as('staffr_types')
			
			.route({ url: new RegExp(Cypress.env('apiURL')+'/1/places/details/.*') }).as('places')
			
			.visit(url)
			.get('a[href="book-brand-ambassador.html"]')
			.click()
			.get('form[name="booking-form"]')
			.find('input[placeholder="City"]')
			.type('miami')
			.wait('@autocomplete')
			.get('.city-autocomplete')
			.find('li:first-child')
			.click()
			.get('#quantity-container')
			.find('.right-button')
			.click()
			.get('#gender_spinner')
			.find('.right-button')
			.click()
			.get('.time-spinner')
			.find('input[name="start-hour"]')
			.click()
			.get('#hours-quantity-container')
			.find('.right-button')
			.click()
			.get('.form-button-container')
			.find('input[type="submit"]')
			.click()
			.wait('@cityserved')
			.hash().should("match", new RegExp('#/order/details.*'))
			.wait('@profile')

			.wait('@places')
			.wait('@staffr_types')
			//Receives the email  popup


		
			var staffrType = '550b068205c83b7812555397';
			var quantity = 2;
			var city = 'ChIJEcHIDqKw2YgRZU-t3XHylv8';
			var gender = 'Female';
			var date = new Date();
			date.setTime(date.getTime()+1000*60*60*24*4);
			var startDate = date.getMonth()+1+'%2F'+date.getDate()+'%2F'+date.getFullYear();
			var endDate = startDate;
			var hourQuantity = 5;
			var startHour = 5;
			var startMinute = '00'
			var startPeriod = 'PM';			
			cy
			.get('.es-modal-container')
			.find('input[type="email"]')
			.type('e2etest+'+new Date().getTime()+'@test.test')
			.get('.es-modal-container')
			.find('.es-modal-btn')
			.click()
			.get(".es-modal-container").should("not.exist")
			//TODO check the values;
			//Fills the event details 
			.get('input[placeholder="Event Venue"]').type('Miami Airport')
			.focus()
			.get('textarea[placeholder="Enter a description of your event (required)"]').type('Lorem ipsum dolor sit amet')
			.get('input[placeholder="Mobile Number"').type('5555555555')
			.get('textarea[placeholder="Enter the staffs duties"]').type('foo bar baz bar')
			.get('.order-details-footer')
			.find('button')
			.click()
			.get('.es-modal-container')
			//Fills the account information
			.server({force404: false, stub: false})
			.route({ url: Cypress.env('apiURL')+'/1/signup' ,method:'post'}).as('signup')

			.route({ url: Cypress.env('apiURL')+'/1/signin' ,method:'post'}).as('signin')

			// .route({ url: Cypress.env('apiURL')+'/1/me/profile'}).as('profile')

			.get('.es-modal-container')
			.find('input[placeholder="First Name"]')
			.type('John')
			
			.get('.es-modal-container')
			.find('input[placeholder="Last Name"]')
			.type('John')

			.get('.es-modal-container')
			.find('input[placeholder="Password"]')
			.type('testtesttest')

			.get('.es-modal-container')
			.find('.es-modal-btn')
			.click()
			.wait('@signup')
			.wait('@signin')
			.get('.es-modal-payment')
			//Fills the payment information
			.server({force404: false, stub: false})
			.route({ url: new RegExp(Cypress.env('apiURL')+'/1/customers/.*/cards') }).as('getCards')

			.route({ url: new RegExp(Cypress.env('apiURL')+'/1/customers/.*/cards') ,method:'post'}).as('cards')

			.route({ url: new RegExp(Cypress.env('apiURL')+'/1/customers/.*/orders') ,method:'post'}).as('create')

			.route({ url: new RegExp(Cypress.env('apiURL')+'/1/customers/.*/orders/.*/pay_deposit') ,method:'post'}).as('payDeposit')

			.get('.es-modal-payment')
			.find('input[placeholder="Card number"]').type('4242424242424242')
			.get('.es-modal-payment')
			.find('input[placeholder="MM/YY"]').type('08/25')
			.get('.es-modal-payment')
			.find('input[placeholder="CVC"]').type('123')
			.get('.es-modal-payment')
			.find('.payment-footer')
			.find('.es-modal-btn')
			.click()
			.wait('@create')
			.wait('@payDeposit')
			.waitForAngular()
			.hash().should("match", new RegExp('#/order/complete.*'))
		});

	});
});
