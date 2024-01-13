import { Link } from "react-router-dom";

const _404 = () => {
  document.title = "KS MDB| 404 Not Found";

  return (
    <section className="p-5 h-[75vh] lg:h-screen flex flex-col justify-center items-center gap-2">
      <h1 className="mb-4 text-[6rem] lg:text-[8rem] font-extrabold text-red-300">
        404
      </h1>
      <p className="mb-4 text-2xl lg:text-3xl font-bold text-gray-200 text-center">
        Oops! Looks like you&apos;re lost.
      </p>
      <div className="animate-bounce">
        <svg
          className="mx-auto h-16 w-16 text-red-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
          ></path>
        </svg>
      </div>
      <p className="mt-4 text-xl lg:text-2xl font-semibold text-gray-200 text-center">
        Let&apos;s get you back{" "}
        <Link to="/" className="text-green-300">
          Home
        </Link>
        .
      </p>
    </section>
  );
};

export default _404;
