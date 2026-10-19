import { MdOutlineAddTask, MdOutlineTravelExplore, MdOutlineUpdate } from 'react-icons/md'

const STEPS = [
    {
        icon: <MdOutlineAddTask size={22} />,
        title: 'Log the repair',
        text: 'The shop records the customer, device, complaint and estimated cost. FixTrack creates a job code like FX-1042 to hand to the customer.',
    },
    {
        icon: <MdOutlineUpdate size={22} />,
        title: 'Update as work moves',
        text: 'With one click, the job moves to the next step: Diagnosing, Repairing, Ready, then Delivered. Steps cannot be skipped or reversed.',
    },
    {
        icon: <MdOutlineTravelExplore size={22} />,
        title: 'Customer checks online',
        text: 'The customer enters the job code on the tracking page and sees the current status. No phone call, no login.',
    },
]

const HowItWorks = () => {
    return (
        <section id='how-it-works' className='section bg-[var(--surface)] border-y border-[var(--line)] scroll-mt-16'>
            <div className='container-x'>
                <div className='max-w-2xl mb-12'>
                    <p className='eyebrow'>How it works</p>
                    <h2 className='section-heading mt-3'>From the counter to the customer in three steps</h2>
                </div>
                <ol className='grid gap-6 md:grid-cols-3'>
                    {STEPS.map((step, index) => (
                        <li key={step.title} className='relative rounded-2xl border border-[var(--line)] p-7'>
                            <span className='absolute top-6 right-7 text-5xl font-extrabold text-[var(--line)] select-none'>{index + 1}</span>
                            <span className='icon-badge'>{step.icon}</span>
                            <h3 className='heading mt-5'>{step.title}</h3>
                            <p className='text-[var(--muted)] mt-2 leading-relaxed'>{step.text}</p>
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    )
}

export default HowItWorks
