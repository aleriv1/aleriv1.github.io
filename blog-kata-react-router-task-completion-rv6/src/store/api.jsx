import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const API_URL = 'https://blog-platform.kata.academy/api'

export const api = createApi({
  reducerPath: 'api',
  tagTypes: ['Articles', 'Article'],
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token')
      if (token) {
        headers.set('Authorization', `Token ${token}`)
      }
      return headers
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ email, password }) => ({
        url: '/users/login',
        method: 'POST',
        body: { user: { email, password } },
      }),
    }),
    register: builder.mutation({
      query: ({ username, email, password }) => ({
        url: '/users',
        method: 'POST',
        body: { user: { username, email, password } },
      }),
    }),
    updateUser: builder.mutation({
      query: (userData) => ({
        url: '/user',
        method: 'PUT',
        body: { user: userData },
      }),
    }),
    getArticles: builder.query({
      query: ({ page, limit }) => ({
        url: `/articles?limit=${limit}&offset=${(page - 1) * limit}`,
      }),
      providesTags: ['Articles'],
    }),
    getArticle: builder.query({
      query: (slug) => `/articles/${slug}`,
      providesTags: (result, error, slug) => [{ type: 'Article', id: slug }],
    }),
    createArticle: builder.mutation({
      query: (article) => ({
        url: '/articles',
        method: 'POST',
        body: { article },
      }),
      invalidatesTags: ['Articles'],
    }),
    updateArticle: builder.mutation({
      query: ({ slug, article }) => ({
        url: `/articles/${slug}`,
        method: 'PUT',
        body: { article },
      }),
      invalidatesTags: (result, error, { slug }) => ['Articles', { type: 'Article', id: slug }],
    }),
    deleteArticle: builder.mutation({
      query: (slug) => ({
        url: `/articles/${slug}`,
        method: 'DELETE',
      }),
    }),
    toggleFavorite: builder.mutation({
      query: ({ slug, favorited }) => ({
        url: `/articles/${slug}/favorite`,
        method: favorited ? 'DELETE' : 'POST',
      }),
      invalidatesTags: (result, error, { slug }) => ['Articles', { type: 'Article', id: slug }],
    }),
  }),
})

export const {
  useLoginMutation,
  useRegisterMutation,
  useUpdateUserMutation,
  useGetArticlesQuery,
  useGetArticleQuery,
  useCreateArticleMutation,
  useUpdateArticleMutation,
  useDeleteArticleMutation,
  useToggleFavoriteMutation,
} = api
