import React, { useEffect, useState } from 'react'
import Chart from 'react-google-charts';


const Cta = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://gpi-server.onrender.com/api/countries');
        const allCountriesData = await response.json();
        // Find the selected country's data
        const countryData = allCountriesData.find(
          (country) => country['Country name'] === 'India'
        );
        // If country found, prepare data for the chart
        if (countryData) {
          const chartData = [
            ['Indicator', 'Value'],
            ['Climate', countryData['Climate']],
            ['Corruption', countryData['Corruption']],
            ['Democracy', countryData['Democracy']],
            ['Ease of doing Business', countryData['Ease of doing Business']],
            ['Fire Power', countryData['Fire Power']],
            ['GDP', countryData['GDP']],
            ['Diplomacy', countryData['Diplomacy']],
            ['Gender Gap', countryData['Gender Gap']],
            ['Health & Security', countryData['Health & Security']],
            ['Hunger', countryData['Hunger']],
            ['Terrsiom', countryData['Terrsiom']],
            ['Human Dev', countryData['Human Dev']['']], 
            ['Freedom', countryData['Freedom']],
            ['GDP per Capita', countryData['GDP per Capita']],
            ['Peace', countryData['Peace']],
            ['Samrt City', countryData['Samrt City']],
            ['Talent', countryData['Talent']],
            ['Tourism', countryData['Tourism']],
            ['Happiness', countryData['Happiness']],
            ['Press Freedom', countryData['Press Freedom']], 
          ];
          setChartData(chartData);
        } else {
          setChartData([]); // Clear chart data if no country selected yet
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Only fetch data when selectedCountry prop changes
    // Check if a country is selected
    fetchData();
  }, []); // Update effect when selectedCountry changes

  return (
    <section className="bg-white dark:bg-gray-900 mt-24">
      <div className="gap-8 items-center py-8 sm:px-4 mx-auto xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6">
        <div>
          <Chart
            width={'100%'}
            height={'400px'}
            chartType="LineChart" // Changed to LineChart
            loader={
              <div role="status">
                <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            }
            data={chartData}
            options={{
              title: 'Prosperity Indicators',
              chartArea: { width: '80%' },
              hAxis: { title: 'Indicator', textStyle: { fontSize: 10 } },
              vAxis: { title: 'Value', minValue: 0 },
              legend: { position: 'none' }, // You might want a legend for a line chart
              pointSize: 5, // Adjust point size as needed
              curveType: 'function', // Optional: Makes lines curved
              animation: {
                startup: true,       // Animate on startup
                duration: 1000,      // Duration of the animation in milliseconds
                easing: 'inAndOut',       // Easing function (options: 'linear', 'in', 'out', 'inAndOut')
              },
            }}
          />
          <h1 className='text-center font-bold text-2xl mt-4'>India</h1>
        </div>
        <div className="mt-4 md:mt-0">
          <h2 className="mb-4 text-4xl tracking-tight font-bold text-gray-900 dark:text-white">Explore Global Prosperity with Interactive Charts and Dynamic Visualizations</h2>
          <p className="mb-6 font-light text-gray-500 md:text-lg dark:text-gray-400">
          Explore global prosperity with interactive charts. Compare country rankings, track trends, and uncover correlations across categories like education and health. Dive into dynamic visualizations for a comprehensive view of how nations thrive.
            </p>
          <a href="/index" className="inline-flex items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900">
            Get started
            <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
          </a>
        </div>
      </div>
    </section>
  )
}

export default Cta