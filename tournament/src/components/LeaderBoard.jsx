import { useCallback, useEffect, useState } from "react";
import isEmpty from "./checkEmpty";
import ReactLoading from "react-loading";

export default function LeaderBoard(id) {
  const [leaderboard, setLeaderBoard] = useState();

  const makeReq = useCallback(async () => {
    const token = sessionStorage.getItem("token");
    const req = await fetch(
      `http://localhost:8189/api/v1/app/tournament/tourney/leaderboard/${id.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const res = await req.json();
    setLeaderBoard(res);
  }, []);

  useEffect(() => {
    try {
      makeReq();
    } catch (err) {
      console.log(err);
    }
  }, [makeReq]);

  console.log(leaderboard);

  if (!isEmpty(leaderboard)) {
    return (
      <div className="LeaderBoard">
        <div className="leaderBoardTitle">Leaderboard</div>
        {leaderboard.map((elem) => {
          return (
            <div className="leaderboardElem" key={elem.name}>
              <div className="leaderboardElemName">
                Name: {elem.name} {elem.surname}
              </div>
              <div className="score"> Score: {elem.score}</div>
            </div>
          );
        })}
      </div>
    );
  }
  return <ReactLoading color={"orange"} className="center" />;
}
