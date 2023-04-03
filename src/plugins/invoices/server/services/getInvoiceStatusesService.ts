import { Strapi } from "@strapi/strapi";

export default ({ strapi }: { strapi: Strapi }) => ({
  async getInvoiceStatuses(ctx) {
    const invoiceStatusesFilter =
      ctx.query.invoice_statuses == "true"
        ? {}
        : {
            invoice_status: null,
          };

    const invoiceStatuses = await strapi
      .query("api::invoice-status.invoice-status")
      .findMany({
        where: {
          ...invoiceStatusesFilter,
        },
        populate: {
          invoice_statuses: true,
          invoice_status: true,
        },
      });
    let primaryStatus = [];

    for (let i = 0; i < invoiceStatuses.length; i++) {
      if (invoiceStatuses[i].primary) {
        primaryStatus.push(invoiceStatuses[i]);
      }
    }
    return {
      statuses: invoiceStatuses,
      primary: primaryStatus[0] ?? invoiceStatuses[0],
    };
  },
});
