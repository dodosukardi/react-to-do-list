import React from 'react';
import CheckedIcon from '../static/images/checked_64.png';
import Badge from './badge';
import PriorLevel from '../helpers/priorLevel';

const Card = (props) => {
  const { data, onDelete, onDone } = props;

  const priorBadge = PriorLevel.filter(obj => {
    return obj.level === data.prior
  })[0];

  return (
    <div class={`${data.done ? 'opacity-40 hover:opacity-100' : ''} bg-white transition-all ease-in-out mx-auto max-w-xl rounded overflow-hidden shadow-lg mb-2 relative hover:pb-9 hover:-translate-y-1 hover:shadow-xl`}>
      <div class="px-4 py-4">
        {data.done && (
          <img
            alt=""
            className="absolute checked-icon"
            src={CheckedIcon}
            width="64px"
            height="64px"
          />
        )}
        <Badge prior={priorBadge.level} />
        <p class={`${data.done ? 'line-through' : ''} text-gray-700 text-base`}>
          {data.content}
        </p>

        <div className="w-full absolute mt-4" style={{ left: 0 }}>
          <div className="flex">
          <button
            class="text-sm text-rose-400 font-bold bg-white w-full py-2 px-4 border-t border-gray-300 hover:bg-gray-100 active:bg-gray-200"
            onClick={() => onDelete(data.id)}
          >
            Delete
          </button>
          <button
            class="text-sm text-green-600 font-bold bg-white w-full py-2 px-4 border-t border-l border-gray-300 hover:bg-gray-100 active:bg-gray-200"
            onClick={() => onDone(data.id)}
          >
            {data.done ? 'Cancel done' : 'Done'}
          </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
