import { useState, useEffect, useRef } from 'react'
import Layout from '../components/Layout'
import Navbar from '../components/Navbar'
import Home from './Home'
import About from './About'
import Footer from '../components/Footer'

export default function MainPage() {
    const aboutRef = useRef(null)
    const [active, setActive] = useState('Home')

    useEffect(() => {
        const handleScroll = () => {
            const scrollPos = window.scrollY

            if (aboutRef.current) {
                const aboutTop = aboutRef.current.offsetTop - 100
                setActive(scrollPos >= aboutTop ? 'About' : 'Home')
            }
        }

        window.addEventListener('scroll', handleScroll)

        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const scrollTo = (section) => {
        if (section === 'Home') {
            window.scrollTo({ top: 0, behavior: 'smooth' })
        } else if (section === 'About') {
            aboutRef.current?.scrollIntoView({ behavior: 'smooth' })
        }
    }

    return (
        <Layout>
            <Navbar activeMenu={active} scrollTo={scrollTo} />
            <Home />
            <div ref={aboutRef}>
                <About />
            </div>
            <Footer />
        </Layout>
    )
}