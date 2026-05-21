/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    BackendURL: process.env.BackendURL || '',
  },
};

module.exports = nextConfig;
