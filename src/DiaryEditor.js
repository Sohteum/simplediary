import React, { useRef, useState } from 'react';

const DiaryEditor = () => {

    const authorInput = useRef()

    const [state, setState] = useState({
        author: "",
        content: "",
        emotion: 1,
    })

    const handleChangeState = (e) => {
        console.log(e.target.name);
        console.log(e.target.value);

        setState({
            ...state,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = () => {
        if (state.author.length < 1) {
            authorInput.current.focus();
            return;
        }
        if (state.content.length < 5) {
            authorInput.current.focus();

            return;
        }

        alert("저장성공")
    }

    return (
        <div className='DiaryEditor'>
            <h2>오늘의일기</h2>
            <input ref={authorInput} name="author" value={state.author}
                onChange={handleChangeState} />
            <div>
                <textarea name="content" value={state.content}
                    onChange={handleChangeState} />
            </div>
            <div>
                오늘의 감정점수 :
                <select
                    name={"emotion"}
                    value={state.emotion}
                    onChange={handleChangeState}
                >
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                </select>
                <div>
                    <button onClick={handleSubmit}>일기 저장하기</button>
                </div>
            </div>
        </div>
    );
};

export default DiaryEditor;