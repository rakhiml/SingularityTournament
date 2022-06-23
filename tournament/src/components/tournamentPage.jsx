import { ChakraProvider, useCallbackRef } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import isEmpty from "./checkEmpty";
import doWeHaveToken from "./checkIfAutorized";
import Header from "./header";
import ReactLoading from "react-loading";
import JoinTourney from "./joinTournament";

async function tournamentDetails(id) {
  const token = sessionStorage.getItem("token");
  try {
    const req = await fetch(
      `http://localhost:8189/api/v1/app/tournament/tourney/id/${id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    const res = await req.json();
    console.log(res);
    return res;
  } catch {
    console.log("error");
  }
}

export default function TournamentPage() {
  const { id } = useParams();
  const [tournamentTable, setTable] = useState([]);

  const getTournament = useCallback(async () => {
    try {
      const data = await tournamentDetails(id);
      setTable(data);
    } catch {
      console.log("error");
    }
  });

  useEffect(() => {
    try {
      getTournament();
    } catch {
      console.log("error");
    }
  }, []);

  if (doWeHaveToken() && !isEmpty(tournamentTable)) {
    return (
      <ChakraProvider>
        <Header />
        <div className="participantsInfo">
          <div className="participantsInfoTitle">
            <div className="tournayName">{tournamentTable.name}</div>
            <div className="participantsInfoGame">
              Game: {tournamentTable.type}
            </div>
          </div>
          <JoinTourney id={tournamentTable.id} />
          <div className="participantsList">
            <div className="participantsListTtile">Participants</div>
            {tournamentTable.list.map((elem) => {
              return (
                <div
                  key={elem.login}
                  className="participant"
                >{`${elem.login} ${elem.lastName} ${elem.firstName} (${elem.major})`}</div>
              );
            })}
          </div>
        </div>
      </ChakraProvider>
    );
  }
  return (
    <ChakraProvider>
      <Header />
      <ReactLoading color={"orange"} className="center" />
    </ChakraProvider>
  );
}
