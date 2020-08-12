import React, { useState, useEffect } from 'react';
import ClipDetails from './ClipDetails';
import ClipTable from './ClipTable';

interface ClipData {
    timeStamp: string;
    duration: string;
    title: string;
    description: string;
    tags: string[];
}

function createData(
    timeStamp: string,
    duration: string,
    title: string,
    description: string,
    tags: string[]
): ClipData {
    return { timeStamp, duration, title, description, tags };
}

const tempRows = [
    createData(
        '00:40-1:53',
        '1 min, 23 secs',
        'Question title 1',
        'Session Title',
        ['History', 'Philosophy', 'Prop 60']
    ),
    createData(
        '1:34-2:23',
        '1 min, 23 secs',
        'Question title 2',
        'Session Title',
        ['History', 'A.I']
    ),
    createData(
        '3:40-5:00',
        '1 min, 23 secs',
        'Question title 3',
        'Session Title',
        ['History', 'Philosophy', 'Prop 60']
    ),
    createData(
        '00:40-1:53',
        '1 min, 23 secs',
        'Question title 4',
        'Session Title',
        ['History', 'Philosophy', 'Prop 60']
    ),
    createData(
        '00:40-1:53',
        '1 min, 23 secs',
        'Question title 5',
        'Session Title',
        ['History', 'Philosophy', 'Prop 60']
    ),
];

export default function ClipsPortal() {
    const [selected, setSelected] = useState<ClipData>({
        title: '',
        duration: '',
        timeStamp: '',
        description: '',
        tags: [],
    });
    useEffect(() => {
        console.log(selected);
    }, [selected]);

    const handleClick = (event: React.MouseEvent<unknown>, clip: ClipData) => {
        // adds and pops items that are clicked/unclicked to selected list state
        // const selectedIndex = selected.indexOf(name);
        // let newSelected: string[] = [];

        // if (selectedIndex === -1) {
        //     newSelected = newSelected.concat(selected, name);
        // } else if (selectedIndex === 0) {
        //     newSelected = newSelected.concat(selected.slice(1));
        // } else if (selectedIndex === selected.length - 1) {
        //     newSelected = newSelected.concat(selected.slice(0, -1));
        // } else if (selectedIndex > 0) {
        //     newSelected = newSelected.concat(
        //         selected.slice(0, selectedIndex),
        //         selected.slice(selectedIndex + 1)
        //     );
        // }

        setSelected(clip);
    };
    // returns boolean if title has been selected
    const isSelected = (title: string): boolean => {
        if (!selected || title !== selected.title) return false;
        return true;
    };

    return (
        <section>
            <ClipDetails
                title={selected.title}
                duration={selected.duration}
                description={selected.description}
                timeStamp={selected.timeStamp}
                tags={selected.tags}
            />
            <ClipTable
                clips={tempRows}
                isSelected={isSelected}
                handleClick={handleClick}
            />
        </section>
    );
}
