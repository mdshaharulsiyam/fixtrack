import { Grid, Spin } from 'antd'
import { MdOutlineErrorOutline, MdOutlineSchedule } from 'react-icons/md'
import { formatDate, STATUS_MESSAGES } from '../../Utils/jobOptions'
import StatusSteps from '../Shared/StatusSteps'
import StatusTag from '../Shared/StatusTag'

const TrackResult = ({ job, isFetching, isError, error }) => {
    const screens = Grid.useBreakpoint()

    if (isFetching) {
        return <div className='center-center py-12'><Spin size='large' /></div>
    }

    if (isError) {
        return (
            <div className='mt-8 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-[var(--danger)]'>
                <MdOutlineErrorOutline size={22} className='shrink-0 mt-0.5' />
                <p>{error?.data?.message || 'something went wrong, please try again'}</p>
            </div>
        )
    }

    if (!job) return null

    return (
        <div className='mt-8 rounded-2xl border border-[var(--line)] bg-[var(--canvas)] p-5 sm:p-7'>
            <div className='between-center gap-4 mb-6'>
                <div>
                    <p className='text-xs font-semibold uppercase tracking-[0.14em] text-[var(--muted)]'>Job code</p>
                    <p className='text-2xl font-bold text-[var(--ink)]'>{job.job_code}</p>
                </div>
                <StatusTag status={job.status} />
            </div>
            <StatusSteps status={job.status} direction={screens.md ? 'horizontal' : 'vertical'} />
            <p className='text mt-6 font-medium text-[var(--ink)]'>{STATUS_MESSAGES[job.status]}</p>
            <p className='start-center gap-1.5 text-sm text-[var(--muted)] mt-2'>
                <MdOutlineSchedule /> Last updated {formatDate(job.updatedAt)}
            </p>
        </div>
    )
}

export default TrackResult
