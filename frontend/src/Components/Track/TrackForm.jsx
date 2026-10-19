import { useEffect } from 'react'
import { Form, Input } from 'antd'
import { MdOutlineSearch } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { JOB_CODE_PATTERN } from '../../Utils/jobOptions'

const TrackForm = ({ initialCode = '', loading }) => {
    const [form] = Form.useForm()
    const navigate = useNavigate()

    useEffect(() => {
        form.setFieldsValue({ code: initialCode })
    }, [initialCode, form])

    const onFinish = (value) => {
        navigate(`/track?code=${encodeURIComponent(value.code.trim().toUpperCase())}`)
    }

    return (
        <Form form={form} onFinish={onFinish} initialValues={{ code: initialCode }} requiredMark={false}>
            <div className='flex flex-col sm:flex-row gap-3'>
                <Form.Item
                    className='flex-1 mb-0'
                    name='code'
                    rules={[
                        { required: true, message: 'please enter your job code' },
                        { pattern: JOB_CODE_PATTERN, message: 'a job code looks like FX-1042' },
                    ]}
                >
                    <Input
                        size='large'
                        prefix={<MdOutlineSearch className='text-[var(--muted)]' size={20} />}
                        placeholder='FX-1042'
                        className='uppercase'
                        aria-label='Job code'
                    />
                </Form.Item>
                <button type='submit' className='button-primary h-[50px] px-6' disabled={loading}>
                    Check status
                </button>
            </div>
        </Form>
    )
}

export default TrackForm
