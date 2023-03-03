import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
    return (
        <Html
            className="ScrollSnapContainer snap-y snap-mandatory h-screen bg-dark"
            lang="en"
        >
            <Head>
                <link
                    rel="apple-touch-icon"
                    sizes="180x180"
                    href="/apple-touch-icon.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="32x32"
                    href="/favicon-32x32.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="16x16"
                    href="/favicon-16x16.png"
                />
                <link rel="manifest" href="/site.webmanifest" />
                <link
                    rel="mask-icon"
                    href="/safari-pinned-tab.svg"
                    color="#3f7d20"
                />
                <meta name="msapplication-TileColor" content="#3f7d20" />
                <meta name="theme-color" content="#3f7d20" />
            </Head>
            <body>
                <Main />

                <NextScript />
            </body>
        </Html>
    );
}
