import {before} from "node:test";

module.exports = {
  async beforeCreate(event) {
    event = await populateReportsData(event);
  },

  async beforeUpdate(event) {
    if(event.params.data.RevShare){
      event = await populateReportsData(event);
    }
  },
};
export const populateReportsData = async (event) => {
  const currentReport = await strapi.db.query("api::report.report").findOne({
    where: event.params.where,
    populate: ["affiliate_site", "casino"],
  });

  const casinoShortName = currentReport?.casino.shortName;
  const affSiteShortName = currentReport?.affiliate_site.shortName;
  const billingMonth = event.params.data.BillingMonth;
  const billingYear = event.params.data.BillingYear;
  const revShare = event.params.data.RevShare;
  const cpAsRev = event.params.data.CPAsRev;
  const fixedFeeRev = event.params.data.FixedFeeRev;
  const nrcs = event.params.data.NRCs;
  const uClicks = event.params.data.UClicks;
  let currentCasino = null;
  let currentAffSite = null;

  if (!casinoShortName) {
    currentCasino = await strapi.db.query("api::casino.casino").findOne({
      where: event.params.data.casino.connect.id,
    });

  }
  if (!affSiteShortName) {
    currentAffSite = await strapi.db
      .query("api::affiliate-site.affiliate-site")
      .findOne({
        where: event.params.data.affiliate_site.connect.id,
      });
  }

  event.params.data.TotalCommission = revShare + cpAsRev + fixedFeeRev;

  //find percentage of nrcs/uClicks and round to 2 decimal places

  event.params.data.ClicksToRegister = (nrcs / uClicks) * 100;

  //conversion
  const ftds = event.params.data.FTDs;
  event.params.data.Conversion = (ftds / nrcs) * 100;

  // AffiliateNGR
  const nrg = event.params.data.NGR;
  event.params.data.AffiliateNGR = (revShare / nrg) * 100;

  //AffiliateTotalCommission
  event.params.data.AffiliateTotalCommission =
    (revShare / (revShare + cpAsRev + fixedFeeRev)) * 100;

  //CPAsTotalCommission
  event.params.data.CPAsTotalCommission =
    (cpAsRev / (revShare + cpAsRev + fixedFeeRev)) * 100;

  //FixedFeeTotalCommission
  event.params.data.FixedFeeTotalCommission =
    (fixedFeeRev / (revShare + cpAsRev + fixedFeeRev)) * 100;

  event.params.data.name =
    (casinoShortName ?? currentCasino?.shortName) +
    "/" +
    (affSiteShortName ?? currentAffSite?.shortName) +
    "/" +
    billingMonth +
    "/" +
    billingYear;


  return event;
};
