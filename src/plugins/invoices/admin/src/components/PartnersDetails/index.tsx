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
  RawTable,
} from "@strapi/design-system";
import { TPartnerModel } from "../../models";

type TPartners = {
  partner: TPartnerModel;
  index: number;
};
const PartnersDetails = ({ partner, index }: TPartners) => {
  return (
    <>
      <Box padding={3}>
        <Typography variant={"delta"}>Partners Details</Typography>
      </Box>
      <Box
        marginLeft={2}
        marginRight={2}
        hasRadius={true}
        marginBottom={8}
        background="neutral100"
        shadow="filterShadow"
        borderColor="neutral200"
      >
        <RawTable
          style={{
            margin: "16px",
          }}
        >
          <Thead>
            <Tr>
              <Th>
                <Typography variant={"delta"}>Company Name</Typography>
              </Th>
              <Th>
                <Typography variant={"delta"}>Address</Typography>
              </Th>
              <Th>
                <Typography variant={"delta"}>Reg. Number</Typography>
              </Th>
              <Th>
                <Typography variant={"delta"}>Tax. Number</Typography>
              </Th>
              <Th>
                <Typography variant={"delta"}>Invoice To</Typography>
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>{partner.CompanyName}</Td>
              <Td>{partner.address}</Td>
              <Td>{partner.RegNumber ?? "N/A"}</Td>
              <Td>{partner.TaxNumber ?? "N/A"}</Td>
              <Td>{partner.InvoiceTo ?? "N/A"}</Td>
            </Tr>
          </Tbody>
        </RawTable>
      </Box>
    </>
  );
};

export default PartnersDetails;
