import { JOB_STATUSES, STATUS_MESSAGES } from '../../Utils/jobOptions'

const StatusJourney = () => {
    return (
        <section className='section'>
            <div className='container-x'>
                <div className='text-center max-w-2xl mx-auto mb-12'>
                    <p className='eyebrow'>The repair journey</p>
                    <h2 className='section-heading mt-3'>Five clear steps your customer can follow</h2>
                    <p className='lead mt-4'>Every job moves forward one step at a time, so the status a customer sees is always accurate.</p>
                </div>
                <ol className='grid gap-4 sm:grid-cols-2 lg:grid-cols-5'>
                    {JOB_STATUSES.map((status, index) => (
                        <li key={status} className='card p-6 relative'>
                            <span className='center-center w-9 h-9 rounded-full bg-[var(--ink)] text-white text-sm font-bold'>{index + 1}</span>
                            <h3 className='heading mt-4'>{status}</h3>
                            <p className='text-sm text-[var(--muted)] mt-2 leading-relaxed'>{STATUS_MESSAGES[status]}</p>
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    )
}

export default StatusJourney
