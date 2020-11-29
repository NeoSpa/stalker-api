const axios = require('axios');
const filterEmails = require('../filters/emails');

async function googleScrapper(token, terms, start, callback) {
    return await axios.get(`https://api.goog.io/v1/search/q=%40"${terms}"&lang_pt&cr=BR&start=${start*10}`, {
        headers: {
            'apikey': token,
        }
    }).then(async (searchResults) => {
        const rawText = await searchResults.data.results.map(({ description }) => description).join();
        const filteredResult = filterEmails(await rawText, terms)

        callback(filteredResult);

    }).catch((e) => {        
        callback(['Error from GOOG.IO']);
    })
}

module.exports = googleScrapper;