const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const app = express();
const port = 666;
const { config } = require('dotenv');
const filterEmails = require('./filters/emails');

const env = config().parsed;

app.get('/google', (req, res) => {
    const { terms, num } = req.query;

    axios.get(`https://api.goog.io/v1/search/q=%40"${terms}"&lang_pt&cr=BR&num=${num}`, {
        headers: {
            'apikey': env.GOOGIO,
        }

    }).then(async (searchResults) => {
        const rawText = await searchResults.data.results.map(({ description }) => description).join();
        const filteredResult = filterEmails(await rawText, terms)

        res.send({
            results: filteredResult,
            count: filteredResult.length,
            error: false,
        });

    }).catch((e) => {        
        res.send({
            results: [],
            count: 0,
            error: true,
        });
    }) 
})



app.listen(port, () => {
    console.log('listening at:', port);
});