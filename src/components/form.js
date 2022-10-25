import React, { useState, useEffect, useRef } from 'react';
import Card from './card';
import Badge from './badge';
import Dropdown from './dropdown';
import PriorLevel from '../helpers/priorLevel';

const Form = () => {
  const sortList = [{
    slug: 'name-az',
    name: 'Name A-Z'
  }, {
    slug: 'name-za',
    name: 'Name Z-A'
  }, {
    slug: 'priority-hl',
    name: 'Priority High to Low'
  }, {
    slug: 'priority-lh',
    name: 'Priority Low to High'
  }];

  const [toDoList, setToDoList] = useState(JSON.parse(localStorage.getItem('todo')) || []);
  const [toDoText, setToDoText] = useState('');
  const [prior, setPrior] = useState(0);
  const [selectedSort, setSelectedSort] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (!localStorage.getItem('todo')) {
      localStorage.setItem('todo', JSON.stringify(toDoList));
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const newToDo = {
      id: new Date(),
      prior: prior,
      done: false,
      content: toDoText
    };
    const list = [newToDo, ...toDoList];

    setToDoList(list);
    setToDoText('');
    inputRef.current.focus();
    localStorage.setItem('todo', JSON.stringify(list));
  };

  const handleDelete = (targetId) => {
    const list = toDoList.filter(data => data.id !== targetId);
    setToDoList(list);
    localStorage.setItem('todo', JSON.stringify(list));
  };

  const handleDone = (targetId) => {
    const list = [...toDoList];
    const objIndex = list.findIndex((obj => obj.id === targetId));
    list[objIndex].done = !list[objIndex].done;
    setToDoList(list);
    localStorage.setItem('todo', JSON.stringify(list));
  };

  const handleSort = (obj) => {
    const list = [...toDoList];

    if (obj.slug === 'name-az' || obj.slug === 'name-za') {
      list.sort((a, b) => {
        if (a?.content.toLowerCase() < b?.content.toLowerCase()) return obj.slug === 'name-az' ? -1 : 1;
        if (a?.content.toLowerCase() > b?.content.toLowerCase()) return obj.slug === 'name-az' ? 1 : -1;
        return 0;
      });
    } else if (obj.slug === 'priority-lh') {
      list.sort((a, b) => parseFloat(a.prior) - parseFloat(b.prior));
    } else if (obj.slug === 'priority-hl') {
      list.sort((a, b) => parseFloat(b.prior) - parseFloat(a.prior));
    }

    setSelectedSort(obj);
    setToDoList(list);
    localStorage.setItem('todo', JSON.stringify(list));
  };

  const countPercentage = () => {
    const totalList = toDoList.length;

    if (totalList < 1) return null;

    const totalDone = toDoList.filter(data => data.done === true).length;
    const count = Math.round((100 * totalDone) / totalList);

    return (
      <div className={`md:text-right sm:text-left self-center ${count === 100 ? 'text-green-600' : 'text-gray-500'} leading-none mb-2`}>
        <p><b>{count}% Done</b></p>
        <p><small>({totalDone} from {totalList} task{totalList > 1 ? 's' : ''} has finished)</small></p>
      </div>
    );
  };

  return (
    <div className="min-h-screen main-bg">
      <div className="mx-auto max-w-xl pt-8 pb-16 px-2">
        <p class="block text-gray-700 text-sm font-bold mb-2">
          What to do?
        </p>
        <div className="relative mb-5">
          <form onSubmit={handleSubmit}>
            <input
              ref={inputRef}
              value={toDoText}
              onChange={(e) => setToDoText(e.target.value)}
              class="pl-3 pr-20 placeholder-slate-300 text-slate-600 relative bg-white bg-white rounded text-base border-0 shadow outline-none focus:outline-none focus:ring w-full"
              style={{ paddingTop: '10px', paddingBottom: '38px' }}
              type="text"
              placeholder="Write a task, pick priority level, and click add"
            />
            <div className="absolute flex" style={{ top: '42px', left: '10px' }}>
              {PriorLevel.map((item) => (
                <Badge
                  prior={item.level}
                  disabled={prior !== item.level}
                  className="mr-1"
                  onClick={(val) => setPrior(val)}
                />
              ))}
            </div>
            <button
              type="submit"
              class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-4 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Add
            </button>
          </form>
        </div>

        {countPercentage()}
        {toDoList.length > 0 && (
          <div className="flex mb-2">
            <div class="group relative inline-block text-left max-w-lg">
              <Dropdown
                selected={selectedSort}
                items={sortList}
                placeholder="Sort by"
                onChange={(obj) => handleSort(obj)}
              />
            </div>
          </div>
        )}

        {toDoList.map((data) => (
          <Card
            data={data}
            onDelete={(id) => handleDelete(id)}
            onDone={(id) => handleDone(id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Form;
