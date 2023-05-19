import className from "./className"

const CheckOut = () => {

    return (
        <div className={className.container}>
            <div className={className.right}>
                <div className={className.bill}>
                    bill
                </div>
            </div>
            <div className={className.left}>
                <div className={className.infor}>
                    <div className={className.title}>
                        Deliver Information
                    </div>
                    <div className={className.top}>
                        <div className={className.account}>
                            Had account?
                        </div>
                        <div className={className.login}>
                            Login
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CheckOut