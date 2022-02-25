const withPWA = require('next-pwa');

module.exports = withPWA({
  reactStrictMode: false,
  images: {
    domains: [
      'localhost'
      // 'https://caveman-is-just-a-nickname.s3.ap-southeast-1.amazonaws.com'
    ]
  },
  pwa: {
    dest: "public",
    register: false,
    skipWaiting: true,
    disable: process.env.NODE_ENV === 'development'
  }
})
