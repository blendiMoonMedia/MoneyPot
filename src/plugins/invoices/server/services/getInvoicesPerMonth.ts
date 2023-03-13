import { Strapi } from "@strapi/strapi";

export default ({ strapi }: { strapi: Strapi }) => ({
  async getInvoicesPerMonth(ctx) {
    let invoicesPerMonth = [];
    let statusFilter = ctx.query.status
      ? {
          invoice_status: ctx.query.status,
        }
      : {};
    const allPartners = await strapi.query("api::partner.partner").findMany({
      populate: true,
    });
    for (const partners of allPartners) {
      const invoices = await strapi.query("api::invoice.invoice").findMany({
        where: {
          $and: [
            {
              BillingYear: ctx.query.year,
            },
            {
              BillingMonth: ctx.query.month,
            },
            {
              casino: {
                partner: partners.id,
              },
            },
            statusFilter,
          ],
        },
        populate: {
          casino: {
            populate: {
              partner: true,
            },
          },
          affiliate_site: {
            populate: true,
          },
          invoice_status: true,
          payment_type: true,
          currency: true,
        },
      });
      invoicesPerMonth.push({
        partner: partners,
        invoices: invoices,
      });
    }
    return invoicesPerMonth;
  },
});
