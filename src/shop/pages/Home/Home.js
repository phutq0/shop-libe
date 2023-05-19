import className from "./className";
import Collection from "./components/Collection";
import MainBoard from "./components/MainBoard";
import Marquee from "./components/Marquee";
import Slide from "./components/Slide";
import Story from "./components/Story";

const Home = () => {

    return (
        <div className={className.container}>
            <MainBoard />
            <Marquee />
            <Slide />
            <Story />
            <div className={className.hashTag}>#LIBEONME</div>
            <div className={className.title}>
                We love seeing ALL of you
                beautiful, unique people. Keep sharing your amazing
                selves, with @libeworkshop and hashtag #LIBEonme!
            </div>
            <Collection />
        </div>
    )
}

export default Home