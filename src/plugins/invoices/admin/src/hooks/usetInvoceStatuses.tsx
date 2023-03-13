import { useEffect, useState } from "react";
import pluginId from "../pluginId";
import { request } from "@strapi/helper-plugin";
import { TInvoiceStatusModel } from "../models";

type TInvoiceStatusesRes = {
  primary: {
    id: number;
    name: string;
  };
  statuses: {
    id: number;
    name: string;
  }[];
};
export const useInvoiceStatuses = () => {
  const [invoiceStatuses, setInvoiceStatuses] =
    useState<TInvoiceStatusModel | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isInit, setInit] = useState(false);
  const urlParams = new URLSearchParams(window.location.search);
  const urlParamId = urlParams.get("status");
  const [statusId, setStatusId] = useState(
    urlParamId ? parseInt(urlParamId) : null
  );
  const getInvoiceStatuses = async () => {
    try {
      setIsLoading(true);
      setInit(true);
      const invoicesData = await request(`/${pluginId}/statuses`, {
        method: "GET",
      });
      const currentPrimary = statusId
        ? invoicesData.statuses.find(
            (status: { id: number; name: string }) => status.id === statusId
          )
        : invoicesData.primary;
      setInvoiceStatuses({
        primary: currentPrimary,
        statuses: invoicesData.statuses,
      });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    getInvoiceStatuses();
  }, []);

  return { invoiceStatuses, setInvoiceStatuses, isLoading, isInit };
};
