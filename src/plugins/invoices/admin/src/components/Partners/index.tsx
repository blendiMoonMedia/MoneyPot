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
} from "@strapi/design-system";
import { TInvoiceModel, TInvoiceStatusModel } from "../../models";
import PartnersDetails from "../PartnersDetails";
import PartnersAffiliate from "../ParntersAffiliate";
import { useInvoiceActions } from "../../hooks/useInvoiceActions";
import { Accordion } from "../Accordion";
import { Information, Text } from "@strapi/icons";

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

  return (
    <Box paddingBottom={4}>
      <Grid gridCols={1} gap={8}>
        {invoiceData?.length > 0 &&
          invoiceData?.map((singleInvoiceMonth: any, index: number) => (
            <Box
              padding={4}
              hasRadius
              background="neutral100"
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
                background="neutral150"
              >
                <Box className="rounded-lg">
                  <RawTable background={"neutral100"}>
                    <Thead className="w-full">
                      <Tr>
                        <Th>
                          <Typography className={"p-4"}>ID</Typography>
                        </Th>
                        <Th>
                          <Typography>Invoice name</Typography>{" "}
                        </Th>
                        <Th>
                          <Typography>Casino</Typography>
                        </Th>
                        <Th>
                          <Typography>Aff. Site</Typography>
                        </Th>
                        <Th>
                          <Typography>Month</Typography>
                        </Th>
                        <Th>
                          <Typography>Payment Type</Typography>
                        </Th>
                        <Th>
                          <Typography>Amount</Typography>
                        </Th>
                        <Th scope="col" className="p-4">
                          <Typography className="sr-only">Status</Typography>
                        </Th>
                      </Tr>
                    </Thead>
                    <Tbody className="divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                      {singleInvoiceMonth.invoices.map(
                        (singleInvoice: any, index: number) => (
                          <Tr key={index}>
                            <Td className="text-sm font-medium text-gray-900">
                              <Typography className={"p-4"}>
                                {singleInvoice?.id}
                              </Typography>
                            </Td>
                            <Td className="text-sm font-medium text-gray-900">
                              <Typography>{singleInvoice?.name}</Typography>
                            </Td>
                            <Td className="text-sm font-medium text-gray-900">
                              <Typography>
                                {singleInvoice.casino?.name}
                              </Typography>
                            </Td>
                            <Td className="text-sm font-medium text-gray-900">
                              <Typography>
                                {" "}
                                {singleInvoice.affiliate_site?.name ?? false}
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
    </Box>
  );
};

export default Partners;
