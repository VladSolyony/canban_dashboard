import React, {useState} from 'react';
import './App.css';

const App = () => {
  const [columnList, setColumnList] = useState([
    {id: 1, order: 1, text: 'Upcoming'},
    {id: 2, order: 2, text: 'In Progress'},
    {id: 3, order: 3, text: 'Done'}
  ])

  const [currentColumn, setCurrentColumn] = useState(null)

  function dragStartHadler(e, column) {
    setCurrentColumn(column);
  }

  function dragEndHadler(e) {
    e.target.style.background = 'white';
  }

  function dragOverHadler(e) {
    e.preventDefault();
    e.target.style.background = 'lightgray';
  }

  function dropHandler(e, column) {
    e.preventDefault();
    setColumnList(columnList.map(c => {
      if(c.id === column.id) {
        return {...c, order: currentColumn.order};
      }
      if(c.id === currentColumn.id) {
        return {...c, order: column.order};
      }
      return c;
    }))
    e.target.style.background = 'white'
  }

  const sortColumns = (c1, c2) => {
    if (c1.order > c2.order) {
      return 1;
    } else {
      return -1;
    }
  }

  return (
    <div className="App">
      {columnList.sort(sortColumns).map(column => 
          <div 
            onDragStart={(e) => dragStartHadler(e, column)}
            onDragLeave={(e) => dragEndHadler(e)}
            onDragEnd={(e) => dragEndHadler(e)}
            onDragOver={(e) => dragOverHadler(e)}
            onDrop={(e) => dropHandler(e, column)}
            draggable={true}
            className={'column'}
            key={column.id}>
            {column.text}
          </div>
        )}
    </div>
  );
}

export default App;
