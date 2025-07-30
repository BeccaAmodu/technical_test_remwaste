const genRandNo = (len = 10) => 
{ 
    let res = '';
    let chars = '123456789'
    let charLen = chars.length;

    for(var i = 0; i < len; i++)
        res += chars.charAt(Math.floor(Math.random() * charLen));
    
    return Number(res);
}

describe('Store Brand Creation Test', () => {

    // Base URL of the application under test (UAT environment)
    let baseUrl = "https://dmsfrontenduat.z6.web.core.windows.net/";
    let contactUrl = "https://dmsfrontenduat.z6.web.core.windows.net/contacts";
    // Valid phone number used for login
    let vPhone = "07035528282";
    // Valid password matching the valid phone number
    let vPassword = "07035528282"; 
    let email = "sample"+genRandNo(2)+"@yopmail.com"; 

    beforeEach(() => {
        cy.visit('https://dmsfrontenduat.z6.web.core.windows.net/')
        cy.get('#username').type(vPhone)
        cy.get('#password').type(vPassword)
        cy.get('.btn').click()
        cy.url().should('eq', baseUrl+'buy/brand')
    });

    it('Confirm user cannot create a new customer using invalid Name/Phone Number', () => {
        cy.get('.burger > .material-symbols-outlined').click()
        cy.get(':nth-child(2) > .sidebar-nav-item--link').click()
        cy.url().should("eq", contactUrl)
        cy.get('.btn').click()
        cy.wait(5000)
        cy.get('.app-modal-body-content').should("be.visible")
        // Using empty name
        cy.get(':nth-child(1) > div > .form__input').focus().type('{backspace}');
        cy.get('#email').type(email)
        cy.get('#phone').type('070'+genRandNo(8))
        cy.get(':nth-child(4) > div > .form__input').type("No. 20 sample street")

        cy.get('.select__input')
        .find('option').eq(5)
        .then(option => {
            const value = option.val();
            cy.get('.select__input').select(value);
        });

        cy.get(':nth-child(6) > [style="position: relative;"] > .select-wrapper > .select__input')
        .find('option').eq(5)
        .then(option => {
            const value = option.val();
            cy.get(':nth-child(6) > [style="position: relative;"] > .select-wrapper > .select__input').select(value);
        });

        cy.get('.form-buttons > .app-button > .btn').click()
        //check empty name 
        cy.contains("Please enter customer name").should("be.visible");
        cy.screenshot('customer-page(customer with invalid Name)');
        
        // Using empty email
        cy.get(':nth-child(1) > div > .form__input').focus().type('Rebecca Amodu');
        cy.get('#phone').clear()
        cy.get('.form-buttons > .app-button > .btn').click()
        //check empty name 
        cy.contains("Please enter customer number").should("be.visible");
        cy.screenshot('customer-page(customer with invalid Phone Number)');

    });

    it('Confirm user can create a new valid customer', () => {
        cy.get('.burger > .material-symbols-outlined').click()
        cy.get(':nth-child(2) > .sidebar-nav-item--link').click()
        cy.url().should("eq", contactUrl)
        cy.get('.btn').click()
        cy.wait(5000)
        cy.get('.app-modal-body-content').should("be.visible")
        cy.get(':nth-child(1) > div > .form__input').type("John Doe")
        cy.get('#email').type(email)
        cy.get('#phone').type('070'+genRandNo(8))
        cy.get(':nth-child(4) > div > .form__input').type("No. 20 sample street")

        cy.get('.select__input')
        .find('option').eq(5)
        .then(option => {
            const value = option.val();
            cy.get('.select__input').select(value);
        });

        cy.get(':nth-child(6) > [style="position: relative;"] > .select-wrapper > .select__input')
        .find('option').eq(5)
        .then(option => {
            const value = option.val();
            cy.get(':nth-child(6) > [style="position: relative;"] > .select-wrapper > .select__input').select(value);
        });

        cy.get('.form-buttons > .app-button > .btn').click()
        cy.wait(5000)
        cy.contains("successfully added as a new contact").should("be.visible");
        cy.screenshot('customer-page(create customer)');
    });

    it('Confirm user can update customer', () => {
         cy.get('.burger > .material-symbols-outlined').click()
        cy.get(':nth-child(2) > .sidebar-nav-item--link').click()
        cy.url().should("eq", contactUrl);
        cy.wait(10000)
        cy.get(':nth-child(1) > .bo-data-table-body-each-item-menu > .app-button > .btn').click()
        cy.get('.bo-submenu-body > :nth-child(1)').click()
        // clear email
        cy.get('#email').clear();
        cy.get(':nth-child(4) > div > .form__input').clear().type("10 new street name")
        cy.get('.form-buttons > .app-button > .btn').click();
        cy.screenshot('customer-page(invalid update without email)');
        cy.contains("The request field is required").should("be.visible");

        
        cy.get(':nth-child(1) > .bo-data-table-body-each-item-menu > .app-button > .btn').click();
        cy.get('.bo-submenu-body > :nth-child(1)').click();
        // clear email
        cy.get('#email').clear().type("newemail@yopmail.com");
        cy.get(':nth-child(4) > div > .form__input').clear().type("10 new street name");
        cy.get('.form-buttons > .app-button > .btn').click();
        cy.screenshot('customer-page(valid update)');
        cy.contains("successful").should("be.visible");
        
    });

    it('Confirm user can delete a customer', () => {
         cy.get('.burger > .material-symbols-outlined').click()
        cy.get(':nth-child(2) > .sidebar-nav-item--link').click()
        cy.url().should("eq", contactUrl);
        // cy.wait(10000)
        cy.get('.bo-data-table-body > :nth-child(1)').should('be.visible').click();
        cy.get(':nth-child(1) > .bo-data-table-body-each-item-menu > .app-button > .btn').click()
        
        cy.get('.bo-submenu-body > :nth-child(2)').click()
        cy.get('.app-modal-body-content').should("be.visible")
        cy.get(':nth-child(2) > .btn').click()
        cy.wait(1000)
        cy.contains('Customer has been successfully deleted').should("be.visible")
        cy.screenshot('customer-page(delete customer)');
        
    });


    it('Confirm user can search a customer', () => {
         cy.get('.burger > .material-symbols-outlined').click()
        cy.get(':nth-child(2) > .sidebar-nav-item--link').click()
        cy.url().should("eq", contactUrl);
        cy.get('.bo-data-table-body > :nth-child(1)').should('be.visible').click();
        cy.wait(5000)
        cy.get('.page-anim-enter-done').scrollIntoView() // Scrolls 'footer' into view
        cy.get('.table-top-input--textbox-input').should("be.visible").type("Johnathan Doe").type("{enter}")
        cy.wait(5000)
        cy.contains('No Customers found').should('be.visible');
        cy.screenshot('customer-page(serach customer)');
    });
    

    it('Confirm user can export data', () => {
         cy.get('.burger > .material-symbols-outlined').click()
        cy.get(':nth-child(2) > .sidebar-nav-item--link').click()
        cy.url().should("eq", contactUrl);
        cy.get('.bo-data-table-body > :nth-child(1)').should('be.visible').click();
        cy.wait(5000)
        cy.get('.page-anim-enter-done').scrollIntoView() // Scrolls 'footer' into view
        cy.get('.table-top-btn').should("be.visible").click()
        cy.wait(5000)
        cy.contains('Download Successful').should('be.visible');
        cy.screenshot('customer-page(export customers)');
    });

})