/*
 *
 * HomePage
 *
 */
import React, { useEffect } from "react";
import { BaseHeaderLayout, Layout } from "@strapi/design-system";
import { useAffiliateSites } from "../../hooks/useAffiliateSites";
import { useAffiliateSiteCasinos } from "../../hooks/useAffiliateSiteCasinos";

import AffSitesSideBar from "../../components/AffSitesSideBar";
import { useHistory } from "react-router-dom";
import AffSiteCasinos from "../../components/AffSiteCasinos";

const AffiliateSites = () => {
  const { affiliateSitesData } = useAffiliateSites();
  const { affiliateSiteCasinos, affSiteId, setAffSiteId } =
    useAffiliateSiteCasinos();
  const history = useHistory();

  const handleAffSiteId = async (id: number) => {
    setAffSiteId(id);
    history.push({
      search: `?site=${id}`,
    });
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const siteId = urlParams.get("site");
    if (siteId) {
      handleAffSiteId(Number(siteId));
    }
  }, []);

  return (
    <Layout
      sideNav={
        <AffSitesSideBar
          affiliateSitesData={affiliateSitesData}
          handleAffSiteId={handleAffSiteId}
          affSiteId={affSiteId}
        />
      }
    >
      <BaseHeaderLayout
        title={affSiteId ? "Affiliate site Casinos" : "Please choose Aff. Site"}
        as="h2"
      />
      <AffSiteCasinos
        affiliateSiteCasinos={affiliateSiteCasinos}
        affSiteId={affSiteId}
      />
    </Layout>
  );
};

export default AffiliateSites;
