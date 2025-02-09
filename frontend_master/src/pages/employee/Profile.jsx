import React from "react";
import { Link } from "react-router-dom";
import Meta from "../../components/employee/Meta";
import BreadCrumb from "../../components/employee/Breadcrumb";

const Profile = () => {
  return (
    <>
      <Meta title="Profile" />
      <BreadCrumb title="Profile" />
      <div className="flex items-center justify-center mt-10">
        <section className="relative bg-white w-full flex items-center justify-center">
          {/* Card Container with Image Background */}
          <div className="relative z-10 bg-gray-200 bg-cover bg-center bg-no-repeat p-16 w-[600px] h-[300px] flex flex-col justify-center items-center">
            
          <h2 className="text-4xl font-bold dark:text-white text-center mb-6">Profile</h2>

            {/* Profile Info */}
            <div className="w-full max-w-md space-y-4 bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between">
                <div className="font-semibold text-gray-700">Name</div>
                <div className="text-gray-600">John Doe</div>
              </div>
              <div className="flex justify-between">
                <div className="font-semibold text-gray-700">Email</div>
                <div className="text-gray-600">john.doe@example.com</div>
              </div>
              <div className="flex justify-between">
                <div className="font-semibold text-gray-700">Firm Name</div>
                <div className="text-gray-600">XYZ Corporation</div>
              </div>
              <div className="flex justify-between">
                <div className="font-semibold text-gray-700">City</div>
                <div className="text-gray-600">New York</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Profile;
