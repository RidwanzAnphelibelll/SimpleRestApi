#!/usr/bin/env node

const express = require('express');
const router = express.Router();
const util = require('util');
const { tiktok, facebook, instagram, twitter, youtube, threads, capcut, pinterest, spotify, soundcloud } = require('../lib/scraper');
const { chatgpt } = require('../lib/chatgpt');
const { gemini } = require('../lib/gemini');
const { text2image } = require('../lib/text2image');
const { snackvideo } = require('../lib/snackvideo');

const isUrl = (url, regex) => {
  try {
    if (typeof url !== 'string') throw new Error('URL must be a string!');
    return regex.test(url);
  } catch (err) {
    console.log(util.format(err));
    return false;
  }
};

const message = {
  null_url: { status: false, message: "Input parameter 'url' is missing." },
  null_msg: { status: false, message: "Input parameter 'msg' is missing." },
  is_url: { status: false, message: 'Invalid URL provided!' }
};

const successResponse = (result) => ({
  status: true,
  result
});

const errorResponse = (message) => ({
  status: false,
  message
});

router.get('/tiktok', async (req, res) => {
  try {
    const url = req.query.url;
    if (!url) return res.json(errorResponse(message.null_url.message));
    if (!isUrl(url, /^https:\/\/.*tiktok\.com\/.+/)) return res.json(errorResponse(message.is_url.message));
    const result = await tiktok(url);
    res.status(200).json(successResponse(result));
  } catch (err) {
    res.status(500).json(errorResponse(err.message));
  }
});

router.get('/facebook', async (req, res) => {
  try {
    const url = req.query.url;
    if (!url) return res.json(errorResponse(message.null_url.message));
    if (!isUrl(url, /^https:\/\/(?:.*facebook\.com\/|fb\.watch\/).+/)) return res.json(errorResponse(message.is_url.message));
    const result = await facebook(url);
    res.status(200).json(successResponse(result));
  } catch (err) {
    res.status(500).json(errorResponse(err.message));
  }
});

router.get('/instagram', async (req, res) => {
  try {
    const url = req.query.url;
    if (!url) return res.json(errorResponse(message.null_url.message));
    if (!isUrl(url, /^https:\/\/.*instagram\.com\/.+/)) return res.json(errorResponse(message.is_url.message));
    const result = await instagram(url);
    res.status(200).json(successResponse(result));
  } catch (err) {
    res.status(500).json(errorResponse(err.message));
  }
});

router.get('/twitter', async (req, res) => {
  try {
    const url = req.query.url;
    if (!url) return res.json(errorResponse(message.null_url.message));
    if (!isUrl(url, /^https:\/\/(?:.*twitter\.com|x\.com)\/.+/)) return res.json(errorResponse(message.is_url.message));
    const result = await twitter(url);
    res.status(200).json(successResponse(result));
  } catch (err) {
    res.status(500).json(errorResponse(err.message));
  }
});

router.get('/youtube', async (req, res) => {
  try {
    const url = req.query.url;
    if (!url) return res.json(errorResponse(message.null_url.message));
    if (!isUrl(url, /^https:\/\/(?:.*youtube\.com|youtu\.be)\/.+/)) return res.json(errorResponse(message.is_url.message));
    const result = await youtube(url);
    res.status(200).json(successResponse(result));
  } catch (err) {
    res.status(500).json(errorResponse(err.message));
  }
});

router.get('/threads', async (req, res) => {
  try {
    const url = req.query.url;
    if (!url) return res.json(errorResponse(message.null_url.message));
    if (!isUrl(url, /^https:\/\/.*threads\.net\/.+/)) return res.json(errorResponse(message.is_url.message));
    const result = await threads(url);
    res.status(200).json(successResponse(result));
  } catch (err) {
    res.status(500).json(errorResponse(err.message));
  }
});

router.get('/capcut', async (req, res) => {
  try {
    const url = req.query.url;
    if (!url) return res.json(errorResponse(message.null_url.message));
    if (!isUrl(url, /^https:\/\/.*capcut\.com\/.+/)) return res.json(errorResponse(message.is_url.message));
    const result = await capcut(url);
    res.status(200).json(successResponse(result));
  } catch (err) {
    res.status(500).json(errorResponse(err.message));
  }
});

router.get('/snackvideo', async (req, res) => {
  try {
    const url = req.query.url;
    if (!url) return res.json(errorResponse(message.null_url.message));
    if (!isUrl(url, /^https:\/\/.*snackvideo\.com\/.+/)) return res.json(errorResponse(message.is_url.message));
    const result = await snackvideo(url);
    res.status(200).json(successResponse(result));
  } catch (err) {
    res.status(500).json(errorResponse(err.message));
  }
});

router.get('/pinterest', async (req, res) => {
  try {
    const url = req.query.url;
    if (!url) return res.json(errorResponse(message.null_url.message));
    if (!isUrl(url, /^https:\/\/(.*pinterest\.com|pin\.it)\/.+/)) return res.json(errorResponse(message.is_url.message));
    const result = await pinterest(url);
    res.status(200).json(successResponse(result));
  } catch (err) {
    res.status(500).json(errorResponse(err.message));
  }
});

router.get('/spotify', async (req, res) => {
  try {
    const url = req.query.url;
    if (!url) return res.json(errorResponse(message.null_url.message));
    if (!isUrl(url, /^https:\/\/open\.spotify\.com\/track\/.+/)) return res.json(errorResponse(message.is_url.message));
    const result = await spotify(url);
    res.status(200).json(successResponse(result));
  } catch (err) {
    res.status(500).json(errorResponse(err.message));
  }
});

router.get('/soundcloud', async (req, res) => {
  try {
    const url = req.query.url;
    if (!url) return res.json(errorResponse(message.null_url.message));
    if (!isUrl(url, /^https:\/\/.*soundcloud\.com\/.+/)) return res.json(errorResponse(message.is_url.message));
    const result = await soundcloud(url);
    res.status(200).json(successResponse(result));
  } catch (err) {
    res.status(500).json(errorResponse(err.message));
  }
});

router.get('/chatgpt', async (req, res) => {
  try {
    const msg = req.query.msg;
    if (!msg) return res.json(errorResponse(message.null_msg.message));
    const result = await chatgpt(msg);
    res.status(200).json(successResponse(result));
  } catch (err) {
    res.status(500).json(errorResponse(err.message));
  }
});

router.get('/gemini', async (req, res) => {
  try {
    const msg = req.query.msg;
    if (!msg) return res.json(errorResponse(message.null_msg.message));
    const result = await gemini(msg);
    res.status(200).json(successResponse(result));
  } catch (err) {
    res.status(500).json(errorResponse(err.message));
  }
});

router.get('/text2image', async (req, res) => {
  try {
    const msg = req.query.msg;
    if (!msg) return res.json(errorResponse(message.null_msg.message));
    const result = await text2image(msg);
    res.status(200).json(successResponse(result));
  } catch (err) {
    res.status(500).json(errorResponse(err.message));
  }
});

module.exports = router;
