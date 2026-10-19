import { Form } from 'antd'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import { useSignUpUserMutation } from '../../Redux/Apis/authApi'
import { SignUpFields } from '../../Utils/FormFields/SignUp'
import AuthLayout from '../../Layout/AuthLayout'
import FormFieldList from '../../Components/Shared/FormFieldList'
import Loading from '../../Components/Shared/Loading'

const SignUp = () => {
    const navigate = useNavigate()
    const [signUpUser, { isLoading }] = useSignUpUserMutation()

    const onSubmitSignUpForm = (value) => {
        signUpUser(value).unwrap()
            .then((res) => {
                toast.success(res.message || 'account created successfully')
                navigate('/jobs', { replace: true })
            })
            .catch((err) => toast.error(err?.data?.message || 'something went wrong'))
    }

    return (
        <AuthLayout title='Create your shop account' subTitle='Start tracking repair jobs in under a minute.'>
            {isLoading && <Loading />}
            <Form layout='vertical' onFinish={onSubmitSignUpForm} requiredMark={false}>
                <FormFieldList fields={SignUpFields} />
                <button type='submit' className='button-primary button-lg w-full mt-2' disabled={isLoading}>
                    Create account
                </button>
            </Form>
            <p className='text-sm text-center text-[var(--muted)] mt-6'>
                Already have an account? <Link className='font-semibold text-[var(--primary)]' to='/login'>Log in</Link>
            </p>
        </AuthLayout>
    )
}

export default SignUp
