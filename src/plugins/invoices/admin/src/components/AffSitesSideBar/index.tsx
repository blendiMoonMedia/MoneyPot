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
  Link, SubNav, SubNavHeader, SubNavSections, SubNavSection, TextButton,
} from "@strapi/design-system";
import { NavLink } from 'react-router-dom';

import {TAffiliateSiteModel, TPartnerModel} from "../../models";

type TAffSitesNavBar = {
  affiliateSitesData: TAffiliateSiteModel | null;
  handleAffSiteId: (id: number) => void;
  affSiteId?: number
};
const PartnersDetails = ({ affiliateSitesData, handleAffSiteId, affSiteId }: TAffSitesNavBar) => {
  return (
    <SubNav ariaLabel="Aff Sites">
      <SubNavHeader
        searchable
        value=""
        onClear={() => {}}
        onChange={() => {}}
        label="Affiliate Sites"
        searchLabel="Search..."
      />
      <SubNavSections>
        <SubNavSection
          label="Sites"
          collapsable
          badgeLabel={affiliateSitesData?.affiliate_sites?.length.toString()}
        >
          <Box className={"mt-4"}>
            {affiliateSitesData?.affiliate_sites?.map((site, index) => {
              return (
                <Box className={"px-6 py-2"} key={index}>
                  <TextButton onClick={() => handleAffSiteId(site.id)}>
                    <Typography
                      fontWeight={"bold"}
                      variant={"omega"}
                      textColor={
                        affSiteId === site.id ? "buttonPrimary500" : ""
                      }
                    >
                      {site.name}
                    </Typography>
                  </TextButton>
                </Box>
              );
            })}
          </Box>
        </SubNavSection>
      </SubNavSections>
    </SubNav>
  );
};

export default PartnersDetails;
