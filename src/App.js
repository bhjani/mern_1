import "./styles.css";
import { useState, useEffect, useCallback } from "react";
import Card from "./components/card";

export default function App() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);

  const debounce = (fn) => {
    let timer = null;
    return (e) => {
      timer && clearTimeout(timer);
      timer = setTimeout(() => fn(e), 1000);
    };
  };

  const onSearchHandle = debounce((e) => {
    setSearch(e.target.value);
  });

  console.log("render");

  const fetchData = useCallback(async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    let data = await res.json();
    setData(data);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const renderItems = () => {
    return data.map((item, index) => (
      <Card key={`key ${index}`}>
        <p>
          <b>{item.name}</b>
        </p>
        <p>{item.email}</p>
        <p>{item.address.city}</p>
      </Card>
    ));
  };

  return (
    <main>
      <section>
        <input type="text" onChange={onSearchHandle}></input>
        <button>Search</button>
      </section>
      <section>{renderItems()}</section>
    </main>
  );
}
