import { createRef, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { useSpring, animated } from "@react-spring/web";

import className from "./className";
import { products } from "../../share/data";
import { useNavigate } from "react-router-dom";

const searchRightRef = createRef();

const SearchRight = () => {

    const navigate = useNavigate();

    const [show, setShow] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [searchRightStyle, springSearchRight] = useSpring(() => ({
        transform: "translateX(100%)"
    }));

    const startShowSearchRight = () => {
        springSearchRight.start({
            transform: "translateX(0%)",
            config: {
                duration: 250,
            }
        });
    }

    const startHideSearchRight = () => {
        springSearchRight.start({
            transform: "translateX(100%)",
            config: {
                duration: 250,
            }
        });
    }

    useEffect(() => {
        searchRightRef.current = {
            show: () => {
                startShowSearchRight();
                setShow(true);
            }
        }
    }, []);

    useEffect(() => {
        if (show) {
            setSearchValue("");
        };
        if (show) {
            document.body.style.overflow = "hidden";
            document.body.style.paddingRight = "8px";
        }
        else {
            document.body.style.overflow = "unset";
            document.body.style.paddingRight = "0px";
        }
    }, [show]);

    return (
        <div>
            {show && (
                <div
                    className={className.overlay}
                    onClick={() => {
                        startHideSearchRight();
                        setShow(false);
                    }}></div>
            )}
            <animated.div className={className.content} style={searchRightStyle}>
                <div
                    className={className.iconClose}
                    onClick={() => {
                        startHideSearchRight();
                        setShow(false);
                    }}>
                    <FontAwesomeIcon
                        icon={faCircleXmark} />
                </div>
                <div className={className.title}>SEARCH</div>
                <div className={className.border}>
                    <input
                        className={className.input}
                        value={searchValue}
                        placeholder={"Search for items, product codes..."}
                        onChange={e => setSearchValue(e.target.value)} />
                    {searchValue.length > 0 && (
                        <FontAwesomeIcon
                            onClick={() => setSearchValue("")}
                            className={className.clear}
                            icon={faCircleXmark} />
                    )}
                </div>
                <div className={className.data}>
                    {/* <div className={className.notFound}>
                        Không có sản phẩm nào...
                    </div> */}
                    {products.slice(0, 5).map((item, index) => (
                        <div
                            key={item.id ?? index}
                            className={className.item}>
                            <div className={className.right}>
                                <div className={className.name}>
                                    {item.name}
                                </div>
                                <div className={className.price}>
                                    {item.price?.toLocaleString()}₫
                                </div>
                            </div>
                            <img
                                src={item.image1}
                                alt="1"
                                className={className.image} />
                        </div>
                    ))}
                </div>
                <div
                    className={className.buttonMore}
                    onClick={() => {
                        startHideSearchRight();
                        setShow(false);
                        navigate("/search");
                    }}>
                    {"Xem thêm sản phẩm"}
                </div>
            </animated.div>
        </div>
    )
}

export default SearchRight
export { searchRightRef }