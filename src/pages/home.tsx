export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="text-center max-w-xl">
        <h1 className="text-5xl font-bold mb-4">
          VYBE API
        </h1>

        <p className="text-gray-400 text-lg mb-8">
          Fast, reliable and powerful music API.
          <br />
          Built for developers.
        </p>

        <a
          href="https://t.me/VyomaOfficial"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
        >
          Connect to Telegram Channel →
        </a>

        <p className="text-gray-600 text-sm mt-8">
          © {new Date().getFullYear()} VYOMA
        </p>
      </div>
    </main>
  );
}
