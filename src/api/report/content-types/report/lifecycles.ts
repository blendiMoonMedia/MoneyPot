module.exports = {
  beforeCreate(event) {
    event = populateReportsData(event);
  },

  async beforeUpdate(event) {
    // const { slug: previousSlug } = await strapi.db
    //   .query("api::test.test")
    //   .findOne({ where: event.params.where });

    // event = populateReportsData(event);
  },
};
export const populateReportsData = (event) => {
  const revShare = event.params.data.RevShare;
  const cpAsRev = event.params.data.CPAsRev;
  const fixedFeeRev = event.params.data.FixedFeeRev;
  event.params.data.TotalCommission = revShare + cpAsRev + fixedFeeRev;

  //find percentage of nrcs/uClicks and round to 2 decimal places
  const nrcs = event.params.data.NRCs;
  const uClicks = event.params.data.UClicks;
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

  return event;
};
