import { useMemo } from 'react';
import { initEnvironment, clearEnvironment, RecordMap } from '@local/utils/relay-environment';

export function useEnvironment(initialRecords?: RecordMap) {
    return useMemo(() => {
        let env = initEnvironment(initialRecords);
        const resetEnv = () => {
            clearEnvironment();
            env = initEnvironment(initialRecords);
        };
        return {
            env,
            resetEnv,
        };
    }, [initialRecords]);
}
