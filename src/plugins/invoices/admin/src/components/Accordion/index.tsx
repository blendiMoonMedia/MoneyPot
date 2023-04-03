import React, { ReactNode, useState } from "react";
import { ArrowDown, ArrowUp } from "@strapi/icons";
import { TPartnerModel } from "../../models";
import { Box, Typography } from "@strapi/design-system";

type TAccordion = {
  partner: TPartnerModel;
  children: ReactNode;
  numberOfInv: number;
};

export const Accordion = ({ partner, children, numberOfInv }: TAccordion) => {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <Box className={"pb-2 rounded-lg"} background={"neutral100"}>
      <div
        className={
          "flex items-center p-1 justify-between w-full cursor-pointer"
        }
        onClick={() => setIsVisible(!isVisible)}
      >
        <div>
          <img
            src={partner?.logo?.url}
            height={"30px"}
            width={"30px"}
            className={"inline m-2"}
          />
          <Typography className={"font-bold"}>{partner?.name}</Typography> -{" "}
          <Typography
            style={{
              color: partner?.partner_priority?.textColor,
              backgroundColor: partner?.partner_priority?.bgColor,
            }}
            className={"p-2 rounded-lg text-xs"}
          >
            {partner?.partner_priority?.name}
          </Typography>
        </div>
        <div className={"p-2"}>{isVisible ? <ArrowUp /> : <ArrowDown />}</div>
      </div>
      <div
        className={`content ${
          isVisible ? "mt-4" : "invisible h-0"
        } transition duration-300`}
      >
        {children}
      </div>
    </Box>
  );
};
