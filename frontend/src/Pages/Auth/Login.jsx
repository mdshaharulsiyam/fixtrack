import { Form } from 'antd'
import toast from 'react-hot-toast'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useGetProfileQuery, useLoginUserMutation } from '../../Redux/Apis/authApi'
import { LoginFields } from '../../Utils/FormFields/Login'
import { getToken } from '../../Utils/token'
import AuthLayout from '../../Layout/AuthLayout'
import FormFieldList from '../../Components/Shared/FormFieldList'
import Loading from '../../Components/Shared/Loading'

const Login = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const token = getToken()
    const { data: profile } = useGetProfileQuery(undefined, { skip: !token })
    const [loginUser, { isLoading }] = useLoginUserMutation()
    const redirectTo = location.state || '/jobs'

    if (token && profile?.data) return <Navigate to={redirectTo} replace />

    const onSubmitLoginForm = (value) => {
        loginUser(value).unwrap()
            .then((res) => {
                toast.success(res.message || 'logged in successfully')
                navigate(redirectTo, { replace: true })
            })
            .catch((err) => toast.error(err?.data?.message || 'something went wrong'))
    }

    return (
        <AuthLayout title='Welcome back' subTitle='Log in to manage your shop’s repair jobs.'>
            {isLoading && <Loading />}
            <Form layout='vertical' onFinish={onSubmitLoginForm} requiredMark={false}>
                <FormFieldList fields={LoginFields} />
                <button type='submit' className='button-primary button-lg w-full mt-2' disabled={isLoading}>
                    Log in
                </button>
            </Form>
            <p className='text-sm text-center text-[var(--muted)] mt-6'>
                New to FixTrack? <Link className='font-semibold text-[var(--primary)]' to='/sign-up'>Create a shop account</Link>
            </p>
            <div className='mt-8 pt-6 border-t border-[var(--line)] text-center'>
                <p className='text-sm text-[var(--muted)]'>Waiting for a repair?</p>
                <Link className='button-secondary button-sm mt-3' to='/track'>Track your repair status</Link>
            </div>
        </AuthLayout>
    )
}

export default Login
