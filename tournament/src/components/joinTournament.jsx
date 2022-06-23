export default function JoinTourney(id) {
  return (
    <button
      onClick={() => {
        console.log(id);
        join(id);
      }}
      className="joinTurney"
    >
      Join
    </button>
  );
}

async function join(id) {
  try {
    const token = sessionStorage.getItem("token");
    const req = await fetch(
      `http://localhost:8189/api/v1/app/tournament/join/${id}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    const res = await req.json();
    alert(res.message);
  } catch {
    console.log("error");
  }
}
