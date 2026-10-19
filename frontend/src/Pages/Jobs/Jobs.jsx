import { useCallback, useState } from 'react'
import { Modal } from 'antd'
import { MdAdd } from 'react-icons/md'
import { useGetJobsQuery } from '../../Redux/Apis/jobApi'
import { JOB_STATUSES, STATUS_STYLES } from '../../Utils/jobOptions'
import PageHeading from '../../Components/Shared/PageHeading'
import Search from '../../Components/Shared/Search'
import JobTable from '../../Components/Jobs/JobTable'
import JobForm from '../../Components/Jobs/JobForm'

const statusFilters = [{ value: '', label: 'All' }, ...JOB_STATUSES.map((item) => ({ value: item, label: item }))]

const Jobs = () => {
    const [page, setPage] = useState(1)
    const [search, setSearch] = useState('')
    const [status, setStatus] = useState('')
    const [searchKey, setSearchKey] = useState(0)
    const [modalOpen, setModalOpen] = useState(false)
    const [selectedJob, setSelectedJob] = useState(null)

    const { data, isFetching, isError, error, refetch } = useGetJobsQuery({ page, search, status })

    const handleSearch = useCallback((value) => {
        setSearch(value)
        setPage(1)
    }, [])

    const handleStatus = (value) => {
        setStatus(value)
        setPage(1)
    }

    const clearFilters = () => {
        setStatus('')
        setSearch('')
        setPage(1)
        setSearchKey((key) => key + 1)
    }

    const openAddModal = () => {
        setSelectedJob(null)
        setModalOpen(true)
    }

    const openEditModal = (job) => {
        setSelectedJob(job)
        setModalOpen(true)
    }

    const closeModal = () => {
        setModalOpen(false)
        setSelectedJob(null)
    }

    return (
        <section className='container-x py-10 md:py-14'>
            <PageHeading
                eyebrow='Shop workspace'
                text='Repair jobs'
                subText='Add jobs, move them through each repair step, and share the job code with your customers.'
                action={(
                    <button onClick={openAddModal} className='button-primary'>
                        <MdAdd size={20} /> Add job
                    </button>
                )}
            />
            <div className='card mt-8 overflow-hidden'>
                <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 p-4 md:px-6 md:py-5 border-b border-[var(--line)]'>
                    <div className='w-full lg:max-w-[360px]'>
                        <Search key={searchKey} placeholder='Search by code, customer, phone or device' handler={handleSearch} />
                    </div>
                    <div className='-mx-4 px-4 lg:mx-0 lg:px-0 overflow-x-auto'>
                        <div role='tablist' aria-label='Filter by status' className='inline-flex gap-1 rounded-xl bg-[var(--canvas)] p-1 border border-[var(--line)]'>
                            {statusFilters.map((item) => {
                                const active = status === item.value
                                return (
                                    <button
                                        key={item.label}
                                        role='tab'
                                        aria-selected={active}
                                        onClick={() => handleStatus(item.value)}
                                        className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-colors ${active
                                            ? 'bg-[var(--surface)] text-[var(--ink)] shadow-[0_1px_2px_rgba(15,23,42,0.08)]'
                                            : 'text-[var(--muted)] hover:text-[var(--ink)]'}`}
                                    >
                                        {item.value && <span className={`h-1.5 w-1.5 rounded-full ${STATUS_STYLES[item.value].dot}`} />}
                                        {item.label}
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <div className='p-4 md:p-0'>
                    {isError && (
                        <div className='between-center gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-[var(--danger)] md:m-6 mb-4'>
                            <span>{error?.data?.message || 'could not load jobs'}</span>
                            <button onClick={refetch} className='font-semibold underline underline-offset-2'>Retry</button>
                        </div>
                    )}
                    <JobTable
                        data={data?.data}
                        loading={isFetching}
                        filtered={Boolean(search || status)}
                        onEdit={openEditModal}
                        onAdd={openAddModal}
                        onClearFilters={clearFilters}
                        pagination={{ ...data?.pagination, onChange: setPage }}
                    />
                </div>
            </div>
            <Modal
                open={modalOpen}
                onCancel={closeModal}
                footer={false}
                centered
                width={760}
                destroyOnClose
            >
                <JobForm
                    action={selectedJob ? 'update' : 'add'}
                    data={selectedJob}
                    close_modal={closeModal}
                />
            </Modal>
        </section>
    )
}

export default Jobs
