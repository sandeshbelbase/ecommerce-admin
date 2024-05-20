import { useMutation, useQueryClient } from "react-query";
import { addProduct } from "../components/helpers/firebase";

export const useAddEditProduct = () => {
  const queryClient = useQueryClient();
  return useMutation(addProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries("product");
    },
  });
};
