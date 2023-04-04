import { before } from "node:test";

module.exports = {
  async beforeCreate(event) {
    event = await populateReportsData(event);
  },

  async beforeUpdate(event) {
    if (event.params.data.RevShare) {
      event = await populateReportsData(event);
    }
  },
};
export const populateReportsData = async (event) => {
  const currentReport = await strapi.db.query("api::report.report").findOne({
    where: event.params.where,
    populate: ["affiliate_site", "casino"],
  });
  const billingMonth = event.params.data?.BillingMonth;
  const billingYear = event.params.data?.BillingYear;
  const revShare = event.params.data?.RevShare;
  const cpAsRev = event.params.data?.CPAsRev;
  const fixedFeeRev = event.params.data?.FixedFeeRev;
  const nrcs = event.params.data?.NRCs;
  const uClicks = event.params.data?.UClicks;
  let currentCasino = null;
  let currentAffSite = null;

  currentCasino = await strapi.db.query("api::casino.casino").findOne({
    where: {
      id:
        event?.params?.data?.casino?.connect[0]?.id ?? currentReport?.casino.id,
    },
  });
  currentAffSite = await strapi.db
    .query("api::affiliate-site.affiliate-site")
    .findOne({
      where: {
        id:
          event.params.data?.affiliate_site?.connect[0]?.id ??
          currentReport?.affiliate_site.id,
      },
    });
  if (revShare || revShare === 0) {
    event.params.data.TotalCommission = revShare + cpAsRev + fixedFeeRev;
  }
  if ((nrcs || nrcs === 0) && uClicks !== 0) {
    event.params.data.ClicksToRegister = (nrcs / uClicks) * 100;
  }

  //conversion
  const ftds = event.params.data?.FTDs;
  if ((ftds || ftds === 0) && nrcs !== 0) {
    event.params.data.Conversion = (ftds / nrcs) * 100;
  }

  // AffiliateNGR
  const nrg = event.params.data.NGR;
  if ((revShare || revShare === 0) && nrg !== 0) {
    event.params.data.AffiliateNGR = (revShare / nrg) * 100;
  }
  if (revShare !== 0 || cpAsRev !== 0 || fixedFeeRev !== 0) {
    event.params.data.AffiliateTotalCommission =
      (revShare / (revShare + cpAsRev + fixedFeeRev)) * 100;
  }

  if (cpAsRev !== 0 || revShare !== 0 || fixedFeeRev !== 0) {
    event.params.data.CPAsTotalCommission =
      (cpAsRev / (revShare + cpAsRev + fixedFeeRev)) * 100;
  }

  if (cpAsRev !== 0 || revShare !== 0 || fixedFeeRev !== 0) {
    event.params.data.FixedFeeTotalCommission =
      (fixedFeeRev / (revShare + cpAsRev + fixedFeeRev)) * 100;
  }

  if (billingYear || billingMonth) {
    event.params.data.name =
      currentCasino?.shortName +
      "/" +
      currentAffSite?.shortName +
      "/" +
      billingMonth +
      "/" +
      billingYear;
  }

  return await event;
};
