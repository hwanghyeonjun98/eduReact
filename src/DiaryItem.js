import React, {useContext, useRef, useState} from "react";
import {DiaryDispatchContext} from "./App";

const DiaryItem = ({author, content, create_date, emotion, id}) => {
  const {onRemove, onEdit} = useContext(DiaryDispatchContext);

  const [isEdit, setIsEdit] = useState(false);
  const toggleIsEdit = () => setIsEdit(!isEdit);

  const [localContent, setLocalContent] = useState(content);
  const localContentInput = useRef();

  const handleRemove = () => {
    if (window.confirm(`${id}번째를 삭제하시겠습니까?}`)) {
      onRemove(id);
    }
  };

  const handleQuitEdit = () => {
    setIsEdit(false);
    setLocalContent(content);
  };

  const handleEdit = () => {
    if (localContent.length < 5) {
      localContentInput.current.focus();
      return;
    }

    if (window.confirm(`${id}번쨰 내용을 수정하겠습니까?`)) {
      onEdit(id, localContent);
      toggleIsEdit();
    }
  };

  return (
    <div className="DiaryItem">
      <div className="info">
        <span>
          작성자 : {author} | 감정점수 : {emotion}
        </span>
        <br />
        <span className="date">{new Date(create_date).toLocaleDateString()}</span>
      </div>
      <div className="content">
        {isEdit ? (
          <>
            <textarea
              ref={localContentInput}
              value={localContent}
              onChange={(e) => {
                setLocalContent(e.target.value);
              }}
            ></textarea>
          </>
        ) : (
          <>{content}</>
        )}
      </div>
      <div>
        {isEdit ? (
          <>
            <button onClick={handleQuitEdit}>수정 취소</button>
            <button onClick={handleEdit}>수정 완료</button>
          </>
        ) : (
          <>
            <button onClick={handleRemove}>삭제</button>
            <button onClick={toggleIsEdit}>수정</button>
          </>
        )}
      </div>
    </div>
  );
};

export default React.memo(DiaryItem);
