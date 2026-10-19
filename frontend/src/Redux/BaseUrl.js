import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { url } from '../Utils/BaseUrl'
import { getToken } from '../Utils/token'

export const baseApi = createApi({
    reducerPath: 'fixtrack',
    baseQuery: fetchBaseQuery({
        baseUrl: url,
        prepareHeaders: (headers) => {
            const token = getToken()
            if (token) headers.set('Authorization', `Bearer ${token}`)
            return headers
        },
    }),
    refetchOnFocus: true,
    refetchOnReconnect: true,
    endpoints: () => ({}),
    tagTypes: ['auth', 'job', 'track'],
})
