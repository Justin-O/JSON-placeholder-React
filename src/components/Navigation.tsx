type NavigationProps = {
    total: number;
    amountPerPage: number;
    page: number;
    PageSetter: React.Dispatch<React.SetStateAction<number>>;
    LimitSetter?: React.Dispatch<React.SetStateAction<number>> | undefined;
    paginate: boolean;
}

const buttonStyle = `w-8 h-8 bg-gray-200 m-1 rounded-full hover:bg-gray-300 font-medium hover:transition-all`

export const Navigation = ({ total, amountPerPage, page, PageSetter, LimitSetter, paginate }: NavigationProps) => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(total / amountPerPage); i++) {
        pageNumbers.push(i)
    }

    const prevPage = () => {
        if (page > 1) {
            PageSetter(page => page - 1)
        }
    }

    const nextPage = () => {
        if (page < Math.ceil(total / amountPerPage)) {
            PageSetter(page => page + 1)
        }
    }

    return (
        <div className="flex items-center flex-col gap-4">
            <div className="flex flex-row">
                <button className={buttonStyle} onClick={prevPage}>{"<"}</button>
                <div className="hidden sm:flex">
                    {paginate && pageNumbers.map(number =>
                        <button
                            className={`${buttonStyle} ${page === number && `border-2 border-gray-500`}`}
                            key={number}
                            onClick={() => PageSetter(number)}
                        >
                            {number}
                        </button>
                    )}
                </div>
                <button className={buttonStyle} onClick={nextPage}>{">"}</button>
            </div>

            {LimitSetter &&
                <div>
                    <label htmlFor="limit">Albums per page:</label>
                    <select className="border-2 border-gray-300 rounded-md m-1 px-1 py-2" value={amountPerPage} name="limit" onChange={(e) => LimitSetter(parseInt(e.target.value))}>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                    </select>
                </div>
            }
        </div>
    )
}
