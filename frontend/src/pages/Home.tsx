import { useQuery } from "react-query";
import * as apiClient from "@/utils/api-client";
import { LastDestinationCard } from "@/components/LastDestinationCard";

const Home = () => {
  const { data: hotels } = useQuery("fetchQuery", () => apiClient.fetchHotels());
  const topRowHotels = hotels?.data?.slice(0, 2) || [];
  const bottomRowHotels = hotels?.data?.slice(2) || [];

  return (
    <div className="space-y-3">
      <h2 className="text-3xl font-bold">Latest Destinations</h2>
      <p>Most recent destinations added by our hosts</p>
      <div className="grid gap-4">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          {topRowHotels.map((hotel) => (
            <LastDestinationCard key={hotel._id} hotel={hotel} />
          ))}
        </div>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          {bottomRowHotels.map((hotel) => (
            <LastDestinationCard key={hotel._id} hotel={hotel} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
