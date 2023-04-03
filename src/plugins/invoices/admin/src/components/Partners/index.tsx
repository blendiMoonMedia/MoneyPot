/*
 *
 * HomePage
 *
 */
//reafactor the code belov to use the new design system
import React, { useState } from "react";
import {
  Box,
  Grid,
  Select,
  Option,
  RawTable,
  Thead,
  Tbody,
  Th,
  Tr,
  Td,
  Typography,
  Button,
  ModalLayout,
  ModalHeader,
  ModalBody,
  Textarea,
  ModalFooter,
  Link,
  TextButton,
} from "@strapi/design-system";
import { TCasinoModel, TInvoiceModel, TInvoiceStatusModel } from "../../models";
import PartnersDetails from "../PartnersDetails";
import PartnersAffiliate from "../ParntersAffiliate";
import { useInvoiceActions } from "../../hooks/useInvoiceActions";
import { Information, Write } from "@strapi/icons";
import { Accordion } from "../Accordion";
import { CasinoModal } from "../Modals";

type TPartners = {
  invoiceData: TInvoiceModel;
  invoiceStatuses: TInvoiceStatusModel;
  setRenderKey: (renderKey: boolean) => void;
  renderKey: boolean;
};

type TAdditionalNotes = {
  additionalNotes: string;
  id: number;
};
const Partners = ({
  invoiceData,
  invoiceStatuses,
  setRenderKey,
  renderKey,
}: TPartners) => {
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [casino, setCasino] = useState<TCasinoModel | null>(null);
  const { editInvoices, isUpdating } = useInvoiceActions();
  const [isVisible, setIsVisible] = useState(false);
  const [modalContent, setModalContent] = useState({
    additionalNotes: "",
    id: 0,
  });

  const handleModal = ({ additionalNotes, id }: TAdditionalNotes) => {
    setIsVisible(true);
    setModalContent({
      additionalNotes: additionalNotes,
      id: id,
    });
  };

  const handleModalSave = async () => {
    await editInvoices(modalContent.id, {
      AdditionalNotes: modalContent.additionalNotes,
    });

    setIsVisible(false);
    //re-trigger the fetch
    setRenderKey(!renderKey);
  };

  const handleCasinoClick = (casino: TCasinoModel) => {
    setShowModal(!showModal);
    setCasino(casino);
  };

  return (
    <Box paddingBottom={4}>
      <Grid gridCols={1} gap={8}>
        {invoiceData?.length > 0 &&
          invoiceData?.map((singleInvoiceMonth: any, index: number) => (
            <Box
              padding={4}
              hasRadius
              background="neutral150"
              shadow="tableShadow"
              key={index}
            >
              <Accordion
                partner={singleInvoiceMonth.partner}
                numberOfInv={singleInvoiceMonth.invoices.length ?? 0}
              >
                <PartnersDetails
                  partner={singleInvoiceMonth.partner}
                  index={index}
                />
                <PartnersAffiliate partner={singleInvoiceMonth.partner} />
              </Accordion>
              <Box
                marginTop={4}
                hasRadius={true}
                marginBottom={4}
                shadow="filterShadow"
                background="neutral100"
              >
                <Box className="rounded-lg" background={"neutral100"}>
                  <RawTable className={"w-full"}>
                    <Thead className="w-full">
                      <Tr background={"neutral100"}>
                        <Th>
                          <Typography
                            fontWeight={"bold"}
                            variant={"sigma"}
                            className={"px-4"}
                          >
                            Invoice name
                          </Typography>{" "}
                        </Th>
                        <Th>
                          <Typography fontWeight={"bold"} variant={"sigma"}>
                            Casino
                          </Typography>
                        </Th>
                        <Th>
                          <Typography fontWeight={"bold"} variant={"sigma"}>
                            Aff. Site
                          </Typography>
                        </Th>
                        <Th>
                          <Typography fontWeight={"bold"} variant={"sigma"}>
                            Month
                          </Typography>
                        </Th>
                        <Th>
                          <Typography fontWeight={"bold"} variant={"sigma"}>
                            Payment Type
                          </Typography>
                        </Th>
                        <Th>
                          <Typography fontWeight={"bold"} variant={"sigma"}>
                            Amount
                          </Typography>
                        </Th>
                        <Th scope="col" className="p-4">
                          <Typography
                            fontWeight={"bold"}
                            variant={"sigma"}
                            className="sr-only"
                          >
                            Status
                          </Typography>
                        </Th>
                      </Tr>
                    </Thead>
                    <Tbody className="divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                      {singleInvoiceMonth.invoices.map(
                        (singleInvoice: any, index: number) => (
                          <Tr
                            key={index}
                            background={
                              index % 2 === 0 ? "neutral150" : "neutral200"
                            }
                          >
                            <Td className="text-sm font-medium text-gray-900">
                              <Typography className={"px-4"}>
                                {singleInvoice?.name}
                              </Typography>
                            </Td>
                            <Td className="text-sm font-medium grid gap-4">
                              <TextButton
                                onClick={() =>
                                  handleCasinoClick(singleInvoice.casino)
                                }
                                endIcon={<Information />}
                              >
                                {singleInvoice.casino?.name}
                              </TextButton>
                              <Link
                                to={`/content-manager/collectionType/api::casino.casino/${singleInvoice.casino?.id}`}
                                endIcon={<Write />}
                              >
                                Edit Casino
                              </Link>
                            </Td>
                            <Td className="text-sm font-medium text-gray-900">
                              <Typography>
                                <Link
                                  to={`/content-manager/collectionType/api::affiliate-site.affiliate-site/${singleInvoice.affiliate_site?.id}}`}
                                  endIcon={<Write />}
                                  title={singleInvoice.affiliate_site?.website}
                                >
                                  {singleInvoice.affiliate_site?.name ?? false}
                                </Link>
                              </Typography>
                            </Td>
                            <Td className="text-sm font-medium text-gray-900">
                              <Typography>
                                {singleInvoice.BillingMonth}
                              </Typography>
                            </Td>

                            <Td className="text-sm font-medium text-gray-900">
                              <Typography>
                                {" "}
                                {singleInvoice.payment_type?.name}
                              </Typography>
                            </Td>
                            <Td className="text-sm font-medium text-gray-900">
                              <Typography>{`${singleInvoice.amount} ${singleInvoice?.currency?.name}(${singleInvoice.currency?.symbol})`}</Typography>
                            </Td>
                            <Td className="text-sm font-medium text-gray-900 grid gap-4">
                              {invoiceStatuses.primary && (
                                <Select
                                  placeholder="Choose a status"
                                  error={error}
                                  value={singleInvoice.invoice_status.id}
                                  onChange={(e: number) => {
                                    editInvoices(singleInvoice.id, {
                                      invoice_status: e,
                                    });
                                    singleInvoice.invoice_status.id = e;
                                  }}
                                  disabled={disabled}
                                >
                                  {invoiceStatuses.statuses.map(
                                    (singleStatus: any) => (
                                      <Option
                                        key={singleStatus.id}
                                        value={singleStatus.id}
                                      >
                                        {singleStatus?.name}
                                      </Option>
                                    )
                                  )}
                                </Select>
                              )}
                              <Button
                                startIcon={<Information />}
                                variant={
                                  singleInvoice?.AdditionalNotes
                                    ? "secondary"
                                    : "tertiary"
                                }
                                onClick={() =>
                                  handleModal({
                                    additionalNotes:
                                      singleInvoice.AdditionalNotes,
                                    id: singleInvoice.id,
                                  })
                                }
                              >
                                {singleInvoice.AdditionalNotes
                                  ? "View Notes"
                                  : "Add notes"}
                              </Button>
                            </Td>
                          </Tr>
                        )
                      )}
                    </Tbody>
                  </RawTable>
                </Box>
              </Box>
            </Box>
          ))}
      </Grid>
      {isVisible && (
        <ModalLayout
          onClose={() => setIsVisible((prev) => !prev)}
          labelledBy="Additional Notes"
        >
          <ModalHeader>
            <Typography
              fontWeight="bold"
              textColor="neutral800"
              as="h2"
              id="title"
            >
              Additional Notes
            </Typography>
          </ModalHeader>
          <ModalBody>
            <Textarea
              onChange={(e: any) =>
                setModalContent({
                  additionalNotes: e.target.value,
                  id: modalContent.id,
                })
              }
              style={{
                height: "300px",
              }}
            >
              {modalContent.additionalNotes}
            </Textarea>
          </ModalBody>
          <ModalFooter
            startActions={
              <Button
                onClick={() => setIsVisible((prev) => !prev)}
                variant="tertiary"
              >
                Cancel
              </Button>
            }
            endActions={
              <>
                <Button onClick={() => handleModalSave()}>Finish</Button>
              </>
            }
          />
        </ModalLayout>
      )}
      {/*  Modals */}
      {showModal && (
        <CasinoModal
          casino={casino}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      )}
    </Box>
  );
};

export default Partners;
