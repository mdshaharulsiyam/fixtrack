import { baseApi } from '../BaseUrl'

const JOB_LIST = { type: 'job', id: 'LIST' }

const trackTag = (code) => (code ? [{ type: 'track', id: code.toUpperCase() }] : [])

const jobApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getJobs: builder.query({
            query: ({ page = 1, search = '', status = '' } = {}) => ({
                url: 'job/get-all',
                method: 'GET',
                params: {
                    page,
                    ...(search && { search }),
                    ...(status && { status }),
                },
            }),
            providesTags: (result) => [
                JOB_LIST,
                ...(result?.data || []).map(({ _id }) => ({ type: 'job', id: _id })),
            ],
        }),
        addJob: builder.mutation({
            query: (data) => ({
                url: 'job/create',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: (result, error) => (error ? [] : [JOB_LIST]),
        }),
        updateJob: builder.mutation({
            query: ({ id, data }) => ({
                url: `job/update/${id}`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: (result, error, { id }) => (error ? [] : [
                JOB_LIST,
                { type: 'job', id },
                ...trackTag(result?.data?.job_code),
            ]),
        }),
        updateJobStatus: builder.mutation({
            query: ({ id, status }) => ({
                url: `job/update-status/${id}`,
                method: 'PATCH',
                body: { status },
            }),
            // show the new status right away, roll back if the server rejects it
            onQueryStarted: async ({ id, status }, { dispatch, getState, queryFulfilled }) => {
                const patches = jobApi.util
                    .selectInvalidatedBy(getState(), [{ type: 'job', id }])
                    .filter(({ endpointName }) => endpointName === 'getJobs')
                    .map(({ originalArgs }) => dispatch(
                        jobApi.util.updateQueryData('getJobs', originalArgs, (draft) => {
                            const job = draft?.data?.find((item) => item._id === id)
                            if (job) job.status = status
                        }),
                    ))
                try {
                    await queryFulfilled
                } catch {
                    patches.forEach((patch) => patch.undo())
                }
            },
            // also revalidate on error: a 409 means our copy of the job is stale
            invalidatesTags: (result, error, { id }) => [
                JOB_LIST,
                { type: 'job', id },
                ...trackTag(result?.data?.job_code),
            ],
        }),
        trackJob: builder.query({
            query: (code) => ({
                url: `job/track/${encodeURIComponent(code)}`,
                method: 'GET',
            }),
            providesTags: (result, error, code) => trackTag(code),
        }),
    }),
})

export const {
    useGetJobsQuery,
    useAddJobMutation,
    useUpdateJobMutation,
    useUpdateJobStatusMutation,
    useTrackJobQuery,
} = jobApi
