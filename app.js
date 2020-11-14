const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const app = express();
const port = 666;

function filterEmails(rawText, terms) {
    return rawText.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+)/gi).reduce((uniq, item) => {
        return uniq.includes(item) ? uniq : [...uniq, item]
    }, []).filter((email) => email.includes(terms));
}

app.get('/', (req, res) => {
    const { terms, page } = req.query;
    axios.get(`https://www.google.com.br/search?num=100&q=%40"${terms}"&start=${page * 10}`).then((a) => {
        const $ = cheerio.load(a.data);
        const rawText = $('.BNeawe').find('div').text();
        res.send(filterEmails(rawText, terms));
    })
    .catch((e) => {
        res.send('deu ruim');
    });
});

app.listen(port, () => {
    console.log('listening at:', port);
});