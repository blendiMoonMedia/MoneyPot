export default [
  {
    method: "GET",
    path: "/",
    handler: "myController.index",
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: "GET",
    path: "/statuses",
    handler: "myController.status",
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: "GET",
    path: "/invoices-per-month",
    handler: "myController.invoicesPerMonth",
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: "PUT",
    path: "/:id",
    handler: "myController.updateInvoice",
    config: {
      policies: [],
      auth: false,
    },
  },
];
