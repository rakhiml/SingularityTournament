import { useCallback, useEffect, useState } from "react";
import isEmpty from "./checkEmpty";

async function tournamentList() {
  const token = sessionStorage.getItem("token");
  try {
    const req = await fetch(
      "http://localhost:8189/api/v1/app/tournament/tourney/registration",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          // "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const res = await req.json();
    console.log(res);
    if (req.status !== 200) {
      return {};
    }
    return res;
  } catch (error) {
    console.log(error);
  }
}

export default function Tournaments() {
  const [isTournament, setisTournament] = useState(false);
  const [tournament, setTournament] = useState([]);

  const showTournament = useCallback(async () => {
    const tournamentInfo = await tournamentList();
    if (isEmpty(tournamentInfo)) {
      setisTournament(false);
    } else {
      setTournament(tournamentInfo);
      setisTournament(true);
    }
  }, []);

  useEffect(() => {
    try {
      showTournament();
    } catch (error) {
      setTournament([]);
    }
  }, [showTournament]);

  if (isTournament) {
    return (
      <div className="tournamentList">
        {tournament.map((elem) => {
          return (
            <div className="tournamentInfo" key={elem.name}>
              <a href={`/tournament/${elem.id}`}>
                <div className="tournamentName">{elem.name}</div>
                <div className="tournamentGame">{elem.type}</div>
                <div className="tournamentDescription">{elem.description}</div>
                <div className="tournamentPlayers">
                  <img
                    src="https://png.pngtree.com/png-vector/20191017/ourlarge/pngtree-gamepad-icon-png-image_1821905.jpg"
                    width={25}
                    alt="Players"
                  />{" "}
                  {elem.participants}
                </div>
              </a>
            </div>
          );
        })}
      </div>
    );
  }

  return <div className="tournamentInfo">No active tournaments</div>;
}

// http://localhost:8189/api/v1/app/auth
// http://localhost:8189/api/v1/app/register
