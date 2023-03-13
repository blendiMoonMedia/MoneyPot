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
const PartnersAffiliate = ({ partner, index }: TPartners) => {
  return (
    <>
      <Box padding={3}>
        <Typography variant={"delta"}>Partners Affiliate Manager</Typography>
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
                <Typography variant={"delta"}>Affiliate Manager</Typography>
              </Th>
              <Th>
                <Typography variant={"delta"}>Skype</Typography>
              </Th>
              <Th>
                <Typography variant={"delta"}>Telegram</Typography>
              </Th>
              <Th>
                <Typography variant={"delta"}>Email</Typography>
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>{partner.affiliate_manager.name ?? "N/A"}</Td>
              <Td>{partner.affiliate_manager.skype ?? "N/A"}</Td>
              <Td>{partner.affiliate_manager.telegram ?? "N/A"}</Td>
              <Td>{partner.affiliate_manager.email ?? "N/A"}</Td>
            </Tr>
          </Tbody>
        </RawTable>
      </Box>
    </>
  );
};

export default PartnersAffiliate;
