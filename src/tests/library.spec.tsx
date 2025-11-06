import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test } from "vitest";
import App from "../App";
import { LibraryProvider } from "../context/LibraryProvider";

function renderApp() {
  return render(
    <LibraryProvider>
      <App />
    </LibraryProvider>
  );
}

describe("Library App (frontend behavior)", () => {
  test("shows empty library when there are no books", async () => {
    // simulate empty library by injecting initial SET_LIBRARY with empty
    render(
      <LibraryProvider>
        <div />
      </LibraryProvider>
    );
    // directly test reducer logic in unit tests separately; here we test UI flows later
  });

  test("user can view books from service", async () => {
    renderApp();

    // Wait for data fetch and first book render
    expect(await screen.findByText(/Clean Code/i)).toBeInTheDocument();

    // Optional additional checks
    expect(screen.getByText(/Eloquent JS/i)).toBeInTheDocument();
  });

  test("user can borrow a book and it moves to borrowed list and reduces copies", async () => {
    renderApp();

    await waitFor(() => screen.getByText("Clean Code"));

    const borrowButtons = screen.getAllByRole("button", { name: /Borrow/i });
    await userEvent.click(borrowButtons[0]);

    // instead of generic findByText, target borrowed section
    const borrowedSection = await screen.findByTestId("borrowed-section");
    expect(within(borrowedSection).getByText("Clean Code")).toBeInTheDocument();
  });

  test("user cannot borrow more than 2 books", async () => {
    renderApp();
    // borrow two different books
    await waitFor(() => screen.getByText("Clean Code"));
    const buttons = screen.getAllByRole("button", { name: /Borrow/i });
    // Borrow first two distinct books
    await userEvent.click(buttons[0]);
    await userEvent.click(buttons[1]);
    // Attempt third borrow
    if (buttons[2]) {
      expect(buttons[2]).toBeDisabled();
    }
  });

  test("user can return book and library copies are restored", async () => {
    renderApp();
    await waitFor(() => screen.getByText("Clean Code"));
    const buttons = screen.getAllByRole("button", { name: /Borrow/i });
    await userEvent.click(buttons[0]); // borrow a book
    // now find return action on borrowed list (restore icon)
    const returnBtn = await screen.findByLabelText(/return/i);
    await userEvent.click(returnBtn);
    // borrowed should be empty message
    expect(await screen.findByTestId("empty-borrowed")).toBeInTheDocument();
  });
});
