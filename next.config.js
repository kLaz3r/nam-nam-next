/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")({
    dest: "public",
});

const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "edamam-product-images.s3.amazonaws.com",
                pathname: "/*/*/*",
            },
            {
                protocol: "https",
                hostname: "www.edamam.com",
                pathname: "/*/*/*",
            },
        ],
    },
};

module.exports = withPWA(nextConfig);
