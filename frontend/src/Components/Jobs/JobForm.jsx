import { useEffect, useState } from 'react'
import { Form, Input, InputNumber, Select } from 'antd'
import toast from 'react-hot-toast'
import { RxCross2 } from 'react-icons/rx'
import { TbCopyCheckFilled } from 'react-icons/tb'
import { useAddJobMutation, useUpdateJobMutation } from '../../Redux/Apis/jobApi'
import { CustomerFields } from '../../Utils/FormFields/Job'
import { JOB_CATEGORIES } from '../../Utils/jobOptions'
// import AiSuggestion from './AiSuggestion'
import Loading from '../Shared/Loading'

const categoryOptions = JOB_CATEGORIES.map((item) => ({ value: item, label: item }))

const positiveCost = {
    validator: (_, value) => value > 0
        ? Promise.resolve()
        : Promise.reject(new Error('estimated cost must be greater than 0')),
}

const JobForm = ({ action, data, close_modal }) => {
    const [form] = Form.useForm()
    // const [suggestion, setSuggestion] = useState(null)
    const [addJob, { isLoading: addLoading }] = useAddJobMutation()
    const [updateJob, { isLoading: updateLoading }] = useUpdateJobMutation()

    useEffect(() => {
        if (data?._id) form.setFieldsValue(data)
    }, [data, form])

    const onFinish = (value) => {
        const request = action === 'update'
            ? updateJob({ id: data?._id, data: value })
            : addJob(value)

        request.unwrap()
            .then((res) => {
                toast.success(action === 'update'
                    ? res.message || 'job updated successfully'
                    : `Job ${res.data?.job_code} created. Give this code to the customer.`, { duration: 6000 })
                close_modal()
            })
            .catch((err) => toast.error(err?.data?.message || 'something went wrong'))
    }

    return (
        <div>
            {(addLoading || updateLoading) && <Loading />}
            <p className='text-xl font-bold text-[var(--ink)] mb-5'>{action === 'update' ? `Edit job ${data?.job_code}` : 'Add new repair job'}</p>
            <Form form={form} onFinish={onFinish} layout='vertical' requiredMark={false}>
                <div className='grid md:grid-cols-2 gap-x-4'>
                    {CustomerFields.map((item) => (
                        <Form.Item
                            key={item.name}
                            name={item.name}
                            label={item.label}
                            rules={[
                                { required: item.required, message: item.message, whitespace: true },
                                ...(item.pattern ? [{ pattern: item.pattern, message: item.patternMessage }] : []),
                            ]}
                        >
                            <Input placeholder={item.placeholder} />
                        </Form.Item>
                    ))}
                    <Form.Item
                        name='estimated_cost'
                        label='Estimated Cost'
                        rules={[{ required: true, message: 'please input the estimated cost' }, positiveCost]}
                    >
                        <InputNumber className='w-full' min={0} placeholder='1500' />
                    </Form.Item>
                </div>
                <Form.Item
                    name='problem'
                    label='Customer Complaint'
                    rules={[{ required: true, message: 'please describe the problem', whitespace: true }]}
                >
                    <Input.TextArea rows={3} maxLength={1000} placeholder='phone fell in water, screen flickers' />
                </Form.Item>
                {/* <AiSuggestion form={form} suggestion={suggestion} setSuggestion={setSuggestion} /> */}
                <div className='grid md:grid-cols-2 gap-x-4'>
                    <Form.Item
                        name='category'
                        label='Problem Category'
                        rules={[{ required: true, message: 'please choose a category' }]}
                    >
                        <Select options={categoryOptions} placeholder='choose a category' />
                    </Form.Item>
                    <Form.Item name='likely_fault' label='Likely Fault'>
                        <Input maxLength={300} placeholder='display connector damaged by liquid' />
                    </Form.Item>
                </div>
                <div className='center-center gap-4 mt-2'>
                    <button className='button-primary' type='submit'>
                        <TbCopyCheckFilled size={18} /> Save job
                    </button>
                    <button onClick={close_modal} className='button-secondary' type='button'>
                        <RxCross2 size={20} /> Cancel
                    </button>
                </div>
            </Form>
        </div>
    )
}

export default JobForm
