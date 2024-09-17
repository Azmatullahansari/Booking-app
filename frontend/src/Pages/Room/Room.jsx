import "./room.style.scss"
import { useEffect,useState } from "react"
import { useNavigate, useParams, Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { reset, deleteRoom } from "../../features/room/roomSlice"
import Carousel  from "../../components/Carousel/Carousel"


const Room = () => {
    const { user } = useSelector((state) => state.auth);
    const { isSuccess } = useSelector((state) => state.room)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {id} = useParams();
    const [room, setRoom] = useState(null);
    useEffect(() => {
        if(isSuccess){
          //dispatch reset
          dispatch(reset())            
          //navigate to rooms
          navigate(("/rooms"))
        

        }
    },[isSuccess])
    useEffect(() => {
        const getRoom = async () => {
            try {
                const res = await fetch(`http://localhost:5000/api/rooms/${id}`)
                if(res.ok) {
                    const data = await res.json();
                    setRoom(data)
                }
            } catch (error) {
                console.log(error)
            }
        };
        getRoom()
    },[])
    const handleDelete = () => {
      dispatch(deleteRoom(id));
      navigate("/rooms")
    }
  return (
    <div id="room">
    <div className="container">{room ? (<div>
      <div className="img-wrapper">
            {<p>this for image</p>}
            {<Carousel data={room.img} />}

            {/* <img src={room.img[0]} alt="" /> */}
          </div>
          <div className="text-wrapper">
            <h1 className="heading center"> {room.name} </h1>
            <p> {room.description} </p>
            <h2> ${room.price.toFixed(2)} </h2>
          </div>
          {user && user.isAdmin ? (
            <div className="cta-wrapper">
              <Link to={`/rooms/edit/${room._id}`}>Edit Room</Link>
              <button onClick={handleDelete}>Delete Room</button>
            </div>
          ): null}
          </div>
      ): null}
      </div>
  </div>

  );
};

export default Room
