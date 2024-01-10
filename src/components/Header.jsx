import { Link, useLocation } from "react-router-dom";

const navItmes = [
  {
    href: "/",
    text: "Home",
    icon: {
      default: "ic-home.svg",
      active: "ic-home-fill.svg",
    },
  },
  {
    href: "/movies",
    text: "Movies",
    icon: {
      default: "ic-movie.svg",
      active: "ic-movie-fill.svg",
    },
  },
  {
    href: "/shows",
    text: "Shows",
    icon: {
      default: "ic-show.svg",
      active: "ic-show-fill.svg",
    },
  },
  {
    href: "/search",
    text: "Search",
    icon: {
      default: "ic-search.svg",
      active: "ic-search-fill.svg",
    },
  },
];

const Header = () => {
  const location = useLocation();
  const active = location.pathname;

  const scrollToTop = () => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <header
      className="sticky top-0 lg:w-24 lg:h-screen lg:fixed z-[99]"
      style={{
        background: "linear-gradient(#020617, #020617CC 75%, #02061700)",
      }}
    >
      <div className="group relative h-full p-4 flex flex-col gap-4 justify-center items-center">
        <Link to="/" className="lg:fixed top-8" onClick={scrollToTop}>
          <img src="logo-title.svg" className="block lg:hidden h-12" />
          <img src="logo.svg" className="hidden lg:block h-12" />
        </Link>
        <nav className="z-10">
          <ul className="flex gap-0.5 rounded-3xl overflow-hidden lg:flex-col lg:gap-5 lg:overflow-visible">
            {navItmes.map((item) => (
              <li
                key={item.href}
                className="bg-gray-800 hover:bg-slate-900 duration-300 lg:bg-transparent lg:hover:bg-transparent"
              >
                <Link
                  to={item.href}
                  className="group inline-flex gap-2 lg:gap-4 items-center px-4 py-3 hover:scale-125 lg:origin-left duration-300"
                  onClick={scrollToTop}
                >
                  <img
                    src={
                      active === item.href
                        ? item.icon.active
                        : item.icon.default
                    }
                    alt=""
                    className="h-6 duration-300"
                  />
                  <span className="hidden sm:block lg:w-0 lg:opacity-0 lg:-translate-x-5 lg:group-hover:opacity-100 lg:group-hover:translate-x-0 duration-300">
                    {item.text}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div
          className="hidden absolute left-full w-48 h-full group-hover:block"
          style={{
            backgroundImage: "linear-gradient(to right, #020617, #02061700)",
          }}
        ></div>
      </div>
    </header>
  );
};

export default Header;
