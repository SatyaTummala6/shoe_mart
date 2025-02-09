import React from 'react';
import Meta from "../../components/employee/Meta";
import BreadCrumb from "../../components/employee/Breadcrumb";

const About = () => {
  return (
    <>
      <Meta title="About Us" />
      <BreadCrumb title="About Us" />
      <div className="flex items-center justify-center mt-0">
        <section className="relative bg-white w-full mt-10 flex items-center justify-center py-10">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold dark:text-white text-center mb-6">
              About Us</h2>
            <p className="text-lg text-gray-700 mb-4">
              Welcome to Shoe Mart, where we are dedicated to providing innovative solutions that meet the needs of our customers. Founded in [Year], we have grown into a trusted name in the industry, delivering top-quality products and services that make a difference in the lives of our clients.
            </p>
            <p className="text-lg text-gray-700 mb-4">
              Our team is composed of highly skilled professionals with years of experience in [Industry/Field]. We are passionate about what we do and always strive for excellence, continuously pushing the boundaries of what's possible to deliver outstanding results.
            </p>
            <p className="text-lg text-gray-700 mb-4">
              At [Your Company Name], we believe in building strong relationships with our clients, listening to their needs, and working collaboratively to achieve their goals. Our commitment to integrity, quality, and customer satisfaction has earned us a loyal customer base and a reputation for excellence in everything we do.
            </p>
            <p className="text-lg text-gray-700 mb-4">
              Whether you're looking for [Products/Services offered], we are here to help. Thank you for choosing us as your trusted partner, and we look forward to continuing to serve you with dedication and passion.
            </p>
          </div>
        </section>
      </div>
    </>
  );
};

export default About;
