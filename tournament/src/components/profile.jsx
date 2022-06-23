import { ChakraProvider } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import doWeHaveToken from "./checkIfAutorized";
import Header from "./header";

async function profInfo() {
  const token = sessionStorage.getItem("token");
  try {
    const req = await fetch("profile", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        // Authorization: `Bearer ${token}`,
      },
    });
    const res = await req.json();
    return res;
  } catch (error) {
    console.log(error);
  }
}

// function profInfoImitation() {
//   return
// }

export default function Profile() {
  const test = {
    name: "Arkhat",
    surname: "Beibarys",
    major: "pragramist",
  };
  const [profile, setProfile] = useState({});

  const profileInfo = useCallback(() => {
    setProfile(test);
  }, []);

  useEffect(() => {
    profileInfo();
  }, [profileInfo]);

  if (doWeHaveToken()) {
    return (
      <ChakraProvider>
        <Header />
        <div className="ProfileInfo">
          <div className="ProfilePageTitile">Profile Info</div>
          <div className="ProfileDetails">
            <div className="ProfileInfoField">Name: {profile.name}</div>
            <div className="ProfileInfoField">Surname: {profile.surname}</div>
            <div className="ProfileInfoField">Major: {profile.major}</div>
          </div>
        </div>
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
