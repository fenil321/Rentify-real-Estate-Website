import { useQuery } from "@tanstack/react-query";
import React from "react";
import "./Review.css";
import axios from "axios";
const Review = ({ review }) => {
  const { isLoading, error, data } = useQuery(
    {
      queryKey: [review.userId],
      queryFn: () =>
        axios.get(`/users/single/${review.userId}`).then((res) => {
          return res.data;
        }),
    },
  );


  return (
    <div className="review">
      {isLoading ? (
        "loading"
      ) : error ? (
        "error"
      ) : (
        <div className="user">
          <img className="pp" src={data?.img || "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHsAAAB7CAMAAABjGQ9NAAAAMFBMVEX////KysrHx8fNzc34+PjR0dHy8vL8/PzW1tbu7u7e3t7l5eXZ2dnr6+v19fXi4uJvFflHAAACkUlEQVRoge2a2baDIAxFZRas+v9/e+mgHa4tiZ6Uh3LW6vNuMAkZ6LqmpqampqYqsj4O85yy5jF6+z3wlJxSWuvz7yLj0vQdcp+pr9K69/Lo9B98w7tRluzVO/SZbiRtf2v0Qh+kyLYvoDNcyHLrimilTzJoU0ZLGW4I5CwjgC65meCpT0R0hkc0+0RmKxOw6EAmZ8NnLDvSzc7C3mtUT7sajs1ujmO2cki0ZaGx3uZZnxub3EYmG3mTz0w20tkYmeXCRuZVnpsr1VdkI4OMeH+uQl6kFdmBzcYll59lM9HQhF7Tz8tNwbOAucWycwuucuEeee4KUWh6fXyHo2YBNdl2Bxv1wdnhnQVC7/A1YIBzQwwZ4KzO4CxgWzSw2bhClVmeQ/vgiYlGdoM17++qdSq3L0F2/9wPDp0qs5oi8Khp+jTDfUWDZx5diMTkplMEz5k6cnITGSUT+39o37+ImlglhrnEeQ+sYnkSjS0xR6YmVuhsbRUpsaKHqTd5itlSCxPKocscOSm7iC2pKFEmtpYtepuQp51VTG1SntbYP8eu5+cf9+4LHFuiriI1J7gpz6Nq1kzUvkjgNgnUAl1XK5FFrjJ6Kwo/dMboAZ5gOM0g+NUBaykJDbPA3gvCfN1uPNwqwFG1055xKmigGghPiTYs748fexhJT4k24GY8Ro9uJ/lK7w+MF9lz1H/43dHGjKxNeNpFjgeO+wFu+Ofuueu493TmC84IIzPpdtgV0R/pbqAEXNx6+gqg60LAhfEkAl7wp+10Y/2YnCB4wbs0+vBs7+VxszB4weeq6p5yKA9PwX9gXVID8hcbfqurLH/lCNDFcP4CCqPcNKZKaKXm7vvfehVxOiwh09iN3djCbFNPfz7mInY4q4KSAAAAAElFTkSuQmCC"} alt="" />
          <div className="info">
            <span>{data?.username}</span>
            <div className="country">
              <span>{data?.city}</span>
            </div>
          </div>
        </div>
      )}
      <div className="stars">
        {Array(review?.star)
          .fill()
          .map((item, i) => (
            <img src="https://img.freepik.com/free-vector/start_53876-25533.jpg" alt="" key={i} />
          ))}
        <span>{review?.star}</span>
      </div>
      <p>{review?.desc}</p>
      <div className="helpful">
        <span>Helpful?</span>
        <img src="https://www.shutterstock.com/image-vector/thumb-symbol-finger-icon-vector-260nw-568936645.jpg" alt="" />
        <span>Yes</span>
        <img src="https://previews.123rf.com/images/mykub/mykub1903/mykub190300127/118521011-dislike-hand-thumb-down-thumb-up-symbol-finger-up-icon-like-and-dislike-icon.jpg" alt="" />
        <span>No</span>
      </div>
    </div>
  );
};

export default Review;
