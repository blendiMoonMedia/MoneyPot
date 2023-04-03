/*
 *
 * HomePage
 *
 */
import React, { useState } from "react";
import {
  BaseHeaderLayout,
  Layout,
  ContentLayout,
  Box,
  EmptyStateLayout,
  Grid,
  GridItem,
} from "@strapi/design-system";
import { Cross } from "@strapi/icons";
import InvoicesDatePicker from "../../components/InvoicesDatePicker";
import { useInvoiceData } from "../../hooks/useInvoiceData";
import InvoicesPerMonth from "../../components/InovicesPerMonth";
import { useInvoiceStatuses } from "../../hooks/usetInvoceStatuses";
import InvoicesStatusPicker from "../../components/InvoicesStatusPicker";
import { TInvoiceModel, TInvoicesPerMonthModel } from "../../models";

const HomePage = () => {
  const currentDate = new Date();
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
  const { invoiceStatuses, setInvoiceStatuses, isLoading, isInit } =
    useInvoiceStatuses();
  const { invoicesData } = useInvoiceData(
    currentYear,
    invoiceStatuses,
    isLoading,
    isInit
  );
  return (
    <Layout>
      <BaseHeaderLayout title="Invoices" as="h2" />
      <ContentLayout>
        <Grid gap={5} gridCols={2}>
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
            <InvoicesPerMonth
              invoiceData={invoicesData}
              invoiceStatuses={invoiceStatuses}
              currentYear={currentYear}
            />
          ) : (
            <EmptyStateLayout
              content="You don't have any invoices yet."
              icon={<Cross />}
            />
          )}
        </Box>
      </ContentLayout>
    </Layout>
  );
};

export default HomePage;
