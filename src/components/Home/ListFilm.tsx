import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FilmItemHover } from "../Film"
import RootLayout from "../Layout/RootLayout"

const ListFilm = () => {
  const fakeTabs = [
    {
      id: 1, slug: 'sap-chieu', title: 'Sắp Chiếu', List: [
        { id: 1, name: "Tranformer Một", image: "https://cdn.galaxycine.vn/media/2024/8/13/transformers-500_1723544375976.jpg", ytSlug: "xwshpIu6YkQ" },
        { id: 2, name: "Tranformer Một", image: "https://cdn.galaxycine.vn/media/2024/8/13/transformers-500_1723544375976.jpg", ytSlug: "Bfcc7L68d_0" },
        { id: 3, name: "Tranformer Một", image: "https://cdn.galaxycine.vn/media/2024/8/13/transformers-500_1723544375976.jpg", ytSlug: "Bfcc7L68d_0" },
        { id: 4, name: "Tranformer Một", image: "https://cdn.galaxycine.vn/media/2024/8/13/transformers-500_1723544375976.jpg", ytSlug: "Bfcc7L68d_0" }
      ]
    },
    {
      id: 2, slug: 'dang-chieu', title: 'Đang chiếu', List: [
        { id: 1, name: "Tranformer Một", image: "https://cdn.galaxycine.vn/media/2024/9/18/do-anh-cong-duoc-toi-500_1726635602912.jpg", ytSlug: "Mb3f6ZDSty0" },
        { id: 2, name: "Tranformer Một", image: "https://cdn.galaxycine.vn/media/2024/9/18/do-anh-cong-duoc-toi-500_1726635602912.jpg", ytSlug: "Mb3f6ZDSty0" },
        { id: 3, name: "Tranformer Một", image: "https://cdn.galaxycine.vn/media/2024/9/18/do-anh-cong-duoc-toi-500_1726635602912.jpg", ytSlug: "Mb3f6ZDSty0" },
        { id: 4, name: "Tranformer Một", image: "https://cdn.galaxycine.vn/media/2024/9/18/do-anh-cong-duoc-toi-500_1726635602912.jpg", ytSlug: "Mb3f6ZDSty0" }
      ],

    },
    {
      id: 3, slug: 'dac-biet', title: 'Suất Chiếu Đặc Biệt', List: [
        { id: 1, name: "Tranformer Một", image: "https://cdn.galaxycine.vn/media/2024/9/27/minh-hon-500_1727429489854.jpg", ytSlug: "x7hgcR3u5xM" },
        { id: 2, name: "Tranformer Một", image: "https://cdn.galaxycine.vn/media/2024/9/27/minh-hon-500_1727429489854.jpg", ytSlug: "x7hgcR3u5xM" },
        { id: 3, name: "Tranformer Một", image: "https://cdn.galaxycine.vn/media/2024/9/27/minh-hon-500_1727429489854.jpg", ytSlug: "x7hgcR3u5xM" },
        { id: 4, name: "Tranformer Một", image: "https://cdn.galaxycine.vn/media/2024/9/27/minh-hon-500_1727429489854.jpg", ytSlug: "x7hgcR3u5xM" }
      ]
    }
  ]

  // const fakeTabItem = [

  // ]
  return (
    <>
      <RootLayout>
        <Tabs defaultValue="sap-chieu" className="min-w-full">
          <TabsList className="w-full gap-x-5 md:w-auto ">
            {fakeTabs.map((item) => (
              <TabsTrigger className="cursor-pointer " key={item.id} value={item.slug}>{item.title}</TabsTrigger>

            ))}
          </TabsList>

          {fakeTabs.map((tab) => (
            <TabsContent key={tab.id} value={tab.slug}>
              <div className="p-5 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-6">
                {tab.List.map((film) => (
                  <FilmItemHover key={film.id} Film={film} />
                ))}
              </div>
            </TabsContent>
          ))}

        </Tabs>
      </RootLayout>

    </>
  )
}

export default ListFilm