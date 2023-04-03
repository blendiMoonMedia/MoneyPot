import { Strapi } from "@strapi/strapi";

export default ({ strapi }: { strapi: Strapi }) => ({
  async getAffiliateSites(ctx) {
    const offset = ctx.query?.offset ?? 0;
    const limit = ctx.query?.limit ?? 10;

    let affiliateSites = await strapi
      .query("api::affiliate-site.affiliate-site")
      .findMany();

    return {
      affiliate_sites: affiliateSites,
      pagination: {
        offset: offset,
        limit: limit,
      },
    };
  },
  async getAffiliateSiteCasinos(ctx) {
    const offset = ctx.query?.offset ?? 0;
    const limit = ctx.query?.limit ?? 10;
    const affSiteID = ctx.query?.site_id ?? 0;

    let casinos = [];
    casinos = await strapi.query("api::casino.casino").findMany({
      where: {
        affiliate_sites: affSiteID,
      },
      populate: {
        Tag: {
          populate: {
            affiliate_site: true,
            Tag: {
              populate: true,
            },
          },
        },
        partner: {
          partner_priority: true,
          populate: true,
        },
        currencies: true,
        logo: true,
      },
    });
    return {
      casinos: casinos,
      pagination: {
        offset: offset,
        limit: limit,
      },
    };
  },
});
