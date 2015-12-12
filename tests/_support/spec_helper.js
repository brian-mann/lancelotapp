// ***********************************************
// This example spec_helper.js shows you how to
// create the custom command: 'login'.
//
// The spec_helper.js file is a great place to
// add reusable logic / custom commands which
// become usable in every single test file.
//
// You can read more about custom commands here:
// https://github.com/cypress-io/cypress/wiki/commands#customizing
// ***********************************************
//
Cypress.addParentCommand("login", function(url,email, password,userName){
	email    = email || 'test@test.test'
	password = password || 'testtesttest';
	userName = userName || 'Test Test';
	url = url ||  Cypress.env('webAppUrl')+"/#/signin";
	cy
	.server({force404: false, stub: false}, {log: false})
	.route({url: Cypress.env('apiURL')+'/1/me/profile'}, {log: false}).as('profile')

	.route({url: Cypress.env('apiURL')+'/1/signin' ,method:'post'}, {log: false}).as('signin')

	.route({url: new RegExp(Cypress.env('apiURL')+'/1/customers/.*/cards') }).as('getCards')
	.visit(url, {log: false})
	.get('input[name="signin-email"]', {log: false}).type(email, {log: false})
	.get('input[name="signin-password"]', {log: false}).type(password, {log: false})
	.type("{enter}", {log: false})
	.wait('@signin', {log: false})
	.wait('@profile', {log: false})
	
	.get('.user-name ', {log: false}).contains(userName, {log: false});

})

Cypress.addParentCommand("E2ECookie",function(){
	Cypress.Cookies.set("e2eTest", Cypress.env('E2EKey'))
	
})

Cypress.addParentCommand("waitForAngular", function(){
	var cmd = Cypress.Log.command({name: "waitForAngular", message: []})
	
	cy.window({log: false}).then(function(win){
		return new cy.Promise(function(resolve){
			var root = cy.$("[ng-app]").get(0)
			win.angular.getTestability(root).whenStable(resolve)
		}).then(function(){
			cmd.snapshot().end()
		})
	}
	);
})