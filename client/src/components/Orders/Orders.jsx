import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Orders.css";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Orders = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  axios.defaults.withCredentials=true;

  const navigate = useNavigate();
  const { isLoading, error, data } = useQuery({
    queryKey: ["orders"],
    queryFn: () =>
      axios.get(`/orders`,{withCredentials:true}).then((res) => {
        return res.data;
      }),
  });

  
  const userId = currentUser?._id;

  const {
    isLoading: isLoadingUser,
    error: errorUser,
    data: dataUser,
  } = useQuery({
    queryKey: ["user3"],
    queryFn: () =>
      axios.get(`/users/single/${userId}`).then((res) => {
        return res.data;
      }),
  });


   const handleContact = async (order) => {
     const ownerId = order.ownerId;
     const tenantId = order.tenantId;
     const id = ownerId + tenantId;
     console.log(id);
     console.log(ownerId);
     console.log(tenantId);

     try {
       const res = await axios.get(`/conversations/single/${id}`);
       navigate(`/message/${res.data.id}`);
     } catch (err) {
       if (err.response.status === 404) {
         const res = await axios.post(`/conversations/`, {
           to: dataUser?.isOwner ? tenantId : ownerId,
         });
         navigate(`/message/${res.data.id}`);
       }
     }
   };

  return (
    <div className="orders">
      {isLoading ? (
        "loading"
      ) : error ? (
        "error"
      ) : (
        <div className="container">
          <div className="title">
            <h1>My Favourites</h1>
          </div>
          <table>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
              <th>Contact</th>
            </tr>
            {data.map((order) => (
              <tr key={order._id}>
                <td>
                <Link to={`/houses/${order.houseId}`} className="link">
                  <img className="image" src={order.img} alt="" />
                  </Link>
                </td>
                <td>{order.title}</td>
                <td>{order.price}</td>
                <td>
                  <img
                    onClick={() => handleContact(order)}
                    className="message"
                    src="https://upload.wikimedia.org/wikipedia/commons/0/05/Google_Messages_logo.svg"
                    alt=""
                  />
                </td>
              </tr>
            ))}
          </table>
        </div>
      )}
    </div>
  );
};

export default Orders;
