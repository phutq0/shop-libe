import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import className from "./className"
import { faAngleDoubleLeft, faAngleDoubleRight, faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons"

const Pagination = ({
    total,
    page,
    setPage
}) => {

    return (
        <div className={className.wrapper}>
            <div
                onClick={() => setPage(1)}
                className={className.button}>
                <FontAwesomeIcon
                    icon={faAngleDoubleLeft}
                />
            </div>
            <div
                onClick={() => setPage(Math.max(1, page - 1))}
                className={className.button}>
                <FontAwesomeIcon
                    icon={faAngleLeft}
                />
            </div>
            {(page > total - 2 && page > 3) &&
                <div className={className.button}>
                    {"..."}
                </div>}
            {(page == total && total > 2) &&
                <div
                    onClick={() => setPage(page - 2)}
                    className={className.button}>
                    {page - 2}
                </div>
            }
            {(page - 1 > 0) &&
                <div
                    onClick={() => setPage(page - 1)}
                    className={className.button}>
                    {page - 1}
                </div>
            }
            <div className={className.buttonActive}>
                {page}
            </div>
            {(page < total) &&
                <div
                    onClick={() => setPage(page + 1)}
                    className={className.button}>
                    {page + 1}
                </div>
            }
            {(page == 1 && total > 2) &&
                <div
                    onClick={() => setPage(page + 2)}
                    className={className.button}>
                    {page + 2}
                </div>
            }

            {(page < total - 1 && total > 3) &&
                <div className={className.button}>
                    {"..."}
                </div>}
            <div
                onClick={() => setPage(Math.min((page + 1), total))}
                className={className.button}>
                <FontAwesomeIcon
                    icon={faAngleRight}
                />
            </div>
            <div
                onClick={() => setPage(total)}
                className={className.button}>
                <FontAwesomeIcon
                    icon={faAngleDoubleRight}
                />
            </div>
        </div>
    )
}

export default Pagination