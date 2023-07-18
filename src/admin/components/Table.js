
const Table = ({ header, body, isLoading }) => {

    return (
        <div className="flex flex-col border rounded-sm shadow-md p-1">
            {header}
            <div className="min-h-[400px]">
                {isLoading ?
                    (
                        <div></div>
                    ) : body}
            </div>
            <Pagination />
        </div>
    )
}

const Pagination = () => {

    return (
        <div>Pagination</div>
    );
}

export default Table