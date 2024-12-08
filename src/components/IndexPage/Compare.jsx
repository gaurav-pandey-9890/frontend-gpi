import React, { useEffect, useState } from 'react';
import Chart from 'react-google-charts';

const Compare = (comparisonCountries) => {
  const country1 = comparisonCountries.countries[0][0];
  const country2 = comparisonCountries.countries[0][1];
  console.log(country1, country2);

  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const encodedCountry1 = encodeURIComponent(country1);
        const encodedCountry2 = encodeURIComponent(country2);

        // Fetch data for both countries
        const response1 = await fetch(`https://gpi-server.onrender.com/api/countries/${encodedCountry1}`);
        const response2 = await fetch(`https://gpi-server.onrender.com/api/countries/${encodedCountry2}`);

        const [countryData1, countryData2] = await Promise.all([response1.json(), response2.json()]);


        // Prepare data for the chart (add more indicators as needed)
        const chartData = [
          ['Indicator', country1, country2],
          ['Climate', countryData1['Climate'], countryData2['Climate']],
          ['Corruption', countryData1['Corruption'], countryData2['Corruption']],
          ['Democracy', countryData1['Democracy'], countryData2['Democracy']],
          ['Ease of doing Business', countryData1['Ease of doing Business'], countryData2['Ease of doing Business']],
          ['Fire Power', countryData1['Fire Power'], countryData2['Fire Power']],
          ['GDP', countryData1['GDP'], countryData2['GDP']],
          ['Diplomacy', countryData1['Diplomacy'], countryData2['Diplomacy']],
          ['Gender Gap', countryData1['Gender Gap'], countryData2['Gender Gap']],
          ['Health & Security', countryData1['Health & Security'], countryData2['Health & Security']],
          ['Hunger', countryData1['Hunger'], countryData2['Hunger']],
          ['Terrsiom', countryData1['Terrsiom'], countryData2['Terrsiom']],
          ['Human Dev', countryData1['Human Dev'][''], countryData2['Human Dev']['']],
          ['Freedom', countryData1['Freedom'], countryData2['Freedom']],
          ['GDP per Capita', countryData1['GDP per Capita'], countryData2['GDP per Capita']],
          ['Peace', countryData1['Peace'], countryData2['Peace']],
          ['Samrt City', countryData1['Samrt City'], countryData2['Samrt City']],
          ['Talent', countryData1['Talent'], countryData2['Talent']],
          ['Tourism', countryData1['Tourism'], countryData2['Tourism']],
          ['Happiness', countryData1['Happiness'], countryData2['Happiness']],
          ['Press Freedom', countryData1['Press Freedom'], countryData2['Press Freedom']]
        ];
        setChartData(chartData);
        // console.log(chartData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (country1 && country2) {
      fetchData();
    }
  }, [country1, country2]);

  return (
    <div className='adjust-width' >
      <h2 className='text-center text-2xl'>Comparing {country1} and {country2}</h2>
      {chartData.length > 0 ? (
        <Chart
          width={'100%'}
          height={'400px'}
          chartType="LineChart"
          loader={<div>Loading Chart...</div>}
          data={chartData}
          options={{
            title: 'Comparison of Prosperity Indicators',
            chartArea: { width: '80%' },
            hAxis: { title: 'Indicator', textStyle: { fontSize: 15 } },
            vAxis: { title: 'Value', minValue: 0 },
            legend: { position: 'right' }, // Show legend for comparison
            pointSize: 5,
            curveType: 'function',
            animation: {
              startup: true,
              duration: 1000,
              easing: 'inAndOut',
            },
          }}
        />
      ) : (
        <div>Loading comparison data...</div>
      )}
    </div>
  );
}

export default Compare