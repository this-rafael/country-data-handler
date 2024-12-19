import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import axios from 'axios';

export async function getServerSideProps(context) {
  const { code, name, imageUrl } = context.query;

  const populationResponse = await axios.get(`http://localhost:33333/population/${name}`);
  const populationData = populationResponse.data;

  const bordersResponse = await axios.get(`http://localhost:33333/borders/${code}`);
  const { borders } = bordersResponse.data;

  return {
    props: {
      code,
      name,
      imageUrl,
      populationData,
      borders,
    },
  };
}

const Chart = dynamic(() => import('../../components/ChartComponent'), { ssr: false });

export default function CountryPage({ code, name, imageUrl, populationData, borders }) {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white text-gray-800 flex flex-col">

      <div className="flex items-center justify-between p-4 border-b border-gray-200">

        <div className="flex-shrink-0">
          <button
            onClick={() => router.push('/')}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded text-white font-semibold text-lg shadow"
          >
            Home
          </button>
        </div>

        <div className="flex-grow text-center">
          <h1 className="text-4xl font-bold">
            {name ? name.toUpperCase() : 'País'} ({code})
          </h1>
        </div>
      </div>

      <div className="flex items-center justify-center p-8 border-b border-gray-200">
        {imageUrl && (
          <img
              width={1200}

            src={imageUrl}
            alt={name}

          />
        )}
      </div>

      <div className="flex flex-1">
        <div className="w-1/2 p-6 border-r border-gray-200 flex flex-col">
          <h2 className="text-2xl font-semibold mb-6 text-center">Borders</h2>
          <div className="grid grid-cols-2 gap-6">
            {borders.map((borderCountry, idx) => (
              <div
                key={idx}
                className="bg-gray-50 hover:bg-gray-100 transition-colors p-8 rounded shadow-lg text-center border border-gray-200 text-lg font-medium"
              >
                {borderCountry}
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 p-6 flex flex-col items-center justify-center">
          <div className="mt-auto mb-20 w-full">
            <Chart data={populationData} />
          </div>
        </div>
      </div>
    </div>
  );
}
