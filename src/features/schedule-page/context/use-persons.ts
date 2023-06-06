import { useCallback, useState } from "react";

import { IPerson } from "interfaces";

export const usePersons = () => {
  const [persons, setPersons] = useState<IPerson[]>([]);

  const [newPersonsCount, setNewpersonsCount] = useState(0);

  const addPerson = useCallback(() => {
    setPersons((prev) => [...prev, { name: `Сотрудник-${newPersonsCount + 1}` }]);

    setNewpersonsCount((prev) => prev + 1);
  }, [newPersonsCount]);

  const deletePerson = useCallback((personName: string) => {
    setPersons((prev) => [...prev.filter(({ name }) => name !== personName)]);
  }, []);

  const editPerson = useCallback((oldName: string, newName: string) => {
    setPersons((prev) => prev.map((person) => (person.name === oldName ? { name: newName } : { ...person })));
  }, []);

  return {
    persons,
    addPerson,
    deletePerson,
    editPerson,
  };
};
