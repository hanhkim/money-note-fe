import categoryService from "@/services/category.service";
import { useQuery } from "@tanstack/react-query";

export const useGetCategoryList = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["getCategoryList"],
    queryFn: () => categoryService.getCategories(),
    retry: 3,
  });

  return { categories: data, isLoading };
};
