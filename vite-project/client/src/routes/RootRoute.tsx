import { Outlet, Link } from 'react-router-dom';
import style from '../CSS/RootRoute.module.css';

function Root() {
  return (
    <>
      <header>
        <nav>
          <ul className={style['links']}>
            <li>
              <Link to='/' title='Home' className={style['link-item']}>
                Home
              </Link>
            </li>
            <li>
              <Link
                to='/manufacturer'
                title='manufacturer'
                className={style['link-item']}
              >
                RestManufacturer
              </Link>
            </li>
            <li>
              <Link
                to='/graphmanufacturer'
                title='manufacturer'
                className={style['link-item']}
              >
                GraphQLManufacturer
              </Link>
            </li>
            <li>
              <Link
                to='/restStockValuesForAllManufacturers'
                title='restStockValuesForAllManufacturers'
                className={style['link-item']}
              >
                RestStockValuesForAllManufacturers
              </Link>
            </li>
            <li>
              <Link
                to='/graphStockValuesForAllManufacturers'
                title='graphStockValuesForAllManufacturers'
                className={style['link-item']}
              >
                GraphQLStockValuesForAllManufacturers
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <div id='detail'>
        <Outlet />
      </div>
    </>
  );
}
export default Root;
