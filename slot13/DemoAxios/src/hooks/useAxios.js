// src/hooks/useAxios.js – NC8: Custom hook gom logic loading/error/data/AbortController
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

/**
 * @param {(signal: AbortSignal) => Promise} apiFn  – hàm gọi API nhận signal
 * @param {Array} deps                               – dependency array
 * @returns {{ data, loading, error, refetch }}
 */
const useAxios = (apiFn, deps = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshIndex, setRefreshIndex] = useState(0);

  const refetch = useCallback(() => setRefreshIndex(i => i + 1), []);

  useEffect(() => {
    const controller = new AbortController();
    let isMounted = true;

    const fetchData = async () => {
      if (isMounted) { setLoading(true); setError(null); }
      try {
        const res = await apiFn(controller.signal);
        if (isMounted) setData(res.data);
      } catch (err) {
        if (isMounted && !axios.isCancel(err) && err.name !== 'CanceledError') {
          setError(err.message);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();
    return () => { isMounted = false; controller.abort(); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, refreshIndex]);

  return { data, loading, error, refetch };
};

export default useAxios;
