import React, { useState, useEffect } from 'react';


// const TextView = React.memo(({ text }) => {
//     useEffect(() => {
//         console.log(`Update :: Text : ${text}`);
//     })
//     return <div>{text}</div>
// })

// const CountView = React.memo(({ count }) => {
//     useEffect(() => {
//         console.log(`Update :: Count : ${count}`);
//     })
//     return <div>{count}</div>
// });



    // const [count, setCount] = useState(1);
    // const [text, setText] = useState();

    const CounterA = React.memo(({ count }) => {

        useEffect(() => {
            console.log(`CounterA Update - count:${count}`)
        })
        return <div>{count}</div>
    })

    const CounterB = ({ obj }) => {
        useEffect(() => {
            console.log(`CounterB Update - ${obj.count}`)
        })
        return <div>{obj.count}</div>
    };
    
    const areEqual = (prevProps, nextProps) => {
        if (prevProps.obj.count === nextProps.obj.count) {
            return true;
        }
        return false;
    }
    const MemoizedConterB = React.memo((CounterB.areEqual));



    const OptimizeText = () => {

        const [count, setCount] = useState(1);
        const [obj, setObj] = useState({
            count: 1
        })
  

return (
    <div style={{ padding: 50 }}>
        <div>
            <h2>Counter A</h2>
            <CounterA count={count} />
            <button onClick={() => setCount(count)}>A button</button>
        </div>
        <div>
            <h2>Counter B</h2>
            <MemoizedConterB obj={obj} />
            <button onClick={() => setObj({
                count: 1
            })}>B button</button>
        </div>

        {/* <div>
                <div>count</div>
                <CountView count={count} />
                <button onClick={() => setCount(count + 1)}>+</button>
            </div>
            <div>
                <div>text</div>
                <TextView text={text} />
                <input value={text} onChange={(e) => setText(e.target.value)} />
            </div> */}
    </div>
);
        }
export default OptimizeText;

//자스에서는 객체를 비교할때 값을 비교하는 것이 아닌 객체의 주소에 의한 비교를 함. 이것을 얉은 비교라고 함.
//그런데 다른 객체를 가르키는게 아니라 같은 객체를. 같은 주소를 가르키고 있는 경우는 달라짐