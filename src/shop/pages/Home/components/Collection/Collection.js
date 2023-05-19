import className from "./className";
import { collection1, collection2, collection3, collection4, collection5 } from "../../../../components/Image";
import { useEffect, useLayoutEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";



const collections = [
    {
        id: 0,
        image: collection1,
        title: "@katiee x Floral Smocked Mini Dress"
    },
    {
        id: 1,
        image: collection2,
        title: " @mng_nguyen x Checked Long Sleeve Silk Oversized Shirt"
    },
    {
        id: 2,
        image: collection3,
        title: "@nhucuynh x Full Of Love White T-shirt"
    },
    {
        id: 3,
        image: collection4,
        title: "@zhishumiart x Khaki Beige Straight Leg Trousers"
    },
    {
        id: 4,
        image: collection5,
        title: "@sofiaaa.ideee x Checked Mesh Cami Midi Dress"
    },
    {
        id: 5,
        image: collection4,
        title: "@zhishumiart x Khaki Beige Straight Leg Trousers"
    },
    {
        id: 6,
        image: collection5,
        title: "@sofiaaa.ideee x Checked Mesh Cami Midi Dress"
    },
]

const ButtonNext = ({ onClick, className: classNames, style }) => {

    return (
        <div
            className={classNames + " relative"}
            style={{ ...style }}
            onClick={onClick}>
            <div className={className.next}>
                <FontAwesomeIcon
                    className={"w-6 h-6"}
                    size={"1x"}
                    icon={faAngleRight}
                />
            </div>
        </div>
    )
}
const ButtonPrev = ({ onClick, className: classNames, style }) => {

    return (
        <div
            className={classNames + " relative z-10"}
            style={{ ...style }}
            onClick={onClick}>
            <div className={className.prev}>
                <FontAwesomeIcon
                    className={"w-6 h-6"}
                    size={"1x"}
                    icon={faAngleLeft}
                />
            </div>
        </div>
    )
}

const Collection = () => {

    const [slidesToShow, setSlidesToShow] = useState(2);

    useEffect(() => {
        const handleResize = () => {
            const { innerWidth } = window;
            if (innerWidth < 640) {
                setSlidesToShow(2);
            }
            else if (innerWidth < 768) {
                setSlidesToShow(3);
            }
            else if (innerWidth < 1024) {
                setSlidesToShow(4);
            }
            else {
                setSlidesToShow(5);
            }
        }
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useLayoutEffect(() => {
        const { innerWidth } = window;
        if (innerWidth < 640) {
            setSlidesToShow(2);
        }
        else if (innerWidth < 768) {
            setSlidesToShow(3);
        }
        else if (innerWidth < 1024) {
            setSlidesToShow(4);
        }
        else {
            setSlidesToShow(5);
        }
    }, []);

    const navigate = useNavigate();

    return (
        <div className={className.wrapper}>
            <Slider
                infinite={true}
                speed={1000}
                autoplaySpeed={2000}
                nextArrow={<ButtonNext />}
                prevArrow={<ButtonPrev />}
                slidesToShow={slidesToShow}
                slidesToScroll={1}>
                {collections.map(({ id, image, title }) => (
                    <div
                        key={id}
                        onClick={() => navigate("/product")}
                        className={className.item}>
                        <img
                            className={className.image}
                            src={image} />
                        <div className={className.title}>{title}</div>
                    </div>
                ))}
            </Slider>
        </div >
    )
}

export default Collection