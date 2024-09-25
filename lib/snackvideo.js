#!/usr/bin/env node

 const cheerio = require('cheerio');
 const fetch = require('node-fetch');

 const snackvideo = async (url) => {
 return new Promise(async (resolve, reject) => {
 try {
 const res = await fetch(url).then((v) => v.text());
 const $ = cheerio.load(res);
 const title = $('div.author-desc > span').children('span').eq(0).text().trim();
 const data = {
 title: title,
 thumbnail: $('div.video-box').find('a-video-player').parent().siblings('div.background-mask').children('img').attr('src'),
 video: $('div.video-box').find('a-video-player').attr('src'),
 author: '@RidwannzSaputra'
 };
 resolve(data);
 } catch (e) {
 reject(e);
 }
 });
 };
 
module.exports = { snackvideo };