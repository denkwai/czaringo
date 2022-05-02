import React from 'react';
import classNames from 'classnames';
import './Cell.css';

function Cell({ text = '', onClick = () => {}, onRemoveClick = () => {}, isSelected = false }) {
    return <button onClick={onClick} className={classNames('Cell', {'IsSelected': isSelected})}>
        {text}
        {isSelected && (
            <span className="CellDeselect" onClick={(e) => { e.stopPropagation(); onRemoveClick() }}>✖</span>
        )}
    </button>
};

export default Cell;