import React from "react";
import { Card, CardContent, Button } from "@mui/material";
import "tailwindcss/tailwind.css"; // Import Tailwind CSS styles

const WorkersCard = () => {
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
        <CardContent className="flex flex-col items-center  gap-0">
          <CardContent>
            <h5 className="font-serif">JM's WORKERS COMPANY</h5>
            <h6 className="font-serif">WORKERS ID MEMBERSHIP CARD</h6>
          </CardContent>
          <CardContent className="flex flex-row items-center justify-center">
            <CardContent>
              <img
                src="data:image/jpeg;base64,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"
                alt=""
              />
            </CardContent>
            <CardContent>
              <p className="text-sm">NAME:</p>
              <p className="font-mono text-base">Jeremiah Anku Coblah</p>
              <p className="text-sm">DATE OF BIRTH:</p>
              <p className="font-mono">12/23/2023</p>
              <p className="text-sm">MEMBERSHIP NO:</p>
              <p className="font-mono">01234342387492834</p>
            </CardContent>
          </CardContent>
        </CardContent>
      </Card>
      <Button variant="contained" color="primary">
        Home Page
      </Button>
    </div>
  );
};

export default WorkersCard;
