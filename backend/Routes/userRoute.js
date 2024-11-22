const express = require('express')
const router = express.Router()
const { Client } = require('pg');

let client = null;
const ipAddressCount = new Map()
const threshold = 7;

function sleepSync(milliseconds) {
    const sharedBuffer = new SharedArrayBuffer(4);
    const int32Array = new Int32Array(sharedBuffer);

    Atomics.wait(int32Array, 0, 0, milliseconds);
}

router.post('/signup', async (req, res) => {
    const clientIp = req.ip;
    if (ipAddressCount.has(clientIp)) {
        ipAddressCount[clientIp] = ipAddressCount.get(clientIp) + 1;
    } else {
        ipAddressCount[clientIp] = 1;
    }

    if (ipAddressCount[clientIp] > threshold) {
        // setInterval(() => {}, 3000); // delay response by 3 secs
        // timer which sync
        sleepSync(3000); // Waits for 3 seconds
    }
    const { name, email, password } = req.body;
    try {
        client = new Client({
            user: `${process.env.DB_USER}`,
            host: `${process.env.DB_HOST}`,
            database: `${process.env.DB_DATABASE}`,
            port: `${process.env.DB_PORT}`,
            password: `${process.env.DB_PASSWORD}`
        })

        await client.connect()
        let query = `
            insert into client (name, email, password)
            values ($1, $2, $3);
        `
        let values = [name, email, password];
        await client.query(query, values);
        res.status(201).send({
            success: true,
            message: `User created succesfully`
        })
    }
    catch (err) {
        console.error('Error executing query:', err.message)
        res.status(500).send({
            success: false,
            message: `Database connnection failed! due to ${err.message}`
        })
    }
    finally {
        await client.end()
        console.log("PostgreSQL connection closed.");
    }
})

router.post('/login', async (req, res) => {
    const clientIp = req.ip;
    if (ipAddressCount.has(clientIp)) {
        ipAddressCount[clientIp] = ipAddressCount.get(clientIp) + 1;
    } else {
        ipAddressCount[clientIp] = 1;
    }

    if (ipAddressCount[clientIp] > threshold) {
        sleepSync(3000); // Waits for 3 seconds
    }
    const { email, password } = req.body;
    try {
        client = new Client({
            user: process.env.DB_USER,
            host: process.env.DB_HOST,
            database: process.env.DB_DATABASE,
            port: process.env.DB_PORT,
            password: process.env.DB_PASSWORD
        });

        await client.connect();
        const query = `SELECT id FROM client WHERE email = $1 AND password = $2;`;
        const values = [email, password];
        const result = await client.query(query, values);

        if (result.rows.length > 0) {
            res.status(200).send({
                success: true,
                user_id: result.rows[0].id,
                message: 'User logged in successfully'
            });
        } else {
            res.status(200).send({
                success: false,
                message: 'Invalid credentials'
            });
        }
    } catch (err) {
        console.error('Error executing query:', err.message);
        res.status(500).send({
            success: false,
            message: `Database connection failed due to ${err.message}`
        });
    } finally {
        await client.end();
        console.log("PostgreSQL connection closed.");
    }
});

router.delete('/delete-user/:user_id', async (req, res) => {
    const clientIp = req.ip;
    if (ipAddressCount.has(clientIp)) {
        ipAddressCount[clientIp] = ipAddressCount.get(clientIp) + 1;
    } else {
        ipAddressCount[clientIp] = 1;
    }

    if (ipAddressCount[clientIp] > threshold) {
        sleepSync(3000); // Waits for 3 seconds
    }
    const { user_id } = req.params
    console.log(user_id)
    try {
        client = new Client({
            user: process.env.DB_USER,
            host: process.env.DB_HOST,
            database: process.env.DB_DATABASE,
            port: process.env.DB_PORT,
            password: process.env.DB_PASSWORD
        });

        await client.connect();

        // Delete user query
        const query = `DELETE FROM client WHERE id = $1;`;
        const values = [user_id];

        // Perform deletion query
        await client.query(query, values);

        res.status(200).send({
            success: true,
            message: 'User deleted successfully',
            user_id: user_id
        });
    } catch (err) {
        console.error('Error executing query:', err.message);
        res.status(500).send({
            success: false,
            message: `Database connection failed due to ${err.message}`
        });
    } finally {
        await client.end();
        console.log("PostgreSQL connection closed.");
    }
});



module.exports = router