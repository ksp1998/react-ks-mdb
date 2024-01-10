const Spinner = ({ initial }) => {
  return (
    <div
      className={`relative w-full h-[150px] flex justify-center items-center ${
        initial ? "h-[75vh]" : ""
      }`}
    >
      <span className="w-16 h-16  border-t-8 border-l-8 border-gray-50 rounded-full animate-spin"></span>
    </div>
  );
};

export default Spinner;
