import { Outlet, Link } from "react-router-dom"

function Root() {
  return (
    <>
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/" title="Home">
                Home
              </Link>
            </li>
            <li>
              <Link to="/manufacturer" title="manufacturer">
                Manufacturer
              </Link>
            </li>
            <li>
              <Link to="/stock" title="Stock">
                Stock
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
}
export default Root