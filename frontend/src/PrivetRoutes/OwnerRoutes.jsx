import { Navigate, useLocation } from 'react-router-dom'
import { useGetProfileQuery } from '../Redux/Apis/authApi'
import { getToken } from '../Utils/token'
import Loading from '../Components/Shared/Loading'

const OwnerRoutes = ({ children }) => {
    const location = useLocation()
    const token = getToken()
    const { isLoading, isError } = useGetProfileQuery(undefined, { skip: !token })

    if (!token || isError) return <Navigate to='/login' state={location.pathname} replace />
    if (isLoading) return <Loading />
    return children
}

export default OwnerRoutes
