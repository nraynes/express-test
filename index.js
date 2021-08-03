import express from 'express';
import fs from 'fs';
import bodyParser from 'body-parser';
const data = JSON.parse(fs.readFileSync('testData.json', 'utf-8'))

const app = express()
app.use(express.json())
const port = 3000

app.get('/:query', (req, res) => {
    let query = req.params.query
    let result = data.filter((item) => {
        if (item.name.toLowerCase().match(query.toLowerCase())) {
            return item;
        }
    })
    if (result) {
        res.send(result)
    } else {
        res.json('Error, object doesnt exist.')
    }
})

app.post('/post', (req, res) => {
    const dataPoint = req.body
    if (dataPoint.name && dataPoint.age && dataPoint.height) {
        data.push(dataPoint)
        fs.writeFileSync('testData.json', JSON.stringify(data))
        res.json('Successfully posted new data.')
    } else {
        res.json('Error: proper object not given.')
    }
})

app.delete('/delete', (req, res) => {
    const dataPoint = req.body
    if (dataPoint.name && dataPoint.age && dataPoint.height) {
        const result = data.filter((item) => {
            if (!(dataPoint.name === item.name && dataPoint.age === item.age && dataPoint.height === item.height)) {
                return item
            }
        })
        if (result.length !== data.length) {
            fs.writeFileSync('testData.json', JSON.stringify(result))
            res.json('Successfully deleted object!')
        } else {
            res.json('Error, could not delete.')
        }
    } else {
        res.json('Error, could not delete.')
    }
})

app.put('/put/:name', (req, res) => {
    const dataPoint = req.body
    const name = req.params.name
    if (dataPoint.name && dataPoint.age && dataPoint.height) {
        const theResult = [];
        data.filter((item) => {
            if (item.name.toLowerCase() === name.toLowerCase()) {
                theResult.push(dataPoint)
            } else {
                theResult.push(item)
            }
        })
        if (theResult.length === data.length) {
            fs.writeFileSync('testData.json', JSON.stringify(theResult))
            res.json('Successfully put object!')
        } else {
            res.json('Error, could not put console 1.')
        }
    } else {
        res.json('Error, could not put console 2.')
    }
})

app.listen(port, () => {console.log('Listening on port ' + port + '...')})