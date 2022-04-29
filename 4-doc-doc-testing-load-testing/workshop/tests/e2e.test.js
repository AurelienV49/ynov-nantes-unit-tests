const CLIENT_URL = `http://localhost:5000/`;

Feature("Todo Client");

Scenario("Test Todo client Page", ({ I }) => {
  I.amOnPage(CLIENT_URL);
});

Scenario("Create todo", ({ I }) => {
  I.amOnPage(CLIENT_URL);

  I.fillField("#newTODO", "test");

  I.click("#create-todo");
});

Scenario("Create todo and complete it ", ({ I }) => {
  I.amOnPage(CLIENT_URL);

  I.fillField("#newTODO", "test complete");

  I.click("Create");

  I.wait(2);

  I.click("Done")
});