import { Link } from 'react-router-dom'
import { MdArrowForward } from 'react-icons/md'

const CallToAction = ({ isLoggedIn }) => {
    return (
        <section className='section'>
            <div className='container-x'>
                <div className='relative overflow-hidden rounded-3xl hero-backdrop px-6 py-14 md:px-16 md:py-16'>
                    <div className='absolute inset-0 grid-pattern' aria-hidden='true'></div>
                    <div className='relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8'>
                        <div className='max-w-xl'>
                            <h2 className='text-3xl md:text-4xl font-bold tracking-tight text-white'>Ready to retire the paper slip?</h2>
                            <p className='text-slate-300 mt-4 text-lg'>Set up your shop in a minute and give every customer a code they can track.</p>
                        </div>
                        <div className='flex flex-col sm:flex-row gap-3'>
                            {isLoggedIn ? (
                                <Link to='/jobs' className='button-primary button-lg'>Go to my jobs <MdArrowForward /></Link>
                            ) : (
                                <>
                                    <Link to='/sign-up' className='button-primary button-lg'>Create shop account <MdArrowForward /></Link>
                                    <Link to='/login' className='button-ghost-light button-lg'>Log in</Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CallToAction
