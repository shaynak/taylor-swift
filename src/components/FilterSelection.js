//@flow
import "../style/FilterSelection.css";
import React, { useState } from "react";

type FilterSelectionProps = {
  defaultChecked: boolean,
  value: string,
  onChange: (string, boolean) => void,
};

export default function FilterSelection({
  defaultChecked,
  value,
  onChange,
}: FilterSelectionProps): React$MixedElement {
  const [checked, setChecked] = useState<boolean>(defaultChecked);
  const onClick = () => {
      onChange(value, !checked);
      setChecked(!checked);
  }
  return (
    <div
      className={
        checked ? "FilterSelection FilterSelectionChecked" : "FilterSelection"
      }
      onClick={onClick}
    >
      {value}
    </div>
  );
}
