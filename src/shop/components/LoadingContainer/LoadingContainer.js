
import ReactLoading from "react-loading";

const LoadingContainer = () => {

    const headerHeight = window.innerHeight;

    return (
        <div
            style={{ height: headerHeight - 2 }}
            className="flex flex-col items-center justify-center" >
            <ReactLoading
                type="cylon"
                color="black"
                className="scale-[1.5]" />
            <div className="font-bold text-5xl mb-14">LIBÉ</div>
        </div>
    )
}

export default LoadingContainer