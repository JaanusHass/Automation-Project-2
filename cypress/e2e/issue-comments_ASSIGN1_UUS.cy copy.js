describe("Issue comments creating, editing and deleting", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.url()
      .should("eq", `${Cypress.env("baseUrl")}project/board`)
      .then((url) => {
        cy.visit(url + "/board");
        cy.contains("This is an issue of type: Task.").click();
      });
  });


  it('Should create a comment successfully', () => {

    createComment();
    editComment ();
    deleteComment();
    });

});


function createComment() {
  const getIssueDetailsModal = () =>
  cy.get('[data-testid="modal:issue-details"]');

  
  const comment = "TEST_COMMENT";

  getIssueDetailsModal().within(() => {
    cy.contains("Add a comment...").click();

    cy.get('textarea[placeholder="Add a comment..."]').type(comment);

    cy.contains("button", "Save").click().should("not.exist");

    cy.contains("Add a comment...").should("exist");
    cy.get('[data-testid="issue-comment"]').should("contain", comment);
  });
}

function editComment () {
  const getIssueDetailsModal = () =>
  cy.get('[data-testid="modal:issue-details"]');
  const previousComment = 'An old silent pond...';
  const comment = 'TEST_COMMENT_EDITED';

  getIssueDetailsModal().within(() => {
      cy.get('[data-testid="issue-comment"]')
          .last()
          .contains('Edit')
          .click()
          .should('not.exist');

      cy.get('textarea[placeholder="Add a comment..."]')
          .should('contain', previousComment)
          .clear()
          .type(comment);

      cy.contains('button', 'Save')
          .click()
          .should('not.exist');

      cy.get('[data-testid="issue-comment"]')
          .should('contain', 'Edit')
          .and('contain', comment);
  });
};

function deleteComment() {
  const getIssueDetailsModal = () =>
  cy.get('[data-testid="modal:issue-details"]');

  getIssueDetailsModal()
      .find('[data-testid="issue-comment"]')
      .contains('Delete')
      .click();

  cy.get('[data-testid="modal:confirm"]')
      .contains('button', 'Delete comment')
      .click()
      .should('not.exist');

  getIssueDetailsModal()
      .find('[data-testid="issue-comment"]')
      .should('not.exist');
};
 


