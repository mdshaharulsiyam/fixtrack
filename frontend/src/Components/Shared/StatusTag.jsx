import { STATUS_STYLES } from '../../Utils/jobOptions'

const StatusTag = ({ status }) => {
    const style = STATUS_STYLES[status] || STATUS_STYLES.Received

    return (
        <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset whitespace-nowrap ${style.pill}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />
            {status}
        </span>
    )
}

export default StatusTag
