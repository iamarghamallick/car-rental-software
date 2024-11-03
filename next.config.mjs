/** @type {import('next').NextConfig} */

import nextPWA from "next-pwa";

const nextConfig = {};

const withPWA = nextPWA({
    dest: "public",
})(nextConfig);

export default withPWA;