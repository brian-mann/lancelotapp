describe('Clear the database  [05l]',function(){
	before(function(){
		cy.clearCookies()
			.E2ECookie();
	})
	beforeEach(function(){
		Cypress.Cookies.preserveOnce("e2eTest")
	})
	it('Visits the reset URL [05m]',function(){
		var url = Cypress.env('apiURL')+'/1/e2e/reset';
		cy.request({url:url,method:'POST',cookies:true}).then(function(response){
			expect(response.status).to.equal(200);
		});
	});
});