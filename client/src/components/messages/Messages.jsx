import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router-dom";
import "./Messages.css";
import moment from "moment";
import axios from "axios";

const Messages = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  axios.defaults.withCredentials=true;
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["conversations"],
    queryFn: () =>
      axios.get(`/conversations`,{withCredentials:true}).then((res) => {
        console.log(currentUser._id);
        return res.data;
      }),
  });

  const userId = currentUser?._id;

  const {
    isLoading: isLoadingUser,
    error: errorUser,
    data: dataUser,
  } = useQuery({
    queryKey: ["user2"],
    queryFn: () =>
      axios.get(`/users/single/${userId}`).then((res) => {
        return res.data;
      }),
  });

  const mutation = useMutation({
    mutationFn: (id) => {
      return axios.put(`/conversations/${id}`,{withCredentials:true})
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["conversations"]);
    },
  });

  const handleRead = (id) => {
    mutation.mutate(id);
  };

  return (
    <div className="messages">
      {isLoading ? (
        "loading"
      ) : error ? (
        "error"
      ) : (
        <div className="container">
          <div className="title">
            <h1>Messages</h1>
          </div>
          <table>
            <tr>
              <th>{dataUser?.isOwner ? "Tenant" : "Owner"}</th>
              <th>Last Message</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
            {data.map((c) => (
              <tr
                className={
                  ((dataUser?.isOwner && !c.readByOwner) ||
                    (!dataUser?.isOwner && !c.readByTenant)) &&
                  "active"
                }
                key={c.id}
              >
                <td>{dataUser?.isOwner ? c.tenantId : c.ownerId}</td>
                <td>
                  <Link to={`/message/${c.id}`} className="link">
                    {c?.lastMessage?.substring(0, 100)}...
                  </Link>
                </td>
                <td>{moment(c.updatedAt).fromNow()}</td>
                <td>
                  {((dataUser?.isOwner && !c.readByOwner) ||
                    (!dataUser?.isOwner && !c.readByTenant)) && (
                    <button onClick={() => handleRead(c.id)}>
                      Mark as Read
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </table>
        </div>
      )}
    </div>
  );
};

export default Messages;
