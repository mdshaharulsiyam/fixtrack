import { Link } from 'react-router-dom'
import { MdArrowForward, MdCheck } from 'react-icons/md'
import { JOB_STATUSES } from '../../Utils/jobOptions'
import TrackForm from '../Track/TrackForm'

const HIGHLIGHTS = ['No more lost paper slips', 'Customers check status any time', 'AI-assisted job triage']

const EXAMPLE_STATUS = 'Repairing'

const Hero = ({ isLoggedIn }) => {
    const exampleIndex = JOB_STATUSES.indexOf(EXAMPLE_STATUS)

    return (
        <section className='relative overflow-hidden hero-backdrop'>
            <div className='absolute inset-0 grid-pattern' aria-hidden='true'></div>
            <div className='relative container-x pt-16 pb-20 md:pt-24 md:pb-28 grid gap-12 lg:grid-cols-[1.1fr_1fr] items-center'>
                <div>
                    <span className='inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-blue-200'>
                        <span className='w-1.5 h-1.5 rounded-full bg-[var(--accent)]'></span>
                        Repair tracking for mobile phone shops
                    </span>
                    <h1 className='display-heading text-white mt-6'>
                        Every repair, tracked from <span className='text-[#60A5FA]'>counter to pickup.</span>
                    </h1>
                    <p className='text-lg leading-relaxed text-slate-300 mt-6 max-w-xl'>
                        FixTrack replaces the paper slip. Shops record each job and move it step by step, and customers check their repair status online with a job code. No more &ldquo;is my phone ready?&rdquo; calls.
                    </p>
                    <div className='flex flex-col sm:flex-row gap-3 mt-8'>
                        {isLoggedIn ? (
                            <Link to='/jobs' className='button-primary button-lg'>Go to my jobs <MdArrowForward /></Link>
                        ) : (
                            <Link to='/sign-up' className='button-primary button-lg'>Create shop account <MdArrowForward /></Link>
                        )}
                        <Link to='/track' className='button-ghost-light button-lg'>Track a repair</Link>
                    </div>
                    <ul className='flex flex-wrap gap-x-6 gap-y-2 mt-8'>
                        {HIGHLIGHTS.map((item) => (
                            <li key={item} className='start-center gap-2 text-sm text-slate-300'>
                                <MdCheck className='text-[var(--accent)]' /> {item}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className='card p-6 sm:p-8 shadow-[0_24px_60px_rgba(0,0,0,0.35)]'>
                    <p className='eyebrow'>For customers</p>
                    <h2 className='text-2xl font-bold text-[var(--ink)] mt-2'>Check your repair status</h2>
                    <p className='text-sm text-[var(--muted)] mt-2 mb-6'>Enter the job code from the slip the shop gave you.</p>
                    <TrackForm />
                    <div className='mt-8 rounded-xl border border-dashed border-[var(--line)] p-4'>
                        <div className='between-center mb-4'>
                            <p className='text-xs font-semibold uppercase tracking-[0.14em] text-[var(--muted)]'>Example</p>
                            <p className='text-sm font-bold text-[var(--ink)]'>FX-1042</p>
                        </div>
                        <ol className='grid grid-cols-5 gap-2'>
                            {JOB_STATUSES.map((status, index) => (
                                <li key={status} className='flex flex-col items-center gap-2 text-center'>
                                    <span className={`h-1.5 w-full rounded-full ${index <= exampleIndex ? 'bg-[var(--primary)]' : 'bg-[var(--line)]'}`}></span>
                                    <span className={`text-[11px] leading-tight ${index === exampleIndex ? 'font-semibold text-[var(--primary)]' : 'text-[var(--muted)]'}`}>{status}</span>
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero
