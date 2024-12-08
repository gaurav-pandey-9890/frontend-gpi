import React, { useEffect } from 'react';
import { initFlowbite } from 'flowbite';

const ChartType = ({ onchartTypeSubmit }) => {
    useEffect(() => {
        initFlowbite();
    }, []);

    const openModal = () => {
        const modal = document.getElementById('default-modal');
        if (modal) {
            modal.classList.remove('hidden');
        }
    };

    return (
        <>
            {/* Your existing button */}
            <button onClick={openModal} type="button" className="h-full w-full">
                <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v15a1 1 0 0 0 1 1h15M8 16l2.5-5.5 3 3L17.273 7 20 9.667" />
                </svg>
            </button>

            {/* Your existing modal structure */}
            <div id="default-modal" tabIndex="-1" aria-hidden="true" className="hidden fixed inset-0 overflow-y-auto overflow-x-hidden z-[1000] flex justify-center items-center">
                <div className="relative p-4 w-full max-w-2xl max-h-full modal-content">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        {/* Your existing modal content */}
                        <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                Chart Type
                            </h3>
                            <button onClick={() => document.getElementById('default-modal').classList.add('hidden')} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        {/* Your existing modal body */}
                        <div className="p-4 md:p-5 space-y-4">
                            <p className="text-base border-b leading-relaxed text-gray-500 dark:text-gray-400">
                                Select your chart Type from below options.
                            </p>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 justify-items-center">
                                {/* Your existing buttons */}
                                <button onClick={() => { 
                                    onchartTypeSubmit('ScatterChart');
                                    document.getElementById('default-modal').classList.add('hidden');
                                }} type="button" className="w-full py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-blue-700 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                                    Scatter Chart
                                </button>
                                <button onClick={() => { 
                                    onchartTypeSubmit('ColumnChart');
                                    document.getElementById('default-modal').classList.add('hidden');
                                }} type="button" className="w-full py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-blue-700 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                                    Column Chart
                                </button>
                                <button onClick={() => { 
                                    onchartTypeSubmit('LineChart');
                                    document.getElementById('default-modal').classList.add('hidden');
                                }} type="button" className="w-full py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-blue-700 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                                    Line Chart
                                </button>
                                <button onClick={() => { 
                                    onchartTypeSubmit('BarChart');
                                    document.getElementById('default-modal').classList.add('hidden');
                                }} type="button" className="w-full py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-blue-700 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                                    Bar Chart
                                </button>
                                <button onClick={() => { 
                                    onchartTypeSubmit('AreaChart');
                                    document.getElementById('default-modal').classList.add('hidden');
                                }} type="button" className="w-full py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-blue-700 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                                    Area Chart
                                </button>
                                <button onClick={() => { 
                                    onchartTypeSubmit('PieChart');
                                    document.getElementById('default-modal').classList.add('hidden');
                                }} type="button" className="w-full py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-blue-700 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                                    Pie Chart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 -z-10" 
                    onClick={() => document.getElementById('default-modal').classList.add('hidden')}
                ></div>
            </div>
        </>
    );
};

export default ChartType;