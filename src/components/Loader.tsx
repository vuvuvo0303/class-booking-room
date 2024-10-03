import { ColorRing } from "react-loader-spinner";
const Loader = ({text = "Loading data..."} : {text?: string}) => {
  return (
    <div className="flex justify-center items-center w-full h-full flex-col">
      <ColorRing
        visible={true}
        height="80"
        width="80"
        ariaLabel="color-ring-loading"
        wrapperStyle={{}}
        wrapperClass="color-ring-wrapper"
        colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
      />
      <h3 className="font-semibold drop-shadow">{text}</h3>
    </div>
  );
};

export default Loader;
