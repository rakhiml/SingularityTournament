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
      name: "My tournament",
      description: "My description",
      playersCount: "20",
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
            <div className="tournamentInfo" key={elem.name}>
              <div className="tournamentName">{elem.name}</div>
              <div className="tournamentDescription">{elem.description}</div>
              <div className="tournamentPlayers">
                <img
                  src="https://png.pngtree.com/png-vector/20191017/ourlarge/pngtree-gamepad-icon-png-image_1821905.jpg"
                  width={25}
                  alt="Players"
                />{" "}
                {elem.playersCount}
              </div>
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
