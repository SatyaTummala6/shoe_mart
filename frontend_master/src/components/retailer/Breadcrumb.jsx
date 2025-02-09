import React from 'react'

const Breadcrumb = (props) => {
    const { title } = props;
  return (
    <header>
             <section
                className="relative bg-cover bg-center bg-no-repeat h-48 flex items-center justify-center text-white"
                style={{ backgroundImage: "url('/images/innerpage/breadcum-bg.png')" }}
            >
                {/* Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>

                {/* Content */}
                <div className="relative z-10 text-center">
                    {/* Breadcrumb */}
                    <nav className="mb-2">
                        <ul className="flex justify-center space-x-2 text-sm">
                            <li>
                                <a href="/" className="text-white hover:underline">
                                    Home
                                </a>
                            </li>
                            <li>/</li>
                            <li className="text-gray-300">{title}</li>
                        </ul>
                    </nav>
                    {/* Heading */}
                    <h1 className="text-4xl font-bold">{title}</h1>
                </div>
            </section>

    </header>
  )
}

export default Breadcrumb