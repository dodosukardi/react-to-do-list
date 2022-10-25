import React from 'react';
import EditIcon from '../static/images/edit_24.png';
import PriorLevel from '../helpers/priorLevel';

const Badge = (props) => {
  const {
    prior,
    editable,
    className,
    disabled,
    onClick
  } = props;

  const priorBadge = PriorLevel.filter(obj => {
    return obj.level === prior
  })[0];

  const handleClick = () => {
    if (!editable) onClick(priorBadge.level);
  };

  return (
    <div className="flex mb-2" onClick={handleClick}>
      <div className={`${className} cursor-pointer text-xs rounded-full py-1 px-3 font-bold text-white leading-none flex items-center uppercase ${priorBadge.color} ${disabled ? 'opacity-20' : ''}`}>
        {priorBadge.text} {editable ? 'priority' : ''}
        {editable && (
          <img
            alt=""
            className="ml-1"
            src={EditIcon}
            width="12px"
            height="12px"
          />
        )}
      </div>
    </div>
  );
};

export default Badge;
