import {Strapi} from '@strapi/strapi';

export default ({strapi}: { strapi: Strapi }) => ({
  async getInvoiceStatuses(ctx) {
    const invoiceStatuses = await strapi.query('api::invoice-status.invoice-status').findMany();
    let primaryStatus = [];

    for (let i = 0; i < invoiceStatuses.length; i++) {
      if (invoiceStatuses[i].primary) {
        primaryStatus.push(invoiceStatuses[i]);
      }
    }
    return {
      statuses: invoiceStatuses,
      primary: primaryStatus[0] ?? invoiceStatuses[0]
    };
  },
})
;
