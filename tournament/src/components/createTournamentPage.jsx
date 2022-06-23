import { ChakraProvider, Textarea } from "@chakra-ui/react";
import { Formik, Field } from "formik";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  VStack,
} from "@chakra-ui/react";
import { SelectControl } from "formik-chakra-ui";
import doWeHaveToken from "./checkIfAutorized";
import Header from "./header";

export default function CreateTournamentPage() {
  if (doWeHaveToken()) {
    return (
      <ChakraProvider>
        <Header />
        <Flex bg="gray.100" align="center" justify="center" h="80vh">
          <Box bg="white" p={10} rounded="md" w={"80%"}>
            <Formik
              initialValues={{
                name: "",
                description: "",
                type: "",
              }}
              onSubmit={async (values) => {
                try {
                  const token = sessionStorage.getItem("token");

                  const req = await fetch(
                    "http://localhost:8189/api/v1/app/tournament/create",
                    {
                      method: "POST",
                      body: JSON.stringify(values, null, 2),
                      headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                        "Access-Control-Allow-Origin": "*",
                        Authorization: `Bearer ${token}`,
                      },
                    }
                  );
                  const res = await req.json();

                  if (req.ok) {
                    alert("Tournament added");
                    window.location.pathname = "/";
                  } else {
                    alert(res.message);
                  }
                } catch (error) {
                  console.log(error);
                }
              }}
            >
              {({ handleSubmit, errors, touched }) => (
                <form onSubmit={handleSubmit}>
                  <VStack spacing={4} align="flex-start">
                    <FormControl isInvalid={!!errors.name && touched.name}>
                      <FormLabel htmlFor="name">Name</FormLabel>
                      <Field
                        as={Input}
                        id="name"
                        name="name"
                        type="text"
                        variant="filled"
                        validate={(value) => {
                          let error;

                          if (value.length < 1) {
                            error = "Must be filed";
                          }

                          return error;
                        }}
                      />
                      <FormErrorMessage>{errors.name}</FormErrorMessage>
                    </FormControl>
                    <FormControl
                      isInvalid={!!errors.description && touched.description}
                    >
                      <FormLabel htmlFor="description">Description</FormLabel>
                      <Field
                        as={Textarea}
                        id="description"
                        name="description"
                        type="text"
                        variant="filled"
                        validate={(value) => {
                          let error;

                          if (value.length < 1) {
                            error = "Must be filed";
                          }

                          return error;
                        }}
                      />
                      <FormErrorMessage>{errors.description}</FormErrorMessage>
                    </FormControl>

                    <SelectControl
                      name="type"
                      selectProps={{ placeholder: "Select Game" }}
                    >
                      <option value="MortalCombat">MortalCombat</option>
                      <option value="Fifa">Fifa</option>
                      <option value="UFC">UFC</option>
                      <option value="Tenis">Tenis</option>
                      <option value="test">tes</option>
                      <option value="test12">tessss</option>
                    </SelectControl>

                    <Button type="submit" colorScheme="orange" width="full">
                      Create Tournament
                    </Button>
                  </VStack>
                </form>
              )}
            </Formik>
          </Box>
        </Flex>
      </ChakraProvider>
    );
  }
  return (
    <ChakraProvider>
      <Header />
      <div className="NotAutorized">You Not Authorized</div>
    </ChakraProvider>
  );
}
