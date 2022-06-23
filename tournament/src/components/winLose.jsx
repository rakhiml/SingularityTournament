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

async function setWinner(tournamentId, stage, login) {
  try {
    const values = {
      tournamentId: tournamentId,
      stage: stage.toString(),
      winnerLogin: login,
    };
    console.log(values);
    const reqWinner = await fetch(
      "http://localhost:8189/api/v1/app/tournament/result_winner",
      {
        method: "POST",
        body: JSON.stringify(values, null, 2),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );
    if (reqWinner.ok) {
      console.log("winner setted");
    }
  } catch (err) {
    console.log(err);
  }
}

export default function WinLose(user) {
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
                setWinner(user.tournamentId, user.stage, user.login);
                console.log("user", user);
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
                    <FormControl
                      isInvalid={!!errors.description && touched.description}
                    >
                      <FormLabel htmlFor="done">
                        What your opponent learned today ?
                      </FormLabel>
                      <Field
                        as={Textarea}
                        id="done"
                        name="done"
                        type="text"
                        variant="filled"
                      />
                    </FormControl>

                    <SelectControl
                      name="winner"
                      selectProps={{ placeholder: "Select Winner" }}
                    >
                      <option value="user">{user.user}</option>
                      <option value="opponent">{user.userOpponent}</option>
                    </SelectControl>

                    <Button type="submit" colorScheme="orange" width="full">
                      Submit
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
