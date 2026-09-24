import { Hono } from 'hono'

export const Home = new Hono()

Home.get('/', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>VYBE API</title>

        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          body {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #000;
            color: #fff;
            font-family: Arial, sans-serif;
            text-align: center;
            padding: 20px;
          }

          .container {
            max-width: 600px;
          }

          h1 {
            font-size: 52px;
            margin-bottom: 20px;
            background: linear-gradient(90deg, #8b5cf6, #ec4899);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }

          p {
            color: #999;
            font-size: 18px;
            line-height: 1.6;
            margin-bottom: 30px;
          }

          a {
            display: inline-block;
            padding: 14px 25px;
            background: #fff;
            color: #000;
            text-decoration: none;
            border-radius: 8px;
            font-weight: bold;
            transition: 0.3s;
          }

          a:hover {
            background: #ddd;
          }

          footer {
            margin-top: 40px;
            color: #555;
            font-size: 14px;
          }
        </style>
      </head>

      <body>
        <div class="container">
          <h1>VYBE API</h1>

          <p>
            Fast, reliable and powerful music API.
            <br />
            Built for developers.
          </p>

          <a
            href="https://t.me/VyomaOfficial"
            target="_blank"
            rel="noopener noreferrer"
          >
            Connect to Telegram Channel →
          </a>

          <footer>
            © ${new Date().getFullYear()} VYOMA
          </footer>
        </div>
      </body>
    </html>
  `)
})
