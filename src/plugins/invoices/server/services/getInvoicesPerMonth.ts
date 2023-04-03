import { Strapi } from "@strapi/strapi";

export default ({ strapi }: { strapi: Strapi }) => ({
  async getInvoicesPerMonth(ctx) {
    let invoicesPerMonth = [];
    const statusFilter = ctx.query.status
      ? {
          $or: [
            { invoice_status: ctx.query.status },
            {
              invoice_status: {
                invoice_status: ctx.query.status,
              },
            },
          ],
        }
      : {};

    const monthFilter =
      ctx.query.month == 0
        ? {}
        : {
            BillingMonth: ctx.query.month,
          };

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
            monthFilter,
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
      if (invoices.length > 0) {
        invoicesPerMonth.push({
          partner: partners,
          invoices: invoices,
        });
      }
    }

    return invoicesPerMonth;
  },
});
