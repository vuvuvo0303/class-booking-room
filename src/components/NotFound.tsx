import notfound from "../assets/notfound.png";
import bgnotfound from "../assets/bgnotfound.png";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <div
        className="w-screen h-screen flex items-center justify-center relative"
        style={{ backgroundImage: `url(${bgnotfound})` }}
      >
        <img src={notfound} alt="Not Found" className="absolute top-0 left-1/2 transform -translate-x-1/2 mt-4" />

        <div className="flex flex-col items-center text-center pt-80 gap-12">
          <span className="text-4xl font-semibold mb-4">Opps! Page Not Found</span>
          <Link to="/" className="bg-orange-600 py-3 px-9 rounded-full ">
            <span className="text-white">Go Home</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFound;
