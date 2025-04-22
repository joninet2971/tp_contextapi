import React, { useContext } from 'react';
import UnicornsView from './UnicornsView';
import { UnicornContext } from '../../context/UnicornContext';

const UnicornsContainer = () => {
  const {
    unicorns,
    createUnicorn,
    updateUnicorn,
    deleteUnicorn,
    editingUnicorn,
    setEditingUnicorn,
  } = useContext(UnicornContext);

  const startEdit = (unicorn) => {
    setEditingUnicorn(unicorn);
  };

  const initialValues = {
    name: editingUnicorn?.name || '',
    color: editingUnicorn?.color || '',
    age: editingUnicorn?.age || '',
    power: editingUnicorn?.power || '',
  };

  return (
    <UnicornsView
      unicorns={unicorns}
      handleCreate={createUnicorn}
      handleUpdate={updateUnicorn}
      handleDelete={deleteUnicorn}
      editingUnicorn={editingUnicorn}
      startEdit={startEdit}
      initialValues={initialValues}
    />
  );
};

export default UnicornsContainer;
