/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ["qiita-user-contents.imgix.net", "avatars.githubusercontent.com"],
  },
}

module.exports = nextConfig
