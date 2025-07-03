import React from "react";
import { Link } from "react-router-dom";
import "./MyProp.css";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

function MyGigs() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    axios.defaults.withCredentials=true;

  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["myGigs"],
    queryFn: () =>
      axios.get(`/houses?userId=${currentUser._id}`).then((res) => {
        return res.data;
      }),
  });

  const userId = currentUser?._id;

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

  const mutation = useMutation({
    mutationFn: (id) => {
      return axios.delete(`/houses/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myGigs"]);
    },
  });

  const handleDelete = (id) => {
    mutation.mutate(id);
  };

  return (
    <div className="myGigs">
      {isLoading ? (
        "loading"
      ) : error ? (
        "error"
      ) : (
        <div className="container">
          <div className="title">
            <h1>Properties</h1>
            {dataUser?.isOwner && (
              <Link to="/add">
                <button>Add New Property</button>
              </Link>
            )}
          </div>
          <table>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
              <th>Type</th>
              <th>Action</th>
            </tr>
            {data.map((prop) => (
              <tr key={prop._id}>
                <td>
                <Link to={`/houses/${prop._id}`}>
                  <img className="image" src={prop.house_Image} alt="" />
                  </Link>
                </td>
                <td>{prop.title}</td>
                <td>{prop.price}</td>
                <td>{prop.type}</td>
                <td>
                  <img
                    className="delete"
                    src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg"
                    alt=""
                    onClick={() => handleDelete(prop._id)}
                  />
                </td>
              </tr>
            ))}
          </table>
        </div>
      )}
    </div>
  );
}

export default MyGigs;
