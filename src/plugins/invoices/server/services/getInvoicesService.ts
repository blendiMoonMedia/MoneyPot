import { Strapi } from "@strapi/strapi";

export default ({ strapi }: { strapi: Strapi }) => ({
  async getInvoices(ctx) {
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

    const allMonths = [
      { name: "January", number: 1 },
      { name: "February", number: 2 },
      { name: "March", number: 3 },
      { name: "April", number: 4 },
      { name: "May", number: 5 },
      { name: "June", number: 6 },
      { name: "July", number: 7 },
      { name: "August", number: 8 },
      { name: "September", number: 9 },
      { name: "October", number: 10 },
      { name: "November", number: 11 },
      { name: "December", number: 12 },
    ];

    for (const month of allMonths) {
      const invoices = await strapi.query("api::invoice.invoice").findMany({
        where: {
          $and: [
            {
              BillingYear: ctx.query.year,
            },
            {
              BillingMonth: month.number,
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
        },
      });
      invoicesPerMonth.push({
        month: {
          name: month.name,
          number: month.number,
        },
        invoices: invoices,
      });
    }
    return invoicesPerMonth;
  },
});
