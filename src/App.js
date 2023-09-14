import { useEffect, useMemo, useRef, useState } from 'react';
import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';
import Lifecycle from './Lifecycle';
import OptimizeText from './OptimizeText';

// const dummyList = [
//   {
//     id: 1,
//     author: "sohteum",
//     content: "하이1",
//     emotion: 5,
//     created_date: new Date().getTime()
//   },
//   {
//     id: 2,
//     author: "saddy",
//     content: "하이2",
//     emotion: 3,
//     created_date: new Date().getTime()
//   },
//   {
//     id: 3,
//     author: "smilly",
//     content: "하이3",
//     emotion: 2,
//     created_date: new Date().getTime()
//   },
//   {
//     id: 4,
//     author: "funnny",
//     content: "하이4",
//     emotion: 5,
//     created_date: new Date().getTime()
//   },

// ]

//https://jsonplaceholder.typicode.com/comments

function App() {

  const getData = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/comments')
      .then((res) => res.json())

    const initData = res.slice(0, 20).map((it) => {
      return {
        author: it.email,
        content: it.body,
        emotion: Math.floor(Math.random() * 5) + 1,
        created_date: new Date().getTime(),
        id : dataId.current++,
      }
    })

    setData(initData);
  }

  useEffect(() => {
    getData();
  }, [])

  const [data, setData] = useState([]);

  const dataId = useRef(0) //변수처럼 사용하는...?

  const onCreate = (author, content, emotion) => {
    const created_date = new Date().getTime();
    const newItem = {
      author,
      content,
      emotion,
      created_date,
      id: dataId.current
    }
    dataId.current += 1;
    setData([newItem, ...data])
  }

  const onRemove = (targetId) => {
    console.log(`${targetId}가 삭제되었습니다`);
    const newDiaryList = data.filter((it) => it.id !== targetId);
    setData(newDiaryList)
  }

  const onEdit = (targetId, newContent) => {
    setData(
      data.map((it) =>
        it.id === targetId ? { ...it, content: newContent } : it
      )
    )
  }

  const getDiaryAnalysis = useMemo(//함수의 연산을 활용한 연산최적화.
    ()=>{
    // console.log("일기분석 시작!")

    const goodCount = data.filter((it)=>it.emotion>=3).length;
    const badCount = data.length - goodCount;
    const goodRatio = (goodCount / data.length)*100;
    return {goodCount, badCount, goodRatio}
  }, [data.length]
  );//이렇게 하면 얘는 더이상 함수가 아님. 값을 리턴하게됨. 

const {goodCount, badCount, goodRatio} = getDiaryAnalysis;//여기서 괄호 제거해서 값으로 호출해야함

  return (
    <div className="App">
      {/* <OptimizeText/> */}
      {/* <Lifecycle /> */}
      <DiaryEditor onCreate={onCreate} />
      <div>전체일기: {data.length}</div>
      <div>기분 좋은 일기 개수: {goodCount}</div>
      <div>기분 나쁜 일기 개수: {badCount}</div>
      <div>기분 좋은 일기 비율: {goodRatio}</div>
      <DiaryList onRemove={onRemove} onEdit={onEdit} diaryList={data} />

    </div>
  );
}

export default App;
