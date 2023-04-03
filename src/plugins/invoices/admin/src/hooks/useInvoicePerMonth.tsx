import { useEffect, useState } from "react";
import pluginId from "../pluginId";
import { request } from "@strapi/helper-plugin";
import { TInvoiceStatusModel } from "../models";

type TUseInvoicePerMonth = {
  currentYear: number;
  invoiceStatuses: TInvoiceStatusModel | null;
  month?: number;
  isLoading: boolean;

  isInit: boolean;
  renderKey?: boolean;
};

export const useInvoicesPerMonth = ({
  currentYear,
  invoiceStatuses,
  month,
  isLoading,
  isInit,
  renderKey,
}: TUseInvoicePerMonth) => {
  const [invoicesData, setInvoices] = useState([]);
  const invoicesRequest = async (
    currentYear: number,
    statuses: TInvoiceStatusModel | null
  ) => {
    if (statuses) {
      const { primary } = statuses;
      try {
        const invoicesData = await request(
          `/${pluginId}/invoices-per-month?year=${currentYear}&status=${primary.id}&month=${month}`,
          {
            method: "GET",
          }
        );
        setInvoices(invoicesData);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (!isLoading && isInit) {
      invoicesRequest(currentYear, invoiceStatuses);
    }
  }, [currentYear, isInit, isLoading, invoiceStatuses, renderKey]);

  return { invoicesData };
};
