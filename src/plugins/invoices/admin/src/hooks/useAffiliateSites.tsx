import { useEffect, useState } from "react";
import pluginId from "../pluginId";
import { request } from "@strapi/helper-plugin";
import { TAffiliateSiteModel } from "../models";

export const useAffiliateSites = () => {
  const [affiliateSitesData, setAffiliateSitesData] =
    useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchAffiliateSites = async () => {
    setIsLoading(true);
    try {
      const affiliateSites = await request(`/${pluginId}/affiliate-sites`, {
        method: "GET",
      });
      setAffiliateSitesData(affiliateSites);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAffiliateSites();
  }, []);

  return { affiliateSitesData, isLoading };
};
