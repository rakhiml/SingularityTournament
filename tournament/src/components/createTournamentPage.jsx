import { ChakraProvider } from "@chakra-ui/react";
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
                Name: "",
                Description: "",
                Game: "",
              }}
              onSubmit={async (values) => {
                try {
                  const req = await fetch(
                    "http://localhost:8189/api/v1/app/register",
                    {
                      method: "POST",
                      body: JSON.stringify(values, null, 2),
                      headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                      },
                    }
                  );
                  if (req.status === "ok") {
                    window.location.pathname = "/login";
                  }
                } catch (error) {
                  console.log(error);
                }
              }}
            >
              {({ handleSubmit, errors, touched }) => (
                <form onSubmit={handleSubmit}>
                  <VStack spacing={4} align="flex-start">
                    <FormControl>
                      <FormLabel htmlFor="text">Login</FormLabel>
                      <Field
                        as={Input}
                        id="Name"
                        name="Name"
                        type="text"
                        variant="filled"
                      />
                    </FormControl>
                    <FormControl isInvalid={!!errors.Name && touched.Name}>
                      <FormLabel htmlFor="name">Name</FormLabel>
                      <Field
                        as={Input}
                        id="Description"
                        name="Description"
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
                      <FormErrorMessage>{errors.Description}</FormErrorMessage>
                    </FormControl>

                    <SelectControl
                      name="Game"
                      selectProps={{ placeholder: "Select Game" }}
                    >
                      <option value="MortalCombat">MortalCombat</option>
                      <option value="Fifa">Fifa</option>
                      <option value="UFC">UFC</option>
                      <option value="Tenis">Tenis</option>
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
