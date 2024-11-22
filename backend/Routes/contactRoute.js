const express = require("express")
const router = express.Router()
require('dotenv').config()
const { Client } = require("pg")

let client = null;
const ipAddressCount = new Map()
const threshold = 7;

function sleepSync(milliseconds) {
    const sharedBuffer = new SharedArrayBuffer(4);
    const int32Array = new Int32Array(sharedBuffer);

    Atomics.wait(int32Array, 0, 0, milliseconds);
}

// get all contacts of the particular user
router.get(`/contacts/:user_id`, async (req, res) => {
    const clientIp = req.ip;
    if (ipAddressCount.has(clientIp)) {
        ipAddressCount[clientIp] = ipAddressCount.get(clientIp) + 1;
    } else {
        ipAddressCount[clientIp] = 1;
    }

    if (ipAddressCount[clientIp] > threshold) {
        sleepSync(3000); // Waits for 3 seconds
    }
    const { user_id } = req.params;
    const { tuples } = req.query;
    try {
        client = new Client({
            user: `${process.env.DB_USER}`,
            host: `${process.env.DB_HOST}`,
            database: `${process.env.DB_DATABASE}`,
            password: `${process.env.DB_PASSWORD}`,
            port: `${process.env.DB_PORT}`
        })
        await client.connect()
        console.log("Connected to PostgreSQL!");

        const query = `select * from contacts where user_id = $1 limit $2`
        const values = [user_id, tuples];
        const result = await client.query(query, values)

        res.status(200).send({
            success: true,
            data: result.rows,
        });
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

// add the contact to the database
router.post(`/contacts`, async (req, res) => {
    const clientIp = req.ip;
    if (ipAddressCount.has(clientIp)) {
        ipAddressCount[clientIp] = ipAddressCount.get(clientIp) + 1;
    } else {
        ipAddressCount[clientIp] = 1;
    }

    if (ipAddressCount[clientIp] > threshold) {
        sleepSync(3000); // Waits for 3 seconds
    }
    const { user_id, first_name, last_name, email, phone, company, job } = req.body
    try {
        client = await new Client({
            user: `${process.env.DB_USER}`,
            host: `${process.env.DB_HOST}`,
            database: `${process.env.DB_DATABASE}`,
            password: `${process.env.DB_PASSWORD}`,
            port: `${process.env.DB_PORT}`
        })
        await client.connect()

        const query = `insert into contacts  (user_id, first_name, last_name, email, phone, company, job)
            Values ($1, $2, $3, $4, $5, $6, $7);`

        const values = [user_id, first_name, last_name, email, phone, company, job]
        await client.query(query, values)
        res.status(201).send({
            success: true,
            message: "Contact added successfully!",
        });
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

// update the contact in the database, I prefer 'patch'
router.put(`/contacts/:user_id`, async (req, res) => {
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
    const { contact_id, first_name, last_name, email, phone, company, job } = req.body;
    console.log(user_id, contact_id, first_name, last_name, email, phone, company, job);

    try {
        client = new Client({
            user: `${process.env.DB_USER}`,
            host: `${process.env.DB_HOST}`,
            database: `${process.env.DB_DATABASE}`,
            password: `${process.env.DB_PASSWORD}`,
            port: `${process.env.DB_PORT}`
        })
        await client.connect()
        console.log("Connected to PostgreSQL!");

        const query = `
            update contacts
            set first_name = coalesce($1, first_name),
                last_name = coalesce($2, last_name),
                email = coalesce($3, email),
                phone = coalesce($4, phone),
                company = coalesce($5, company),
                job = coalesce($6, job)
            where user_id = $7 and contact_id = $8
        `;
        const values = [first_name, last_name, email, phone, company, job, user_id, contact_id]
        await client.query(query, values)
        res.status(200).send({
            success: true,
            message: "Contact updated successfully!"
        });
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

// delete contact from database
router.delete(`/contacts/:contact_id`, async (req, res) => {
    const clientIp = req.ip;
    if (ipAddressCount.has(clientIp)) {
        ipAddressCount[clientIp] = ipAddressCount.get(clientIp) + 1;
    } else {
        ipAddressCount[clientIp] = 1;
    }

    if (ipAddressCount[clientIp] > threshold) {
        sleepSync(3000); // Waits for 3 seconds
    }
    const { contact_id } = req.params;
    console.log(contact_id)
    try {
        client = new Client({
            user: `${process.env.DB_USER}`,
            password: `${process.env.DB_PASSWORD}`,
            host: `${process.env.DB_HOST}`,
            database: `${process.env.DB_DATABASE}`,
            port: `${process.env.DB_PORT}`
        })
        await client.connect()
        console.log("Connected to PostgreSQL!");

        const query = `
            delete from contacts where contact_id = $1;
        `
        const values = [contact_id];
        await client.query(query, values)

        res.status(200).send({
            success: true,
            message: `contact deleted successfully`
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

module.exports = router;