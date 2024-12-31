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
        organization VARCHAR(255),
        role VARCHAR(255) DEFAULT user,
        status VARCHAR(255),
        created_by UUID ,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        lastActive TIMESTAMP,
         FOREIGN KEY (created_by) 
    REFERENCES users(id)
    ON DELETE SET NULL 
    ON UPDATE CASCADE
      );
    `);

    // Create the 'createLab' table with foreign key reference to 'users'
    await client.query(`
      CREATE TABLE IF NOT EXISTS createLab (
        lab_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        user_id UUID REFERENCES users(id) ON DELETE CASCADE,
        type TEXT,
        platform Text,
        provider  VARCHAR(255),
        cpu NUMERIC(5),
        ram NUMERIC(5),
        storage NUMERIC(5),
        instance VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    //create table 'aws_ec2'  for storing in the database
    await client.query(
    `CREATE TABLE IF NOT EXISTS aws_ec2 (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    instance_name VARCHAR(255),
    memory VARCHAR(50),
    vcpu VARCHAR(50),
    storage VARCHAR(50),
    network_performance VARCHAR(50),
    on_demand_windows_base_pricing VARCHAR(50),
    on_demand_ubuntu_pro_base_pricing VARCHAR(50),
    on_demand_suse_base_pricing VARCHAR(50),
    on_demand_rhel_base_pricing VARCHAR(50),
    on_demand_linux_base_pricing VARCHAR(50),
    service VARCHAR(50)
);
`
    )

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
