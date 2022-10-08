import WelcomePage from "../pages/hello/WelcomePage";
import Game from "../pages/tictac/Game";
import Test from "../pages/test/Test";

type PageInfo = {
    Name: string,
    Url: string,
    Element: any
}
const PageInfos: PageInfo[] = [
    {Name: "歡迎頁", Url: "/", Element: WelcomePage},
    {Name: "圈圈叉叉", Url: "tictac", Element: Game},
    {Name: "測試", Url: "test", Element: Test},
];

export default PageInfos;