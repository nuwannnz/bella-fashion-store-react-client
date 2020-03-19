import React from 'react'
import Hero from '../components/Hero';
import Banner from '../components/Banner';
import {Link} from 'react-router-dom'

export default function Home() {
    return <Hero hero="defaultHero">
        <Banner title="Welcome to Bella Stores" subtitle="We create your fashion" >
        <Link to='/Categories' className="btn-primary"><span> Shop Now</span></Link>
        </Banner>
        </Hero>
}


