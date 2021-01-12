import React from 'react';
import { motion } from 'framer-motion';

import CurrQuestionLabel from '../CurrQuestionLabel';

interface Props {
    isIn: boolean;
}

/**
 * renders a custom "current question" label
 */
export default React.memo(
    function ({ isIn }: Props) {
        return (
            <div>
                {isIn && (
                    <motion.div
                        layoutId='question-queue'
                        initial={false}
                        style={{
                            position: 'absolute',
                            inset: 0,
                            flex: 0,
                            top: -16,
                        }}
                        transition={{ ease: 'easeInOut' }}
                    >
                        <CurrQuestionLabel />
                    </motion.div>
                )}
            </div>
        );
    },
    (prevProps, nextProps) => prevProps.isIn === nextProps.isIn
);
