/*
 *
 * HomePage
 *
 */
import React, { useState } from "react";
import {
  Layout,
  ContentLayout,
  Box,
  EmptyStateLayout,
  Grid,
  GridItem,
  Breadcrumbs,
  Crumb,
  Typography,
  SearchForm,
  Searchbar,
} from "@strapi/design-system";
import { Cross } from "@strapi/icons";
import { useInvoiceStatuses } from "../../hooks/usetInvoceStatuses";
import InvoicesStatusPicker from "../../components/InvoicesStatusPicker";
import { useInvoicesPerMonth } from "../../hooks/useInvoicePerMonth";
import { useParams } from "react-router-dom";
import { TInvoiceModel, TUrlParams } from "../../models";
import Partners from "../../components/Partners";

type TMonthModel = {
  revenueIssue?: boolean;
};

const Month = ({ revenueIssue }: TMonthModel) => {
  const { id }: TUrlParams = useParams();
  const month = revenueIssue ? 0 : parseInt(id);
  const currentDate = new Date();
  const urlParams = new URLSearchParams(window.location.search);
  const urlYear = urlParams.get("year");
  const [renderKey, setRenderKey] = useState(false);

  const [currentYear, setCurrentYear] = useState(
    urlYear ? parseInt(urlYear) : currentDate.getFullYear()
  );

  const monthName = revenueIssue
    ? null
    : new Date(currentYear, month - 1).toLocaleString("default", {
        month: "long",
      });
  const { invoiceStatuses, setInvoiceStatuses, isLoading, isInit } =
    useInvoiceStatuses(revenueIssue);
  const [searchValue, setSearchValue] = useState("");
  const { invoicesData } = useInvoicesPerMonth({
    currentYear,
    invoiceStatuses,
    month,
    isLoading,
    isInit,
    renderKey,
  });
  const [invoiceSearchData, setInvoiceSearchData] = useState<TInvoiceModel>([]);

  const handleSearch = (e: any) => {
    let results: TInvoiceModel = [];
    if (invoicesData) {
      for (let i = 0; i < invoicesData.length; i++) {
        //@ts-ignore
        let matchesPartner = invoicesData[i].partner.name
          .toLowerCase()
          .includes(e.target.value.toLowerCase());
        if (matchesPartner) {
          results.push(invoicesData[i]);
        }
      }
    }

    setInvoiceSearchData(results ?? []);

    setSearchValue(e.target.value);
  };

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
        </Grid>
        <div className={"w-25 py-4 px-2"}>
          <SearchForm>
            <Searchbar
              name="searchbar"
              onClear={() => setSearchValue("")}
              value={searchValue}
              onChange={handleSearch}
              clearLabel="Clearing the plugin search"
              placeholder="Search partner"
            >
              Searching for a plugin
            </Searchbar>
          </SearchForm>
        </div>
        <Box paddingBottom={8}>
          {invoicesData?.length > 0 && invoiceStatuses ? (
            <Partners
              invoiceData={
                invoiceSearchData.length > 0 ? invoiceSearchData : invoicesData
              }
              invoiceStatuses={invoiceStatuses}
              setRenderKey={setRenderKey}
              renderKey={renderKey}
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

export default Month;
