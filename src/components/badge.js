import React from 'react';
import PriorLevel from '../helpers/priorLevel';

const Badge = (props) => {
  const {
    prior,
    className,
    disabled,
    onClick
  } = props;

  const priorBadge = PriorLevel.filter(obj => {
    return obj.level === prior
  })[0];

  return (
    <div className="flex mb-2" onClick={() => onClick(priorBadge.level)}>
      <div className={`${className} cursor-pointer text-xs rounded-full py-1 px-3 font-bold text-white leading-none flex items-center uppercase ${priorBadge.color} ${disabled ? 'opacity-20' : ''}`}>
        {priorBadge.text}
      </div>
    </div>
  );
};

export default Badge;
