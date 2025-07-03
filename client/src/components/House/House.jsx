import React, { useContext, useState } from 'react'
import "./house.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faCircleArrowLeft, faCircleArrowRight, faCircleXmark, faLocationDot} from "@fortawesome/free-solid-svg-icons"
import useFetch from '../hooks/useFetch';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Reserve from '../reserve/Reserve';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import Reviews from '../reviews/Reviews';
function House() {
    const location = useLocation();
    const id = location.pathname.split("/")[2];
    const[slideno,setSlideno] = useState(0);
    const[open,setOpen] = useState(false);
    const[openModel,setOpenModel] = useState(false);
    axios.defaults.withCredentials=true

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    
    const {data,loading,error} = useFetch(`/houses/find/${id}`);

    const userId = data?.userId;

  const {
    isLoading: isLoadingUser,
    error: errorUser,
    data: dataUser,
  } = useQuery({
    queryKey: ["user1"],
    queryFn: () =>
      axios.get(`/users/single/${userId}`).then((res) => {
        return res.data;
      }),
    enabled: !!userId,
  });

  console.log(dataUser?.username);   
    const navigate = useNavigate();

    const handleOpen = (i) => {
        setSlideno(i);
        setOpen(true);
    }

    const handleMove = (direction) => {
        let newSlideno;
        if(direction==="l"){
            newSlideno= slideno === 0 ? 5: slideno-1
        }
        else{
            newSlideno= slideno === 5 ? 0: slideno+1
        }
        setSlideno(newSlideno);
    }
    const handleClick = ()=>{
      if(dataUser){
            setOpenModel(true);
      }
      else
      {
        navigate("/Login");
      }
    }
    const handleadd = async () => {
      if(!dataUser){
        navigate("/Login");}
        else{
      try {
        await axios.post(`/orders/${id}`);
        navigate("/myfavourites")
      } catch (err) {
        console.log(err);
      }
    }
    };
  return (
    <div> 
        <div className="homeContainer">
        <div className="user">
            <img
              className="pp"
              src={dataUser?.img || "https://media.istockphoto.com/id/1016744004/vector/profile-placeholder-image-gray-silhouette-no-photo.jpg?s=612x612&w=0&k=20&c=mB6A9idhtEtsFXphs1WVwW_iPBt37S2kJp6VpPhFeoA="}
              alt=""
            />
            <span>{dataUser?.username}</span>
            {!isNaN(data.totalStars / data.ratings) && (
                <div className="stars">
                    {Array(Math.round(data.totalStars / data.ratings))
                          .fill()
                          .map((item, i) => (
                            <img src="https://cdn.pixabay.com/photo/2021/10/11/00/58/star-6699069__340.png" alt="" key={i}/>
                          ))}
                  <span>{Math.round(data.totalStars / data.ratings)}</span>
                </div>
                 )}
          </div>
          {  open && < div className="slider">
            <FontAwesomeIcon icon={faCircleXmark} className="close" onClick={()=>setOpen(false)}/>
            <FontAwesomeIcon icon={faCircleArrowLeft} className="arrow" onClick={()=>handleMove("l")}/>
            <div className="slideWrapper">
                <img src={data.photos[slideno]} alt="" className="sliderImg" />
            </div>
            <FontAwesomeIcon icon={faCircleArrowRight} className="arrow" onClick={()=>handleMove("r")}/>
            </div>
            }
            <div className="homeWrapper">
                <button className="booknow" onClick={handleadd}>Add to Favourites</button>
                
              <Link to={`/update-property/${id}`}>
              {currentUser?._id===data?.userId ? <button>Update Property</button>: " " }
              </Link>
            
                <h1 className="homeTitle">
                    {data.title}
                </h1>
                <div className="homeAddress">
                     <FontAwesomeIcon icon={faLocationDot}></FontAwesomeIcon>
                    <span>{data.adress}</span>
                </div>
                <span className="homeDistance">
                    Excellent Location in City of - {data.city} 
                </span>
                <span className="homePriceHighlight">
                    Book this Raw House over ${data.price} at this Property
                </span>
                <div className="homeImages">
                    {data.photos?.map((photo,i)=>(
                        <div className="homeImgWrapper">
                            <img onClick={()=>handleOpen(i)} src={photo} alt="" className="homeImg" />
                        </div>
                    ))}
                </div>
                <div className="homeDetailes">
                    <div className="homeDetaileTexts">
                        <h1 className="homeTitle">{data.title}</h1>
                        <p className="homeDesc">
                        {data.desc}
                        </p>
                    </div>
                    <div className="homeDetailePrice">
                        <h1>Perfect for a Middle Class Family</h1>
                        <span>
                            Located in the city of Madrid in Spain , this property has an excellent location score of 9.8
                        </span>
                        <h2>
                            <b>${data.price}</b> (Fixed Price)
                        </h2>
                        <button onClick={handleClick}>Send Request-Note</button>
                    </div>
                </div>
            </div>
        </div>
        <div className="seller">
            <h2>About The Owner</h2>
            <div className="user">
              <img
              src={dataUser?.img || "https://media.istockphoto.com/id/1016744004/vector/profile-placeholder-image-gray-silhouette-no-photo.jpg?s=612x612&w=0&k=20&c=mB6A9idhtEtsFXphs1WVwW_iPBt37S2kJp6VpPhFeoA="}
              alt=""
              />
              <div className="info">
                <span>{dataUser?.username}</span>
                {!isNaN(data.totalStars / data.ratings) && (
                <div className="stars">
                    {Array(Math.round(data.totalStars / data.ratings))
                          .fill()
                          .map((item, i) => (
                            <img src="https://cdn.pixabay.com/photo/2021/10/11/00/58/star-6699069__340.png" alt="" key={i}/>
                          ))}
                  <span>{Math.round(data.totalStars / data.ratings)}</span>
                </div>
                 )}
                <button className='contact'>Contact Me</button>
              </div>
            </div>
            <div className="box">
              <div className="items">
                <div className="item">
                  <span className="title">From</span>
                  <span className="desc">{dataUser?.city}</span>
                </div>
                <div className="item">
                  <span className="title">Member since</span>
                  <span className="desc">Aug 2022</span>
                </div>
                <div className="item">
                  <span className="title">No.of Property Listed</span>
                  <span className="desc">4 Properties</span>
                </div>
                <div className="item">
                  <span className="title">Last Property Listed</span>
                  <span className="desc">1 day ago</span>
                </div>
                <div className="item">
                  <span className="title">Languages</span>
                  <span className="desc">English</span>
                </div>
              </div>
              <hr />
              <p>
                {dataUser?.desc}
              </p>
            </div>
          </div>
          <Reviews houseId={id} />
        {openModel && <Reserve setOpen={setOpenModel}/>}
    </div>
  )
}

export default House