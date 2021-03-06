import Document, { Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx)
        return { ...initialProps }
    }
    render() {
        return (
            <html className="has-navbar-fixed-top">
                <Head>
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <meta charSet="utf-8" />
                    <link rel="stylesheet" href="/static/bulma.css" />
                    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.1/css/all.css" integrity="sha384-gfdkjb5BdAXd+lj+gudLWI+BXq4IuLW5IT+brZEZsLFm++aCMlF1V92rMkPaX4PP" crossOrigin="anonymous" />
                    <link href="https://fonts.googleapis.com/css?family=Baloo+Bhaijaan" rel="stylesheet" />
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/3.0.1/github-markdown.css" />
                    <link rel="apple-touch-icon" sizes="180x180" href="/static/favicon/apple-touch-icon.png?v=XBJ2XjpJRW" />
                    <link rel="icon" type="image/png" sizes="32x32" href="/static/favicon/favicon-32x32.png?v=XBJ2XjpJRW" />
                    <link rel="icon" type="image/png" sizes="16x16" href="/static/favicon/favicon-16x16.png?v=XBJ2XjpJRW" />
                    <link rel="manifest" href="/static/favicon/site.webmanifest?v=XBJ2XjpJRW" />
                    <link rel="mask-icon" href="/static/favicon/safari-pinned-tab.svg?v=XBJ2XjpJRW" color="#5bbad5" />
                    <link rel="shortcut icon" href="/static/favicon/favicon.ico?v=XBJ2XjpJRW" />
                    <meta name="msapplication-TileColor" content="#da532c" />
                    <meta name="theme-color" content="#ffffff" />
                </Head>
                <title>Blog</title>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </html>
        )
    }
}