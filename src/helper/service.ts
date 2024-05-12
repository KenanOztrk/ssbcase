

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { PageData } from '../types/types';
export const dataApi = createApi({
    reducerPath: 'dataListApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000/' }),
    tagTypes: ['PageData'],
    endpoints: (builder) => ({
        getDataList: builder.query<PageData[], void>({
            query: () => `pageData`,
            providesTags: ['PageData'],
        }),
    
        addDataItem: builder.mutation<PageData, PageData>({
            query: (body) => ({
                url: `pageData`,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['PageData'],
        }),
        updateDataItem: builder.mutation<PageData, { id: number; data: PageData }>({
            query: ({ id, data }) => ({
                url: `pageData/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['PageData'],
        }),
    }),
})

export const { useGetDataListQuery, useAddDataItemMutation, useUpdateDataItemMutation } = dataApi