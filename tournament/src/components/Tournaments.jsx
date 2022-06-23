import { useCallback, useEffect, useState } from "react";

function isEmpty(obj) {
  for (let key in obj) {
    // если тело цикла начнет выполняться - значит в объекте есть свойства
    return false;
  }
  return true;
}

export default function Tournaments() {
  const stournament = [
    {
      name: "Турнир от Архата",
      game: "fifa",
      description: "Участвовать можно до вторника , победителю шоколода",
      playersCount: "20",
      id: "1",
    },
    {
      name: "MOR",
      game: "Mk",
      description: "My description",
      playersCount: "2",
      id: "2",
    },
  ];
  const emptyData = {};
  const [isTournament, setisTournament] = useState(false);
  const [tournament, setTournament] = useState([]);

  const showTournament = useCallback(async () => {
    const tournamentInfo = stournament;
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
            <div className="tournamentInfo">
              <a href={`/tournament/${elem.id}`} key={elem.name}>
                <div className="tournamentName">{elem.name}</div>
                <div className="tournamentGame">{elem.game}</div>
                <div className="tournamentDescription">{elem.description}</div>
                <div className="tournamentPlayers">
                  <img
                    src="https://png.pngtree.com/png-vector/20191017/ourlarge/pngtree-gamepad-icon-png-image_1821905.jpg"
                    width={25}
                    alt="Players"
                  />{" "}
                  {elem.playersCount}
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
