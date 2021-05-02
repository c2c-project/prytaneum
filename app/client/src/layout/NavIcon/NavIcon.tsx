import * as React from 'react';
import './styles.css';

interface Props {
    onClick: () => void;
    open: boolean;
}

export default function NavIcon({ open, onClick }: Props) {
    return (
        <div
            role='button'
            aria-label={open ? 'open menu' : 'close menu'}
            id='nav-icon'
            onClick={onClick}
            className={open ? 'open' : ''}
            onKeyDown={onClick}
            onKeyPress={onClick}
            tabIndex={0}
        >
            <span />
            <span />
            <span />
        </div>
    );
}
