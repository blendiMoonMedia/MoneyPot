/*
 *
 * HomePage
 *
 */

import React from 'react';
import {
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  Box,
  LinkButton
} from '@strapi/design-system';
import {TInvoiceModel, TInvoiceStatusModel} from "../../models";

type invoicesPerMonthProps = {
  invoiceData: TInvoiceModel,
  invoiceStatuses: TInvoiceStatusModel
  currentYear: number
}
const InvoicesPerMonth = ({invoiceData, invoiceStatuses, currentYear}: invoicesPerMonthProps) => {
  return (
    <Box paddingBottom={4} background={"netural100"}>
      <Table colCount={2} rowCount={2}>
        <Thead>
          <Tr>
            <Th>Month</Th>
            <Th>Number of Invoices</Th>
            <Th>Status</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {invoiceData?.length > 0 && invoiceData?.map((singleInvoiceMonth: any, index: number) => (
            <Tr key={index}>
              <Td>{singleInvoiceMonth.month.name}</Td>
              <Td>{singleInvoiceMonth.invoices.length}</Td>
              <Td><span style={{
                color: singleInvoiceMonth.invoices?.length === 0 ? "green" : "red",
              }}>{singleInvoiceMonth.invoices?.length === 0 ? 'No invoices' : invoiceStatuses.primary.name}</span></Td>
              <Td><LinkButton to={`/plugins/invoices/month/${singleInvoiceMonth.month.number}?year=${currentYear}&status=${invoiceStatuses.primary.id}`}>Check Invoices</LinkButton></Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>

  );
};

export default InvoicesPerMonth;
