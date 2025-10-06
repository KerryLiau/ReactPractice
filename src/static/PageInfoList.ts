import WelcomePage from "../pages/hello/WelcomePage";
import TicTacToe from "../pages/tictac/TicTacToe";
import Test from "../pages/test/Test";
import BouncingBall from "../pages/bouncingBall/BouncingBallBeforeRender";
import BouncingBallPreferredWay from "../pages/bouncingBall/BouncingBallAfterRender";

type PageInfo = {
    Name: string,
    Url: string,
    Element: any
}
const PageInfos: PageInfo[] = [
    {Name: "歡迎頁", Url: "/", Element: WelcomePage},
    {Name: "圈圈叉叉", Url: "tictac", Element: TicTacToe},
    {Name: "測試", Url: "test", Element: Test},
    {Name: "彈跳球[即時生成]", Url: "bouncingBall", Element: BouncingBall},
    {Name: "彈跳球[後製]", Url: "bouncingBallPreferredWay", Element: BouncingBallPreferredWay},
];

export default PageInfos;