import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, ChevronRight } from "lucide-react";
import moment from "moment-timezone";
import { Movie, Showtime } from "@/types/movie";
import ShowTimeSlot from "./ShowTimeSlot";
import { useTicketStore } from '@/store/intex';

export const ShowTimeTabs: React.FC<{ showDay: Movie | undefined; onTabChange?: (showDay: Movie) => void }> = ({ showDay, onTabChange }) => {
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [showSlots, setShowSlots] = useState<Showtime[] | []>([]);
  const tabsListRef = React.useRef<HTMLDivElement>(null);
  const { setTicketData } = useTicketStore()
  const scrollTabs = (direction: 'left' | 'right') => {
    if (tabsListRef.current) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      tabsListRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (showDay) {
      setShowSlots(showDay.showtimes);

    }
  }, [showDay]);

  useEffect(() => {
    if (tabsListRef.current && activeTab !== null) {
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

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    const selectedShowtime = showDay?.showtimes[parseInt(value)];
    if (selectedShowtime) {
      const selectedDate = moment
        .tz(selectedShowtime.date_time, "Asia/Ho_Chi_Minh")
        .format("DD/MM/YYYY");
      const selectedTime = moment
        .tz(selectedShowtime.date_time, "Asia/Ho_Chi_Minh")
        .format("HH:mm");


      setTicketData({
        selectedRoomId: Number(selectedShowtime.id_room),
        selectedShowDate: { date_time: selectedDate, id_showtime: selectedShowtime.id_showtime },
        selectedShowTime: selectedTime
      })
      if (onTabChange) {
        onTabChange(showDay);
      }
    }
  };
  if (showSlots.length == 0) {
    return (
      <></>
    )

  }
  return (
    <div className="w-full">
      <Tabs
        value={activeTab ?? undefined}
        onValueChange={handleTabChange}
        className="w-full my-5 max-w-2xl mx-auto"
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
      {activeTab !== null && (
        <ShowTimeSlot
          showSlots={showSlots.length > 0 ? showSlots[parseInt(activeTab)]?.showtime_slots : []}
          idRoom={showSlots.length > 0 ? showSlots[parseInt(activeTab)]?.id_room : undefined}
        />
      )}
    </div>
  );
};
