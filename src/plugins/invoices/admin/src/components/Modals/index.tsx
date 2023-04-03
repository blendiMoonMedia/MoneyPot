import React, { ReactNode, useState } from "react";
import { TCasinoModel, TPartnerModel } from "../../models";
import {
  Button,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalLayout,
  Typography,
  Box,
} from "@strapi/design-system";

type TCasinoModal = {
  casino: TCasinoModel | null;
  showModal: boolean;
  setShowModal: (prev: boolean) => void;
};

export const CasinoModal = ({
  casino,
  showModal = false,
  setShowModal,
}: TCasinoModal) => {
  return (
    <>
      {showModal && (
        <ModalLayout
          onClose={() => setShowModal(!showModal)}
          labelledBy="Casino Info"
        >
          <ModalHeader>
            <Typography
              fontWeight="bold"
              textColor="neutral800"
              as="h2"
              id="title"
            >
              Casino Info
            </Typography>
          </ModalHeader>
          <ModalBody>
            <Box className={"grid gap-8"}>
              <Box className={"flex items-center gap-4"}>
                {casino?.logo && (
                  <img
                    src={casino?.logo?.url}
                    alt={casino.name}
                    width={"40px"}
                    height={"40px"}
                  />
                )}
                <Typography variant={"alpha"}>{casino?.name}</Typography>
              </Box>
              <Box className={"flex items-center gap-4"}>
                <Typography variant={"beta"}>Min. Payout:</Typography>
                <Typography variant={"epsilon"}>{casino?.MinPayout ?? 'No min Payout'}</Typography>
              </Box>
              <Box className={"flex items-center gap-4"}>
                <Typography variant={"beta"}>Website: </Typography>
                <Typography variant={"epsilon"}>{casino?.website ?? 'No website'}</Typography>
              </Box>
              <Box className={"flex items-center gap-4"}>
                <Typography variant={"beta"}>Short Name: </Typography>
                <Typography variant={"epsilon"}>{casino?.shortName ?? 'No short name'}</Typography>
              </Box>
            </Box>
          </ModalBody>
          <ModalFooter
            startActions={
              <Button
                onClick={() => setShowModal(!showModal)}
                variant="tertiary"
              >
                Cancel
              </Button>
            }
            endActions={
              <>
                <Button onClick={() => setShowModal(!showModal)}>Finish</Button>
              </>
            }
          />
        </ModalLayout>
      )}
    </>
  );
};
