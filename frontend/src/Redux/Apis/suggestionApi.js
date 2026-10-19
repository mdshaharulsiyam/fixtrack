import { baseApi } from '../BaseUrl'

const suggestionApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        suggestRepair: builder.mutation({
            query: (complaint) => ({
                url: 'suggestion/repair',
                method: 'POST',
                body: { complaint },
            }),
        }),
    }),
})

export const {
    useSuggestRepairMutation,
} = suggestionApi
