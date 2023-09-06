import { useState } from 'react';
import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';

const dummyList = [
  {
    id: 1,
    author: "sohteum",
    content: "하이1",
    emotion: 5,
    created_date: new Date().getTime()
  },
  {
    id: 2,
    author: "saddy",
    content: "하이2",
    emotion: 3,
    created_date: new Date().getTime()
  },
  {
    id: 3,
    author: "smilly",
    content: "하이3",
    emotion: 2,
    created_date: new Date().getTime()
  },
  {
    id: 4,
    author: "funnny",
    content: "하이4",
    emotion: 5,
    created_date: new Date().getTime()
  },

]

function App() {


  return (
    <div className="App">

      <DiaryEditor />
      <DiaryList diaryList={dummyList}/>

    </div>
  );
}

export default App;
