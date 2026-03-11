import "./App.css";
import { useState, useEffect } from "react";
import { getAllRecords, insertRecord } from "./utils/supabaseFunctions";

export function App() {
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("0");
  const [records, setRecords] = useState([]);
  const [error, setError] = useState("");
  const [timeList, setTimeList] = useState([0]);
  const [loading, setLoading] = useState(false);

  const getRecords = async () => {
    setLoading(true);
    try {
      const res = await getAllRecords();
      if (res.error) {
        console.log(res.error);
        return;
      }
      setRecords(res.data);
      setTimeList(res.data.map((record) => record.time));
    } catch (e) {
      console.log(e);
    } finally {
      console.log("finally");
      setLoading(false);
    }
  };

  useEffect(() => {
    getRecords();
  }, []);

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleTime = (e) => {
    setTime(e.target.value);
  };
  const handleClick = () => {
    if (title === "" || time === 0 || time === "") {
      setError("入力されていない項目があります");
    } else {
      const createRecord = async (title, time) => {
        try {
          await insertRecord({ title: title, time: time });
          await getRecords();
          setTitle("");
          setTime(0);
          setError("");
        } catch (e) {
          console.log(e);
          setError("登録に失敗しました");
        }
      };
      createRecord(title, time);
    }
  };
  console.log(timeList);

  const onClickDelete = (index) => {
    const newRecords = [...records];
    newRecords.splice(index, 1);
    setRecords(newRecords);
    console.log("set");
  };
  console.log("records");
  console.log(records);

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h1>学習記録一覧</h1>
          <div style={{ display: "flex" }}>
            <p>学習内容</p>
            <input value={title} onChange={handleTitle} />
          </div>
          <div style={{ display: "flex" }}>
            <p>学習時間</p>
            <input value={time} onChange={handleTime} />
          </div>
          <p>入力されている学習内容：{title}</p>
          <p>入力されている時間：{time}時間</p>
          {records.map((record, index) => {
            return (
              <div key={index} style={{ display: "flex" }}>
                <p>
                  {record.title} {record.time}時間
                </p>
                <button onClick={() => onClickDelete(index)}>削除</button>
              </div>
            );
          })}
          <button onClick={handleClick}>登録</button>
          <p>
            合計時間：
            {timeList.reduce((accumlator, currentValue) => {
              return parseInt(accumlator) + parseInt(currentValue);
            })}
            /1000(h)
          </p>
          <p>{error}</p>
        </>
      )}
    </>
  );
}
