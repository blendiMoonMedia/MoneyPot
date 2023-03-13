/*
 *
 * HomePage
 *
 */
import React, { useEffect, useState } from "react";
import {
  BaseHeaderLayout,
  Layout,
  ContentLayout,
  Box,
  EmptyStateLayout,
  Grid,
  GridItem,
  Breadcrumbs,
  Crumb,
  Typography,
} from "@strapi/design-system";
import { Cross } from "@strapi/icons";
import { useInvoiceStatuses } from "../../hooks/usetInvoceStatuses";
import InvoicesStatusPicker from "../../components/InvoicesStatusPicker";
import { useInvoicesPerMonth } from "../../hooks/useInvoicePerMonth";
import { useParams } from "react-router-dom";
import { TUrlParams } from "../../models";
import InvoicesDatePicker from "../../components/InvoicesDatePicker";
import Partners from "../../components/Partners";

const Month = () => {
  const { id }: TUrlParams = useParams();
  const month = parseInt(id);
  const currentDate = new Date();
  const urlParams = new URLSearchParams(window.location.search);
  const urlYear = urlParams.get("year");
  let statusId = urlParams.get("status")
    ? parseInt(urlParams.get("status") ?? "1")
    : 1;
  const [currentYear, setCurrentYear] = useState(
    urlYear ? parseInt(urlYear) : currentDate.getFullYear()
  );
  const monthName = new Date(currentYear, month - 1).toLocaleString("default", {
    month: "long",
  });
  const { invoiceStatuses, setInvoiceStatuses, isLoading, isInit } =
    useInvoiceStatuses();

  const { invoicesData } = useInvoicesPerMonth({
    currentYear,
    invoiceStatuses,
    month,
    isLoading,
    isInit,
  });

  return (
    <Layout>
      <Box paddingTop={8} paddingBottom={8}>
        <ContentLayout>
          <Box paddingBottom={2}>
            <Breadcrumbs label="Category model, name field">
              <Crumb>Invoices</Crumb>
              <Crumb>{currentYear}</Crumb>
              <Crumb>{monthName}</Crumb>
            </Breadcrumbs>
          </Box>
          <Typography variant="alpha">{`Invoices for ${monthName}`}</Typography>
        </ContentLayout>
      </Box>

      <ContentLayout>
        <Grid gridCols={2}>
          <GridItem col={1}>
            {invoiceStatuses && (
              <InvoicesStatusPicker
                invoiceStatuses={invoiceStatuses}
                setInvoiceStatues={setInvoiceStatuses}
              />
            )}
          </GridItem>
          <GridItem col={1}>
            <InvoicesDatePicker
              currentYear={currentYear}
              setCurrentYear={setCurrentYear}
            />
          </GridItem>
        </Grid>
        <Box paddingBottom={8}>
          {invoicesData?.length > 0 && invoiceStatuses ? (
            <Partners
              invoiceData={invoicesData}
              invoiceStatuses={invoiceStatuses}
            />
          ) : (
            <EmptyStateLayout
              content="You don't have any invoices yet."
              icon={<Cross />}
            />
          )}
        </Box>
        <Box paddingBottom={8}></Box>
      </ContentLayout>
    </Layout>
  );
};

export default Month;
