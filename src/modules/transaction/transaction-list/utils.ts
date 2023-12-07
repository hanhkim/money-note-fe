import transactionService from "@/services/transaction.service";

export const useGetCategoryById = () => {
  const handleGet = async () => {
    const data = await transactionService.getCategoryById(
      "823f664e-1ec8-4351-b88c-45fe6ccf2860"
    );
  };

  handleGet();
};
