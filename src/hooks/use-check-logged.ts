import * as React from "react";

const useCheckLogged = (): [string | null, string | null, string | null] => {
  const [name, setName] = React.useState<string | null>(null);
  const [type, setType] = React.useState<string | null>(null);
  const [permission, setPermission] = React.useState<string | null>(null);

  React.useEffect(() => {
    const storedName = localStorage.getItem("name");
    const storedType = localStorage.getItem("type");
    const storedPermission = localStorage.getItem("permission");
    setPermission(storedPermission);
    setType(storedType);
    setName(storedName);
  }, []);

  return [name, type, permission];
};

export default useCheckLogged;
