import { baseApi } from '../BaseUrl'
import { setToken } from '../../Utils/token'

// the token has to be saved before the cache is revalidated, otherwise the
// refetched queries go out without the Authorization header
const saveTokenAndRevalidate = async (_, { dispatch, queryFulfilled }) => {
    try {
        const { data } = await queryFulfilled
        if (data?.token) setToken(data.token)
        dispatch(baseApi.util.invalidateTags(['auth', 'job']))
    } catch {
        // the component shows the error toast
    }
}

const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        loginUser: builder.mutation({
            query: (data) => ({
                url: 'auth/sign-in',
                method: 'POST',
                body: data,
            }),
            onQueryStarted: saveTokenAndRevalidate,
        }),
        signUpUser: builder.mutation({
            query: (data) => ({
                url: 'auth/sign-up',
                method: 'POST',
                body: data,
            }),
            onQueryStarted: saveTokenAndRevalidate,
        }),
        getProfile: builder.query({
            query: () => ({
                url: 'auth/profile',
                method: 'GET',
            }),
            providesTags: ['auth'],
        }),
    }),
})

export const {
    useLoginUserMutation,
    useSignUpUserMutation,
    useGetProfileQuery,
} = authApi
