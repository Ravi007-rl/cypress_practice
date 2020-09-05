/// <reference types="Cypress" />

describe("sign-in",function(){

    before(function(){
        cy.fixture('HomeOwner').then(function(data){
            this.data=data
        })
    })
    
    it("Now verify that account",function(){
        cy.visit("https://www.mailinator.com/v3/index.jsp?zone=public&query="+this.data.email+"#/#inboxpane")    
    })
})