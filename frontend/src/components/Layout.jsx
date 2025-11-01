import Service from './Service'

export default function Layout() {

return (
<div className="flex h-screen bg-gray-100">

    {/* <!-- sidebar --> */}
    {/* <div className="hidden md:flex flex-col w-64 bg-gray-800 ">

        <div className="flex flex-col flex-1 overflow-y-auto">
            <nav
                className="flex flex-col flex-1 overflow-y-auto bg-gradient-to-b from-gray-700 to-blue-500 px-2 py-4 gap-10 rounded-2xl">
                <div>
                </div>
                <div className="flex flex-col flex-1 gap-3">
                    <a href="#"
                        className="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-400 hover:bg-opacity-25 rounded-2xl">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                            >
                            <path fill="currentColor" fillRule="evenodd"
                                d="M11.293 3.293a1 1 0 0 1 1.414 0l6 6l2 2a1 1 0 0 1-1.414 1.414L19 12.414V19a2 2 0 0 1-2 2h-3a1 1 0 0 1-1-1v-3h-2v3a1 1 0 0 1-1 1H7a2 2 0 0 1-2-2v-6.586l-.293.293a1 1 0 0 1-1.414-1.414l2-2z"
                                clipRule="evenodd" />
                        </svg>
                        Home
                    </a>
                    <a href="#"
                        className="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-400 hover:bg-opacity-25 rounded-2xl">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32"
                            >
                            <path fill="currentColor"
                                d="M12 4a5 5 0 1 1-5 5a5 5 0 0 1 5-5m0-2a7 7 0 1 0 7 7a7 7 0 0 0-7-7m10 28h-2v-5a5 5 0 0 0-5-5H9a5 5 0 0 0-5 5v5H2v-5a7 7 0 0 1 7-7h6a7 7 0 0 1 7 7zm0-26h10v2H22zm0 5h10v2H22zm0 5h7v2h-7z" />
                        </svg>
                        Profile
                    </a>
                    <a href="#"
                        className="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-400 hover:bg-opacity-25 rounded-2xl">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path fill="currentColor"
                            d="M5 11h8v2H5v3l-5-4l5-4zm-1 7h2.708a8 8 0 1 0 0-12H4a9.985 9.985 0 0 1 8-4c5.523 0 10 4.477 10 10s-4.477 10-10 10a9.985 9.985 0 0 1-8-4" />
                    </svg>
                        Logout
                    </a>
                   
                   
                </div>
            </nav>
        </div>
    </div> */}

    {/* <!-- Main content --> */}
    <div className="flex flex-col flex-1 overflow-y-auto">
        <div className="flex items-center justify-between h-16 bg-white border-b border-gray-200">
            <div className="flex items-center px-4"></div>

               
            
            {/* <!-- notification --> */}
            <div className="flex items-center space-x-4 mr-4">
                {/* <!-- logout --> */}
                <a href="#"
                    className="flex items-center text-gray-600 hover:text-gray-800 dark:text-gray-200 dark:hover:text-gray-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path fill="currentColor"
                            d="M5 11h8v2H5v3l-5-4l5-4zm-1 7h2.708a8 8 0 1 0 0-12H4a9.985 9.985 0 0 1 8-4c5.523 0 10 4.477 10 10s-4.477 10-10 10a9.985 9.985 0 0 1-8-4" />
                    </svg>
                    <span className="font-bold">Logout</span>
                </a>
            </div>
        </div>

        <div className="p-4">
            {/* <h1 className="text-2xl font-bold">Welcome to my dashboard!</h1>
            <p className="mt-2 text-gray-600">This is an example dashboard using Tailwind CSS.</p> */}
                <Service/>

        </div>
    </div>

</div>
)

}