import { Grid, Pagination, Spin, Table, Tooltip, Typography } from 'antd'
import toast from 'react-hot-toast'
import { MdAdd, MdBatteryChargingFull, MdCable, MdOutlineInbox, MdOutlineSearchOff, MdOutlineSmartphone, MdSystemUpdateAlt, MdWaterDrop } from 'react-icons/md'
import { useUpdateJobStatusMutation } from '../../Redux/Apis/jobApi'
import { formatCost, formatShortDate } from '../../Utils/jobOptions'
import JobActions from './JobActions'
import JobStatusProgress from './JobStatusProgress'
import StatusTag from '../Shared/StatusTag'

const CATEGORY_ICONS = {
    screen: MdOutlineSmartphone,
    battery: MdBatteryChargingFull,
    'water damage': MdWaterDrop,
    software: MdSystemUpdateAlt,
    'charging port': MdCable,
}

const getInitials = (name = '') => name.trim().split(/\s+/).slice(0, 2).map((part) => part[0]).join('').toUpperCase() || '?'

const JobCode = ({ code }) => (
    <Typography.Text
        copyable={{ text: code, tooltips: ['Copy code', 'Copied'] }}
        className='font-mono text-[13px] font-semibold text-[var(--ink)]'
    >
        {code}
    </Typography.Text>
)

const Customer = ({ name, phone }) => (
    <div className='flex items-center gap-3 min-w-0'>
        <span className='center-center h-9 w-9 shrink-0 rounded-full bg-[var(--primary-soft)] text-xs font-bold text-[var(--primary)]'>
            {getInitials(name)}
        </span>
        <div className='min-w-0'>
            <p className='font-semibold text-[var(--ink)] truncate'>{name}</p>
            <a href={`tel:${phone}`} className='text-xs text-[var(--muted)] hover:text-[var(--primary)] tabular-nums'>{phone}</a>
        </div>
    </div>
)

const Category = ({ category, fault }) => {
    const Icon = CATEGORY_ICONS[category] || MdOutlineSmartphone
    return (
        <Tooltip title={fault ? `Likely fault: ${fault}` : null}>
            <span className='inline-flex items-center gap-1 rounded-md bg-[var(--surface)] border border-[var(--line)] px-2 py-0.5 text-xs font-medium capitalize text-[var(--text)] whitespace-nowrap'>
                <Icon size={13} className='text-[var(--muted)]' /> {category}
            </span>
        </Tooltip>
    )
}

const Device = ({ record }) => (
    <div className='max-w-[300px]'>
        <p className='font-semibold text-[var(--ink)]'>{record.device}</p>
        <p className='text-xs text-[var(--muted)] line-clamp-2 mt-0.5' title={record.problem}>{record.problem}</p>
        <div className='mt-2'><Category category={record.category} fault={record.likely_fault} /></div>
    </div>
)

const Cost = ({ value }) => (
    <span className='font-semibold text-[var(--ink)] tabular-nums whitespace-nowrap'>{formatCost(value)}</span>
)

const EmptyState = ({ filtered, onAdd, onClearFilters }) => (
    <div className='flex flex-col items-center text-center py-14 px-4'>
        <span className='icon-badge h-14 w-14 rounded-2xl'>
            {filtered ? <MdOutlineSearchOff size={26} /> : <MdOutlineInbox size={26} />}
        </span>
        <p className='heading mt-4'>{filtered ? 'No jobs match your filters' : 'No repair jobs yet'}</p>
        <p className='text-sm text-[var(--muted)] mt-1 max-w-sm'>
            {filtered
                ? 'Try a different search term or status.'
                : 'Add the first job when a customer drops off a phone. They get a code to track it.'}
        </p>
        {filtered
            ? <button onClick={onClearFilters} className='button-secondary button-sm mt-5'>Clear filters</button>
            : <button onClick={onAdd} className='button-primary button-sm mt-5'><MdAdd size={18} /> Add job</button>}
    </div>
)

const JobCard = ({ record, actions }) => (
    <article className='rounded-xl border border-[var(--line)] bg-[var(--surface)] p-4'>
        <div className='between-center gap-3'>
            <JobCode code={record.job_code} />
            <StatusTag status={record.status} />
        </div>
        <div className='mt-4'>
            <Customer name={record.customer_name} phone={record.customer_phone} />
        </div>
        <div className='mt-4 rounded-lg bg-[var(--canvas)] p-3'>
            <Device record={record} />
        </div>
        <div className='between-center mt-4 text-sm'>
            <span className='text-[var(--muted)]'>Est. cost <span className='ml-1'><Cost value={record.estimated_cost} /></span></span>
            <span className='text-xs text-[var(--muted)]'>{formatShortDate(record.createdAt)}</span>
        </div>
        <div className='mt-4 pt-4 border-t border-[var(--line)]'>{actions}</div>
    </article>
)

const JobTable = ({ data = [], loading, pagination, filtered, onEdit, onAdd, onClearFilters }) => {
    const screens = Grid.useBreakpoint()
    const [updateJobStatus, { isLoading, originalArgs }] = useUpdateJobStatusMutation()

    const handleNextStatus = (record, status) => {
        updateJobStatus({ id: record._id, status }).unwrap()
            .then((res) => toast.success(res.message || `job moved to ${status}`))
            .catch((err) => toast.error(err?.data?.message || 'something went wrong'))
    }

    const renderActions = (record, block) => (
        <JobActions
            record={record}
            block={block}
            onEdit={onEdit}
            onNextStatus={handleNextStatus}
            pending={isLoading && originalArgs?.id === record._id}
        />
    )

    const columns = [
        {
            title: 'Job',
            dataIndex: 'job_code',
            key: 'job_code',
            width: 150,
            render: (code, record) => (
                <div>
                    <JobCode code={code} />
                    <p className='text-xs text-[var(--muted)] mt-0.5 whitespace-nowrap'>{formatShortDate(record.createdAt)}</p>
                </div>
            ),
        },
        {
            title: 'Customer',
            dataIndex: 'customer_name',
            key: 'customer_name',
            width: 220,
            render: (name, record) => <Customer name={name} phone={record.customer_phone} />,
        },
        {
            title: 'Device & issue',
            dataIndex: 'device',
            key: 'device',
            render: (_, record) => <Device record={record} />,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            width: 150,
            render: (status) => <JobStatusProgress status={status} />,
        },
        {
            title: 'Est. cost',
            dataIndex: 'estimated_cost',
            key: 'estimated_cost',
            align: 'right',
            width: 110,
            render: (value) => <Cost value={value} />,
        },
        {
            title: <span className='sr-only'>Actions</span>,
            key: 'actions',
            align: 'right',
            fixed: screens.lg ? undefined : 'right',
            render: (_, record) => renderActions(record, false),
        },
    ]

    const currentPage = pagination?.currentPage || 1
    const pageSize = pagination?.itemsPerPage || 10
    const total = pagination?.totalItems || 0
    const from = total ? (currentPage - 1) * pageSize + 1 : 0
    const to = Math.min(currentPage * pageSize, total)
    const empty = <EmptyState filtered={filtered} onAdd={onAdd} onClearFilters={onClearFilters} />

    return (
        <div>
            {screens.md ? (
                <Table
                    className='job-table'
                    rowKey='_id'
                    dataSource={data}
                    columns={columns}
                    loading={loading}
                    pagination={false}
                    scroll={{ x: 960 }}
                    locale={{ emptyText: loading ? ' ' : empty }}
                />
            ) : (
                <Spin spinning={loading}>
                    {data.length ? (
                        <div className='flex flex-col gap-3'>
                            {data.map((record) => (
                                <JobCard key={record._id} record={record} actions={renderActions(record, true)} />
                            ))}
                        </div>
                    ) : (loading ? <div className='h-40' /> : empty)}
                </Spin>
            )}
            {total > 0 && (
                <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-4 md:px-6 md:pb-4 md:border-t md:border-[var(--line)]'>
                    <p className='text-sm text-[var(--muted)]'>
                        Showing <span className='font-semibold text-[var(--ink)]'>{from}–{to}</span> of <span className='font-semibold text-[var(--ink)]'>{total}</span> jobs
                    </p>
                    <Pagination
                        current={currentPage}
                        pageSize={pageSize}
                        total={total}
                        onChange={pagination?.onChange}
                        showSizeChanger={false}
                        size={screens.md ? 'default' : 'small'}
                        hideOnSinglePage
                    />
                </div>
            )}
        </div>
    )
}

export default JobTable
