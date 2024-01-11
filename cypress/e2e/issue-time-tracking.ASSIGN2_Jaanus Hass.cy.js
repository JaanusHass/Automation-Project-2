const getIssueDetailsModal = () =>
  cy.get('[data-testid="modal:issue-details"]');
const estTime = "10";
const editEstTime = "20";
const stopwatchIcon = '[data-testid="icon:stopwatch"]';
const getTimeTrackingModal = () => cy.get('[data-testid="modal:tracking"]');
const timeSpent = "2";
const timeRemaining = "5";

describe("Should add, edit, delete time estimation and tracking", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.url()
      .should("eq", `${Cypress.env("baseUrl")}project/board`)
      .then((url) => {
        cy.visit(url + "/board");
        cy.contains("Click on an issue to see what's behind it.").click();
      });
  });

  it("Should add, edit and delete time estimation", () => {
    getIssueDetailsModal().within(() => {
      cy.get('[placeholder="Number"]')
        .should("be.visible")
        .clear()
        .type(estTime);
      cy.get("div").contains(estTime).should("be.visible");
      cy.get('[placeholder="Number"]')
        .should("be.visible")
        .clear()
        .type(editEstTime);
      cy.get("div").contains(editEstTime).should("be.visible");
      cy.get('[placeholder="Number"]').should("be.visible").clear();
      cy.get("div").contains(editEstTime).should("not.exist");
    });
  });

  it("Should add and delete time tracking", () => {
    getIssueDetailsModal().within(() => {
      cy.get('[placeholder="Number"]')
        .should("be.visible")
        .clear()
        .type(estTime);
      cy.get("div").contains(estTime).should("be.visible");
    });

    cy.get(stopwatchIcon).should("be.visible").click();
    getTimeTrackingModal().within(() => {
      cy.contains("Time spent (hours)");
      cy.get('[placeholder="Number"][value="2"]').clear().type(timeSpent);
      cy.contains("Time remaining (hours)");
      cy.get('[placeholder="Number"][value=""]').type(timeRemaining);
      cy.contains("button", "Done").click();
    });

    cy.contains("div", "2h logged").should("be.visible");
    cy.contains("div", "5h remaining").should("be.visible");

    cy.get(stopwatchIcon).should("be.visible").click();
    getTimeTrackingModal().within(() => {
      cy.contains("Time spent (hours)");
      cy.get('[placeholder="Number"][value="2"]').clear();
      cy.contains("Time remaining (hours)");
      cy.get('[placeholder="Number"][value="5"]').clear();
      cy.contains("button", "Done").click();
    });

    cy.contains("div", "No time logged").should("be.visible");
    cy.contains("div", "5h remaining").should("not.exist");
  });
});
