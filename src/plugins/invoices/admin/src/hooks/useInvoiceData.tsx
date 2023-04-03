import { useEffect, useState } from "react";
import pluginId from "../pluginId";
import { request } from "@strapi/helper-plugin";
import { TInvoiceStatusModel } from "../models";

export const useInvoiceData = (
  currentYear: number,
  invoiceStatuses?: TInvoiceStatusModel,
  isLoading?: boolean,
  isInit?: boolean
) => {
  const [invoicesData, setInvoices] = useState([]);
  const invoicesRequest = async (currentYear: number, statuses: any) => {
    const { primary } = statuses;
    try {
      const invoicesData = await request(
        `/${pluginId}?year=${currentYear}&status=${primary.id}`,
        {
          method: "GET",
        }
      );
      setInvoices(invoicesData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!isLoading && isInit) {
      invoicesRequest(currentYear, invoiceStatuses);
    }
  }, [currentYear, isInit, isLoading, invoiceStatuses]);

  return { invoicesData };
};
