import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { baseApi } from '../Redux/BaseUrl'
import { removeToken } from './token'

export const useLogout = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    return () => {
        removeToken()
        dispatch(baseApi.util.resetApiState())
        navigate('/')
    }
}
