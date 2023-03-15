export type TInvoiceStatusModel = {
  statuses: {
    id: number;
    name: string;
  }[];
  primary: {
    id: number;
    name: string;
  };
};

export type TUrlParams = {
  id: string;
};

export type TInvoiceModel = {
  length: number;
  invoices: {
    //make property optional
    length?: number;
    month: {
      name: string;
    };
  }[];
}[];

export type TPartnerModel = {
  id: number;
  name: string;
  casinos: {
    id: number;
    name: string;
  }[];
  CompanyName: string;
  address: string;
  RegNumber: string;
  TaxNumber: string;
  InvoiceTo: string;
  aff_manager_name: string;
  aff_manager_skype: string;
  aff_manager_telegram: string;
  aff_manager_email: string;

  logo: string;
  partner_priority: TPartnerPriorityModel;
  publishedAt: string;
  updatedAt: string;
  createdAt: string;
};

export type TPartnerPriorityModel = {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
};
