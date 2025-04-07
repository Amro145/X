import { create } from "zustand"
import { myAxios } from "../lib/axios"
import toast from 'react-hot-toast';
import Swal from 'sweetalert2'

export const useAuthStore = create((set, get) => ({
    authUser: null,
    isSingingUp: false,
    isLogining: false,
    isUpdateingProfile: false,
    isCheckingAuth: true,
    gettingProfile: false,
    frindProfile: null,
    suggested: null,
    isisGetSuggested: false,
    isRefreshingAuth: true,
    refreshData: null,
    isFollowing: false,
    isGettingPost: false,
    isGettingOnePost: false,
    allPost: [],
    followingPost: [],
    onePost: [],
    isCreateingPost: false,
    isLogOut: false,
    isCommenting: false,
    likeStatus: false,
    notifiction: [],
    isGettingNotifiction: false,
    checkLike: [],

    checkAuth: async () => {
        set({ isCheckingAuth: true })
        try {
            const res = await myAxios.get("/auth/check")
            set({ authUser: res.data.user })
        } catch (error) {
            // console.log(error.response.data.message)
            toast.error(error.response.data.message)
            set({ authUser: null })
        }
        finally {
            set({ isCheckingAuth: false })
        }
    },
    refreshAuth: async () => {
        set({ isRefreshingAuth: true })
        try {
            const res = await myAxios.get("/auth/check")
            set({ refreshData: res.data.user })
        } catch (error) {
            // console.log(error.response.data.message)
            toast.error(error.response.data.message)
            set({ refreshData: null })
        }
        finally {
            set({ isRefreshingAuth: false })
        }
    },
    singup: async (data) => {
        set({ isSingingUp: true })
        try {
            const res = await myAxios.post("/auth/singup", data)
            set({ authUser: res.data.newUser })
            // console.log(res.data);
            toast.success("Hello")
        } catch (error) {
            // console.log(error.response.data.message)
            toast.error(error.response.data.message)
        }
        finally {
            set({ isSingingUp: false })
        }
    },
    login: async (data) => {
        set({ isLogining: true })
        try {
            const res = await myAxios.post("/auth/login", data)
            set({ authUser: res.data.user })
            toast.success("Hello")
        } catch (error) {
            // console.log(error.response.data.message)
            toast.error(error.response.data.message)

        }
        finally {
            set({ isLogining: false })
        }
    },
    logout: async () => {
        set({ isLogOut: true })
        try {
            await myAxios.post("auth/logout")
            set({ authUser: null })
        } catch (error) {
            console.log(error.response.data.message)
        } finally {
            set({ isLogOut: false })

        }
    },
    suggestedUserFn: async () => {
        set({ isGetSuggested: true })
        try {
            const res = await myAxios.get("users/suggested")
            set({
                suggested: res.data
            })
        } catch (error) {
            // console.log(error.response.data.message)
            toast.error(error.response.data.message)

        }
        finally {
            set({ isGetSuggested: false })
        }
    },
    getProfileFn: async (userName) => {
        set({ gettingProfile: true })
        try {
            const res = await myAxios.get(`/users/profile/${userName}`)
            set({ frindProfile: res.data })
            // console.log("profile:", res.data.user)

        } catch (error) {
            // console.log(error.response.data.message)
            toast.error(error.response.data.message)
        }
        finally {
            set({ gettingProfile: false })
        }
    },
    followFn: async (id) => {
        const { refreshAuth } = get()
        set({ isFollowing: true })
        try {
            const { isRefreshingAuth } = get()
            await myAxios.post(`users/follow/${id}`)
            refreshAuth()
            if (!isRefreshingAuth) {
                // console.log(refreshData);
            }
        } catch (error) {
            // console.log(error.response.data.message)
            toast.error(error.response.data.message)
        } finally {
            set({ isFollowing: false })

        }
    },
    allPostFn: async () => {
        set({ isGettingPost: true })
        try {
            const res = await myAxios.get("/post/all")
            set({ allPost: res.data.posts })
            set({
                checkLike: res.data.postsToCheckLike
            })

        } catch (error) {
            console.log(error.response.data.message);


        } finally {
            set({ isGettingPost: false })

        }
    },
    followingPostFn: async () => {
        set({ isGettingPost: true })
        try {
            const res = await myAxios.get("/post/following")
            set({ allPost: res.data.followingPosts })
            // console.log("followingPost");

        } catch (error) {
            // console.log(error.response.data.message)
            toast.error(error.response.data.message);


        } finally {
            set({ isGettingPost: false })

        }


    },
    userPostFn: async (userId) => {
        set({ isGettingPost: true })
        try {
            const res = await myAxios.get(`/post/user/${userId}`)
            set({ allPost: res.data.userPosts })
            // console.log("userPostFn");
        } catch (error) {

            console.log(error.response.data.message)

        }
        finally {
            set({ isGettingPost: false })

        }

    },
    onePostFn: async (postId) => {
        set({ isGettingOnePost: true })
        try {
            const res = await myAxios.get(`post/${postId}`)
            useAuthStore.setState(state => ({
                post: { ...state.post, ...res.data.post }
            }));
            // console.log(res.data.post);


        } catch (error) {
            // console.log(error.response.data.message)
            toast.error(error.response.data.message);

        } finally {
            set({ isGettingOnePost: false })

        }
    },
    deletePostFn: async (postId) => {
        const { checkAuth } = get()
        try {
            const result = await Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            });

            if (result.isConfirmed) {
                await myAxios.delete(`/post/${postId}`);
                checkAuth();
                await Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
            }

        } catch (error) {
            // console.log(error.response.data.message)
            toast.error(error.response.data.message);
        }
    },
    updateProfileFn: async (data) => {
        const { logout } = get()
        // set({ isUpdateingProfile: true })
        try {
            const res = await myAxios.put("/users/updateProfile", data)
            set({ frindProfile: res.data })
            set({ authUser: res.data })
            logout()

        } catch (error) {

            // console.log(error.response.data.message)
            toast.error(error.response.data.message);

        } finally {
            set({ isUpdateingProfile: false })

        }
    },
    updatePasswordFn: async (data) => {
        const { logout } = get()
        set({ isUpdateingProfile: true })
        try {
            const res = await myAxios.put("/users/updatePassword", data)
            set({ frindProfile: res.data })
            set({ authUser: res.data })
            // console.log( "updatePasswordFn");

            logout()

        } catch (error) {

            // console.log(error.response.data.message)
            toast.error(error.response.data.message);


        } finally {
            set({ isUpdateingProfile: false })

        }
    },
    createPostFn: async (data) => {
        set({ isCreateingPost: true });
        try {
            const res = await myAxios.post("/post/createpost", data);
            set((state) => ({
                allPost: [res.data.newPost, ...state.allPost], // Fix: Append new post
            }));
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isCreateingPost: false });
        }
    },
    addCommentFn: async (postId, data) => {
        set({ isCommenting: true })
        try {
            const res = await myAxios.post(`post/comment/${postId}`, data, { timeout: 10000, })
            set({ allPost: res.data.posts })
            // console.log(allPost);

        } catch (error) {
            // console.log(error.response.data.message)
            toast.error(error.response.data.message);

        } finally {
            set({ isCommenting: false })

        }
    },
    likeUnLikeFn: async (postId) => {
        try {
            const res = await myAxios.put(`post/like/${postId}`)
            set({
                allPost: res.data.posts
            })
            set({
                checkLike: res.data.postsToCheckLike
            })
        } catch (error) {
            // console.log(error.response.data.message)
            toast.error(error.response.data.message);

        }

    },
    notifictionFn: async () => {
        set({ isGettingNotifiction: true })
        try {
            const res = await myAxios.get("notifiction")
            set({ notifiction: res.data })
            // console.log(notifiction);

        } catch (error) {
            // console.log(error.response.data.message)
            toast.error(error.response.data.message);

        } finally {
            set({ isGettingNotifiction: false })

        }
    },
    deleteNotifictionFn: async (notifictionId) => {
        try {
            const { notifictionFn } = get()
            const res = await myAxios.delete(`notifiction/${notifictionId}`)
            set({ notifiction: res.data })
            notifictionFn()

        } catch (error) {
            // console.log(error.response.data.message)
            toast.error(error.response.data.message);

        }
    },
    deleteAllNotifictionFn: async () => {
        try {
            const { notifictionFn } = get()
            await myAxios.delete(`notifiction/`)
            set({ notifiction: [] })
            notifictionFn()
        } catch (error) {
            // console.log(error.response.data.message)
            toast.error(error.response.data.message);

        }
    },

}
))
