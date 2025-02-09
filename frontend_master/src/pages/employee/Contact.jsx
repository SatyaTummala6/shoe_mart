import React from 'react';
import Meta from "../../components/employee/Meta";
import BreadCrumb from "../../components/employee/Breadcrumb";

const Contact = () => {
  return (
    <>
      <Meta title="Contact Us" />
      <BreadCrumb title="Contact Us" />
      <div className="flex items-center justify-center mt-0">
        <section className="relative bg-white w-full mt-10 flex items-center justify-center py-10">
          <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold dark:text-white text-center mb-6">Contact Us</h2>
            <p className="text-lg text-gray-700 mb-10 text-center">
              We would love to hear from you! If you have any questions, comments, or inquiries, please feel free to reach out to us. Our team is here to assist you and will respond to your message as soon as possible.
            </p>

            <div className="flex flex-col lg:flex-row justify-between gap-10">
              {/* Contact Info */}
              <div className="lg:w-1/2">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Contact Information</h3>
                <ul className="list-disc pl-8 text-lg text-gray-700">
                  <li>Email: <a href="mailto:support@example.com" className="text-blue-500">support@example.com</a></li>
                  <li>Phone: <a href="tel:+1234567890" className="text-blue-500">+1 (234) 567-890</a></li>
                  <li>Address: 1234 Main Street, City, Country, ZIP Code</li>
                </ul>
              </div>

              {/* Contact Form */}
              <div className="lg:w-1/2">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Send Us a Message</h3>
                <form action="#" method="POST" className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-lg text-gray-700">Your Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="w-full p-3 border border-gray-300 rounded-md"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-lg text-gray-700">Your Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full p-3 border border-gray-300 rounded-md"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-lg text-gray-700">Your Message</label>
                    <textarea
                      id="message"
                      name="message"
                      className="w-full p-3 border border-gray-300 rounded-md"
                      rows="4"
                      required
                    ></textarea>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
                    >
                      Send Message
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Contact;
