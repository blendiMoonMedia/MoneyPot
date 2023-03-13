/*
 *
 * HomePage
 *
 */

import React, { useState } from "react";
import {
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  Box,
  Accordion,
  AccordionToggle,
  AccordionContent,
  Typography,
  Grid,
  Table,
  RawTable,
  Select,
  Option,
} from "@strapi/design-system";
import { TInvoiceModel, TInvoiceStatusModel } from "../../models";
import PartnersDetails from "../PartnersDetails";
import PartnersAffiliate from "../ParntersAffiliate";
import { useInvoiceActions } from "../../hooks/useInvoiceActions";

type TPartners = {
  invoiceData: TInvoiceModel;
  invoiceStatuses: TInvoiceStatusModel;
};
const Partners = ({ invoiceData, invoiceStatuses }: TPartners) => {
  const [expandedID, setExpandedID] = useState(null);
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const { editInvoices, isUpdating } = useInvoiceActions();

  const handleToggle = (id: any) => () => {
    setExpandedID((s) => (s === id ? null : id));
  };

  console.log(invoiceData);
  return (
    <Box paddingBottom={4} background={"netural100"}>
      <Grid gridCols={1} gap={8}>
        {invoiceData?.length > 0 &&
          invoiceData?.map((singleInvoiceMonth: any, index: number) => (
            <Box
              padding={4}
              hasRadius
              background="neutral0"
              shadow="tableShadow"
              key={index}
            >
              <Accordion
                expanded={expandedID === `acc-${index}`}
                onToggle={handleToggle(`acc-${index}`)}
                size="S"
              >
                <AccordionToggle
                  title={`${singleInvoiceMonth.partner.name}  ${singleInvoiceMonth.partner.partner_priority.name}`}
                />
                <AccordionContent>
                  <PartnersDetails
                    partner={singleInvoiceMonth.partner}
                    index={index}
                  />
                  <PartnersAffiliate
                    partner={singleInvoiceMonth.partner}
                    index={index}
                  />
                </AccordionContent>
              </Accordion>
              <Box
                marginLeft={2}
                marginRight={2}
                marginTop={4}
                hasRadius={true}
                marginBottom={4}
                background="neutral100"
                shadow="filterShadow"
              >
                <Table colCount={20} rowCount={6}>
                  <Thead>
                    <Tr>
                      <Th>
                        <Typography variant={"delta"}>Invoice name</Typography>
                      </Th>
                      <Th>
                        <Typography variant={"delta"}>Aff. Site</Typography>
                      </Th>
                      <Th>
                        <Typography variant={"delta"}>For Period</Typography>
                      </Th>
                      <Th>
                        <Typography variant={"delta"}>Casino</Typography>
                      </Th>
                      <Th>
                        <Typography variant={"delta"}>Payment Type</Typography>
                      </Th>
                      <Th>
                        <Typography variant={"delta"}>Amount</Typography>
                      </Th>
                      <Th>
                        <Typography variant={"delta"}>Status</Typography>
                      </Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {singleInvoiceMonth.invoices.map(
                      (singleInvoice: any, index: number) => (
                        <Tr key={index}>
                          <Td>{singleInvoice.name}</Td>
                          <Td>{singleInvoice.affiliate_site?.name ?? false}</Td>
                          <Td>{singleInvoice.BillingMonth}</Td>
                          <Td>{singleInvoice.casino?.name}</Td>
                          <Td>{singleInvoice.payment_type?.name}</Td>
                          <Td>{`${singleInvoice.amount} ${singleInvoice?.currency?.name}(${singleInvoice.currency?.symbol})`}</Td>
                          <Td>
                            {invoiceStatuses.primary && (
                              <Select
                                placeholder="Choose a status"
                                error={error}
                                value={singleInvoice.invoice_status.id}
                                onChange={(e: number) => {
                                  editInvoices(singleInvoice.id, {
                                    invoice_status: e,
                                  });
                                  singleInvoice.invoice_status.id = e;
                                }}
                                disabled={disabled}
                              >
                                {invoiceStatuses.statuses.map(
                                  (singleStatus: any) => (
                                    <Option
                                      key={singleStatus.id}
                                      value={singleStatus.id}
                                    >
                                      {singleStatus.name}
                                    </Option>
                                  )
                                )}
                              </Select>
                            )}
                          </Td>
                        </Tr>
                      )
                    )}
                  </Tbody>
                </Table>
              </Box>
            </Box>
          ))}
      </Grid>
    </Box>
  );
};

export default Partners;
