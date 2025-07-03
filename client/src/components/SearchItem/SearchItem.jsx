import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import "./searchitem.css"
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect } from 'react';
function SearchItem({item}) {
    axios.defaults.withCredentials=true
    const userId = item?.userId;

    const [data,setData] = useState([]);
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(false);
   console.log(userId);
    // const {
    //     isLoading: isLoadingUser,
    //     error: errorUser,
    //     data: dataUser,
    //   } = useQuery({
    //     queryKey: ["user10"],
    //     queryFn: () =>
    //       axios.get(`/users/single/${userId}`).then((res) => {
    //         return res.data;
    //       }),
    //   });
    useEffect(()=>{
        const fetchData = async()=>{ 
            try {
                const res = await axios.get(`/users/single/${userId}`);
                setData(res.data);
            } catch (err) {
                setError(err)
            }
        }
        fetchData();
    }, [item._id]);

      console.log(data?.username);

    const [isReadmoreShow,setReadmoreShow]=useState(false)

    const togglebtn = ()=>{
        setReadmoreShow(prevState => !prevState)
    }
  return (
    <div className='searchItem'>   
      <img
           src={item.house_Image}
            alt=""
            className="siImg"
            />
        <div className="siDesc">
            
            <h1 className="siTitle">{item?.title}</h1>
            <span className="siDistance">{item?.BHK} for Rent in {item?.adress}</span>
            <div className="sispan">
            <span className="siTaxiOp">Rs.{item?.price}/month</span>
            <span className="siSubtitle">
                {item?.distance}
            </span>
            <span className="siFeatures">
                {item?.BHK}
            </span>
            </div>
            <span className="siCancelOp">{isReadmoreShow ? item?.desc : item?.desc?.substr(0,150) }<button className='btn' onClick={togglebtn} >{isReadmoreShow ? "Read Less" : "Read More"}</button></span>
            {/* <span><button className='btn' onClick={togglebtn} >{isReadmoreShow ? "Read Less" : "Read More"}</button></span> */}
            <span className="siCancleOpSubtitle">
                You can cancel later , so lock in this Great Price Today!
            </span>
        </div>
        <div className="siDetails">
            <div className="siRating">
            <div className="user">
            <img
              className="pp"
              src={data?.img || "https://media.istockphoto.com/id/1016744004/vector/profile-placeholder-image-gray-silhouette-no-photo.jpg?s=612x612&w=0&k=20&c=mB6A9idhtEtsFXphs1WVwW_iPBt37S2kJp6VpPhFeoA="}
              alt=""
            />
            <span>{data?.username}</span>
            {!isNaN(item?.totalStars / item?.ratings) && (
                <div className="stars">
                    {Array(Math.round(item?.totalStars / item?.ratings))
                          .fill()
                          .map((item, i) => (
                            <img src="https://cdn.pixabay.com/photo/2021/10/11/00/58/star-6699069__340.png" alt="" key={i}/>
                          ))}
                  <span>{Math.round(item?.totalStars / item?.ratings)}</span>
                </div>
                 )}
          </div>
            </div>
            <div className="siDetaileTexts">
               <span className="siPrice">Rs.{item.price}</span>
               <span className="siTextOp">Includes taxes and Charges</span>
               <Link to={`/houses/${item._id}`}>
               <button className="siCheckButton">See Availability</button>
               </Link>
            </div>
        </div>
      </div>
  )
}

export default SearchItem