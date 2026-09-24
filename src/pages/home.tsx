import { Hono } from 'hono'

export const Home = new Hono()

export const Meteors = ({ number }: { number: number }) => {
  return (
    <>
      {Array.from({ length: number || 20 }, (_, idx) => (
        <span
          key={idx}
          class="meteor absolute h-1 w-1 rotate-[215deg] animate-[meteorAnimation_3s_linear_infinite] rounded-[9999px] shadow-[0_0_0_1px_#ffffff10]"
          style={{
            top: 0,
            left: `${Math.floor(Math.random() * (400 - -400) + -400)}px`,
            animationDelay: `${Math.random() * (0.8 - 0.2) + 0.2}s`,
            animationDuration: `${Math.floor(Math.random() * (10 - 2) + 2)}s`
          }}
        />
      ))}
    </>
  )
}

Home.get('/', (c) => {
  const title = 'JioSaavn API'
  const description =
    'JioSaavn API is an unofficial wrapper written in TypeScript for jiosaavn.com providing programmatic access to a vast library of songs, albums, artists, playlists, and more.'

  return c.html(
    <html lang="en">
      <head>
        <title>JioSaavn API</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charset="utf-8" />
        <meta name="description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://saavn.dev/" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://saavn.dev/" />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
        <meta
          property="og:image"
          content="https://raw.githubusercontent.com/sumitkolhe/jiosaavn-api/main/assets/preview.jpg"
        />
        <meta
          property="twitter:image"
          content="https://raw.githubusercontent.com/sumitkolhe/jiosaavn-api/main/assets/preview.jpg"
        />
        <link
          rel="icon"
          type="image/x-icon"
          href="https://raw.githubusercontent.com/sumitkolhe/jiosaavn-api/main/assets/favicon.ico"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
        <script src="https://cdn.tailwindcss.com" />
        <style
          dangerouslySetInnerHTML={{
            __html: `
            * { font-family: 'Inter', sans-serif; } 
            @keyframes borderAnimation {
              0%, 100% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
            }
            @keyframes meteorAnimation {
              0% { transform: rotate(215deg) translateX(0); opacity: 1; }
              70% { opacity: 1; }
              100% { transform: rotate(215deg) translateX(-500px); opacity: 0; }
            }
            .meteor::before {
              content: '';
              position: absolute;
              top: 50%;
              transform: translateY(-50%);
              width: 50px;
              height: 1px;
              background: linear-gradient(90deg, #64748b, transparent);
            }
            .animate-meteor-effect {
              animation-name: meteorAnimation;
            }`
          }}
        />
      </head>
      <body class="mx-auto flex max-w-screen-lg flex-col bg-black md:min-h-screen">
        <main class="relative mx-auto my-auto flex flex-col space-y-8 overflow-x-hidden overflow-y-hidden px-4 pb-8 md:py-10">
          <Meteors number={15} />

          <div class="ml-6 flex flex-row items-center space-x-4">
            <svg class="h-8 w-8 shrink-0 sm:h-12 sm:w-12" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                fill="#ff7d78"
                d="M3.172 3.464C2 4.93 2 7.286 2 12c0 4.714 0 7.071 1.172 8.535C4.343 22 6.229 22 10 22h3.376A4.25 4.25 0 0 1 17 16.007V12.25a2.25 2.25 0 0 1 4.5 0a.75.75 0 0 0 .5.707V12c0-4.714 0-7.071-1.172-8.536C19.657 2 17.771 2 14 2h-4C6.229 2 4.343 2 3.172 3.464"
                opacity=".5"
              />
              <path
                fill="#ff7d78"
                fill-rule="evenodd"
                d="M8.25 12a3.75 3.75 0 1 1 7.5 0a3.75 3.75 0 0 1-7.5 0m11-.5a.75.75 0 0 1 .75.75a2.25 2.25 0 0 0 2.25 2.25a.75.75 0 0 1 0 1.5a3.734 3.734 0 0 1-2.25-.75v5a2.75 2.75 0 1 1-1.5-2.45v-5.55a.75.75 0 0 1 .75-.75m-.75 8.75a1.25 1.25 0 1 0-2.5 0a1.25 1.25 0 0 0 2.5 0"
                clip-rule="evenodd"
              />
            </svg>
            <p class="bg-gradient-to-r from-[#ff7d78] to-purple-600 bg-clip-text text-2xl leading-none font-bold text-transparent md:text-4xl">
              JioSaavn API
              <span class="ml-3 text-sm font-normal text-gray-500 uppercase sm:hidden">Unofficial</span>
            </p>
            <p class="hidden animate-[borderAnimation_3s_linear_infinite] rounded bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 bg-[length:400%_400%] p-1 sm:block">
              <span class="block rounded px-1.5 py-0.5 text-xs tracking-wider text-white uppercase">Unofficial</span>
            </p>
          </div>

          <div class="relative grid grid-flow-row grid-cols-1 gap-2 sm:grid-cols-4 sm:gap-0 lg:grid-cols-4 xl:grid-cols-8">
            <a class="hover:bg-opacity-5 rounded-lg p-4 duration-100 hover:bg-white sm:col-span-4 sm:p-8" href="/docs">
              <div class="flex flex-col">
                <span class="max-w-fit rounded bg-red-500/15 px-2 py-1 text-center text-xs font-bold tracking-wide text-red-500 uppercase">
                  Get Started
                </span>
                <span class="mt-2 text-lg font-bold text-neutral-200 sm:text-xl md:text-2xl">Explore the Docs</span>
                <div class="mt-2 text-neutral-500">
                  Check out the documentation to learn how to use the JioSaavn API.
                </div>
              </div>
            </a>

            <a
              target="_blank"
              rel="noopener noreferrer"
              class="hover:bg-opacity-5 rounded-lg p-4 duration-100 hover:bg-white sm:col-span-4 sm:p-8"
              href="https://github.com/sumitkolhe/jiosaavn-api"
            >
              <div class="flex flex-col">
                <span class="max-w-fit rounded bg-green-500/15 px-2 py-1 text-center text-xs font-bold tracking-wide text-green-500 uppercase">
                  Open Source
                </span>
                <span class="mt-2 text-lg font-bold text-neutral-200 sm:text-xl md:text-2xl">Open Source</span>
                <div class="mt-2 text-neutral-500">Saavn API is open-source. Check out the source code on github.</div>
              </div>
            </a>

            <a
              target="_blank"
              rel="noopener noreferrer"
              class="hover:bg-opacity-5 rounded-lg p-4 duration-100 hover:bg-white sm:col-span-4 sm:p-8"
              href="https://github.com/sumitkolhe/jiosaavn-api/issues"
            >
              <div class="flex flex-col">
                <span class="max-w-fit rounded bg-violet-500/15 px-2 py-1 text-center text-xs font-bold tracking-wide text-violet-500 uppercase">
                  Contribute
                </span>
                <span class="mt-2 text-lg font-bold text-neutral-200 sm:text-xl md:text-2xl">Get Involved</span>
                <div class="mt-2 text-neutral-500">
                  Encounter a bug or have a feature suggestion? Report it on GitHub or contribute by submitting a pull
                  request.
                </div>
              </div>
            </a>

            <div class="hover:bg-opacity-5 rounded-lg p-4 duration-100 hover:bg-white sm:col-span-4 sm:p-8">
              <div class="flex flex-col">
                <span class="max-w-fit rounded bg-blue-500/15 px-2 py-1 text-center text-xs font-bold tracking-wide text-blue-500 uppercase">
                  Contact
                </span>
                <span class="mt-2 text-lg font-bold text-neutral-200 sm:text-xl md:text-2xl">Sumit Kolhe</span>
                <div class="mt-2 text-neutral-500">
                  Have a question or need help? Reach out on{' '}
                  <a
                    href="https://github.com/sumitkolhe"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-indigo-500 hover:underline"
                  >
                    GitHub
                  </a>
                  ,{' '}
                  <a
                    href="https://twitter.com/thesumitkolhe"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-sky-500 hover:underline"
                  >
                    Twitter
                  </a>
                  , or{' '}
                  <a
                    href="https://t.me/sumitkolhe"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-pink-500 hover:underline"
                  >
                    Telegram.
                  </a>
                </div>
              </div>
            </div>
          </div>
        </main>
      </body>
    </html>
  )
})
