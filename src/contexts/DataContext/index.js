import PropTypes from "prop-types";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  useMemo,
} from "react";

const DataContext = createContext({});

export const api = {
  loadData: async () => {
    const json = await fetch("/events.json");
    return json.json();
  },
};

export const DataProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [lastEvent, setlastEvent] = useState(null);

  const getData = useCallback(async () => {
    try {
      setData(await api.loadData());
    } catch (err) {
      setError(err);
    }
  }, []);
  
  useEffect(() => {
    if (data) {

      const events = data?.events;
      const uniqueEvents = events
        ? Array.from(new Map(events.map(evt => [evt.id, evt])).values())
        : [];

      const eventsTrie = uniqueEvents.sort(
        (evtA, evtB) => (new Date(evtA.date) > new Date(evtB.date) ? -1 : 1)
      );
      setlastEvent(eventsTrie?.[0])
      return
    };
    getData();
  }, [data, getData]);

  const contextValue = useMemo(
    () => ({
      data,
      error,
      lastEvent,
    }),
    [data, error, lastEvent]
  );

  return (
    <DataContext.Provider value={contextValue}>
      {children}
    </DataContext.Provider>
  );
};

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useData = () => useContext(DataContext);
export default DataContext;
