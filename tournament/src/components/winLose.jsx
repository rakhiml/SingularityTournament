import { FormControl } from "formik-chakra-ui";
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
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { Formik } from "formik";

function test() {}

export default function WinLose(user) {
  console.log(user);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen}>Open Modal</Button>

      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Round Results</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className="chooseWinner">
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
            </div>
          </ModalBody>

          <ModalFooter>
            {/* <Button variantColor="blue" mr={3} onClick={onClose}>
              Close
            </Button> */}
            <Button variantColor="blue" mr={3}>
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
