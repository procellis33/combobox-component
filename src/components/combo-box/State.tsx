import React from "react";
import { ComboBoxItem } from "@components/combo-box/Item.tsx";
interface IState {
  onCLick?: () => void;
  label: string;
}
const State: React.FC<IState> = ({ onCLick, label }) => {
  return (
    <ComboBoxItem onClick={onCLick} className={"text-center cursor-default"}>
      {label}
    </ComboBoxItem>
  );
};
State.displayName = "ComboBoxErrorState";

export { State as ComboBoxState };
