import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FilmItemHover } from "../Film"

const ListFilm = () => {
    const fakeTabs = [
        {id: 1, slug : 'sap-chieu' , title : 'Sắp Chiếu', List : [
            {id: 1,  name: "Tranformer Một", image : "https://cdn.galaxycine.vn/media/2024/8/13/transformers-500_1723544375976.jpg"},
            {id: 2, name: "Tranformer Một", image : "https://cdn.galaxycine.vn/media/2024/8/13/transformers-500_1723544375976.jpg"},
            {id: 3, name: "Tranformer Một", image : "https://cdn.galaxycine.vn/media/2024/8/13/transformers-500_1723544375976.jpg"},
            {id: 4, name: "Tranformer Một", image : "https://cdn.galaxycine.vn/media/2024/8/13/transformers-500_1723544375976.jpg"}
        ]
    },
    {id: 2, slug : 'dang-chieu' , title : 'Đang chiếu', List : [
        {id: 1,  name: "Tranformer Một", image : "https://cdn.galaxycine.vn/media/2024/9/18/do-anh-cong-duoc-toi-500_1726635602912.jpg"},
        {id: 2, name: "Tranformer Một", image : "https://cdn.galaxycine.vn/media/2024/9/18/do-anh-cong-duoc-toi-500_1726635602912.jpg"},
        {id: 3, name: "Tranformer Một", image : "https://cdn.galaxycine.vn/media/2024/9/18/do-anh-cong-duoc-toi-500_1726635602912.jpg"},
        {id: 4, name: "Tranformer Một", image : "https://cdn.galaxycine.vn/media/2024/9/18/do-anh-cong-duoc-toi-500_1726635602912.jpg"}
    ],
    
},
{id: 3, slug : 'dac-biet' , title : 'Suất Chiếu Đặc Biệt', List : [
    {id: 1,  name: "Tranformer Một", image : "https://cdn.galaxycine.vn/media/2024/9/27/minh-hon-500_1727429489854.jpg"},
    {id: 2, name: "Tranformer Một", image : "https://cdn.galaxycine.vn/media/2024/9/27/minh-hon-500_1727429489854.jpg"},
    {id: 3, name: "Tranformer Một", image : "https://cdn.galaxycine.vn/media/2024/9/27/minh-hon-500_1727429489854.jpg"},
    {id: 4, name: "Tranformer Một", image : "https://cdn.galaxycine.vn/media/2024/9/27/minh-hon-500_1727429489854.jpg"}
]}
    ]

    // const fakeTabItem = [

    // ]
  return (
    <Tabs defaultValue="sap-chieu" className="min-w-full max-w-full">
    <TabsList className="w-full gap-x-5 ">
        {fakeTabs.map((item) => (
            <TabsTrigger className="cursor-pointer text-lg"  key={item.id} value={item.slug}>{item.title}</TabsTrigger>

        ))}
    </TabsList>

    {fakeTabs.map((tab) => (
        <TabsContent key={tab.id} value={tab.slug}>
          <div className="grid grid-cols-4 gap-5">
            {tab.List.map((film) => (
              <FilmItemHover key={film.id} Film={film}/>
            ))}
          </div>
        </TabsContent>
      ))}
  </Tabs>
  
  )
}

export default ListFilm