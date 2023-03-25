import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import FeedItem from "./components/feedItem/feedItem";
import Loader from "./components/loader/loader";
import Navbar from "./components/navbar/navbar";

function App() {
  const [feedDataArr, setFeeedDataArr] = useState<any[]>([]);
  const [slicedDataArr, setSlicedDataArr] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [sixMore, setSixMore] = useState<number>(6);
  const [hasMoreData, setHasMoreData] = useState<boolean>(true);



  //initial fetch of data and 1st render of items
  useEffect(() => {
    axios
      .get("https://dev.tedooo.com/feed.json")
      .then((result: any) => {
        setFeeedDataArr(result.data.data);
        setSlicedDataArr(result.data.data.slice(0, sixMore));
        setTimeout(() => {
          setIsLoading(true);
        }, 1000);
      })
      .catch((err) => {
        console.error("error in axios: ", err);
      });
  }, [feedDataArr.length]);

  //handle reaching of bootom page and render more items
  const scrollEvent = (event: any): void => {
    let screenBottom: boolean =
      event.target.scrollHeight -
        event.target.scrollTop -
        event.target.clientHeight <
      150;
    if (screenBottom && hasMoreData) {
      setSixMore(sixMore + 6);
      setSlicedDataArr(feedDataArr.slice(0, sixMore));
      if (feedDataArr.length <= slicedDataArr.length) setHasMoreData(false);
    }
  };

  return isLoading ? (
    <div className="App">
      <Navbar />
      <div className="feed" onScroll={scrollEvent}>
        <div className="feed-wrapper">
          {slicedDataArr.map((post: any, index: number) => {
            return <FeedItem post={post} key={index + "post"} />;
          })}
        </div>
      </div>
    </div>
  ) : (
    <Loader />
  );
}

export default App;
