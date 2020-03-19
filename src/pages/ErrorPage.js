import React from 'react'
import Hero from '../components/Hero';
import Banner from '../components/Banner';
import {Link} from 'react-router-dom'

export default function ErrorPage() {
    return <Hero hero="defaultHero">
        <Banner title="Hmm. Something's Wrong" subtitle="Error 404... Page Not Found" >
        <Link to='/Home' className="btn-primary"><span> Return Home</span></Link>
        </Banner>
        </Hero>
}


