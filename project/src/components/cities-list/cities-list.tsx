import { Link } from 'react-router-dom';
import cn from 'classnames';
import { memo } from 'react';
import { useParams } from 'react-router';

import { cities, SortType } from '../../consts';

type CitiesListProp = {
  sort: SortType;
  setUlState: React.Dispatch<React.SetStateAction<boolean>>;
}

function CitiesList({sort, setUlState}: CitiesListProp): JSX.Element {
  const {city} = useParams();

  const getLinkClassName = (linkCity : string) =>
    cn(
      'locations__item-link tabs__item',
      {'tabs__item--active': linkCity === city}
    );

  const handleSortReset = () => {
    sort = SortType.Popular;
    setUlState(false);
  };

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {cities.map((el) => (
            <li
              key={el}
              className="locations__item"
            >
              <Link
                className={getLinkClassName(el)}
                to={`/${el}`}
                onClick={handleSortReset}
              >
                <span>{el}</span>
              </Link>
            </li>
          )
          )}
        </ul>
      </section>
    </div>
  );
}

export default memo(CitiesList);
