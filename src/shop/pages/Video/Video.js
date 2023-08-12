import { faAngleDown, faAngleUp, faCaretUp, faPaperPlane } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import _ from "lodash"
import { useEffect, useMemo, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import Utils from "shop/share/Utils"

const Video = () => {

    const videos = useMemo(() => {
        const video = [
            "http://localhost:4000/upload/videos/ab27f00f5aa64fb78540b14c98984241_ab85de79f81a444e8fd0589f10299c65.mp4",
            "http://localhost:4000/upload/videos/fe5a4679349c44a1bd26dd16c555ef38_6a2b1899847a497e9bd5478662e9ddf0.mp4",
            "http://localhost:4000/upload/videos/36dc2d4aaaff46858e922a4f9b3151e4_31a5abb20e8d47d698c60761163d4784.mp4",
            "http://localhost:4000/upload/videos/6730aeb4ffe6453bba450009a7366f09_abccae0d605a4753959d28c96f3d5da9.mp4",
            "http://localhost:4000/upload/videos/b1997d2b09274b6791e4fb92de87b972_95c1fd2bef094947b1d32c8f178f6e0d.mp4",
            "http://localhost:4000/upload/videos/7eecbb6137204fbd957328f58735abec_714c2560597446aa9146405b94c6d874.mp4",
        ]
        return _.shuffle(video);
    }, []);

    const navigate = useNavigate();

    const data = useMemo(() => {
        return _.shuffle([
            {
                id: 1,
                name: "Black Side Twisted Shoulder Top",
                image: "http://localhost:4000/upload/images/408656d312654824ac219223b730d5d3_libe-black_side_twisted_shoulder_top8.webp",
                price: 350000,
                video: "http://localhost:4000/upload/videos/ab27f00f5aa64fb78540b14c98984241_ab85de79f81a444e8fd0589f10299c65.mp4",
            },
            {
                id: 2,
                name: "See Thru Sleeveless Lace Longline Top",
                image: "http://localhost:4000/upload/images/6689c7b0ea704be49fbaffcb249d5c7c_libe-see_thru_sleeveless_lace_longline_top7.webp",
                price: 450000,
                video: "http://localhost:4000/upload/videos/fe5a4679349c44a1bd26dd16c555ef38_6a2b1899847a497e9bd5478662e9ddf0.mp4",
            },
            {
                id: 3,
                name: "White Ruffle Trim Tie-Front Top",
                image: "http://localhost:4000/upload/images/7079e37ac62f4790b1e673b289205a96_libe-white_ruffle_trim_tie-front_top5.webp",
                price: 350000,
                video: "http://localhost:4000/upload/videos/36dc2d4aaaff46858e922a4f9b3151e4_31a5abb20e8d47d698c60761163d4784.mp4",
            },
            {
                id: 4,
                name: "Light Blue High Waisted Straight Leg Jeans",
                image: "http://localhost:4000/upload/images/7879f91ea61c472da03daaeb6627e451_libe-light_blue_high_waisted_straight_leg_jeans4.webp",
                price: 590000,
                video: "http://localhost:4000/upload/videos/6730aeb4ffe6453bba450009a7366f09_abccae0d605a4753959d28c96f3d5da9.mp4",
            },
            {
                id: 5,
                name: "Medium Blue High Waisted Straight Leg Jeans",
                image: "http://localhost:4000/upload/images/59c0d15abd1f4af7800991e1f53ad537_libe-medium_blue_high_waisted_straight_leg_jeans2_(1).webp",
                price: 590000,
                video: "http://localhost:4000/upload/videos/b1997d2b09274b6791e4fb92de87b972_95c1fd2bef094947b1d32c8f178f6e0d.mp4",
            },
            {
                id: 6,
                name: "White Cloudy Seersucker Blouse",
                image: "http://localhost:4000/upload/images/f3162fc36778464088e2699f8ccb5749_libe-white_cloudy_seersucker_blouse1.webp",
                price: 420000,
                video: "http://localhost:4000/upload/videos/7eecbb6137204fbd957328f58735abec_714c2560597446aa9146405b94c6d874.mp4",
            },
        ]);
    }, []);

    const [index, setIndex] = useState(0);
    const ref = useRef();

    useEffect(() => {
        ref.current.volume = 0.1;
    }, [])

    return (
        <div className="flex flex-row w-screen h-screen">
            <div className="w-full flex justify-center relative overflow-hidden bg-black h-screen">
                {/* <video autoPlay ref={ref}>
                    <source src={videos[index]} type="video/mp4" />
                </video> */}
                <video
                    loop={true}
                    className="h-full"
                    autoPlay={"autoplay"}
                    preload="auto"
                    playsInline
                    controls={true}
                    ref={ref}
                    src={data[index].video} />
                <div className="flex items-center absolute top-0 right-4 bottom-0">
                    <div className="flex flex-col">
                        {index > 0 && (
                            <div
                                className="w-12 h-12 rounded-full bg-white/50 flex items-center justify-center cursor-pointer my-2 hover:opacity-70"
                                onClick={() => {
                                    setIndex(index => index - 1);
                                }}>
                                <FontAwesomeIcon
                                    className="text-2xl"
                                    icon={faAngleUp} />
                            </div>
                        )}
                        <div
                            className="w-12 h-12 rounded-full bg-white/50 flex items-center justify-center cursor-pointer my-2 hover:opacity-70"
                            onClick={() => {
                                const i = index == data.length - 1 ? 0 : index + 1;
                                setIndex(i);
                            }}>
                            <FontAwesomeIcon
                                className="text-2xl"
                                icon={faAngleDown} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="hidden md:flex w-[400px] flex-col">
                <div className="flex-1 flex flex-col px-2 pt-2 items-center">
                    <img
                        className="w-[150px] border rounded cursor-pointer"
                        src={data[index].image}
                        alt="image"
                        onClick={() => {
                            const path = Utils.convertToPath(data[index].name, data[index].id)
                            navigate(`/product/${path}`)
                        }} />
                    <div
                        className="w-full mt-3 font-semibold cursor-pointer text-xl"
                        onClick={() => {
                            const path = Utils.convertToPath(data[index].name, data[index].id)
                            navigate(`/product/${path}`)
                        }}>
                        {data[index].name}
                    </div>
                    <div
                        className="w-full mt-1 font-semibold cursor-pointer"
                        onClick={() => {
                            const path = Utils.convertToPath(data[index].name, data[index].id)
                            navigate(`/product/${path}`)
                        }}>
                        {data[index].price.toLocaleString()}₫
                    </div>
                    <div className="flex flex-col text-sm w-full mt-3 pt-3 border-t">
                        <div className="flex flex-row px-1 mb-4 items-center">
                            <img
                                alt="hi"
                                className="w-9 h-9 border rounded-full"
                                src="https://profile.hakuna.live/cdn-cgi/image/width=240/public/2023-08-12/76e60d9c-a9b0-4093-9765-13074deb605f.jpg" />
                            <div className="flex flex-col ml-2">
                                <div className="font-semibold">𝚙𝚘𝚛𝚘𝚛𝚘🐽</div>
                                <div className="text-gray-500">Đẹp quá</div>
                            </div>
                        </div>
                        <div className="flex flex-row px-1 mb-4 items-center">
                            <img
                                alt="hi"
                                className="w-9 h-9 border rounded-full"
                                src="https://profile.hakuna.live/cdn-cgi/image/width=240/public/2023-08-12/f540c823-fc13-472a-8079-6280188f8d9e.jpg" />
                            <div className="flex flex-col ml-2">
                                <div className="font-semibold">Phương Anh</div>
                                <div className="text-gray-500">set đầu xinh quá c ơi</div>
                            </div>
                        </div>
                        <div className="flex flex-row px-1 mb-4 items-center">
                            <img
                                alt="hi"
                                className="w-9 h-9 border rounded-full"
                                src="https://profile.hakuna.live/cdn-cgi/image/width=240/public/2022-02-16/26f9fa62-7e3a-4a43-85ce-d60fc1f4ffe8.jpg" />
                            <div className="flex flex-col ml-2">
                                <div className="font-semibold">Ngọc Trâm</div>
                                <div className="text-gray-500">Xinh lung linggg</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row h-13 px-2 pb-2 items-center border-t pt-1">
                    <input
                        className="flex-1 h-full outline-none rounded-full border border-gray-300 px-3 text-sm"
                        placeholder="Enter comment" />
                    <FontAwesomeIcon
                        icon={faPaperPlane}
                        className="text-blue-500 p-2 text-xl cursor-pointer ml-1 border rounded-full shadow" />
                </div>
            </div>
        </div>
    )
}

export default Video
