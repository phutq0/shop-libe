import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import className from "./className";

const Footer = () => {

    return (
        <div className={className.wrapper}>
            <div className={className.contact}>
                <div className={className.subscribe}>
                    <div className={className.title}>SUBSCRIBE TO US!</div>
                    <div className={className.content}>Sign up to receive LIBÉ’s new arrival
                        updates, sales, exclusive content, events and more!</div>
                </div>
                <div className={className.email}>
                    <div className={className.border}>
                        <input
                            className={className.input}
                            placeholder={"Your email"}
                        />
                    </div>
                    <div className={className.buttonSubmit}>
                        SUBMIT
                    </div>
                </div>
            </div>
            <div className={className.infor}>
                <div className={className.block}>
                    <div className={className.inforTitle}>
                        ABOUT US
                    </div>
                    <div className={className.inforItem}>Our Story</div>
                    <div className={className.inforItem}>LIBÉ Stores</div>
                    <div className={className.inforItem}>Join LIBÉ Team</div>
                </div>
                <div className={className.block}>
                    <div className={className.inforTitle}>
                        HELP & INFORMATION
                    </div>
                    <div className={className.inforItem}>How To Order</div>
                    <div className={className.inforItem}>Size Guide</div>
                    <div className={className.inforItem}>Shipping</div>
                    <div className={className.inforItem}>Payment Method</div>
                    <div className={className.inforItem}>Exchange & Return Policy</div>
                    <div className={className.inforItem}>Privacy Policy</div>
                    <div className={className.inforItem}>ONLINE LOYALTY PROGRAM</div>
                    <div className={className.inforItem}>LIBEcommunity</div>
                </div>
                <div className={className.block}>
                    <div className={className.inforTitle}>
                        CUSTOMER SERVICE
                    </div>
                    <div className={className.inforItem}>(+84) 909 408 169</div>
                    <div className={className.inforItem}>support@libe.clothing</div>
                    <div className={className.link}>
                        <div
                            className={className.icon}
                            onClick={() => {
                                const a = document.createElement("a");
                                a.href = "https://www.facebook.com/libeworkshop/";
                                a.target = "__blank";
                                a.click();
                                a.remove();
                            }}>
                            <FontAwesomeIcon icon={faFacebook} />
                        </div>
                        <div
                            className={className.icon}
                            onClick={() => {
                                const a = document.createElement("a");
                                a.href = "https://www.instagram.com/libeworkshop/";
                                a.target = "__blank";
                                a.click();
                                a.remove();
                            }}>
                            <FontAwesomeIcon icon={faInstagram} />
                        </div>
                        <div className={className.icon}>
                            <FontAwesomeIcon icon={faEnvelope} />
                        </div>
                    </div>
                </div>
                <div className={className.block}>
                    <div className={className.inforTitle}>
                        © LIBÉ
                    </div>
                    <div className={className.inforItem}>
                        GRMNT Limited Company
                        Business Registration No. 0315840235 issued on 09/08/2019
                        by department of Planning and Investment HCMC.
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer