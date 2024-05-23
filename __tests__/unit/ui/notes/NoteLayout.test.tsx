import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import NoteLayout from "@/app/(ui)/notes/NoteLayout";
import { fakeNoteList } from "../../../__fixtures__/models/frontend/note";
describe("NoteLayout Component", () => {
  const mockNotes = fakeNoteList();

  const mockDeleteNote = jest.fn();

  beforeEach(() => {
    render(<NoteLayout notes={mockNotes} deleteNote={mockDeleteNote} />);
  });

  it("renders notes correctly", () => {
    mockNotes.forEach((note) => {
      expect(screen.getByText(note.title)).toBeInTheDocument();
    });
  });

  it("displays selected note details", () => {
    // By default, the first note should be selected
    expect(screen.getByText(mockNotes[0].description)).toBeInTheDocument();

    // Click on the second note
    fireEvent.click(screen.getByText(mockNotes[1].title));

    // Check if the second note's details are displayed
    expect(screen.getByText(mockNotes[1].description)).toBeInTheDocument();
  });

  //   it('calls deleteNote function with correct id when delete icon is clicked', () => {
  //     // Click on the delete icon of the first note
  //     fireEvent.click(screen.getByAltText('delete').closest('input'));

  //     // Check if deleteNote was called with the correct id
  //     expect(mockDeleteNote).toHaveBeenCalledWith(mockNotes[0].id);
  //   });
});
