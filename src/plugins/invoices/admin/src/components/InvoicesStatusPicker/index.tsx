/*
 *
 * HomePage
 *
 */

import React, { useState } from "react";
import {
  Grid,
  Typography,
  Select,
  Option,
  GridItem,
  Box,

} from "@strapi/design-system";
import { TInvoiceStatusModel } from "../../models";

type InvoicesStatusPickerProps = {
  invoiceStatuses: TInvoiceStatusModel;
  setInvoiceStatues: (statuses: any) => void;
};
const InvoicesDatePicker = ({
  invoiceStatuses,
  setInvoiceStatues,
}: InvoicesStatusPickerProps) => {
  const [error, toggleError] = useState();
  const [disabled, toggleDisabled] = useState();

  const handleStatusChange = (statusId: number) => {
    const selectedStatus = invoiceStatuses.statuses.find(
      (status: { id: number; name: string }) => status.id === statusId
    );
    setInvoiceStatues((prevStatuses: TInvoiceStatusModel) => ({
      ...prevStatuses,
      primary: selectedStatus,
    }));
  };

  return (
    <Box paddingBottom={4} background={"netural100"}>
      <Grid gap={10} gridCols={2}>
        <GridItem>
          <Box paddingBottom={4}>
            <Typography paddingBottom={4}>Invoices Status</Typography>
          </Box>
          {invoiceStatuses.primary && (
            <Select
              placeholder="Choose Year"
              error={error}
              value={invoiceStatuses.primary.id}
              onChange={handleStatusChange}
              disabled={disabled}
            >
              {invoiceStatuses.statuses.map((singleStatus: any) => (
                <Option key={singleStatus.id} value={singleStatus.id}>
                  {singleStatus.name}
                </Option>
              ))}
            </Select>
          )}
        </GridItem>
      </Grid>
    </Box>
  );
};

export default InvoicesDatePicker;
