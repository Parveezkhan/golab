const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres', 
  host: 'localhost',  
  database: 'golab',
  password: 'Khan@123', 
  port: 5432,                  
});

const enableUuidExtension = async () => {
  try {
    const client = await pool.connect();
    // Enable the uuid-ossp extension
    await client.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    console.log('uuid-ossp extension enabled successfully!');
    client.release();
  } catch (err) {
    console.error('Error enabling uuid-ossp extension:', err.message);
  } finally {
    await pool.end();
  }
};

enableUuidExtension();

// Function to create tables
const  createTables= async ()=> {
  const client = await pool.connect();

  try {
    // Create the 'users' table
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        email VARCHAR(50) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(255) DEFAULT user,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create the 'user_posts' table with foreign key reference to 'users'
    // await client.query(`
    //   CREATE TABLE IF NOT EXISTS user_posts (
    //     post_id SERIAL PRIMARY KEY,
    //     user_id INT REFERENCES users(id) ON DELETE CASCADE,
    //     post_content TEXT,
    //     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    //   );
    // `);

    console.log("Tables created successfully!");

  } catch (error) {
    console.error("Error creating tables:", error.message);
  } finally {
    // Always release the client, even if there's an error
    client.release();
  }
}

// Call the function to create the tables
createTables();

module.exports = createTables;
