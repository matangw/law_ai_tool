const neo4j = require('neo4j-driver');
const dotenv = require('dotenv');

dotenv.config();

const username = process.env.NEO4J_USERNAME;
const password = process.env.NEO4J_PASSWORD;

const driver = neo4j.driver(
  'neo4j+s://b09e5710.databases.neo4j.io',
  neo4j.auth.basic(username, password)
);

console.log(username, password);

exports.addWithArray = async function addWithArray(array) {
  for (let i = 0; i < array.length; i++) {
    await addToDatabase(array[i]);
  }
};

async function addToDatabase(command) {
  try {
    const session = driver.session();
    console.log('Connected to Neo4j');
    const result = await session.run(command);
  } catch (err) {
    console.log(err);
  }
}

addToDatabase('CREATE (n:Person {name: "Alice"}) RETURN n');
