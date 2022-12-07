const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');

require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());






const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ogaj2ek.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

console.log('db connect ok');





async function run() {
    try {
        await client.connect();
        const serviceCollection = client.db('doctor_portals').collection('services');
        const bookingCollection = client.db('doctor_portals').collection('bookings');

        app.get('/service', async (req, res) => {
            const query = {}
            const cursor = serviceCollection.find(query);
            const services = await cursor.toArray();
            res.send(services);
        })

        app.post('/booking', async(req, res) => {
            const booking = req.body;
            const result = await bookingCollection.insertOne(booking);
            res.send(result);
        })
    }
    finally {
        // await client.close();
    }

}

run().catch(console.dir)



app.get('/', (req, res) => {
    res.send('doctor portals')
})

app.listen(port, () => {
    console.log('listening on port doctor_protals ', port);
})