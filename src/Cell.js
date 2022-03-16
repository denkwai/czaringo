import classNames from 'classnames';
import './Cell.css';

function Cell({ text = '', onClick = () => {}, isSelected = false }) {
    return <button onClick={onClick} className={classNames('Cell', {'IsSelected': isSelected})}>
        {text}
    </button>
};

export default Cell;