import { Link } from "react-router-dom";
import { type HotelType } from "@/types";

type Props = {
  hotel: HotelType;
};

export const LastDestinationCard = ({ hotel }: Props) => {
  return (
    <Link to={`/details/${hotel._id}`} className="relative cursor-pointer overflow-hidden rounded-md">
      <div className="h-[300px] ">
        <img src={hotel.imageUrls[0]} className="w-full h-full object-cover object-center" alt="hotel-image" />
      </div>
      <div className="absolute bottom-0 p-4 bg-black/50  w-full rounded-b-md ">
        <span className="text-white font-bold tracking-tight text-3xl">{hotel.name}</span>
      </div>
    </Link>
  );
};
