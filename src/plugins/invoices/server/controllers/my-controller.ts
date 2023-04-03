import { Strapi } from "@strapi/strapi";

export default ({ strapi }: { strapi: Strapi }) => ({
  index(ctx) {
    return strapi
      .plugin("invoices")
      .service("getInvoicesService")
      .getInvoices(ctx);
  },
  status(ctx) {
    return strapi
      .plugin("invoices")
      .service("getInvoiceStatusesService")
      .getInvoiceStatuses(ctx);
  },
  invoicesPerMonth(ctx) {
    return strapi
      .plugin("invoices")
      .service("getInvoicesPerMonth")
      .getInvoicesPerMonth(ctx);
  },
  updateInvoice(ctx) {
    return strapi
      .plugin("invoices")
      .service("invoiceService")
      .update(ctx.params.id, ctx.request.body);
  },
  affiliateSites(ctx) {
    return strapi
      .plugin("invoices")
      .service("getAffiliateSites")
      .getAffiliateSites(ctx);
  },
  affiliateSiteCasinos(ctx) {
    return strapi
      .plugin("invoices")
      .service("getAffiliateSites")
      .getAffiliateSiteCasinos(ctx);
  },
});
