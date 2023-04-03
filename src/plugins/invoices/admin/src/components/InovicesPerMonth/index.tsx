/*
 *
 * HomePage
 *
 */

import React from "react";
import {
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  Box,
  LinkButton,
  Badge,
  Typography,
} from "@strapi/design-system";
import { TInvoiceModel, TInvoiceStatusModel } from "../../models";

type invoicesPerMonthProps = {
  invoiceData: TInvoiceModel;
  invoiceStatuses: TInvoiceStatusModel;
  currentYear: number;
};
const InvoicesPerMonth = ({
  invoiceData,
  invoiceStatuses,
  currentYear,
}: invoicesPerMonthProps) => {
  return (
    <Box background={"netural100"}>
      <Table colCount={2} rowCount={2}>
        <Thead>
          <Tr>
            <Th>
              <Typography fontWeight={"bold"} variant={"sigma"}>Month</Typography>
            </Th>
            <Th>
              <Typography fontWeight={"bold"} variant={"sigma"}>Number of Invoices</Typography>
            </Th>
            <Th>
              <Typography fontWeight={"bold"} variant={"sigma"}>Status</Typography>
            </Th>
            <Th>
              <Typography fontWeight={"bold"} variant={"sigma"}>Actions</Typography>
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {invoiceData?.length > 0 &&
            invoiceData?.map((singleInvoiceMonth: any, index: number) => (
              <Tr key={index}>
                <Td><Typography variant={"epsilon"}>{singleInvoiceMonth.month.name}</Typography></Td>
                <Td><Typography variant={"epsilon"}>{singleInvoiceMonth.invoices.length}</Typography></Td>
                <Td>
                  <Badge
                    size="M"
                    active={
                      singleInvoiceMonth.invoices?.length === 0 ? false : true
                    }
                  >
                    {singleInvoiceMonth.invoices?.length === 0
                      ? "No invoices"
                      : invoiceStatuses.primary.name}
                  </Badge>
                </Td>
                <Td>
                  <LinkButton
                    variant={singleInvoiceMonth.invoices?.length === 0 ? "tertiary" : "secondary"}
                    to={`/plugins/invoices/home/month/${singleInvoiceMonth.month.number}?year=${currentYear}&status=${invoiceStatuses.primary.id}`}
                  >
                    Check Invoices
                  </LinkButton>
                </Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default InvoicesPerMonth;
