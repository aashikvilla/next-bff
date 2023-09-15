import { UserBE } from "@/app/models/backend/userBE";
import { faker } from "@faker-js/faker";

export function createUserBE(): UserBE {
  return {
    address: {
      geolocation: {
        lat: faker.location.latitude().toString(),
        long: faker.location.longitude().toString(),
      },
      city: faker.location.city(),
      street: faker.location.street(),
      number: faker.number.int(),
      zipcode: faker.location.zipCode(),
    },
    id: faker.number.int(),
    email: faker.internet.email(),
    username: faker.internet.userName(),
    password: faker.internet.password(),
    name: {
      firstname: faker.person.firstName(),
      lastname: faker.person.lastName(),
    },
    phone: faker.phone.number(),
    __v: faker.number.int(),
  };
}

export function fakeUserBEList(count: number = 5): UserBE[] {
  return faker.helpers.multiple(createUserBE, {
    count: count,
  });
}
