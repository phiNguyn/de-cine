import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { ChevronLeft, ChevronRight } from "lucide-react";
import moment from "moment-timezone";
import { Movie, Showtime } from "@/types/movie";
import ShowTimeSlot from "./ShowTimeSlot";  // Component hiển thị suất chiếu

export const ShowTimeTabs: React.FC<{ showDay: Movie | undefined; onTabChange?: (showDay: Movie) => void }> = ({ showDay, onTabChange }) => {
  const [activeTab, setActiveTab] = React.useState("0");
  const [showSlots, setShowSlots] = React.useState<Showtime[]>(showDay?.showtimes || []);
  const tabsListRef = React.useRef<HTMLDivElement>(null);

  const scrollTabs = (direction: 'left' | 'right') => {
    if (tabsListRef.current) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      tabsListRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  React.useEffect(() => {
    // Cập nhật lại showSlots khi showDay thay đổi
    if (showDay) {
      setShowSlots(showDay.showtimes);
    }
  }, [showDay]);

  React.useEffect(() => {
    if (tabsListRef.current) {
      const activeElement = tabsListRef.current.querySelector(`[data-state="active"]`);
      if (activeElement) {
        activeElement.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }
    }
  }, [activeTab]);

  return (
    <div>
      <Tabs
        defaultValue="0"
        className="w-full my-5 max-w-2xl mx-auto"
        onValueChange={(value) => {
          setActiveTab(value);
          const selectedShowtime = showDay?.showtimes[parseInt(value)];
          if (selectedShowtime && onTabChange) {
            onTabChange(showDay);  
          }
        }}
      >
        <div className="relative mb-4">
          <Button
            variant="primary"
            size="icon"
            className="absolute left-0 top-0"
            onClick={() => scrollTabs('left')}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div ref={tabsListRef} className="overflow-x-auto scrollbar-hide mx-8">
            <TabsList className="inline-flex mx-2 gap-x-2 h-10 items-center justify-start rounded-lg bg-muted text-muted-foreground w-max p-2">
              {showDay?.showtimes?.map((time, index) => (
                <TabsTrigger
                  key={index}
                  value={`${index}`}
                  className="flex-shrink-0 px-3 py-1.5 text-md font-medium transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-yellow-500 data-[state=active]:text-foreground data-[state=active]:shadow-sm"
                >
                  {moment.tz(time.date_time, "Asia/Ho_Chi_Minh").format("DD/MM")}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          <Button
            variant="primary"
            size="icon"
            className="absolute right-0 top-0 z-10"
            onClick={() => scrollTabs('right')}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </Tabs>

      {/* Hiển thị suất chiếu cho ngày đã chọn */}
      <ShowTimeSlot 
        showSlots={showSlots.length > 0 ? showSlots[parseInt(activeTab)]?.showtime_slots : []}
      />
    </div>
  );
};
