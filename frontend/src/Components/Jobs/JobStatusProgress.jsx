import { JOB_STATUSES, STATUS_STYLES } from '../../Utils/jobOptions'
import StatusTag from '../Shared/StatusTag'

const JobStatusProgress = ({ status }) => {
    const step = JOB_STATUSES.indexOf(status) + 1
    const bar = STATUS_STYLES[status]?.bar || 'bg-slate-400'

    return (
        <div className='flex flex-col items-start gap-2'>
            <StatusTag status={status} />
            <div className='flex items-center gap-2' aria-label={`step ${step} of ${JOB_STATUSES.length}`}>
                <div className='flex gap-1'>
                    {JOB_STATUSES.map((item, index) => (
                        <span key={item} className={`h-1 w-4 rounded-full ${index < step ? bar : 'bg-slate-200'}`} />
                    ))}
                </div>
                <span className='text-[11px] font-medium text-[var(--muted)] tabular-nums'>{step}/{JOB_STATUSES.length}</span>
            </div>
        </div>
    )
}

export default JobStatusProgress
