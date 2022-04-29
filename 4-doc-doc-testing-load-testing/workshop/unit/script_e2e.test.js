const CLIENT_URL = `/public/index.html`;

Feature("Client");

Scenario("Test client Page", ({ I }) => {
  I.amOnPage(CLIENT_URL);
});

Scenario("Create in database", ({ I }) => {
  I.amOnPage(CLIENT_URL);

  I.fillField("#newTODO", "test");

  I.click("#create-todo");
});

Scenario("Create in database and complete", ({ I }) => {
  I.amOnPage(CLIENT_URL);

  I.fillField("#newTODO", "test complete");

  I.click("Create");

  I.wait(2);

  I.click("Done")
});