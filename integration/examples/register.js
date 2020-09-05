/// <reference types="Cypress" />

describe("sign-in",function(){
    beforeEach(() => {
        cy.visit("http://167.172.248.30/sign-up")
    })

    it("dropdown blank",function(){
        cy.get("select.form-control.ng-untouched.ng-pristine.ng-invalid").focus()
        cy.get("select.form-control.ng-untouched.ng-pristine.ng-invalid").blur()
        cy.get("select.form-control.ng-pristine.ng-invalid.input-error.ng-touched").trigger("mouseover")
        cy.get("#tooltip-0").should('contain.text',"Please select type")
    })

    it("email blank",function(){
        cy.get('input[type="email"]').focus()
        cy.get('input[type="email"]').blur()
        cy.get('input[type="email"]').trigger("mouseover")
        cy.get("#tooltip-1").should('contain.text',"Email is required")
    })

    it("First name blank",function(){
        cy.get('input[type="text"]').first().focus()
        cy.get('input[type="text"]').first().blur()
        cy.get('input[type="text"]').first().trigger("mouseover")
        cy.get("#tooltip-2").should('contain.text',"First name is required")
    })

    it("Last name blank",function(){
        cy.get('input[type="text"]').eq(1).focus()
        cy.get('input[type="text"]').eq(1).blur()
        cy.get('input[type="text"]').eq(1).trigger("mouseover")
        cy.get("#tooltip-3").should('contain.text',"Last name is required")
    })

    it("Zipcode blank",function(){
        cy.get('input[type="text"]').eq(3).focus()
        cy.get('input[type="text"]').eq(3).blur()
        cy.get('input[type="text"]').eq(3).trigger("mouseover")
        cy.get("#tooltip-8").should('contain.text',"Zipcode is required")
    })

    it("Billing Address blank",function(){
        cy.get('input[type="text"]').eq(4).focus()
        cy.get('input[type="text"]').eq(4).blur()
        cy.get('input[type="text"]').eq(4).trigger("mouseover")
        cy.get("#tooltip-5").should('contain.text',"Address is required")
    })

    it("Password blank",function(){
        cy.get('input[type="password"]').eq(0).focus()
        cy.get('input[type="password"]').eq(0).blur()
        cy.get('input[type="password"]').eq(0).trigger("mouseover")
        cy.get("#tooltip-6").should('contain.text',"Password is required")
    })

    it("Password blank",function(){
        cy.get('input[type="password"]').eq(1).focus()
        cy.get('input[type="password"]').eq(1).blur()
        cy.get('input[type="password"]').eq(1).trigger("mouseover")
        cy.get("#tooltip-7").should('contain.text',"Please re-enter password")
    })

    it("checkbox",function(){
        cy.get('#customCheck').check({force: true})
        cy.get('#customCheck').should('be.checked')
        //cy.get('input[type=checkbox]').eq(1).trigger("mouseover")
        
    })

    it("password and confirm passworn mismatch",function(){
        cy.get('input[type="password"]').eq(0).type("123456")
        cy.get('input[type="password"]').eq(1).type("1234567")
        cy.get('input[type="password"]').eq(1).blur()
        cy.get('input[type="password"]').eq(1).trigger("mouseover")
        cy.get("#tooltip-7").should('contain.text',"Password does not match")
    })

    it("enter all details valid but password mismatch",function(){
        cy.get('select.form-control').select("Home Owner")
        cy.get('input[type="email"]').type("HomeOwner@mailinator.com")
        cy.get('input[type="text"]').first().type("test")
        cy.get('input[type="text"]').eq(1).type("test")
        cy.get('input[placeholder="Phone Number"]').type("1111111111")
        cy.get('input[type="text"]').eq(3).type("78733")
        cy.get('input[type="text"]').eq(4).type("test")
        cy.get('#customCheck').check({force: true})
        cy.get('input[type="password"]').eq(0).type("123456")
        cy.get('input[type="password"]').eq(1).type("1234567{enter}")
    })

    it("enter all details and email already exist",function(){
        cy.get('select.form-control').select("Home Owner")
        cy.get('input[type="email"]').type("Home2@mailinator.com")
        cy.get('input[type="text"]').first().type("test")
        cy.get('input[type="text"]').eq(1).type("test")
        cy.get('input[placeholder="Phone Number"]').type("1111111111")
        cy.get('input[type="text"]').eq(3).type("78733")
        cy.get('input[type="text"]').eq(4).type("test")
        cy.get('#customCheck').check({force: true})
        cy.get('input[type="password"]').eq(0).type("123456")
        cy.get('input[type="password"]').eq(1).type("123456")
        cy.wait(2000)
        cy.get('button[type="submit"]').click()
        cy.get('#swal2-content').should('contain.text',"Email is already exist")
        
     })

   it("enter all details",function(){
        const email = "HomeOwner"
        const random_num = Math.round(Math.random()*1000)
        const ran_email=email+random_num
        cy.get('select.form-control').select("Home Owner")
        cy.get('input[type="email"]').type(ran_email+"@mailinator.com")
        cy.get('input[type="text"]').first().type("test")
        cy.get('input[type="text"]').eq(1).type("test")
        cy.get('input[placeholder="Phone Number"]').type("7415486553")
        cy.get('input[type="text"]').eq(3).type("78733")
        cy.get('input[type="text"]').eq(4).type("test")
        cy.get('#customCheck').check({force: true})
        cy.get('input[type="password"]').eq(0).type("123456")
        cy.get('input[type="password"]').eq(1).type("123456")
        cy.wait(2000)
        const ran_email1=email+random_num;
        cy.writeFile("cypress/fixtures/HomeOwner.JSON", { email: ran_email} )
        cy.get('button[type="submit"]').click()
        cy.get('#swal2-content').should('contain.text',"Activation link sent to your mailbox, Open your email and click the link to activate your account")
        
    })

    


})