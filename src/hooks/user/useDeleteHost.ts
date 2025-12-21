/* eslint-disable @typescript-eslint/no-explicit-any */
import { privateApi } from '@/lib/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query'; 
import toast from 'react-hot-toast'; 

export const useDeleteHost = () => {
    const queryClient = useQueryClient();

    return useMutation({
        // fetch এর বদলে axios instance ব্যবহার করা হয়েছে
        mutationFn: async (hostId: string) => {
            const res = await privateApi.delete(`/api/user/delete-host/${hostId}`, {
                withCredentials: true,
            });
            return res.data;
        },
        onSuccess: () => { 
            queryClient.invalidateQueries({ queryKey: ['all-hosts'] }); 
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || error.message || 'Something went wrong');
        },
    });
};