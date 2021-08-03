import fetch from 'node-fetch';

fetch('http://localhost:3000/put/jessica', {
        method: 'PUT',
        headers: {
            "content-type": "application/JSON"
        },
        body: JSON.stringify({
            name: 'Garry',
            age: 23,
            height: 68
        })
    })
        .then(data => data.json())
        .then(data => console.log(data))

fetch('http://localhost:3000/jessica')
    .then(data => data.json())
    .then(data => console.log(data))