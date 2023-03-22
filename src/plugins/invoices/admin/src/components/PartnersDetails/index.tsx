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
  Typography,
  RawTable,
  Link,
} from "@strapi/design-system";
import { NavLink } from 'react-router-dom';

import { TPartnerModel } from "../../models";

type TPartners = {
  partner: TPartnerModel;
  index: number;
};
const PartnersDetails = ({ partner, index }: TPartners) => {
  return (
    <Box
    >
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
              <Th>
                <Typography variant={"delta"}></Typography>
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
              <Td><Link as={NavLink} to={`/content-manager/collectionType/api::partner.partner/${partner.id}`}>Edit</Link></Td>
            </Tr>
          </Tbody>
        </RawTable>
      </Box>
    </Box>
  );
};

export default PartnersDetails;
