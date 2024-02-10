import React from "react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

const useQuery = (promise, dependencies = []) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    fetch();
  }, dependencies);

  const fetch = async () => {
    setLoading(true);
    try {
      const res = await promise();
      if (res?.data) {
        // console.log("res", res);
        setData(res.data.data);
      }
    } catch (error) {
      console.log("error", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetch();
  }, []);
  return {
    data,
    error,
    loading,
    refetch: fetch,
  };
};

export default useQuery;
