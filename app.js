const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const app = express();
const port = 666;

function filterEmails(rawText, terms) {
    return rawText.match(/(3*[a-zA-Z0-9]+[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+)/gi).reduce((uniq, item) => {
        return uniq.includes(item) ? uniq : [...uniq, item]
    }, []).filter((email) => email.includes(terms));
}

app.get('/google', (req, res) => {
    const { terms, page } = req.query;
    axios.get('https://www.startpage.com/sp/search', {
        data: `query=%40%22${terms}%22&language=english&lui=english&cat=web&sc=vsucL4DHGoY810&abp=${page}`,
        timeout: 0,
        headers: {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:82.0) Gecko/20100101 Firefox/82.0',
            'Referrer': 'https://www.startpage.com/',
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    }).then((a) => {
        console.log('entrei garaio');
        const $ = cheerio.load(a.data);
        const rawText = $('.w-gl__result').find('p').text();
        console.log();
        res.send(a.data);
    })
    .catch((e) => {
        res.send(e);
    });
}).get('/googio', (req, res) => {
    axios.get('https://api.goog.io/v1/search/?q=ufmg', {
        headers: {
            'apikey': 'c63e0778-bc8e-410b-9ad9-70208fe9e5c0',
        }
    }).then((data) => {
        res.send(data)
    }) 
});



app.listen(port, () => {
    console.log('listening at:', port);
});