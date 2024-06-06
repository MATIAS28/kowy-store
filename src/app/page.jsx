import { BestSellersComponent } from "@/components/home/bestSellers";
import { MostClickedComponent } from "@/components/home/mostClicked";
import { PendingOrdersComponent } from "@/components/home/pendingOrders";
import { StatisticsComponent } from "@/components/home/statistics";

export default function HomePage() {
  return (
    <div className="grid grid-cols-1 gap-6 p-4">
      <div>
        <h1 className="text-3xl font-semibold">General</h1>
      </div>
      
      <StatisticsComponent/>

      <div className="flex items-start w-full">
        <PendingOrdersComponent/>
        <BestSellersComponent/>
      </div>

    </div>
  );
}
