import { useGetProfileQuery } from '../Redux/Apis/authApi'
import { getToken } from './token'

export const useCurrentOwner = () => {
    const token = getToken()
    const { data } = useGetProfileQuery(undefined, { skip: !token })
    return token ? data?.data || null : null
}
