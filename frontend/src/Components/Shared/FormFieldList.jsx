import { Form, Input } from 'antd'

const buildRules = (item) => {
    const rules = [{ required: item?.required, message: item?.message }]
    if (item?.type === 'email') rules.push({ type: 'email', message: 'enter a valid email' })
    if (item?.min) rules.push({ min: item.min, message: item.message })
    if (item?.pattern) rules.push({ pattern: item.pattern, message: item.patternMessage })
    if (item?.match) {
        rules.push(({ getFieldValue }) => ({
            validator: (_, value) => !value || getFieldValue(item.match) === value
                ? Promise.resolve()
                : Promise.reject(new Error('the two passwords do not match')),
        }))
    }
    return rules
}

const FormFieldList = ({ fields }) => {
    return fields?.map((item) => (
        <Form.Item
            key={item?.name}
            label={<span className='input-label'>{item?.label}</span>}
            name={item?.name}
            rules={buildRules(item)}
            dependencies={item?.match ? [item.match] : undefined}
        >
            {item?.type === 'password'
                ? <Input.Password size='large' placeholder={item?.placeholder} />
                : <Input size='large' placeholder={item?.placeholder} />}
        </Form.Item>
    ))
}

export default FormFieldList
