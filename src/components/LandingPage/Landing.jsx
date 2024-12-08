import React, { useEffect } from 'react';
import { initFlowbite } from 'flowbite';
import Nav from './Nav'
import Hero from './Hero'
import Cta from './Cta'
import Footer from './Footer'
import Cards from './Cards'
import FAQ from './FAQ'

const Landing = () => {
    useEffect(() => {
        initFlowbite();
    }, []);

    return (
        <div>
            <Nav />
            <Hero/>
            <Cta/>
            <Cards/>
            <FAQ/>
            <Footer/>
        </div>
    )
}

export default Landing