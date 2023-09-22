import React from "react";
import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import NoteLayout from "@/app/(ui)/notes/NoteLayout";
import Notes from "@/app/(ui)/notes/page";
import { getNotes } from "@/app/(ui)/notes/noteService";
import { fakeNoteList } from "../../../__fixtures__/models/frontend/note";

// Mocking the noteService functions
jest.mock("./noteService", () => ({
  getNotes: jest.fn(),
  deleteNote: jest.fn(),
}));

// Mocking NoteLayout component
jest.mock("./NoteLayout", () => {
  return jest.fn(() => <div data-testid="mock-note-layout"></div>);
});

describe("Notes Component", () => {
  it("renders NoteLayout with notes and deleteNote", async () => {
    const mockNotes = fakeNoteList(10);

    // Mock the getNotes function to return the mockNotes
    (getNotes as jest.Mock).mockResolvedValue(mockNotes);

    let container;
    // await act(async () => {
    //   container = render(<Notes />);
    // });

    // Check if NoteLayout is rendered
    const noteLayout = screen.getByTestId("mock-note-layout");
    expect(noteLayout).toBeInTheDocument();

    // Check if NoteLayout was called with the correct props
    expect(NoteLayout).toHaveBeenCalledWith(
      { notes: mockNotes, deleteNote: expect.any(Function) },
      expect.anything()
    );
  });
});
