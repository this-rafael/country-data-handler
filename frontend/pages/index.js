import Link from 'next/link';
import axios from 'axios';
import { useState } from 'react';

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

  // Filtra os países com base no input (ignorando maiúsculas e minúsculas)
  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <h1 className="text-4xl font-bold text-center mb-5 text-gray-700">
        Countries
      </h1>

      {/* Campo de Busca */}
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
            {/* Ícone de Lupa */}
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

      {/* Grid de Países */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 justify-center">
        {filteredCountries.map((country) => (
          <Link
            key={country.code}
            href={{
              pathname: `/country/${country.code}`,
              query: { name: country.name, imageUrl: country.imageUrl },
            }}
          >
            <div className="bg-white rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200 cursor-pointer text-center p-4">
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
          </Link>
        ))}
      </div>
    </div>
  );
}
