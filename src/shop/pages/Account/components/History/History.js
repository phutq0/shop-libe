import { useEffect } from "react";
import className from "./className"
import Api from "api2";

const History = () => {

    useEffect(() => {
        const result = Api.order.getListOrder();
        console.log(result);
    }, [])


    return (
        <div className={className.wrapper}>
            History
        </div>
    );
}

export default History