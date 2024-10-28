import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardFooter,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Link } from "react-router-dom"

export const ShowTimeTabs: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState("1")
  const tabsListRef = React.useRef<HTMLDivElement>(null)

  const scrollTabs = (direction: 'left' | 'right') => {
    if (tabsListRef.current) {
      const scrollAmount = direction === 'left' ? -200 : 200
      tabsListRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  React.useEffect(() => {
    if (tabsListRef.current) {
      const activeElement = tabsListRef.current.querySelector(`[data-state="active"]`)
      if (activeElement) {
        activeElement.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        })
      }
    }
  }, [activeTab])


  const timeSlots = [
    {
      id: 1, date: "12/09",
      listTime: [
        { id: 1, time: "12:45" },
        { id: 2, time: "13:45" },
      ]
    },
    {
      id: 2, date: "13/09", listTime: [
        { id: 1, time: "12:45" },
        { id: 3, time: "14:45" },
        { id: 4, time: "15:45" },
        { id: 5, time: "16:45" },
      ]
    },
    {
      id: 3, date: "14/09", listTime: [
        { id: 2, time: "13:45" },
        { id: 4, time: "15:45" },
        { id: 6, time: "17:45" },
      ]
    },
    {
      id: 4, date: "15/09", listTime: [
        { id: 2, time: "13:45" },
        { id: 3, time: "14:45" },
        { id: 4, time: "15:45" },
        { id: 6, time: "17:45" },
      ]
    },
    {
      id: 5, date: "16/09", listTime: [
        { id: 1, time: "12:45" },
        { id: 2, time: "13:45" },
        { id: 3, time: "14:45" },
        { id: 4, time: "15:45" },
        { id: 5, time: "16:45" },
      ]
    },
    {
      id: 6, date: "17/09", listTime: [
        { id: 1, time: "12:45" },
        { id: 2, time: "13:45" },
        { id: 3, time: "14:45" },
        { id: 6, time: "17:45" },
      ]
    },
    {
      id: 7, date: "18/09", listTime: [
        { id: 2, time: "13:45" },
        { id: 3, time: "14:45" },
        { id: 4, time: "15:45" },
        { id: 5, time: "16:45" },
      ]
    },
    {
      id: 8, date: "19/09", listTime: [
        { id: 1, time: "12:45"},
        { id: 2, time: "13:45" },
        { id: 4, time: "15:45" },
        { id: 5, time: "16:45" },
        { id: 6, time: "17:45" },
      ]
    },
  ]

  return (
    <Tabs
      defaultValue={`time${timeSlots[0].id + 1}`}
      className="w-full my-5 max-w-2xl mx-auto"
      onValueChange={setActiveTab}
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
        <div
          ref={tabsListRef}
          className="overflow-x-auto scrollbar-hide mx-8"
        >
          <TabsList className="inline-flex mx-2 gap-x-2 h-10 items-center justify-start rounded-lg bg-muted p-1 text-muted-foreground w-max">
            {timeSlots.map((time) => (
              <TabsTrigger
                key={time.id}
                value={`time${time.id + 1}`}
                className="flex-shrink-0 px-3 py-1.5 text-md font-medium transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-yellow-500 data-[state=active]:text-foreground data-[state=active]:shadow-sm"
              >
                {time.date}
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
      {timeSlots.map((time) => (
        <TabsContent key={time.id} value={`time${time.id + 1}`}>
          <Card>
            <CardHeader>
              <CardDescription>
                Chọn giờ xem bạn nhé
              </CardDescription>
              <div className="grid grid-cols-4 gap-5 max-w-md">
                {time.listTime.map(time => (
                  <Link to={'/Seat'} key={time.id} className="group w-fit cursor-pointer">

                  <CardDescription className="border w-fit
                    border-yellow-500 text-primary 
                   rounded-md px-3 py-1.5 group-hover:border-white group-hover:bg-yellow-500">
                    {time.time}
                  </CardDescription>
                     </Link>
                ))}
              </div>

            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="seats">Number of Seats</Label>
                <Input id="seats" type="number" min="1" max="10" placeholder="Enter number of seats" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Book Tickets</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      ))}
    </Tabs>
  )
}
