import React, { useContext, useState } from "react"
import "./header.css"
import { nav } from "../../data/Data"
import { Link, Navigate, useNavigate } from "react-router-dom"
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Header = () => {
  const [navList, setNavList] = useState(false)
  const [open, setOpen] = useState(false);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const userId = currentUser?._id;

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post("/auth/logout");
      localStorage.setItem("currentUser", null);
    navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const {
    isLoading: isLoadingUser,
    error: errorUser,
    data: dataUser,
  } = useQuery({
    queryKey: ["user4"],
    queryFn: () =>
      axios.get(`/users/single/${userId}`).then((res) => {
        return res.data;
      }),
  });

  return (
    <>
      <header>
        <div className='container flex'>
          <div className='logo'>
            <img src='./images/logo1.jpg' alt='' />
          </div>
          <div className='nav'>
            <ul className={navList ? "small" : "flex"}>
              {nav.map((list, index) => (
                <li key={index}>
                  <Link to={list.path}>{list.text}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className='button flex'>
            <Link to="/myproperties"><h4>
                My List
            </h4></Link>
            { currentUser  ? (
            <div className="user" onClick={() => setOpen(!open)}>
              <img src={currentUser.img || "/img/noavatar.jpg"} alt="" />
              <span>{currentUser?.username}</span>
              {open && (
                <div className="options">
                  {dataUser.isOwner && (
                    <>
                      <Link className="link" to="/myproperties">
                        My Properties
                      </Link>
                      <Link className="link" to="/add">
                        Add New Property
                      </Link>
                    </>
                  )}
                  <Link className="link" to="/myfavourites">
                    My Favourites
                  </Link>
                  <Link className="link" to="/messages">
                    Messages
                  </Link>
                  <Link className="link" onClick={handleLogout}>
                    Logout
                  </Link>
                </div>
              )}
            </div>
          ) : <Link to={`/login`}><button className='btn1'>
              <i className='fa fa-sign-out'></i> Sign In
            </button>  </Link>}
          </div>

          <div className='toggle'>
            <button onClick={() => setNavList(!navList)}>{navList ? <i className='fa fa-times'></i> : <i className='fa fa-bars'></i>}</button>
          </div>
        </div>
      </header>
    </>
  )
}

export default Header
