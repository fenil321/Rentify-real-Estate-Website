import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import Review from "../review/Review";
import "./Reviews.css";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
const Reviews = ({ houseId }) => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const queryClient = useQueryClient()
  const { isLoading, error, data } = useQuery({
    queryKey: ["reviews"],
    queryFn: () =>
      axios.get(`/reviews/${houseId}`).then((res) => {
        return res.data;
      }),
  });

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (review) => {
      return axios.post("/reviews", review,{withCredentials:true});
    },
    onSuccess:()=>{
      queryClient.invalidateQueries(["reviews"])
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if(currentUser==="" || currentUser===null){
      navigate("/Login");
    }
    else{
    const desc = e.target[0].value;
    const star = e.target[1].value;
    mutation.mutate({ houseId, desc, star });
    }
  };

  return (
    <div className="reviews">
      <h2>Comments</h2>
      {isLoading
        ? "loading"
        : error
        ? "Something went wrong!"
        : data.map((review) => <Review key={review._id} review={review} />)}
      <div className="add">
        <h3>Add a Comment</h3>
        <form action="" className="addForm" onSubmit={handleSubmit}>
          <input type="text" placeholder="write your opinion" />
          <select name="" id="">
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
          <button>Send</button>
        </form>
      </div>
    </div>
  );
};

export default Reviews;
