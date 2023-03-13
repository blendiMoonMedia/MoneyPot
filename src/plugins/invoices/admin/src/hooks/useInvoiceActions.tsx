import { useEffect, useState } from "react";
import pluginId from "../pluginId";
import { request } from "@strapi/helper-plugin";

export const useInvoiceActions = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const editInvoices = async (id: number, data: any) => {
    try {
      setIsUpdating(true);
      await request(`/${pluginId}/${id}`, {
        method: "PUT",
        body: {
          data
        },
      });
      setIsUpdating(false);
    } catch (error) {
      console.log(error);
    }
  };

  return { editInvoices, isUpdating };
};
