import React, { useEffect, useState } from 'react'
import { initFlowbite } from 'flowbite';

const Modal = ({ onComparisonSubmit }) => {
    useEffect(() => {
        // Initialize Flowbite when component mounts
        initFlowbite();
    }, []);

    const getValues = (e) => {
        e.preventDefault();
        const firstCountry = document.getElementById('first').value;
        const secondCountry = document.getElementById('second').value;
        let x = document.getElementsByClassName('modal-value');

        for (var i = 0; i < x.length; i++) {
            if (x[i].innerText == firstCountry) {
                var firstSame = true;
                break;
            } else {
                firstSame = false;
            }
        }
        for (var i = 0; i < x.length; i++) {
            if (x[i].innerText == secondCountry) {
                var secondSame = true
                break;
            } else {
                secondSame = false
            }
        }
        if (firstSame && secondSame) {
            console.log("Continue, Succesfully!");
            onComparisonSubmit([firstCountry, secondCountry]);
        }
        if (!firstSame || !secondSame) {
            alert('Country Name Mismatched');
            document.getElementById('first').value = '';
            document.getElementById('second').value = '';
        }
        const modal = document.getElementById('modal');
        modal.setAttribute('class', 'hidden')
        document.getElementById('first').value = '';
        document.getElementById('second').value = '';
    }


    const modalview = () => {
        const modal = document.getElementById('modal');
        modal.removeAttribute('class', 'hidden')
    }

    function firstsearch() {
        let input = document.getElementById('first').value
        input = input.toLowerCase();
        let x = document.getElementsByClassName('modal-country');

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

    function secondsearch() {
        let input = document.getElementById('second').value
        input = input.toLowerCase();
        let x = document.getElementsByClassName('modal-country');

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

    const [isfirst, setisfirst] = useState(true)

    function onSelect(data, e) {
        if (document.getElementById('first').value == '' || document.getElementById('first').value != data && isfirst) {
            document.getElementById('first').value = data;
            setisfirst(false);
        }
        else {
            document.getElementById('second').value = data;
            setisfirst(true);
        }
        e.preventDefault();
    }

    return (
        <>
            {/* <!-- Modal toggle --> */}
            <button onClick={modalview} data-modal-target="crud-modal" data-modal-toggle="crud-modal" class="block text-white bg-gray-500 mx-2 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                Compare
            </button>

            {/* <!-- Main modal --> */}
            <div id='modal'>
                <div id="crud-modal" tabindex="-1" aria-hidden="true" className="fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full hidden">
                    <div className="relative p-4 w-full max-w-md max-h-full">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            {/* <!-- Modal header --> */}
                            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Select two Countries
                                </h3>
                                <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                    </svg>
                                    <span className="sr-only">Close</span>
                                </button>
                            </div>
                            {/* <!-- Modal body --> */}
                            <form onSubmit={getValues} className="p-4 md:p-5">
                                <div className="grid gap-4 mb-4 grid-cols-2">
                                    <div className="col-span-2">
                                        <label for="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Country</label>
                                        <input type="text" onKeyUp={firstsearch} name="name" id="first" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type First country name" required />
                                    </div>
                                    <div className="col-span-2">
                                        <label for="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Second Country</label>
                                        <input type="text" onKeyUp={secondsearch} name="name" id="second" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type Second country name" required />
                                    </div>
                                </div>

                                <div className='modal-select'>
                                    {countries.map((country) => (
                                        country['Country name'] ? ( // Ternary operator for undefined check
                                            <div className='modal-country m-2'>
                                                <button onClick={(e) => onSelect(country["Country name"], e)} className="p-2 bg-gray-100 hover:bg-gray-300 rounded-lg focus:bg-blue-500 focus:text-white flex width-full items-center text-gray-900  dark:text-white dark:hover:bg-gray-700 group">
                                                    <span className="ms-3 modal-value">{country["Country name"]}</span>
                                                </button>
                                            </div>
                                        ) : null // Render nothing if undefined
                                    ))}
                                </div>

                                <button type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    Compare
                                    <svg className="w-5 h-5 mx-2 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 12H5m14 0-4 4m4-4-4-4" />
                                    </svg>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Modal