import React from 'react';
import { Link } from "react-router-dom";
import Meta from "../../components/employee/Meta";
import BreadCrumb from "../../components/employee/Breadcrumb";

const MyOrders = () => {
    return (
        <>
            <Meta title="My Orders" />
            <BreadCrumb title="My Orders" />
            <div className="flex items-center justify-center mt-0">
                <section className="relative bg-white w-full mt-10 flex items-center justify-center py-10">
                    <div className="container mx-auto px-4">

                        {/* First Row */}
                        <div className="grid grid-cols-3 divide-x">
                            <div>01</div>
                            <div>02</div>
                            <div>03</div>
                        </div>



                    </div>
                </section>
            </div>
        </>
    )
}

export default MyOrders