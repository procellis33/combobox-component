import React from "react";
import { ComboBoxItem } from "@components/combo-box/Item.tsx";
import {
  IComboBoxProps,
  TActiveIndex,
  TListRef,
} from "@components/combo-box/ComboBox.tsx";
import { useInteractions } from "@floating-ui/react";

interface IItemListProps {
  data: Required<Pick<IComboBoxProps, "data">>["data"];
  getItemProps: Pick<
    ReturnType<typeof useInteractions>,
    "getItemProps"
  >["getItemProps"];
  onItemSelect: Required<Pick<IComboBoxProps, "setValue">>["setValue"];
  listRef: React.MutableRefObject<TListRef>;
  activeIndex: TActiveIndex;
}

const ItemList: React.FC<IItemListProps> = ({
  data,
  getItemProps,
  listRef,
  activeIndex,
  onItemSelect,
}) => {
  return (
    <React.Fragment>
      {data.map((item, index) => (
        <ComboBoxItem
          {...getItemProps({
            key: item.name + index,
            ref(node) {
              listRef.current[index] = node;
            },
            onClick: () => {
              onItemSelect(item.name);
            },
          })}
          active={activeIndex === index}
        >
          {item.name}
        </ComboBoxItem>
      ))}
    </React.Fragment>
  );
};
ItemList.displayName = "ComboBoxItemList";

export { ItemList as ComboBoxItemList };
