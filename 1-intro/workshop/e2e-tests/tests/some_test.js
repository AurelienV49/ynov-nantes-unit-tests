Feature('Ynov Nantes');

Scenario('Test Ynov Nantes Land Page', ({ I }) => {
    I.amOnPage('https://www.ynov-nantes.com/');

    //click on the research button
    I.click({css: 'a.cta'});

    //write in the input field the word 'info'
    I.fillField({css: 'input.searchfield'}, 'info');

    //wait a little to see the results
    I.wait(5);
    
    //verify if we see "Bachelor Informatique" in the research results
    I.see("Bachelor Informatique")
});