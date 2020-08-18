import React from 'react';
import { Redirect, Switch, Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

// import Auth from './Auth';
// import LoggedIn from '../components/LoggedIn';
// import Townhall from './Townhall';
// import Nav from '../layout/Nav';
// import Footer from '../layout/Footer';
// import NestedRoute from 'components/NestedRoute';
// import Route from 'components/Route';
import RouteDir from 'components/RouteDir';
import RouteFile from 'components/RouteFile';
import useRoutePwd from 'hooks/useRoutePwd';

const DefaultPage = () => <Redirect to='/auth/login' />;
const AppHomePage = () => <Redirect to='/app/townhalls' />;
const Back = () => {
    const [pwd] = useRoutePwd();
    console.log(`going to ${pwd}`);
    return (
        <Button component={Link} to={pwd}>
            Up One Dir
        </Button>
    );
};

export default function Routes() {
    return (
        <Switch>
            <RouteDir path='/auth'>
                <RouteFile path='/'>
                    <h1>auth</h1>
                </RouteFile>
                <RouteFile path='/login'>
                    <h1>login</h1>
                </RouteFile>
                <RouteFile path='/register'>
                    <h1>register</h1>
                </RouteFile>
                <RouteDir path='/forgot-password'>
                    <Back />
                    <RouteFile path='/'>
                        <Redirect to='/auth/forgot-password/request' />
                    </RouteFile>
                    <RouteFile path='/request'>
                        <h1>forgot pass request</h1>
                    </RouteFile>
                    <RouteFile path='/reset'>
                        <h1>forgot pass reset</h1>
                    </RouteFile>
                </RouteDir>
            </RouteDir>
            {/* <RouteDir path='/townhalls'>
                <h1>townhalls</h1>
            </RouteDir> */}
        </Switch>
    );
}
