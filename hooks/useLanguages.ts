import { getLanguages } from "@/services/language.service"
import { useQuery } from "@tanstack/react-query"


export const useGetLanguages = () => {
    return useQuery({
        queryKey: ["get-languages"],
        queryFn: getLanguages
    })
}