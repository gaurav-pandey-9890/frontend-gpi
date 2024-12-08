import React from 'react'
import Nav from './Nav'
import Hero from './Hero'
import Cta from './Cta'
import Footer from './Footer'
import Cards from './Cards'
import FAQ from './FAQ'

const Landing = () => {
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