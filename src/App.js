import "./App.css";
import { useState } from "react";
import { getAllRecords } from "./utils/supabaseFunctions";

export function App() {
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("0");
  const [records, setRecords] = useState([]);
  const [error, setError] = useState("");
  const [timeList, setTimeList] = useState([0]);
  const handleTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleTime = (e) => {
    setTime(e.target.value);
  };
  const handleClick = () => {
    if (title == "" || time == 0 || time == "") {
      setError("入力されていない項目があります");
    } else {
      setRecords([...records, { title: title, time: time }]);
      setTimeList([...timeList, time]);
      setTitle("");
      setTime(0);
      setError("");
    }
  };
  console.log(timeList);
  const records2 = getAllRecords();
  console.log(records2);
  return (
    <>
      <h1>学習記録一覧</h1>
      <p>学習内容</p>
      <input value={title} onChange={handleTitle} />
      <p>学習時間</p>
      <input value={time} onChange={handleTime} />
      <p>入力されている学習内容：{title}</p>
      <p>入力されている時間：{time}時間</p>
      {records.map((record) => {
        return (
          <p>
            {record.title} {record.time}時間
          </p>
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
  );
}
