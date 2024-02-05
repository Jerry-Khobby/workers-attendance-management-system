import React,{useState,useEffect} from "react";
import { Card, CardContent, Button } from "@mui/material";
import "tailwindcss/tailwind.css"; // Import Tailwind CSS styles
import { useParams,Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";



const WorkersCard = () => {
  const { email } = useParams();
  const [userData, setUserData] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        //attempt to get data from localstorage 
        const storedUserData = localStorage.getItem("userData");
        if (storedUserData) {
          setUserData(JSON.parse(storedUserData));
        }else{
        const response = await fetch(`http://127.0.0.1:8000/api/usercard/retrieve_card_info/?email=${email}`,{
          method:'GET',
          headers:{
            Authorization: `Token a23653c2965c43077a41c74aaade3e236c45fbfc`,
          }
        });
        if (response.ok) {
          const data = await response.json();
          setUserData(data); // Assuming the response is a JSON object, adjust as needed
           // Save data to localStorage
           localStorage.setItem("userData", JSON.stringify(data));
        } else {
          console.error(`Failed to fetch data. Status: ${response.status}`);
        }
      }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [email]);
;
  return (
    <div className="flex flex-col items-center justify-center h-full w-full mt-28  gap-7">
      <div className="flex items-center flex-col">
        <h1 className="text-xl">Your Membership Card</h1>
        <p className="text-base font-normal font-mono">
          This is your staff card as a worker of the company,this card will be <br />
          checked everyday at the work place and will be used to <br /> sign-in
          and sign-out at the work place , so please
          <br /> handle with care.
        </p>
      </div>
      <Card className="h-80 w-96 border-2 border-dashed border-black-400">
        <CardContent className="flex flex-col items-center">
          <CardContent>
            <h5 className="font-serif">JM's WORKERS COMPANY</h5>
            <h6 className="font-serif">WORKERS ID MEMBERSHIP CARD</h6>
          </CardContent>
          <CardContent className="flex flex-row items-center justify-center">
            <CardContent>
            {userData.decoded_image ? (
      <img
        src={userData.decoded_image}
        alt=""
        height={160}
        width={150}
        style={{ objectFit: 'cover', borderRadius: '50%' }}
      />
    ) : (
      <Avatar
        alt=""
        src="/default-avatar.png"  // Set the path to your default image or use an icon
        sx={{ width: 150, height: 160, objectFit: 'cover', borderRadius: '50%' }}
      />
    )}
            </CardContent>
            <CardContent>
              <p className="text-sm">NAME:</p>
              <p className="font-mono text-base">{userData.first_name} {userData.last_name}</p>
              <p className="text-sm">DATE OF BIRTH:</p>
              <p className="font-mono">{userData.date_of_birth}</p>
              <p className="text-sm">MEMBERSHIP NO:</p>
              <p className="font-mono">{userData.Id_number}</p>
            </CardContent>
          </CardContent>
        </CardContent>
      </Card>
      <Button variant="contained" color="primary">
      <Link to="/homepage">
      HOME PAGE
      </Link>
      </Button>
    </div>
  );
};

export default WorkersCard;
