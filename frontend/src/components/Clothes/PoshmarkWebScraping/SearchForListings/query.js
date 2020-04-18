'use strict';

const axios = require('axios').default;
const tough = require('tough-cookie');
const axiosCookieJarSupport = require('axios-cookiejar-support');
const qs = require('querystring')

axiosCookieJarSupport(axios);

export async function findListings(options) {
    const {cookieJar, proxy, query} = options;
    const reqOptions = {
        method: 'get',
        url: 'https://cors-anywhere.herokuapp.com/https://poshmark.com/search?query' + query,
        headers: {
            // 'Host': 'poshmark.com',
            'upgrade-insecure-requests': '1',
            // 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36',
            // 'sec-fetch-mode': 'navigate',
            // 'sec-fetch-user': '?1',
            // 'accept': '*/*',
            // 'sec-fetch-site': 'same-origin',
            'accept-language': 'en-US,en;q=0.9',
            'X-Requested-With': 'XMLHttpRequest',
        },
        jar: cookieJar,
        followAllRedirects: true,
        followRedirect: true,
        proxy,
        // resolveWithFullResponse: true
    };

    
    const res = await axios(reqOptions).catch(function (error) {
        if (error.response) {
            console.log(error.response.data)
            console.log(error.response.status)
            console.log(error.response.headers)
        }
    }).then(
        async function (response) {
            console.log(response.data)
        })
    return {};
};