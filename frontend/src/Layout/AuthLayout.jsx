import { Link } from 'react-router-dom'
import { MdArrowBack, MdCheck } from 'react-icons/md'
import Brand from '../Components/Shared/Brand'

const POINTS = [
    'Every job gets a code your customer can track',
    'Status moves step by step, never skipped',
    'AI suggests the problem category for you',
]

const AuthLayout = ({ title, subTitle, children }) => {
    return (
        <div className='min-h-screen grid lg:grid-cols-2'>
            <aside className='hidden lg:flex relative overflow-hidden hero-backdrop p-12 flex-col'>
                <div className='absolute inset-0 grid-pattern' aria-hidden='true'></div>
                <Link to='/' className='relative'><Brand light /></Link>
                <div className='relative my-auto max-w-md'>
                    <h2 className='text-4xl font-bold leading-tight tracking-tight text-white'>Keep every repair on track.</h2>
                    <p className='text-slate-300 mt-4 text-lg'>One place for your shop’s repair jobs, and one code for your customers to check them.</p>
                    <ul className='space-y-4 mt-10'>
                        {POINTS.map((point) => (
                            <li key={point} className='start-center gap-3 text-slate-200'>
                                <span className='center-center w-6 h-6 rounded-full bg-white/10 text-[var(--accent)]'><MdCheck /></span>
                                {point}
                            </li>
                        ))}
                    </ul>
                </div>
                <p className='relative text-sm text-slate-400'>© {new Date().getFullYear()} FixTrack</p>
            </aside>
            <div className='flex flex-col px-4 sm:px-8 py-8 bg-[var(--surface)]'>
                <div className='between-center'>
                    <Link to='/' className='lg:hidden'><Brand /></Link>
                    <Link to='/' className='start-center gap-1.5 text-sm font-medium text-[var(--muted)] hover:text-[var(--ink)] ml-auto'>
                        <MdArrowBack /> Back to home
                    </Link>
                </div>
                <div className='w-full max-w-[420px] mx-auto my-auto py-10'>
                    <h1 className='page-heading'>{title}</h1>
                    <p className='text-[var(--muted)] mt-2 mb-8'>{subTitle}</p>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default AuthLayout
