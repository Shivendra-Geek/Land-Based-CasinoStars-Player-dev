import path from 'path';

const isProd = process.env.NODE_ENV === 'production';

const internalHost = process.env.TAURI_DEV_HOST || 'localhost';
const isTauriBuild = process.env.TAURI_EXPORT === 'true';


/** @type {import('next').NextConfig} */
const nextConfig = {
    // output: 'export',
    ...(isTauriBuild ? { output: 'export' } : {}),
    assetPrefix: isProd ? undefined : `http://${internalHost}:3000`,
    images: {
        unoptimized: true,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
            },
        ],
    },
    experimental: {
        optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
    },
    sassOptions: {
        includePaths: [path.join(process.cwd(), 'styles')],
        prependData: `
            @import './src/styles/mixins.scss';
        `,
    },
    // async rewrites() {
    //     return [
    //         {
    //             source: '/',
    //             destination: `/${defaultLocale}`,
    //         },
    //         {
    //             source: `/:locale(${localePattern})/:path*`,
    //             destination: `/:locale/:path*`,
    //         },
    //         {
    //             source: '/:path*',
    //             destination: `/${defaultLocale}/:path*`,
    //         },
    //     ];
    // },
};

export default nextConfig;
