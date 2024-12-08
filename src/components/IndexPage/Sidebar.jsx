import React, { useState, useEffect } from 'react';

const Sidebar = ({ onCountrySelect }) => {
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await fetch('https://gpi-server.onrender.com/api/countries');
                if (!response.ok) {
                    throw new Error('Failed to fetch countries');
                }
                const data = await response.json();
                setCountries(data);
            } catch (error) { 
                console.error(error);
                // Handle errors (e.g., display an error message)
            }
        };
        fetchCountries();
    }, []); // Empty dependency array ensures this runs once on mount

    function search() {
        let input = document.getElementById('simple-search').value
        input = input.toLowerCase();
        let x = document.getElementsByClassName('country');
      
        for (var i = 0; i < x.length; i++) {
          if (!x[i].innerHTML.toLowerCase().includes(input)) {
            x[i].style.display = "none";
          }
          else {
            x[i].style.display = "list-item";
          }
        }

        console.log(x);
        
      }

    return (
        <aside id="logo-sidebar" className=" fixed top-0 left-0 z-40 w-64 h-screen sm:pt-20 pt-28 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700" aria-label="Sidebar">
            <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
                <ul className="space-y-2 font-medium">
                    <li>

                        <form action='#' class="flex items-center max-w-sm mx-auto">
                            <label for="simple-search" class="sr-only">Search</label>
                            <div class="relative w-full">
                                <input type="text" onKeyUp={search} id="simple-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search countries name..." required />
                            </div>
                            <button type="submit" class="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                                <span class="sr-only">Search</span>
                            </button>
                        </form>

                    </li>

                    <li>
                        <button onClick={() => onCountrySelect(null)} className="bg-blue-500 flex width-full items-center p-2 text-gray-900 rounded-lg dark:text-white dark:hover:bg-gray-700 group">
                            <span className="ms-3 text-white">World</span>
                        </button>
                    </li>
                    {countries.map((country) => (
                        country['Country name'] ? ( // Ternary operator for undefined check
                            <li key={country._id} className='country'>
                                <button onClick={() => onCountrySelect(country["Country name"])} href={country["country name"]} className="focus:bg-blue-500 focus:text-white flex width-full items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                    <span className="ms-3">{country["Country name"]}</span>
                                </button>
                            </li>
                        ) : null // Render nothing if undefined
                    ))}
                </ul>
            </div>
        </aside>
    )
}

export default Sidebar