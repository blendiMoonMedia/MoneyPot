/*
 *
 * HomePage
 *
 */

import React, { useState } from "react";
import {
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  Box,
  Typography,
  ContentLayout,
  Link,
  EmptyStateLayout,
  TextButton,
  Badge,
} from "@strapi/design-system";
import {
  TCasinoModel,
  TCasinoTagModel,
  TCurrenciesModel,
  TSingleCasinoTagModel,
} from "../../models";
import { EmptyDocuments, Information, Write } from "@strapi/icons";
import { CasinoModal } from "../Modals";

type TAffSitesCasinos = {
  affiliateSiteCasinos: {
    casinos?: TCasinoModel[];
  };
  affSiteId: number | undefined;
};
const AffSitesCasinos = ({
  affiliateSiteCasinos,
  affSiteId,
}: TAffSitesCasinos) => {
  const [showModal, setShowModal] = useState(false);
  const [casino, setCasino] = useState<TCasinoModel | null>(null);
  const handleCasinoClick = (casino: TCasinoModel) => {
    setShowModal(!showModal);
    setCasino(casino);
  };

  return (
    <>
      {affiliateSiteCasinos &&
      affiliateSiteCasinos?.casinos &&
      affiliateSiteCasinos?.casinos?.length > 0 ? (
        <ContentLayout>
          <Table colCount={10} rowCount={5}>
            <Thead>
              <Tr>
                <Th>
                  <Typography
                    fontWeight={"bold"}
                    variant={"sigma"}
                    className={"p-4"}
                  >
                    Name
                  </Typography>
                </Th>
                <Th>
                  <Typography
                    fontWeight={"bold"}
                    variant={"sigma"}
                    className={"p-4"}
                  >
                    Tags
                  </Typography>
                </Th>
                <Th>
                  <Typography
                    fontWeight={"bold"}
                    variant={"sigma"}
                    className={"p-4"}
                  >
                    Status
                  </Typography>
                </Th>
                <Th>
                  <Typography
                    fontWeight={"bold"}
                    variant={"sigma"}
                    className={"p-4"}
                  >
                    Currencies
                  </Typography>
                </Th>
                <Th>
                  <Typography
                    fontWeight={"bold"}
                    variant={"sigma"}
                    className={"p-4 items-center justify-center flex mx-auto"}
                  >
                    Partner Name
                  </Typography>
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {affiliateSiteCasinos.casinos.map(
                (casino: TCasinoModel, index: number) => {
                  return (
                    <Tr key={index}>
                      <Td className="text-sm font-medium text-gray-900 flex items-center gap-1 mt-2">
                        {casino?.logo?.url && (
                          <img
                            src={casino?.logo?.url}
                            width={30}
                            height={30}
                            alt={casino.name}
                          />
                        )}
                        <TextButton
                          endIcon={<Information />}
                          onClick={() => handleCasinoClick(casino)}
                        >
                          {casino.name}
                        </TextButton>
                      </Td>
                      <Td className="text-sm font-medium text-gray-900">
                        <div className={"grid grid-cols-2 gap-1"}>
                          {casino.Tag.map((tag: TCasinoTagModel) => {
                            if (tag?.affiliate_site?.id === affSiteId) {
                              return tag?.Tag?.casino_tags.map(
                                (
                                  casinoTag: TSingleCasinoTagModel,
                                  tagIndex: number
                                ) => {
                                  return (
                                    <Typography
                                      key={tagIndex}
                                      className={
                                        "rounded-lg px-0 py-1 flex justify-center items-center"
                                      }
                                      textColor={casinoTag.textColor}
                                      style={{
                                        backgroundColor: casinoTag.bgColor,
                                        fontSize: "10px",
                                      }}
                                    >
                                      {casinoTag.name ?? "No tags"}
                                    </Typography>
                                  );
                                }
                              );
                            }
                          })}
                        </div>
                      </Td>
                      <Td className="text-sm font-medium">
                        <Badge
                          textColor={
                            casino?.status === "Active"
                              ? "buttonPrimary500"
                              : "danger500"
                          }
                        >
                          {casino?.status}
                        </Badge>
                      </Td>
                      <Td className="text-sm font-medium text-gray-900">
                        <div className={"grid grid-cols-2 gap-1"}>
                          {casino?.currencies.map(
                            (singleCurrency: TCurrenciesModel, index) => {
                              return (
                                <Box
                                  className={
                                    "rounded-lg flex justify-center items-center px-0 py-1 mx-0"
                                  }
                                  key={index}
                                  style={{
                                    backgroundColor: "#E3E2E0",
                                    fontSize: "10px",
                                  }}
                                >
                                  {singleCurrency?.name}
                                </Box>
                              );
                            }
                          )}
                        </div>
                      </Td>
                      <Td className="text-sm font-medium text-gray-900 grid gap-4 justify-center items-center">
                        <Link
                          endIcon={<Write />}
                          to={`/content-manager/collectionType/api::partner.partner/${casino?.partner?.id}`}
                        >
                          {casino?.partner?.name ?? "No Partner"}
                        </Link>
                        <Badge className={"w-fit"}>
                          {casino.partner?.partner_priority?.name}
                        </Badge>
                      </Td>
                    </Tr>
                  );
                }
              )}
            </Tbody>
          </Table>
        </ContentLayout>
      ) : (
        <EmptyStateLayout
          icon={<EmptyDocuments width="160px" />}
          content="You don't have any invoices yet."
        />
      )}
      {/*  Modals */}
      {showModal && (
        <CasinoModal
          casino={casino}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      )}
    </>
  );
};

export default AffSitesCasinos;
