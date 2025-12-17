import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createEventServerAction } from '@/services/event/createEvent'

export const useCreateEvent = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (formData: FormData) =>
      createEventServerAction(formData),

    onSuccess: (data) => {
      if (data.success) {
        queryClient.invalidateQueries({
          queryKey: ['my-events'],
        })
      }
    },
  })
}
