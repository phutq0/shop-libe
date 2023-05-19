import { memo, useEffect, useState } from "react"
import className from "./className";
import { useNavigate } from "react-router-dom";

const items = [
    {
        id: 0,
        display: "INFORMATION",
        path: "/account",
        active: false,
    },
    {
        id: 1,
        display: "ADDRESSES",
        path: "/account/addresses",
        active: false,
    },
    {
        id: 2,
        display: "HISTORY",
        path: "/account/history",
        active: false,
    },
]


const NavBar = ({ type, classNames }) => {

    const navigate = useNavigate();
    const [data, setData] = useState(() => {
        const tmp = [...items];
        if (type == "addresses") {
            tmp[1].active = true;
            return tmp;
        }
        if (type == "history") {
            tmp[2].active = true;
            return tmp;
        }
        tmp[0].active = true;
        return tmp;
    });
    useEffect(() => {
        const tmp = data.map(item => ({
            ...item,
            active: false
        }));
        if (type == "addresses") {
            tmp[1].active = true;
            setData(tmp);
            return;
        }
        if (type == "history") {
            tmp[2].active = true;
            setData(tmp);
            return;
        }
        tmp[0].active = true;
        setData(tmp);
        return;
    }, [type]);

    return (
        <div className={className.wrapper + " " + classNames}>
            {data.map((item, index) => (
                <div
                    key={item.id ?? index}
                    className={item.active ? className.active : className.item}
                    onClick={() => navigate(item.path)}>
                    {item.display}
                </div>
            ))}
        </div>
    )
}

export default memo(NavBar)