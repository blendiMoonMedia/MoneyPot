import { useEffect, useState } from "react";
import pluginId from "../pluginId";
import { request } from "@strapi/helper-plugin";
import { TInvoiceStatusModel } from "../models";

export const useInvoiceStatuses = (revenueIssues?: boolean) => {
  const [invoiceStatuses, setInvoiceStatuses] =
    useState<TInvoiceStatusModel | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [isInit, setInit] = useState(false);
  const urlParams = new URLSearchParams(window.location.search);
  const urlParamId = urlParams.get("status");
  const [statusId, setStatusId] = useState(
    urlParamId ? parseInt(urlParamId) : null
  );
  const getInvoiceStatuses = async () => {
    try {
      let currentPrimary = null;
      setIsLoading(true);
      setInit(true);
      const invoicesData = await request(
        `/${pluginId}/statuses?invoice_statuses=${revenueIssues ?? false}`,
        {
          method: "GET",
        }
      );
      if (!revenueIssues) {
        currentPrimary = statusId
          ? invoicesData.statuses.find(
              (status: { id: number; name: string }) => status.id === statusId
            )
          : invoicesData.primary;
      } else {
        currentPrimary = revenueIssues
          ? invoicesData.statuses.find(
              (status: { isErrorStatus: boolean; name: string }) =>
                status.isErrorStatus === true
            )
          : invoicesData.primary;
      }

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

  return { invoiceStatuses, setInvoiceStatuses, isLoading, isInit, setInit };
};
