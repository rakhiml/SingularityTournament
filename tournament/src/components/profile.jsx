import { ChakraProvider } from "@chakra-ui/react";
import { useCallback } from "react";
import doWeHaveToken from "./checkIfAutorized";
import Header from "./header";

async function profInfo() {
  const token = sessionStorage.getItem("token");
  try {
    const req = await fetch("info", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const res = await req.json();
    return res;
  } catch (error) {
    console.log(error);
  }
}

export default function Profile() {
  const profileInfo = useCallback(() => {
    return profInfo();
  }, []);
  console.log(profileInfo);
  if (doWeHaveToken()) {
    return (
      <ChakraProvider>
        <Header />
      </ChakraProvider>
    );
  }
  return (
    <ChakraProvider>
      <Header />
      <div className="NotAutorized">NotAutorized</div>
    </ChakraProvider>
  );
}
