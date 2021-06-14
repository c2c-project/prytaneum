import { GetServerSidePropsContext } from 'next';

import { loadUser } from '@local/features/accounts/loadUser';
import { initializeStore } from '../reducers/store';
import { makeServerFetchFunction, initServerEnvironment } from './relay-environment';

export const initApp = async (ctx: GetServerSidePropsContext) => {
    // init redux
    const reduxStore = initializeStore();

    // init relay environment
    const fetchFunction = makeServerFetchFunction(ctx);
    const environment = initServerEnvironment(fetchFunction);
    const initialRecords = environment.getStore().getSource().toJSON();

    // fetch the user
    const queryResult = loadUser(environment);

    return { props: { intialReduxState: reduxStore.getState(), initialRecords, ...queryResult } };
};
