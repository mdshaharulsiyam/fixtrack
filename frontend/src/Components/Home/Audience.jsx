import { Link } from 'react-router-dom'
import { MdArrowForward, MdCheck, MdOutlinePhoneIphone, MdOutlineStorefront } from 'react-icons/md'

const AudienceCard = ({ icon, eyebrow, title, points, action, dark }) => (
    <div className={`rounded-2xl p-8 md:p-10 flex flex-col ${dark ? 'bg-[var(--night)] text-slate-300' : 'card'}`}>
        <span className={`center-center w-12 h-12 rounded-xl ${dark ? 'bg-white/10 text-[#60A5FA]' : 'bg-[var(--primary-soft)] text-[var(--primary)]'}`}>{icon}</span>
        <p className={`text-xs font-semibold uppercase tracking-[0.14em] mt-6 ${dark ? 'text-[#60A5FA]' : 'text-[var(--primary)]'}`}>{eyebrow}</p>
        <h3 className={`text-2xl font-bold mt-2 ${dark ? 'text-white' : 'text-[var(--ink)]'}`}>{title}</h3>
        <ul className='space-y-3 mt-6 mb-8'>
            {points.map((point) => (
                <li key={point} className='flex items-start gap-3'>
                    <MdCheck className={`shrink-0 mt-1 ${dark ? 'text-[var(--accent)]' : 'text-[var(--success)]'}`} />
                    <span>{point}</span>
                </li>
            ))}
        </ul>
        <div className='mt-auto'>{action}</div>
    </div>
)

const Audience = ({ isLoggedIn }) => {
    return (
        <section className='section'>
            <div className='container-x'>
                <div className='text-center max-w-2xl mx-auto mb-12'>
                    <p className='eyebrow'>Built for both sides of the counter</p>
                    <h2 className='section-heading mt-3'>Less waiting for customers. Fewer calls for shops.</h2>
                </div>
                <div className='grid gap-6 lg:grid-cols-2'>
                    <AudienceCard
                        icon={<MdOutlinePhoneIphone size={24} />}
                        eyebrow='For customers'
                        title='Know where your phone is, any time'
                        points={[
                            'Check progress online with the code on your slip',
                            'No account or login needed',
                            'Your phone number and details are never shown',
                        ]}
                        action={<Link to='/track' className='button-secondary'>Track my repair <MdArrowForward /></Link>}
                    />
                    <AudienceCard
                        dark
                        icon={<MdOutlineStorefront size={24} />}
                        eyebrow='For shop owners'
                        title='Run every repair from one place'
                        points={[
                            'Record customer, device, problem and estimated cost',
                            'Move jobs through each repair step in order',
                            'Get an AI suggestion for the problem category',
                        ]}
                        action={isLoggedIn
                            ? <Link to='/jobs' className='button-primary'>Go to my jobs <MdArrowForward /></Link>
                            : <Link to='/sign-up' className='button-primary'>Create shop account <MdArrowForward /></Link>}
                    />
                </div>
            </div>
        </section>
    )
}

export default Audience
