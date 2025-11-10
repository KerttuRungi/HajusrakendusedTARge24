const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const things = [
    { id: 1, name: 'plumbus', price: 34.59 },
    { id: 2, name: 'furby', price: 666 },
    { id: 3, name: 'portal gun', price: 2000 },
]

app.get('/things', (req, res) => {res.send(things)})

app.get('/things/:id', (req, res) => {
    if (typeof things[req.params.id - 1] === 'undefined') //=== strict equality, kontrollib et andme tüübid on õiged
    {
        return res.status(404).send({error: "Object not found. Check your id"})
    }
}
)


app.post('/things', (req, res) => {
    if(!req.body.name || !req.body.price) // isnt name or price
    {
        return res.status(400).send({error: "One or multible parameters missing"})
    }
    let newThing = {
        id: things.length + 1,
        name: req.body.name,
        price: req.body.price
    }
    things.push(newThing)
    res.status(201).location('localhost:8080/things/' + (newThing.length -1)).send(newThing)
})

app.delete('/things/:id', (req, res) => {
    if (typeof things[req.params.id - 1] === 'undefined') //=== strict equality, kontrollib et andme tüübid on õiged
    {
        return res.status(404).send({error: "Object not found. Check your id"})
    }
    things.splice(req.params.id - 1, 1)
    res.status(204).send({error: "No content"})
})

//completely update thing
app.put('/things/:id', (req, res) => {
    if (typeof things[req.params.id - 1] === 'undefined')
    {
        return res.status(404).send({error: "Object not found. Check your id"})
    }
    things[req.params.id - 1].name = req.body.name;
    things[req.params.id - 1].price = req.body.price;

    
    res.send(things[req.params.id - 1]);
})

app.listen(8080, () => {console.log('API is running at http://localhost:8080')})
    
