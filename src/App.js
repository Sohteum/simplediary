import React,{ useCallback, useEffect, useMemo, useReducer, useRef } from 'react';
import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';


//https://jsonplaceholder.typicode.com/comments


const reducer = (state, action) => {
  switch (action.type) {
    case 'INIT': {
      return action.data
    }
    case 'CREATE':{
      const created_date = new Date().getTime();
      const newItem = {
        ...action.data,
        created_date
      }
      return[newItem, ...state]
    }
    case 'REMOVE':{
      return state.filter((it)=>it.id !== action.targetId);
    }
    case 'EDIT':{
      return state.map((it)=>it.id === action.targetId? {...it,content:action.newContent}:it)
    }
    default:
      return state;
  }
}

export const DiaryStateContext = React.createContext()

export const DiaryDispatchContext = React.createContext()

function App() {
  // const [data, setData] = useState([]);

  const [data, dispatch] = useReducer(reducer, []);

  const getData = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/comments')
      .then((res) => res.json())

    const initData = res.slice(0, 20).map((it) => {
      return {
    
        author: it.email,
        content: it.body,
        emotion: Math.floor(Math.random() * 5) + 1,
        created_date: new Date().getTime(),
        id: dataId.current++,
      }
    })
    dispatch({ type: 'INIT', data: initData })
  }

  useEffect(() => {
    getData();
  }, [])


  const dataId = useRef(0) //변수처럼 사용하는...?

  const onCreate = useCallback(
    (author, content, emotion) => {

      dispatch({
        type: 'CREATE',
        data: { author, content, emotion, id: dataId.current }
      })

      dataId.current += 1;
    }, [])

  const onRemove = useCallback(
    (targetId) => {
   dispatch({type:"REMOVE", targetId})
  })

  const onEdit = useCallback(
    (targetId, newContent) => {
    dispatch({type:'EDIT', targetId, newContent})
  })

const MemoizedDispatches = useMemo(()=>{
  return {onCreate,onRemove, onEdit }
},[])

  const getDiaryAnalysis = useMemo(//함수의 연산을 활용한 연산최적화.
    () => {
      // console.log("일기분석 시작!")

      const goodCount = data.filter((it) => it.emotion >= 3).length;
      const badCount = data.length - goodCount;
      const goodRatio = (goodCount / data.length) * 100;
      return { goodCount, badCount, goodRatio }
    }, [data.length]
  );//이렇게 하면 얘는 더이상 함수가 아님. 값을 리턴하게됨. 

  const { goodCount, badCount, goodRatio } = getDiaryAnalysis;//여기서 괄호 제거해서 값으로 호출해야함

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={MemoizedDispatches}>
    <div className="App">
      {/* <OptimizeText/> */}
      {/* <Lifecycle /> */}
      <DiaryEditor onCreate={onCreate} />
      <div>전체일기: {data.length}</div>
      <div>기분 좋은 일기 개수: {goodCount}</div>
      <div>기분 나쁜 일기 개수: {badCount}</div>
      <div>기분 좋은 일기 비율: {goodRatio}</div>
      <DiaryList onRemove={onRemove} onEdit={onEdit}  />

    </div>
    </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
