function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

//https://qiita.com/seya/items/f6d311b32cf711a02020
