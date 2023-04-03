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
    length?: number;
    month: {
      name: string;
    };
  }[];
}[];

export type TInvoicesPerMonthModel = {
  month: {
    name: string;
    number: number;
  };
  invoices: TSingleInvoiceModel[] | [];
  length: number;
}[];

export type TSingleInvoiceModel = {
  id: number;
  BillingMonth: string;
  BillingYear: string;
  website: string;
  MinPayout: string;
  createdAt: string;
  updatedAt: string;
};

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

  logo: {
    id: number;
    url: string;
  };
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
  bgColor: string;
  textColor: string;
};

export type TAffiliateSiteModel = {
  id?: number;
  affiliate_sites: {
    id: number;
    name: string;
    website: string;
    createdAt: string;
    updatedAt: string;
    shortName: string;
  }[];
  pagination: {
    offset: number;
    limit: number;
  };
};

export type TSingleCasinoTagModel = {
  id: number;
  name: string;
  bgColor: string;
  textColor: string;
};

export type TCasinoTagModel = {
  id: number;
  affiliate_site: TAffiliateSiteModel;
  Tag: {
    casino_tags: TSingleCasinoTagModel[];
    id: number;
  };
};

export type TCasinoModel = {
  id: number;
  name: string;
  website: string;
  createdAt: string;
  updatedAt: string;
  MinPayout?: number;
  shortName: string;
  status: string;
  currencies: TCurrenciesModel[];
  logo: TLogo;
  partner: TPartnerModel;
  Tag: TCasinoTagModel[];
};

export type TCurrenciesModel = {
  id: number;
  name: string;
  type: string;
  symbol: string;
  createdAt: string;
  updatedAt: string;
};

export type TLogo = {
  url: string;
  provider: string;
  alternativeText: string;
};

export type TPaginationModel = {
  offset: number;
  limit: number;
};
