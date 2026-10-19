import { Link } from 'react-router-dom'
import { MdArrowForward, MdOutlineAssignment, MdOutlineAutoAwesome, MdOutlineLock, MdOutlineTimeline } from 'react-icons/md'

const FEATURES = [
    {
        icon: <MdOutlineAssignment size={22} />,
        title: 'Every job on record',
        text: 'Customer name, phone, device, problem and estimated cost in one searchable list. Each job gets its own code automatically.',
    },
    {
        icon: <MdOutlineTimeline size={22} />,
        title: 'Status in the right order',
        text: 'Received, Diagnosing, Repairing, Ready, Delivered. A job cannot skip a step or go backwards, so records stay honest.',
    },
    {
        icon: <MdOutlineAutoAwesome size={22} />,
        title: 'AI complaint triage',
        text: 'Type the complaint and get a suggested category and likely fault. You always review and confirm it before saving.',
    },
    {
        icon: <MdOutlineLock size={22} />,
        title: 'Private by design',
        text: 'Only you can see and edit your jobs. The public tracking page shows the status only, never the customer’s phone number.',
    },
]

const Features = ({ isLoggedIn }) => {
    return (
        <section id='features' className='section bg-[var(--surface)] border-y border-[var(--line)] scroll-mt-16'>
            <div className='container-x grid gap-12 lg:grid-cols-[0.9fr_1.4fr] items-start'>
                <div className='lg:sticky lg:top-28'>
                    <p className='eyebrow'>For shop owners</p>
                    <h2 className='section-heading mt-3'>Everything the counter needs, nothing it doesn’t</h2>
                    <p className='lead mt-4'>A focused tool for small repair shops: log jobs fast, keep customers informed, and stop answering the same question all day.</p>
                    <Link to={isLoggedIn ? '/jobs' : '/sign-up'} className='button-primary mt-8'>
                        {isLoggedIn ? 'Open my jobs' : 'Start tracking jobs'} <MdArrowForward />
                    </Link>
                </div>
                <div className='grid gap-5 sm:grid-cols-2'>
                    {FEATURES.map((feature) => (
                        <div key={feature.title} className='rounded-2xl border border-[var(--line)] bg-[var(--canvas)] p-7'>
                            <span className='icon-badge'>{feature.icon}</span>
                            <h3 className='heading mt-5'>{feature.title}</h3>
                            <p className='text-[var(--muted)] mt-2 leading-relaxed'>{feature.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Features
