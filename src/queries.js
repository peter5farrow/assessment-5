import { Op, where } from "sequelize";
import { Animal, Human } from "./model.js";

// Get the human with the primary key 2
export const query1 = await Human.findByPk(2);

// Get the first animal whose species is "fish"
export const query2 = await Animal.findOne({
  where: {
    species: "fish",
  },
});

// Get all animals belonging to the human with primary key 5
export const query3 = await Animal.findAll({
  where: {
    human_id: 5,
  },
});

// Get all animals born in a year greater than (but not equal to) 2015.
export const query4 = await Animal.findAll({
  where: {
    birth_year: {
      [Op.gt]: 2015,
    },
  },
});

// Get all the humans with first names that start with "J"
export const query5 = await Human.findAll({
  where: {
    fname: {
      [Op.startsWith]: "J",
    },
  },
});

// Get all the animals who don't have a birth year
export const query6 = await Animal.findAll({
  where: {
    birth_year: {
      [Op.is]: null,
    },
  },
});

// Get all the animals with species "fish" OR "rabbit"
export const query7 = await Animal.findAll({
  where: {
    [Op.or]: [{ species: "fish" }, { species: "rabbit" }],
  },
});

// Get all the humans who DON'T have an email address that contains "gmail"
export const query8 = await Human.findAll({
  where: {
    [Op.not]: {
      email: {
        [Op.like]: "%gmail%",
      },
    },
  },
});

// Continue reading the instructions before you move on!

// Print a directory of humans and their animals
export async function printHumansAndAnimals() {
  const humansAndAnimals = await Human.findAll({
    attributes: ["fname", "lname"],
    include: [
      {
        model: Animal,
        attributes: ["name", "species"],
      },
    ],
    order: [["human_id", "ASC"]],
  });

  humansAndAnimals.forEach(({ fname, lname, animals }) => {
    console.log(`${fname} ${lname}`);
    animals.forEach(({ name, species }) => {
      console.log(`- ${name}, ${species}`);
    });
  });
}

// Return a Set containing the full names of all humans
// with animals of the given species.
export async function getHumansByAnimalSpecies(species) {
  const humans = new Set();

  const humansAndAnimals = await Human.findAll({
    attributes: ["fname", "lname"],
    include: [
      {
        model: Animal,
        attributes: ["species"],
      },
    ],
    order: [["human_id", "ASC"]],
  });

  humansAndAnimals.forEach(({ fname, lname, animals }) => {
    const humanName = fname + lname;

    animals.forEach((animal) => {
      if (species === animal.species) {
        humans.add(humanName);
        return;
      }
    });
  });
  return humans;
}
