import { Outlet, Link } from 'react-router-dom';
import style from './RootRoute.module.css';

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
              <Link to='/stock' title='Stock' className={style['link-item']}>
                Stock
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
