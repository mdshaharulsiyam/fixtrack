import { Alert } from 'antd'
import toast from 'react-hot-toast'
import { HiSparkles } from 'react-icons/hi'
import { useSuggestRepairMutation } from '../../Redux/Apis/suggestionApi'

const AiSuggestion = ({ form, suggestion, setSuggestion }) => {
    const [suggestRepair, { isLoading }] = useSuggestRepairMutation()

    const handleSuggest = () => {
        const complaint = form.getFieldValue('problem')?.trim()
        if (!complaint) return toast.error('type the customer complaint first')

        suggestRepair(complaint).unwrap()
            .then((res) => {
                form.setFieldsValue({
                    category: res.data.category,
                    likely_fault: res.data.likely_fault,
                })
                setSuggestion(res.data)
            })
            .catch((err) => toast.error(err?.data?.message || 'AI suggestion failed, please choose the category yourself'))
    }

    return (
        <div className='mb-4'>
            <button type='button' onClick={handleSuggest} disabled={isLoading} className='button-soft'>
                <HiSparkles /> {isLoading ? 'Thinking...' : 'Suggest category with AI'}
            </button>
            {suggestion && (
                <Alert
                    className='mt-3'
                    type='info'
                    showIcon
                    message={`AI suggests: ${suggestion.category}`}
                    description='The suggestion can be wrong. Check the category and likely fault below and change them if needed before saving.'
                />
            )}
        </div>
    )
}

export default AiSuggestion
