import {useState, useEffect, useCallback} from 'react';

const useTableSelection = (entities = [], preselected = []) => {
  const [selected, setSelected] = useState(preselected);

  const onSelect = useCallback(
    id => setSelected(
      prevSelected => prevSelected.includes(id)
        ? prevSelected.filter(item => item !== id)
        : [...prevSelected, id]
    ),
    []
  );

  const onSelectAll = useCallback(
    () => setSelected(
      prevSelected => entities.length === prevSelected.length
        ? []
        : entities.map(({id}) => id)
    ),
    [entities]
  );

  useEffect(() => {
    setSelected(preselected);
  }, [preselected]);

  return {selected, onSelect, onSelectAll};
};

export {useTableSelection};
