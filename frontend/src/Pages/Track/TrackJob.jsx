import { useSearchParams } from 'react-router-dom'
import { MdOutlineReceiptLong } from 'react-icons/md'
import { useTrackJobQuery } from '../../Redux/Apis/jobApi'
import TrackForm from '../../Components/Track/TrackForm'
import TrackResult from '../../Components/Track/TrackResult'

const TrackJob = () => {
    const [searchParams] = useSearchParams()
    const code = (searchParams.get('code') || '').toUpperCase()
    const { data, isFetching, isError, error } = useTrackJobQuery(code, { skip: !code })

    return (
        <section className='section'>
            <div className='container-x max-w-[820px]'>
                <div className='text-center mb-10'>
                    <p className='eyebrow'>Repair status</p>
                    <h1 className='section-heading mt-3'>Check your repair status</h1>
                    <p className='lead mt-4'>Enter the job code from your repair slip to see where your phone is.</p>
                </div>
                <div className='card p-6 sm:p-10'>
                    <TrackForm initialCode={code} loading={isFetching} />
                    <TrackResult job={code ? data?.data : null} isFetching={isFetching} isError={isError} error={error} />
                    {!code && (
                        <div className='mt-8 flex items-start gap-3 rounded-xl bg-[var(--primary-soft)] p-4 text-sm text-[var(--text)]'>
                            <MdOutlineReceiptLong size={20} className='shrink-0 text-[var(--primary)]' />
                            <p>Your job code is printed on the slip from the shop and looks like <span className='font-semibold text-[var(--ink)]'>FX-1042</span>. If you cannot find it, ask the shop.</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}

export default TrackJob
