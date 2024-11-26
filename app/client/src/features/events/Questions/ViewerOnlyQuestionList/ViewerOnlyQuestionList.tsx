import * as React from 'react';
import type { IndexRange } from 'react-virtualized';

import type { useViewerOnlyQuestionListFragment$key } from '@local/__generated__/useViewerOnlyQuestionListFragment.graphql';
import { useFilters, Accessors } from '@local/components/ListFilter';
import { ArrayElement } from '@local/utils/ts-utils';
import { useViewerOnlyQuestionList } from './useViewerOnlyQuestionList';
import { useViewerOnlyQuestionCreated } from './useViewerOnlyQuestionCreated';
import { useViewerOnlyQuestionUpdated } from './useViewerOnlyQuestionUpdated';
import { useViewerOnlyQuestionDeleted } from './useViewerOnlyQuestionDeleted';
import { QUESTIONS_BATCH_SIZE } from '@local/utils/rules';
import { QuestionList } from '../QuestionList';

interface ViewerOnlyQestionListContainerProps {
    fragmentRef: useViewerOnlyQuestionListFragment$key;
    isVisible: boolean;
    askQuestionEnabled?: boolean;
    searchOnly?: boolean;
}

export function ViewerOnlyQuestionListContainer({
    fragmentRef,
    isVisible,
    askQuestionEnabled = true,
    searchOnly = false,
}: ViewerOnlyQestionListContainerProps) {
    const { questions, connections, loadNext, hasNext } = useViewerOnlyQuestionList({ fragmentRef });
    const [isFrozen, setIsFrozen] = React.useState(false);
    const [frozenQuestions, setFrozenQuestions] = React.useState<typeof questions>(questions);
    useViewerOnlyQuestionCreated({ connections });
    useViewerOnlyQuestionUpdated();
    useViewerOnlyQuestionDeleted({ connections });

    const accessors = React.useMemo<Accessors<ArrayElement<typeof questions>>[]>(
        () => [
            (q) => q?.question || '', // question text itself
            (q) => q?.createdBy?.firstName || '', // first name of the user
        ],
        []
    );

    const [filteredList, handleSearch, handleFilterChange] = useFilters(questions, accessors);

    function togglePause() {
        setIsFrozen((prev) => !prev);
        setFrozenQuestions(questions);
    }

    const loadMoreRows = React.useCallback(
        async ({}: IndexRange) => {
            if (hasNext) loadNext(QUESTIONS_BATCH_SIZE);
        },
        [hasNext, loadNext]
    );

    if (!isVisible) return <React.Fragment />;

    return (
        <QuestionList
            askQuestionEnabled={askQuestionEnabled}
            searchOnly={searchOnly}
            isFrozen={isFrozen}
            questions={questions}
            filteredList={filteredList}
            frozenQuestions={frozenQuestions}
            connections={connections}
            handleFilterChange={handleFilterChange}
            handleSearch={handleSearch}
            loadMoreRows={loadMoreRows}
            togglePause={togglePause}
        />
    );
}
