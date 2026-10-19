import { Steps } from 'antd'
import { JOB_STATUSES } from '../../Utils/jobOptions'

const StatusSteps = ({ status, direction = 'horizontal' }) => {
    const current = JOB_STATUSES.indexOf(status)
    const isDone = status === JOB_STATUSES[JOB_STATUSES.length - 1]

    return (
        <Steps
            direction={direction}
            size='small'
            current={current}
            status={isDone ? 'finish' : 'process'}
            items={JOB_STATUSES.map((item) => ({ title: item }))}
        />
    )
}

export default StatusSteps
