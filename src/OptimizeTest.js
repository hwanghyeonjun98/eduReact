import React, {useState, useEffect, useMemo} from "react";

const ConuterA = React.memo(({count}) => {
  useEffect(() => {
    console.log(`countA update - counter ${count}`);
  });

  return <div>{count}</div>;
});

const ConuterB = ({obj}) => {
  useEffect(() => {
    console.log(`countB update - counter ${obj.count}`);
  });
  return <div>{obj.count}</div>;
};

const areEqual = (prevProps, nexProps) => {
  return prevProps.obj.count === nexProps.obj.count;
};

const MemoizedCounterB = React.memo(ConuterB, areEqual);

const OptimizeTest = () => {
  const [count, setCount] = useState(1);
  const [obj, setObj] = useState({
    count: 1,
  });

  return (
    <div style={{padding: 20}}>
      <div>
        <h2>counter A</h2>
        <ConuterA count={count} />
        <button onClick={() => setCount(count)}>A button</button>
      </div>
      <div>
        <h2>counter B</h2>
        <MemoizedCounterB obj={obj} />
        <button
          onClick={() =>
            setObj({
              count: obj.count,
            })
          }
        >
          B button
        </button>
      </div>
    </div>
  );
};

export default OptimizeTest;
