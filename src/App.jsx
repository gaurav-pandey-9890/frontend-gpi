import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/IndexPage/Sidebar';
import Navbar from './components/IndexPage/Navbar';
import Charts from './components/IndexPage/Charts';
import World from './components/IndexPage/World';
import Compare from './components/IndexPage/Compare';
import Landing from './components/LandingPage/Landing';
import Features from './components/IndexPage/Features';

const App = () => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [comparisonCountries, setComparisonCountries] = useState([]);
  const [isCopmarison, setIsCopmarison] = useState(false)
  const [chartType, setchartType] = useState('LineChart');

  const handleCountryChange = (countryName) => {
    setSelectedCountry(countryName);
    setIsCopmarison(false);
  };

  const handleComparisonSubmit = (country1, country2) => {
    setComparisonCountries([country1, country2]);
    // console.log(comparisonCountries[0][0]);
    setIsCopmarison(true);
  };
  
  console.log(chartType);
  
  const handlechartType = (chart) =>{
    setchartType(chart);
  }

  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/index" element={
          <div>
            <Navbar onComparisonSubmit={handleComparisonSubmit} />
            <div className="flex flex-col md:flex-row">
              <Sidebar onCountrySelect={handleCountryChange} />
              <div className="flex-1">
                <section className='container'>
                  <div className='centered-element'>
                    {isCopmarison ? (
                      <Compare countries={comparisonCountries} chartType={chartType}/>
                    ) : selectedCountry ? (
                      <Charts selectedCountry={selectedCountry}  chartType={chartType}/>
                    ) : (
                      <World />
                    )}
                  </div>
                </section>
                <Features onchartTypeSubmit={handlechartType}/>
              </div>
            </div>
          </div>
        } />
      </Routes>
    </Router>
  )
}

export default App