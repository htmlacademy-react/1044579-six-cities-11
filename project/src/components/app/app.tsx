import { Route, Routes, Navigate } from 'react-router-dom';

import Main from '../../pages/main/main';
import Login from '../../pages/login/login';
import Favorites from '../../pages/favorites/favorites';
import Property from '../../pages/property/property';
import NotFound from '../../pages/not-found/not-found';
import LoadingScreen from '../../pages/loading-screen/loading-screen';
import PrivateRoute from '../private-route/private-route';
import Header from '../../components/header/header';

import { useAppSelector } from '../../hooks';

import { AppRoute, defaultCityInfo } from '../../consts';

import { getAuthorizationStatus, getAuthCheckedStatus } from '../../store/user-process/selectors';
import { getOffersDataLoadingStatus } from '../../store/app-data/selectors';

import { HelmetProvider } from 'react-helmet-async';

function App(): JSX.Element {
  const authStatus = useAppSelector(getAuthorizationStatus);
  const isAuthChecked = useAppSelector(getAuthCheckedStatus);
  const isOffersDataLoading = useAppSelector(getOffersDataLoadingStatus);

  if (isOffersDataLoading || !isAuthChecked) {
    return (
      <>
        <Header />
        <LoadingScreen />
      </>

    );
  }
  return (
    <HelmetProvider>
      <Routes>
        <Route path={AppRoute.Default} element={<Header />} >
          <Route path={AppRoute.Default} element={<Navigate to={`/${defaultCityInfo.name}`} />} />
          <Route path={AppRoute.Main} element={<Main />} />
          <Route path={AppRoute.Error} element={<NotFound />} />
          <Route path={AppRoute.Property} element={<Property />} />
          <Route path={AppRoute.Favorites} element={
            <PrivateRoute authorizationStatus={authStatus}>
              <Favorites />
            </PrivateRoute>
          }
          />
        </Route>
        <Route path={AppRoute.Login} element={<Login />} />
      </Routes>
    </HelmetProvider>
  );
}

export default App;
