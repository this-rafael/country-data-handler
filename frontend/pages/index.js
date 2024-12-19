import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export async function getServerSideProps() {
  const res = await axios.get('http://localhost:33333/countries');
  const countries = res.data;
  return {
    props: {
      countries,
    },
  };
}

export default function Home({ countries }) {
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Listener para eventos de navegação.
  // Quando a navegação completa, removemos o loading.
  React.useEffect(() => {
    const handleRouteChangeComplete = () => {
      setLoading(false);
    };

    router.events.on('routeChangeComplete', handleRouteChangeComplete);
    // Limpa o event listener ao desmontar o componente
    return () => {
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
    };
  }, [router.events]);

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-5 relative">
      {loading && (
        <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center z-50">
          {/* Aqui você pode colocar o loader da sua preferência, abaixo é um simples spinner */}
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
        </div>
      )}

      <h1 className="text-4xl font-bold text-center mb-5 text-gray-700">
        Countries
      </h1>

      <div className="flex justify-center mb-10">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search countries..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-3 pl-12 text-gray-700 bg-white rounded-full shadow-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
          />
          <div className="absolute left-4 top-3.5 text-gray-400">
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-4.35-4.35M9.5 17A7.5 7.5 0 109.5 2a7.5 7.5 0 000 15z"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 justify-center">
        {filteredCountries.map((country) => (
          <div
            key={country.code}
            onClick={() => {
              setLoading(true);
              router.push({
                pathname: `/country/${country.code}`,
                query: { name: country.name, imageUrl: country.imageUrl },
              });
            }}
            className="bg-white rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200 cursor-pointer text-center p-4"
          >
            <img
              src={country.imageUrl}
              alt={country.name}
              className="w-full h-24 object-cover rounded-t-md"
            />
            <div className="font-semibold uppercase text-gray-700 mt-3">
              {country.name}
            </div>
            <div className="text-gray-500 text-sm">{country.code}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
