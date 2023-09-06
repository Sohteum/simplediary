import React from 'react';
import DiaryItem from './DiaryItem';

const DiaryList = ({ diaryList }) => {

    return (
        <div className='DiaryList'>
            <h2>일기리스트</h2>
            <h4>{diaryList.length}개의 일기가 있습니다.</h4>
            <div>
                {diaryList.map((it) => (
                    <DiaryItem key={it.id} {...it}/>
                    
                ))}
            </div>
        </div>
    );
};

DiaryList.defaultProps = {
    diaryList: [],
};//언디파인으로 오는 프롭스들에게 디폴드값을 줌

export default DiaryList;