#!/usr/bin/env node

const got = require('got');

const checkhost = async (host) => {
  try {
    const response = await got.post('https://check-host.cc/rest/V3/info', {
      headers: {
        'authority': 'check-host.cc',
        'sec-ch-ua': '"Chromium";v="95", ";Not A Brand";v="99"',
        'accept': '*/*',
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'x-requested-with': 'XMLHttpRequest',
        'sec-ch-ua-mobile': '?1',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36',
        'sec-ch-ua-platform': '"Windows"',
        'origin': 'https://check-host.cc',
        'sec-fetch-site': 'same-origin',
        'sec-fetch-mode': 'cors',
        'sec-fetch-dest': 'empty',
        'referer': `https://check-host.cc/?m=INFO&target=${host}`,
        'accept-language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7',
        'cookie': 'lang=en'
      },
      form: {
        'target': host
      }
    });

    const data = JSON.parse(response.body);
    
    if (data.status === 'success') {
      return {
        ipAddress: data.ip,
        isp: data.isp,
        asn: data.asn,
        organization: data.org,
        country: data.country,
        region: data.region,
        timeZone: data.timezone,
        isProxy: data.is_proxy,
        author: '@RidwanzSaputra'
      };
    } else {
      return 'No results found!';
    }
  } catch (error) {
    return 'No results found!';
  }
};

module.exports = { checkhost };
