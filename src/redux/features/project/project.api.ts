import { api } from "@/redux/api/appSlice";
import { IProject, IProjects } from "@/types/project";
import { IShape } from "@/types/shape";

const projectApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Create blog post
    createProject: builder.mutation({
      query: (payload) => ({
        url: "/project/create",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["project"],
    }),
    getProject: builder.query<{ data: IProject | null }, string>({
      query: (id) => {
        return {
          url: `/project/get/${id}`,
          method: "GET",
        };
      },
      keepUnusedDataFor: 0,
      providesTags: ["project"],
    }),
    getProjects: builder.query<{ data: IProjects[] | [] }, undefined>({
      query: () => {
        return {
          url: `/project/all`,
          method: "GET",
        };
      },
      providesTags: ["project"],
    }),
    updateProjectShape: builder.mutation({
      query: ({ id, shapes }: { id: string; shapes: IShape[] | [] }) => ({
        url: `/project/update/${id}`,
        method: "PATCH",
        body: shapes,
      }),
    }),
    uploadImage: builder.mutation<{ data: string }, FormData>({
      query: (file) => ({
        url: `/project/upload/image`,
        method: "POST",
        body: file,
      }),
      invalidatesTags: ["image"],
    }),
    getImages: builder.query<{ data: { url: string }[] }, undefined>({
      query: () => ({
        url: `/project/images`,
        method: "GET",
      }),
      providesTags: ["image"],
    }),
  }),
});
export const {
  useGetProjectQuery,
  useUpdateProjectShapeMutation,
  useUploadImageMutation,
  useCreateProjectMutation,
  useGetImagesQuery,
  useGetProjectsQuery,
} = projectApi;
