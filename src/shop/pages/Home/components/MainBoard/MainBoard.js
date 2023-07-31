import { useNavigate } from "react-router-dom"
import { homepage1, homepage2, homepage3, homepage4 } from "../../../../components/Image"
import className from "./className"


const MainBoard = () => {

    const navigate = useNavigate();

    return (
        <div className={className.wrapper}>
            <div className={className.div1}>
                <img className={className.img1} alt="1" src={homepage1} />
                <div
                    className={className.button}
                    onClick={() => navigate("/collection/all-1")}>SHOP NOW</div>
            </div>
            <div className={className.div2}>
                <div className={className.div3}>
                    <img className={className.img2} alt="1" src={homepage2} />
                    <div
                        className={className.button}
                        onClick={() => navigate("/collection/libe-good-2")}>LIBÉGOODS</div>
                </div>
                <div className={className.div4}>
                    <div className="flex-1 relative">
                        <img src={homepage3} alt="1" />
                        <div
                            className={className.button}
                            onClick={() => navigate("/collection/accessories-3")}>ACCESSORIES</div>
                    </div>
                    <div className="flex-1 relative">
                        <img src={homepage4} alt="1" />
                        <div className={className.button}>STORIES</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainBoard