const express = require('express');
const app = express();
const port = 666;
const { config } = require('dotenv');
const googleScrapper = require('./scrappers/google');

const env = config().parsed;

app.get('/google', async (req, res) => {
    const { terms, pages = 1 } = req.query;
    let results = [];

    for (let start = 1; start <= pages; start++) {
        await googleScrapper(env.GOOGIO, terms, start, (filteredResults) => {
            results = [...results, ...filteredResults];
        });
    }

    results = results.reduce((uniq, item) => {
        return uniq.includes(item) ? uniq : [...uniq, item]
    }, []);
    
    res.send({
        results,
        count: results.length,
    });
})



app.listen(port, () => {
    console.log('listening at:', port);
});