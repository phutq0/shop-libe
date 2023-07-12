import { createRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import ReactLoading from "react-loading";

const loadingRef = createRef();


const Loading = () => {

    const [show, setShow] = useState(false);

    useEffect(() => {
        if (show) {
            document.body.style.overflow = "hidden";
        }
        else {
            document.body.style.overflow = "unset";
        }
    }, [show]);

    useEffect(() => {
        loadingRef.current = {
            show: () => {
                setShow(true);
            },
            hide: () => {
                setShow(false);
            }
        }
    }, [])

    return (
        <div>
            {show && (
                <>
                    <div className={className.overlay}>
                    </div>
                    <div className={className.content}>
                        <ReactLoading
                            type="spinningBubbles"
                            className="scale-[1.1] mb-10" />
                    </div>
                </>
            )}
        </div>
    )
}

export default Loading
export { loadingRef }

const className = {
    overlay: `fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-black/30 z-[2]`,
    content: `z-[3] fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center`,
}