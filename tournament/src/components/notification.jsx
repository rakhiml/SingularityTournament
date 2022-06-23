import { FormControl, SelectControl } from "formik-chakra-ui";
import {
  Button,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  // FormControl,
  FormErrorMessage,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { ChakraProvider, Textarea } from "@chakra-ui/react";
import { Formik, Field } from "formik";

import React from "react";

export default function Notification(message) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <ChakraProvider>
      <Button onClick={onOpen}>Open Modal</Button>

      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Round Results</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Formik
              initialValues={{
                login: "",
                done: "",
                fact: "",
                winner: "",
                tournamentId: "",
              }}
              onSubmit={(values) => {
                setWinner(user.tournamentId, user.stage, values.winner);
                console.log("values", values);
              }}
            >
              {({ handleSubmit, errors, touched }) => (
                <form onSubmit={handleSubmit}>
                  <VStack spacing={4} align="flex-start">
                    <FormControl isInvalid={!!errors.name && touched.name}>
                      <FormLabel htmlFor="fact">
                        Tell something interesting about you opponent
                      </FormLabel>
                      <Field
                        as={Textarea}
                        id="fact"
                        name="fact"
                        type="text"
                        variant="filled"
                      />
                    </FormControl>

                    <Button type="submit" colorScheme="orange" width="full">
                      Close
                    </Button>
                  </VStack>
                </form>
              )}
            </Formik>
            {/* <div className="chooseWinner">
              <div className="chooseWinnerTitle">Choose Winner</div>
              <input type="checkbox" id="one" onchange={test} />{" "}
              {`${user.user}`}
              <input type="checkbox" id="two" onchange={test} />
              {`${user.userOpponent}`}
            </div>
            <div className="modaleInput">
              <div className="modaleInputTitle">
                what new did your opponent learn today?
              </div>
              <input
                placeholder=""
                style={{ color: "black", border: "1px solid black" }}
              />
            </div>
            <div className="modaleInput">
              <div className="modaleInputTitle">
                Tell us a fact about your opponent??
              </div>
              <input
                placeholder=""
                style={{ color: "black", border: "1px solid black" }}
              />
            </div> */}
          </ModalBody>

          <ModalFooter>
            {/* <Button variantColor="blue" mr={3} onClick={onClose}>
              Close
            </Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </ChakraProvider>
  );
}
