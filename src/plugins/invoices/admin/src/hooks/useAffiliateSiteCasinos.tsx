import { useEffect, useState } from "react";
import pluginId from "../pluginId";
import { request } from "@strapi/helper-plugin";
import { TCasinoModel, TPaginationModel } from "../models";

// type TAffiliateSiteCasinoModel = {
//   casinos: TCasinoModel[];
//   pagination: TPaginationModel[];
// };
export const useAffiliateSiteCasinos = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [affSiteId, setAffSiteId] = useState<number>();
  const [affiliateSiteCasinos, setAffiliateSiteCasinos] = useState<any>();
  const fetchAffiliateSiteCasinos = async (
    siteId: number,
    limit: number = 100,
    offset: number = 0
  ) => {
    setIsLoading(true);
    try {
      const affiliateSites = await request(
        `/${pluginId}/affiliate-site-casinos?site_id=${siteId}&limit=${limit}&offset=${offset}`,
        {
          method: "GET",
        }
      );
      setAffiliateSiteCasinos(affiliateSites);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (affSiteId) {
      fetchAffiliateSiteCasinos(affSiteId).then((error) => console.log(error));
    }
  }, [affSiteId]);

  return { isLoading, affiliateSiteCasinos, setAffSiteId, affSiteId };
};
