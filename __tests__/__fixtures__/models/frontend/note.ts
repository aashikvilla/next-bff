import { Note } from "@/app/models/frontend/note";
import { faker } from "@faker-js/faker";

export function createNote(): Note {
  return {
    id: faker.string.uuid(),
    title: faker.lorem.words(5),
    description: faker.lorem.sentence(),
    status: faker.string.sample({ min: 1, max: 5 }),
    priority: faker.string.sample({ min: 1, max: 5 }),
  };
}

export function fakeNoteList(count: number = 5): Note[] {
  return faker.helpers.multiple(createNote, {
    count: count,
  });
}
