//const { beforeEach } = require("node:test");
// import formPage from '../pages/formPage'

Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
});

//test suite/scenerio
describe('First step', () => {
    beforeEach(() => {
        cy.visit('https://demoqa.com/automation-practice-form')
    })
    //Test case 01
    it('TC01-Happy case', () => {
        // formPage.typeName("Suong", "Huynh");

        cy.get('#firstName').type('Suong')
        cy.get('#lastName').type('Huynh')
        cy.get('#userEmail').type('suonghuynh2011@gmail.com')
        cy.get('#userNumber').type('0932117792')
        cy.get('#subjectsInput').type('Maths').type('{enter}')
        cy.get('#currentAddress').type('Ho Chi Minh city')

        // Select date from datepicker
        cy.get('#dateOfBirthInput').click()
        cy.get('.react-datepicker').should('be.visible')
        cy.get('.react-datepicker__month-select').select('6')
        cy.get('.react-datepicker__year-select').select('1992')
        cy.get('.react-datepicker__day--017').click()

        // Select State and City
        cy.get('#stateCity-wrapper > :nth-child(2)').click()
        cy.get('#react-select-3-option-0').click()
        cy.get('#stateCity-wrapper > :nth-child(3)').click()
        cy.get('#react-select-4-option-0').click()

        //Select Gender radio
        cy.get('#gender-radio-2').check({ force: true })

        // Select multiples checkboxes
        cy.get('#hobbies-checkbox-1').check({ force: true })
        cy.get('#hobbies-checkbox-2').check({ force: true })
        cy.get('#hobbies-checkbox-3').check({ force: true })

        // Upload image file
        cy.get('#uploadPicture').attachFile('..\\fixtures\\upload_image.jpg');

        //Click "Submit" button
        cy.contains('Submit').click({ force: true })
        cy.url().should('include', 'https://demoqa.com/automation-practice-form')
    })

    //Test case 02
    it('TC02-Unhappy case', () => {
        // When leave all the mandatory field blank, click "Submit" button => Border CSS of "Firstname", "Lastname", "Mobile", "Gender" fields display red. 
        cy.contains('Submit').click({ force: true })
        cy.get('#firstName').should('have.css', 'border-color', 'rgb(220, 53, 69)')
        cy.get('#lastName').should('have.css', 'border-color', 'rgb(220, 53, 69)')
        cy.get('#userNumber').should('have.css', 'border-color', 'rgb(220, 53, 69)')
        cy.get('#gender-radio-1').should('have.css', 'border-color', 'rgb(220, 53, 69)')// cypress always get the result is rgb(0,0,0)
        cy.get('#gender-radio-2').should('have.css', 'border-color', 'rgb(220, 53, 69)')// cypress always get the result is rgb(0,0,0)
        cy.get('#gender-radio-3').should('have.css', 'border-color', 'rgb(220, 53, 69)')// cypress always get the result is rgb(0,0,0)

        // Following is my test code to see why it always rgb(0,0,0) => it might be the problem of Cypress, cause the validation fail
        // cy.get('#gender-radio-1')
        //     .then($el => {
        //         const computedStyle = window.getComputedStyle($el[0])
        //         const borderColor = computedStyle.getPropertyValue('border-color')
        //         expect(borderColor).to.eq('rgb(220, 53, 69)')
        //     })

        // cy.get('#gender-radio-1')
        //     .then($el => {
        //         const color = $el.css('border-color')
        //         console.log(color)
        //         const rgb = color.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/)
        //         const r = parseInt(rgb[1])
        //         const g = parseInt(rgb[2])
        //         const b = parseInt(rgb[3])
        //         expect(r).to.eq(220)
        //         expect(g).to.eq(53)
        //         expect(b).to.eq(69)
        //     })

        // cy.get('#gender-radio-1')
        //     .should('have.class', 'is-invalid')
        //     .and('have.css', 'border-color', 'rgb(220, 53, 69)');
    })

    it('TC03-Invalid value', () => {
        //    Invalid Email
        cy.get('#userEmail').type('suonghuynhh')
        cy.contains('Submit').click({ force: true })
        cy.get('#userEmail').should('have.css', 'border-color', 'rgb(220, 53, 69)')

        // Invalid Mobile (11 digits) 
        cy.get('#userNumber').type('09321177923');
        cy.get('#userNumber').should('have.value', '0932117792');

        // Invalid Mobile (9 digits)
        cy.get('#userNumber').type('093211779')
        cy.contains('Submit').click({ force: true })//Expected result : border CSS display red, but Actual result : it display green
        cy.get('#userNumber').should('have.css', 'border-color', 'rgb(220, 53, 69)') // This might be the problem from Cypress when interact with web-page, cause the validation fail
    })
})
