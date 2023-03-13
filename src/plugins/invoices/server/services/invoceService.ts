import { Strapi } from "@strapi/strapi";

export default ({ strapi }: { strapi: Strapi }) => ({
  async update(id, data) {
    return await strapi.entityService.update("api::invoice.invoice", id, data);
  },
});
