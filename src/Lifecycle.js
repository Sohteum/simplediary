import React, { useEffect, useState } from 'react';

const Lifecycle = () => {

    // const [count, setCount] = useState(0);
    // const [text, setText] = useState("");

    // useEffect(() => {
    //     console.log("mount!")
    // }, [])
    // useEffect(() => {
    //     console.log("update!")//값을 입력한다거나 컴포넌트가 변경되는 시점!
    // })
    // useEffect(() => {
    //     console.log(`count is update : ${count}`)
    //     if(count>5){
    //         alert('카운트가 5를 넘었습니다. 따라서 1로 초기화합니다')
    //         setCount(1)
    //     }
    // }, [count])
    // useEffect(() => {
    //     console.log(`text is update : ${text}`)
    // }, [text])


    const [isVisible, setIsVisible] = useState(false);
    const toggle = () => {
        setIsVisible(!isVisible);
    }

    const UnmountTest = () => {
        useEffect(() => {
            console.log("Mount!")
            
            return () => {
                console.log("unMount!")
            }

        }, [])
        return <div>Unmount Testing Component</div>
    }
    return (
        <div style={{ padding: 20 }}>
            {/* {count}
            <button onClick={() => setCount(count + 1)}>+</button>
            <div>
                <input value={text} onChange={(e) => setText(e.target.value)} />
            </div> */}
            <button onClick={toggle} >ON/OFF</button>
            {isVisible && <UnmountTest />}
        </div>
    );
};

export default Lifecycle;