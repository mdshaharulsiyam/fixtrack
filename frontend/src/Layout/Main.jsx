import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from '../Components/Shared/Navbar'
import Footer from '../Components/Shared/Footer'

const Main = () => {
    const { pathname, hash } = useLocation()

    useEffect(() => {
        if (hash) {
            document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth' })
            return
        }
        window.scrollTo(0, 0)
    }, [pathname, hash])

    return (
        <div className='min-h-screen flex flex-col'>
            <Navbar />
            <main className='flex-1'>
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default Main
