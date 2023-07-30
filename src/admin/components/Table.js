import { faAngleDoubleLeft, faAngleDoubleRight, faAngleLeft, faAngleRight, faCaretDown, faCaretUp, faPlus, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSpring, animated } from "@react-spring/web";
import Tippy from "@tippyjs/react/headless";
import _ from "lodash";
import { memo, useState } from "react";

const Table = ({
    header, body, isLoading, isEmpty, step, page, total,
    name, placeholder, showButtonDelete, onChangeStep, onChangePage,
    showButtonAdd, onClickAdd,
    search, onChangeSearch
}) => {

    return (
        <div className="flex flex-col border rounded shadow-md p-1">
            <div className="flex flex-row justify-between px-2 py-3">
                <div className="font-bold text-xl">{name}</div>
                <div className="flex flex-row">
                    {showButtonDelete && (
                        <div className="flex items-center justify-center text-sm font-semibold border rounded bg-red-500 cursor-pointer hover:opacity-80 text-white px-3 mr-3">
                            <FontAwesomeIcon
                                icon={faTrashCan}
                                className="mr-2" />
                            DELETE
                        </div>
                    )}
                    <input
                        className="w-40 h-8 outline-none border rounded border-gray-300 bg-gray-50 focus-within:bg-white pl-2 text-sm font-semibold text-gray-500"
                        placeholder={placeholder}
                        value={search}
                        onChange={onChangeSearch}
                    />
                    <div
                        className="flex items-center justify-center text-sm font-semibold border rounded bg-green-500 cursor-pointer hover:opacity-80 text-white px-6 ml-3"
                        onClick={onClickAdd}>
                        <FontAwesomeIcon
                            icon={faPlus}
                            className="mr-2" />
                        ADD
                    </div>
                </div>
            </div>
            {header}
            <div className="min-h-[200px] relative flex flex-col">
                {isLoading ?
                    <div className="w-full flex-1 flex items-center justify-center">
                        <Spinner
                            className="w-5 h-5 !border-2" />
                        <div className="font-semibold text-sm ml-2">Loading...</div>
                    </div>
                    : body
                }
                {!isLoading && isEmpty && (
                    <div className="w-full h-full flex items-center justify-center pt-12">
                        <div className="text-sm font-semibold">No data!</div>
                    </div>
                )}
            </div>
            <Pagination
                step={step}
                total={total}
                onChangeStep={onChangeStep}
                page={page}
                onChangePage={onChangePage} />
        </div>
    )
}

const Pagination = ({ step, page, total, onChangeStep, onChangePage }) => {

    return (
        <div className="flex flex-row justify-between px-2 items-center pt-6 pb-4 border-t border-gray-200">
            <div className="flex flex-row items-center">
                <div className="font-semibold text-sm mr-1">Show:</div>
                <Step
                    step={step}
                    onChangeStep={onChangeStep} />
            </div>
            <div className="flex flex-row">
                <div
                    onClick={() => onChangePage(1)}
                    className="h-9 w-9 mx-1 bg-gray-100 rounded flex items-center justify-center text-gray-700 text-sm cursor-pointer font-semibold border border-gray-200 hover:bg-black hover:text-white">
                    <FontAwesomeIcon
                        icon={faAngleDoubleLeft}
                    />
                </div>
                <div
                    onClick={() => onChangePage(Math.max(1, page - 1))}
                    className="h-9 w-9 mx-1 bg-gray-100 rounded flex items-center justify-center text-gray-700 text-sm cursor-pointer font-semibold border border-gray-200 hover:bg-black hover:text-white">
                    <FontAwesomeIcon
                        icon={faAngleLeft}
                    />
                </div>
                {(page > total - 2 && total > 3) &&
                    <div className="h-9 w-9 mx-1 bg-gray-100 rounded flex items-center justify-center text-gray-700 text-sm cursor-pointer font-semibold border border-gray-200 hover:bg-black hover:text-white">
                        {"..."}
                    </div>}
                {(page == total && total > 2) &&
                    <div
                        onClick={() => onChangePage(page - 2)}
                        className="h-9 w-9 mx-1 bg-gray-100 rounded flex items-center justify-center text-gray-700 text-sm cursor-pointer font-semibold border border-gray-200 hover:bg-black hover:text-white">
                        {page - 2}
                    </div>
                }
                {(page - 1 > 0) &&
                    <div
                        onClick={() => onChangePage(page - 1)}
                        className="h-9 w-9 mx-1 bg-gray-100 rounded flex items-center justify-center text-gray-700 text-sm cursor-pointer font-semibold border border-gray-200 hover:bg-black hover:text-white">
                        {page - 1}
                    </div>
                }
                <div className="h-9 w-9 mx-1 bg-black rounded flex items-center justify-center text-white text-sm cursor-pointer font-semibold">
                    {page}
                </div>
                {(page < total) &&
                    <div
                        onClick={() => onChangePage(page + 1)}
                        className="h-9 w-9 mx-1 bg-gray-100 rounded flex items-center justify-center text-gray-700 text-sm cursor-pointer font-semibold border border-gray-200 hover:bg-black hover:text-white">
                        {page + 1}
                    </div>
                }
                {(page == 1 && total > 2) &&
                    <div
                        onClick={() => onChangePage(page + 2)}
                        className="h-9 w-9 mx-1 bg-gray-100 rounded flex items-center justify-center text-gray-700 text-sm cursor-pointer font-semibold border border-gray-200 hover:bg-black hover:text-white">
                        {page + 2}
                    </div>
                }

                {(page < total - 1 && total > 3) &&
                    <div className="h-9 w-9 mx-1 bg-gray-100 rounded flex items-center justify-center text-gray-700 text-sm cursor-pointer font-semibold border border-gray-200 hover:bg-black hover:text-white">
                        {"..."}
                    </div>}
                <div
                    onClick={() => onChangePage(Math.min((page + 1), total))}
                    className="h-9 w-9 mx-1 bg-gray-100 rounded flex items-center justify-center text-gray-700 text-sm cursor-pointer font-semibold border border-gray-200 hover:bg-black hover:text-white">
                    <FontAwesomeIcon
                        icon={faAngleRight}
                    />
                </div>
                <div
                    onClick={() => onChangePage(total)}
                    className="h-9 w-9 mx-1 bg-gray-100 rounded flex items-center justify-center text-gray-700 text-sm cursor-pointer font-semibold border border-gray-200 hover:bg-black hover:text-white">
                    <FontAwesomeIcon
                        icon={faAngleDoubleRight}
                    />
                </div>
            </div>
        </div>
    );
}

const Step = ({ onChangeStep, step }) => {

    const [show, setShow] = useState(false);
    const [style, spring] = useSpring(() => ({
        transformOrigin: "bottom",
        transform: "scaleY(0)",
    }));

    return (
        <div>
            <Tippy
                interactive
                visible={show}
                placement="top-end"
                onClickOutside={() => setShow(false)}
                animation={true}
                onMount={() => spring.start({
                    transform: "scaleY(1)",
                    config: {
                        duration: 100
                    }
                })}
                onHide={() => spring.start({
                    transform: "scaleY(0)",
                    config: {
                        duration: 100
                    }
                })}
                render={attrs => (
                    <animated.div
                        {...attrs}
                        style={style}
                        className="bg-white rounded border shadow -mb-2 w-11">
                        <div
                            className="text-center text-sm font-semibold hover:bg-gray-200 px-2 cursor-pointer"
                            onClick={() => {
                                if (_.isFunction(onChangeStep)) {
                                    onChangeStep(5)
                                }
                                setShow(false);
                            }}>5</div>
                        <div
                            className="text-center text-sm font-semibold hover:bg-gray-200 px-2 cursor-pointer"
                            onClick={() => {
                                if (_.isFunction(onChangeStep)) {
                                    onChangeStep(10)
                                }
                                setShow(false);
                            }}>10</div>
                        <div
                            className="text-center text-sm font-semibold hover:bg-gray-200 px-2 cursor-pointer"
                            onClick={() => {
                                if (_.isFunction(onChangeStep)) {
                                    onChangeStep(20)
                                }
                                setShow(false);
                            }}>20</div>
                    </animated.div>
                )}>
                <div
                    className="px-2 py-[1px] flex items-center justify-center font-semibold text-sm border rounded border-gray-300 cursor-pointer w-11"
                    onClick={() => setShow(!show)}>
                    <div className="w-5 text-center">{step}</div>
                    <FontAwesomeIcon
                        className="ml-[2px]"
                        icon={show ? faCaretDown : faCaretUp} />
                </div>
            </Tippy>
        </div>
    )
}

const Spinner = memo(({ className }) => {

    return (
        <div
            className={"inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] " + className}
            role="status">
            <span
                className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
        </div>
    );
})

export default Table