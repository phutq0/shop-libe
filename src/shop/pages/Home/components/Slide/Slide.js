import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import className from "./className";
import { slide1, slide2, slide3, slide4 } from "../../../../components/Image";

const images = [
    { id: 0, image: slide1 },
    { id: 1, image: slide2 },
    { id: 2, image: slide3 },
    { id: 3, image: slide4 },
]


const Slide = () => {

    return (
        <div className={className.wrapper}>
            <Slider
                dots={true}
                infinite={true}
                speed={800}
                arrows={false}
                autoplaySpeed={2000}
                slidesToShow={1}
                slidesToScroll={1}
                autoplay={true}
                appendDots={(dot) => <ul style={{ bottom: 20 }}>{dot}</ul>}>
                {images.map(({ id, image }) => (
                    <img
                        className={className.image}
                        key={id}
                        src={image}
                        alt={`${id}`} />
                ))}
            </Slider>
        </div >
    )
}

export default Slide