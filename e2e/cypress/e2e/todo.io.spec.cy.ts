import { v4 } from "uuid";

describe("Todo.io", () => {
    it(`Should present the user with a screen that asks them for a username.
        Should require a username before redirecting to the board`, () => {
        cy.visit("/");
        cy.getById("join_title").contains("Join the board!");
        cy.getById("join_username_input").should("be.visible");
        cy.getById("join_btn").should("be.visible");

        cy.getById("join_username_input").clear();
        cy.getById("join_btn").click();
        cy.getById("join_username_input").should("have.focus");

        cy.getById("join_username_input").type("test");
        cy.getById("join_btn").click();

        cy.url().should("include", "/board");
    });

    it(`Should display the board and allow the user to add a new todo.
        Should allow the user to complete an existing todo`, () => {
        // Join the board
        cy.visit("/");
        cy.getById("join_title").contains("Join the board!");
        cy.getById("join_username_input").should("be.visible");
        cy.getById("join_btn").should("be.visible");

        cy.getById("join_username_input").clear();
        cy.getById("join_btn").click();
        cy.getById("join_username_input").should("have.focus");

        cy.getById("join_username_input").type("TestUser");
        cy.getById("join_btn").click();

        cy.url().should("include", "/board");

        // Add a new todo
        const todoTitle = v4();
        cy.getById("board_canvas").click({ force: true });
        cy.getById("new_todo_form").should("be.visible");
        cy.getById("new_todo_title").type(todoTitle);
        cy.getById("new_todo_description").type("Test description");
        cy.getById("new_todo_create_button").click();

        // Complete an existing todo

        cy.getById(`todo_card_title-${todoTitle}`).contains(todoTitle);

        cy.getById(`todo_card_complete_button-${todoTitle}`).last().click();
        cy.get(`todo_card_title-${todoTitle}`).should("not.exist");
    });
});
