import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BackButton from "../component/backButton";
import TableRoom from "../component/tableRoom";
import { io } from "socket.io-client";
import socket from "../socket";
function WaitingRoom() {
  const { gameId } = useParams();
  const [data, setData] = useState("");
  const [player, setPlayer] = useState("");

  useEffect(() => {
    socket.emit("CLIENT_JOIN", { gameId, access_token: localStorage.access_token });
    socket.on("SERVER_JOINED", (data) => {
      // console.log(data.data);
      setPlayer(data.data.players);
      setData(data.data);
    });
  }, []);
  console.log(data.isGameMaster);
  const start = async()=> {
    socket.emit("CLIENT_START", { gameId, access_token: localStorage.access_token });
    socket.on("SERVER_STARTED", (data) => {
      console.log(data.data, "<<<<<< INI DI STA");
    });
  }
  return (
    <>
      <section className="w-full h-fit bg-purple-500 flex p-10 items-center flex-col relative">
        <BackButton />
        <h1 className="text-[40px] mb-5">{data && data.status} Rooms</h1>
        <p className="text-[20px]">
          title: <span className="text-white">{data && data.title}</span>
        </p>
        <p className="text-[20px] mb-6">
          language: <span className="text-white">{data && data.language}</span>
        </p>

        {/* start */}
        {data.isGameMaster === true ? (
          <div className="w-[70%] my-4">
            <button onClick={start} className="px-16 py-3 bg-blue-600">Start</button>
          </div>
        ) : (
          ""
        )}

        <div className="w-[70%]">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">
                  id
                </th>
                <th scope="col" className="px-6 py-3">
                  username
                </th>
                <th scope="col" className="px-6 py-3">
                  action
                </th>
              </tr>
            </thead>
            <tbody>
              {player &&
                player.map((el, index) => {
                  return <TableRoom key={el.id} data={el} id={index + 1} />;
                })}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}

export default WaitingRoom;
