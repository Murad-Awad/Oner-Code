'use strict';

const axios = require('axios').default;
const tough = require('tough-cookie');
const axiosCookieJarSupport = require('axios-cookiejar-support');
const qs = require('querystring')

axiosCookieJarSupport(axios);

export async function getLoginForm(options) {
    const { cookieJar, proxy} = options;
    const reqOptions = {
        method: 'get',
        url: 'https://cors-anywhere.herokuapp.com/https://poshmark.com/login',
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
    //Fetch login page
    var csrf_token = '';
    const res = await axios(reqOptions).catch(function (error) {
        if (error.response) {
            console.log(error.response.data)
            console.log(error.response.status)
            console.log(error.response.headers)
        }
    }).then(
        async function (response) {
            console.log(response.status)
            var data = response.data
            csrf_token = data.split("<input name=\"authenticity_token\" type=\"hidden\"")[1].split("\"")[1]
            console.log(csrf_token)
            var username = 'muradawad123'
            var password = 'Q8HKsr#;29Cwrq.'
            options.username = username
            options.password = password
            options.csrf_token = csrf_token
            await login(options)
        })
    return {};
};

async function login(options) {
    const {username, password, csrf_token, cookieJar, proxy} = options;
    var bodyFormData = new FormData()
    bodyFormData.set('utf8', '✓');
    bodyFormData.set('authenticity_token', csrf_token)
    bodyFormData.set('login_form[iobb]', '0400R9HVeoYv1gsNf94lis1ztshEYOhBj8SQ7zRJ4SEK/tx+B9YG489wN0OwfSCagD7D7TfUHMAsnWovNLzPeiz1ZT/KhUgGeNqKfeXqFvOptJMCR9CPCYy4rZqAy/hppwEew8TWskb/j+GHTKUkZ8zWbl1IO8WxD1KhlUJdMxXELpCCuJoygDKlC7I+vS3zO1UWKyNRXh0mw7Kb1x4cMpEKIrjEjVFMhgLyi4PvWoIpyZmpr5zlQx90s1eovP7W+WpQCv10TaNx+XTCCuhAF+nK4iMiTevMViH20NvrynWy255VPDYLihDankoqWDbHA4su0+1vm3fbD4qK1h4cJSnfq9p44epOMMp+GFyz7rPxCnebp2LSZxMJ1v4PMGP2n1DB/I4U7qpZySvz3wafI/WYHEsTCs2TKRSUB860/YtAXmzRhLqdI1qchaYiJ/+IO4wJwtQHr2DgT3vFL0ZMZD89ccVwqJz/hVFjCQf7ODMKeW667/JBeyQMMFOFvYIaMmeFtbnKy9GYuKBiDwK4w63kwk+N0eY/qPMOZmVQvykEh72ijxtZgW9inUsys+sxW8mW8sTzEDL+2GfZsbSyl9kH53ErNjRzWcwC2fgyBlx/WtSv+FYHxZZq1kBHbtl2L6+OonKBFCAZfXSVwAGEd3H4L4cSUXeYOkl1lRjImBsHORB/3YqO1O0mL5UZJulr5dhACXZjVj+Jpy+I6nUOK19VzsgH1DGeSyhahZfNQgu+lmSl2pKAmu1wluCISazs9PD83/seKcOlvXrGxhKauwqEWLxUN0sYF8r08f8uCcC0xODcb+CqMKE6vRAycxcd6MIIa/iQaeMcmL9MyPpjzYuuV+VhT2JQxvTdC24eZzo97tw16kQoiglK7BJDLfM/X8TvaSyxlUFCiGEdsE8OdwolivehTqT3rw1rR9l0dEJHzndNg+95/NceoRDAstLN4US59PE4fRZTRwzCQai4/k8/K9DvxPQAaf/XuwLLNTE9qpyxaB65ZZ/buP7X6YeXhzN9fkjts7WKgvCx7IOMJOdxzMU0Vvf86UUzKO2zaiU4m6UF+3NFh989+SkxBWl2Yi1qIcsKUUaU/4tCPjyZdN3GZa+XDi7xXTgSX/52jysotugFCE1XRfN+HZ21ET4rhaHYN4YbjEiJxk3o0NRac5lg3twTidneZ5Wedvp3EOKiSx6OC0ceqoTbyG/m3Zqxt3w1Bn6LxoWOnZu64rr07LwRGXZpyc7oQIV63xadNE2jqb6o3IAEdbB+xCyXZETvnwY6N5rHCU8VaPUfrgl04rDRwgcULeGga0xZp3puHYggsdCwqJCHqPeR7/FVqOKNf+iU/1mLSo6e6e5s4e0s0lweXnQ7kEa0Zs/sWeZx2zySPILoCG0auYlJcvDwK+XD/XFCwHbLI74+9xyVT31SgfbGSdk67Kxq8RDhVqGCijrCbPRH7DWazxrJwCoSVL5dvBa20nXfSmR84RDB28rakAK6LTFYZliFBpt99QbuNFWxRU34bgUQOrPrF13MubbjQ0iSY9NRbxKMT4vr3HEUXM75mPcCdXiIkz+nlrdzeNWV2gQ=')
    bodyFormData.set('login_form[username_email]', username)
    bodyFormData.set('login_form[password]', 'Q8HKsr#;29Cwrq.')
    // const reqOptions = {
    //     method: 'post',
    //     url: 'https://cors-anywhere.herokuapp.com/https://poshmark.com/login',
    //     data: bodyFormData,
    //     headers: {
    //         // 'Host': 'poshmark.com',
    //         'upgrade-insecure-requests': '1',
    //         // 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36',
    //         // 'sec-fetch-mode': 'navigate',
    //         // 'sec-fetch-user': '?1',
    //         // 'accept': '*/*',
    //         // 'sec-fetch-site': 'same-origin',
    //         'accept-language': 'en-US,en;q=0.9',
    //         'X-Requested-With': 'XMLHttpRequest',
    //         'content-type': 'application/x-www-form-urlencoded',
    //     },
    //     jar: cookieJar,
    //     followAllRedirects: true,
    //     followRedirect: true,
    //     proxy,
    //     // resolveWithFullResponse: true
    // };
    //     const res = await axios(reqOptions).catch(function (error) {
    //     if (error.response) {
    //         console.log(error.response.data)
    //         console.log(error.response.status)
    //         console.log(error.response.headers)
    //     }
    // }).then(
    //     function (response) {
    //         console.log(response.status)
    //         console.log(response.data)
    //         console.log('LOGGED IN WOOOOT')
    //     })
    var url = 'https://cors-anywhere.herokuapp.com/https://poshmark.com/login'


    const requestBody = {
      'utf8': '✓',
      'authenticity_token': csrf_token,
      'login_form[username_email]': username,
      'login_form[password]': password,
    }


    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
    axios.post(url, qs.stringify(requestBody), config).then(
        function (response) {
            console.log(response.status)
            console.log(response.data)
            console.log('LOGGED IN WOOOOT')
        })
};