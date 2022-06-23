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
      `http://localhost:8189/api/v1/app/tournament/tourney/bracket/${id}`,
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

export default function ActiveTournamentPage() {
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
          <div className="participantsElemets">
            <div className="participantsInfoDescr">
              <div className="participantsListTtile">
                Tournament Desctiption
              </div>
              {tournamentTable.description}
            </div>
            <div className="participantsList">
              {tournamentTable.roundList.map((elem) => {
                return (
                  <div className="item">
                    <div className="participantsListTtile">
                      Tournament Round {elem.stage}
                    </div>
                    <div className="playsBox">
                      {elem.matches.map((element) => {
                        {
                          if (element.winner) {
                            if (element.winner === element.username1) {
                              return (
                                <div key={element.login} className="plays">
                                  <div className="firstPlayer winner">
                                    {element.username1}
                                  </div>
                                  <div className="secondPlayer">
                                    {element.username2}
                                  </div>
                                </div>
                              );
                            } else {
                              return (
                                <div key={element.login} className="plays">
                                  <div className="firstPlayer ">
                                    {element.username1}
                                  </div>
                                  <div className="secondPlayer winner">
                                    {element.username2}
                                  </div>
                                </div>
                              );
                            }
                          }
                          return (
                            <div key={element.login} className="plays">
                              <div className="firstPlayer ">
                                {element.username1}
                              </div>
                              <div className="secondPlayer">
                                {element.username2}
                              </div>
                            </div>
                          );
                        }
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
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
