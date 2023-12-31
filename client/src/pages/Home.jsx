import { useEffect } from "react";
import { useState } from "react";
import CardRoom from "../component/roomList";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import Navbar from "../component/navbar";

function Home() {
  const navigate = useNavigate();
  const [room, setRoom] = useState([]);

  useEffect(() => {
    listRoom();
  }, []);

  const listRoom = async (e) => {
    try {
      const { data } = await axios.get(
        // "https://dikejar-kata-server.asmodaycelestia.online/games"
        "http://localhost:3000/games",
        {
          headers: {
            Authorization: "Bearer " + localStorage.access_token,
          },
        }
      );
      console.log(data);
      setRoom(data.games);
    } catch (error) {
      Swal2.fire({
        title: "Error",
        text: "Something has gone wrong",
        icon: "error",
      });
      console.log(error);
    }
  };
  const logout = () => {
    localStorage.clear();
    navigate("/register");
  };

  return (
    <>
      <Navbar logout={logout} />
      <section className="bgImg w-full h-screen flex-cols justify-center items-center pt-16">
        {/* search */}
        <section className="w-full h-fit mt-10 flex justify-center items-center relative">
          <form className="flex justify-center items-center">
            <input className="w-[400px] h-10 outline-none px-5 rounded-s-md" type="text" />
            <button className="py-2 px-4 bg-blue-600 rounded-e-md rounded-sm">
              <i className="fa-solid fa-magnifying-glass " />
            </button>
          </form>
          <Link to="/createRoom" className="absolute py-2 px-3 bg-white right-20">
            +
          </Link>
        </section>
        {/* list */}
        <section className="w-full h-fit flex justify-center items-center mt-5">
          <div className="w-[95%] flex justify-center items-center flex-wrap">
            {room &&
              room.map((el) => {
                return <CardRoom key={el.id} data={el} />;
              })}
          </div>
        </section>
      </section>
    </>
  );
}

export default Home;
