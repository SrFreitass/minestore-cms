import { TCategories } from "@/types/categories"
import { AxiosInstance } from "axios"

type ReturnType = TCategories

export const getCategories = (fetcher: AxiosInstance) =>
   async () => {
      const url = "/categories/get"
      return (await fetcher.post<ReturnType>(url)).data
   }
