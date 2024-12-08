import React, { useState, useRef, useEffect } from 'react'
import data from './data.json';
import Modal from './Modal';

const Navbar = ({ onComparisonSubmit }) => {
    const dt = data;
    const [messages, setMessages] = useState([]);
    const [isTyping, setIsTyping] = useState(false);
    const messageContainerRef = useRef(null);

    useEffect(() => {
        if (messageContainerRef.current) {
            messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
        }
    }, [messages]);

    const sendMessage = async (e) => {
        e.preventDefault();
        const input = document.getElementById('input');
        const message = input.value.trim();
        if (!message) return;

        setMessages(prev => [...prev, { text: message, sender: 'user' }]);
        setIsTyping(true);
        input.value = '';

        try {
            const response = await getGeminiResponse(message);
            setMessages(prev => [...prev, { text: response.Response, sender: 'bot' }]);
        } catch (error) {
            console.error('Error:', error);
            setMessages(prev => [...prev, { text: "Sorry, I couldn't process your request.", sender: 'bot' }]);
        } finally {
            setIsTyping(false);
        }
    }

    async function getGeminiResponse(prompt) {
        const apiKey = 'AIzaSyDdGTBy2nawSsj0q_4N8hyc5h0GrMBDd7s';
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;
       
        const data = {
            "contents": [
                {
                    "parts": [
                        {
                            "text": `consider is this json data ${JSON.stringify(dt)} and then answer for this question ${prompt} do not provide any code only answer in short to concise and remove extra useless words.`
                        }
                    ]
                }
            ]
        };

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const responseData = await response.json();

        console.log(responseData);
        

        if (responseData.candidates && responseData.candidates.length > 0 && responseData.candidates[0].content) {
            const textResponse = responseData.candidates[0].content;
            return { Response: textResponse.parts[0].text };
        } else {
            throw new Error("Unexpected response structure");
        }
    }

    return (
        <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <div className="px-3 py-3 lg:px-5 lg:pl-3">
                <div className="sm:flex items-center justify-between">
                    <div className="flex items-center justify-start rtl:justify-end">
                        <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                            <span className="sr-only">Open sidebar</span>
                            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                            </svg>
                        </button>
                        <a href="/" className="flex ms-2 md:me-24">
                            <svg class="w-[35px] h-[35px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-width="1.6" d="M4.37 7.657c2.063.528 2.396 2.806 3.202 3.87 1.07 1.413 2.075 1.228 3.192 2.644 1.805 2.289 1.312 5.705 1.312 6.705M20 15h-1a4 4 0 0 0-4 4v1M8.587 3.992c0 .822.112 1.886 1.515 2.58 1.402.693 2.918.351 2.918 2.334 0 .276 0 2.008 1.972 2.008 2.026.031 2.026-1.678 2.026-2.008 0-.65.527-.9 1.177-.9H20M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>

                            <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">Global <span className='text-blue-600'>Prosperity</span> Index</span>
                        </a>

                        {/* <!-- Dropdown menu --> */}
                    </div>
                    <div className='flex'>
                        <div class="text-center">
                            <button class="text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-2.5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" type="button" data-drawer-target="drawer-navigation" data-drawer-show="drawer-navigation" aria-controls="drawer-navigation">
                                Ask to Gemini
                            </button>
                        </div>

                        {/* <!-- drawer component --> */}
                        <div id="drawer-navigation" className="fixed top-0 left-0 z-40 w-64 h-screen p-4 overflow-y-auto transition-transform -translate-x-full bg-white dark:bg-gray-800" tabIndex="-1" aria-labelledby="drawer-navigation-label">
                            <h5 id="drawer-navigation-label" className="text-base font-semibold text-gray-500 uppercase dark:text-gray-400">Gemini</h5>
                            <button type="button" data-drawer-hide="drawer-navigation" aria-controls="drawer-navigation" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 end-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
                                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                <span className="sr-only">Close menu</span>
                            </button>

                            <div ref={messageContainerRef} className='chat-box h-[calc(100vh-120px)] overflow-y-auto mb-4'>
                                {messages.map((msg, index) => (
                                    <div key={index} className={`message ${msg.sender === 'user' ? 'right' : 'left'}`}>
                                        {msg.text}
                                    </div>
                                ))}
                                {isTyping && (
                                    <div className="message left">
                                        Typing...
                                    </div>
                                )}
                            </div>

                            <form onSubmit={sendMessage} className="fixed bottom-2 flex items-center max-w-sm mx-auto">
                                <label htmlFor="simple-search" className="sr-only">Send</label>
                                <div className="relative w-full">
                                    <input type="text" id='input' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Ask your questions....." required />
                                </div>
                                <button type='submit' className="p-1.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    <svg className="w-6 h-6 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 12H5m14 0-4 4m4-4-4-4" />
                                    </svg>
                                </button>
                            </form>
                        </div>

                        <Modal onComparisonSubmit={onComparisonSubmit}/>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar