import { memo } from "react"

import CardProduct from "../CardProduct"
import className from "./className"

const ListProduct = memo(({ data = [] }) => {

    return (
        <div className={className.wrapper}>
            <div className={className.content}>
                {data.map((item, index) => (
                    <CardProduct
                        key={item.id ?? index}
                        item={item} />
                ))}
            </div>
        </div>
    )
})

export default ListProduct