import { Popconfirm, Tooltip } from 'antd'
import { MdArrowForward, MdCheckCircle, MdEdit } from 'react-icons/md'
import { getNextStatus } from '../../Utils/jobOptions'

const JobActions = ({ record, onEdit, onNextStatus, pending, block = false }) => {
    const next = getNextStatus(record.status)

    return (
        <div className={`flex items-center gap-2 ${block ? 'w-full' : 'justify-end'}`}>
            {next ? (
                <Popconfirm
                    title={`Move ${record.job_code} to ${next}?`}
                    description='A job cannot go back to an earlier status.'
                    okText='Yes, move'
                    placement='topRight'
                    onConfirm={() => onNextStatus(record, next)}
                >
                    <button className={`button-soft ${block ? 'flex-1 py-2' : ''}`} disabled={pending}>
                        {pending ? 'Moving...' : <>Move to {next} <MdArrowForward /></>}
                    </button>
                </Popconfirm>
            ) : (
                <span className={`inline-flex items-center gap-1.5 text-sm font-medium text-emerald-600 whitespace-nowrap ${block ? 'flex-1 justify-center' : 'px-3.5'}`}>
                    <MdCheckCircle size={16} /> Completed
                </span>
            )}
            <Tooltip title='Edit job'>
                <button onClick={() => onEdit(record)} className='button-icon' aria-label={`edit job ${record.job_code}`}>
                    <MdEdit size={17} />
                </button>
            </Tooltip>
        </div>
    )
}

export default JobActions
