// @ts-check

const createNextIntlPlugin = require('next-intl/plugin');
const nextIntlPlugin = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
}

module.exports = nextIntlPlugin(nextConfig)
