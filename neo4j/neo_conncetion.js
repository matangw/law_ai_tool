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
    await executeMultipleCommands(array[i]);
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

async function executeMultipleCommands(commands) {
  const session = driver.session();
  const tx = session.beginTransaction();

  try {
    for (let command of commands) {
      await tx.run(command);
    }
    await tx.commit();
    console.log(commands);
    console.log('All commands executed successfully');
  } catch (error) {
    await tx.rollback();
    console.error('Transaction failed:', error);
  } finally {
    await session.close();
  }
}
