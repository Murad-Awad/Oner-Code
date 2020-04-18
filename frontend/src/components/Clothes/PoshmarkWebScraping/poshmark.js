const axios = require('axios').default;
const axiosCookieJarSupport = require('axios-cookiejar-support').default;
const tough = require('tough-cookie');
const formatProxy = require('./utils/formatproxy');
import {Login} from './login/index'
import {findListings} from './SearchForListings/query'

export default class PoshmarkAPI {
    /**
     * 
     * @param {Object=} options
     * @param options.proxy - The proxy to make requests with
     * @param options.currency - The currency to make requests in 
     */
    constructor(options = {}){
        const { proxy, currency } = options;

        //Configure options
        this.currency = 'USD';
        this.cookieJar = new tough.CookieJar();
        this.cookieJar.setCookieSync('key=value; domain=poshmark.com', 'https://poshmark.com/login')
        this.loggedIn = false;

        this.currency = currency == undefined ? 'USD' : currency;
        this.proxy = proxy == undefined || proxy.trim() == '' ? undefined : formatProxy(proxy);
    };
    async login(options = {}){
        const { } = options;
        await Login({
            proxy: this.proxy,
            cookieJar: this.cookieJar
        });
    }
    async query (query) {
        await findListings({
            query: query,
            proxy: this.proxy,
            cookieJar: this.cookieJar,
        })
    }
};