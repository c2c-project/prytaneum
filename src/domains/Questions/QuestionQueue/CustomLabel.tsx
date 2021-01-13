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

                            flex: 0,
                            top: -16,
                            right: 0,
                            bottom: 0,
                            left: 0,
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
