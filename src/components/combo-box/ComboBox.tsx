import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  autoUpdate,
  size,
  flip,
  useDismiss,
  useFloating,
  useInteractions,
  useListNavigation,
  useRole,
  FloatingFocusManager,
  FloatingPortal,
  Placement,
  offset,
  shift,
  useFocus,
} from "@floating-ui/react";
import { CustomInput } from "@components/custom-input/CustomInput.tsx";
import { PiSpinner } from "react-icons/pi";
import { ComboBoxItemList } from "@components/combo-box/ItemList.tsx";
import { ComboBoxState } from "@components/combo-box/State.tsx";

export type TListRef = Array<HTMLElement | null>;
export type TActiveIndex = number | null;
export interface IComboBoxProps {
  data?: { name: string }[];
  dataIsLoading?: boolean;
  setValue: (name: string) => void;
  name: string;
  placeholder: string;
  label: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  disabled?: boolean;
  defaultValue?: string;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  errorMessage?: string;
  contentPlacement?: Placement;
  contentOffset?: number;
}

/**
 * **Important Note:** setValue should be used as useState setFunction or be memorized (useCallback).
 */
const ComboBox = React.forwardRef<HTMLInputElement, IComboBoxProps>(
  (
    {
      data,
      value,
      setValue,
      name,
      placeholder,
      label,
      disabled,
      errorMessage,
      onChange: onChangeValue,
      onBlur,
      className,
      contentPlacement: placement = "bottom",
      contentOffset: offsetValue = 8,
      dataIsLoading = false,
    },
    ref,
  ) => {
    const [open, setOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState<TActiveIndex>(null);
    const [selectedValue, setSelectedValue] = useState(value);

    const listRef = useRef<TListRef>([]);

    const { refs, floatingStyles, context } = useFloating<HTMLInputElement>({
      whileElementsMounted: autoUpdate,
      placement,
      open,
      onOpenChange: setOpen,
      middleware: [
        offset(offsetValue),
        flip(),
        shift(),
        size({
          apply({ rects, elements }) {
            Object.assign(elements.floating.style, {
              width: `${rects.reference.width}px`,
            });
          },
        }),
      ],
    });

    const role = useRole(context, { role: "listbox" });
    const focus = useFocus(context);
    const dismiss = useDismiss(context, { referencePress: false });
    const listNav = useListNavigation(context, {
      listRef,
      activeIndex,
      onNavigate: setActiveIndex,
      virtual: true,
      loop: true,
    });

    const { getReferenceProps, getFloatingProps, getItemProps } =
      useInteractions([role, focus, dismiss, listNav]);

    const clearSelectedItem = useCallback(() => {
      setValue("");
      setSelectedValue("");
    }, [setSelectedValue, setValue]);

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      onChangeValue && onChangeValue(event);

      if (value === "") clearSelectedItem();

      if (value) {
        setOpen(true);
        data === undefined || data.length === 0
          ? setActiveIndex(null)
          : setActiveIndex(0);
      }
    };

    const closeContent = () => {
      setOpen(false);
      refs.domReference.current?.blur();
    };

    const onItemSelect = (name: string) => {
      setValue(name);
      setSelectedValue(name);
      setActiveIndex(null);
      setOpen(false);
      refs.domReference.current?.blur();
    };

    useEffect(() => {
      if (value === "") {
        clearSelectedItem();
      } else if (value !== selectedValue && !open) {
        setValue(selectedValue);
      }
    }, [value, selectedValue, setValue, open, clearSelectedItem]);

    return (
      <React.Fragment>
        <CustomInput
          disabled={disabled}
          className={className}
          enableClearButton={true}
          clearFunc={clearSelectedItem}
          type={"text"}
          label={label}
          name={name}
          errorMessage={errorMessage}
          placeholder={placeholder}
          {...getReferenceProps({
            ref: (node: HTMLInputElement | null) => {
              refs.setReference(node);
              if (typeof ref === "function") ref(node);
            },
            onChange,
            onFocus: () => {
              data === undefined || data.length === 0
                ? setActiveIndex(null)
                : setActiveIndex(0);
            },
            onBlur,
            value,
            "aria-autocomplete": "list",
            onKeyDown(event) {
              if (event.key === "Escape") refs.domReference.current?.blur();

              if (
                event.key === "Enter" &&
                activeIndex != null &&
                data &&
                data[activeIndex]
              ) {
                event.preventDefault();
                onItemSelect(data[activeIndex].name);
              }
            },
          })}
        />
        <FloatingPortal>
          {open && (
            <FloatingFocusManager
              context={context}
              initialFocus={-1}
              returnFocus={false}
            >
              {dataIsLoading ? (
                <ComboBoxSkeleton
                  onClick={closeContent}
                  {...getFloatingProps({
                    ref: refs.setFloating,
                    style: {
                      ...floatingStyles,
                    },
                  })}
                />
              ) : (
                <div
                  className={
                    "bg-popover rounded-sm min-h-10 max-h-40 overflow-y-auto custom-scrollbar border border-gray-400 dark:border-gray-400 divide-gray-400 divide-y drop-shadow-lg"
                  }
                  {...getFloatingProps({
                    ref: refs.setFloating,
                    style: {
                      ...floatingStyles,
                    },
                  })}
                >
                  {!data && (
                    <ComboBoxState
                      label={"Something went wrong."}
                      onCLick={closeContent}
                    />
                  )}
                  {data && data.length === 0 && (
                    <ComboBoxState
                      label={"No results found."}
                      onCLick={closeContent}
                    />
                  )}
                  {data && data.length > 0 && (
                    <ComboBoxItemList
                      getItemProps={getItemProps}
                      listRef={listRef}
                      data={data}
                      activeIndex={activeIndex}
                      onItemSelect={onItemSelect}
                    />
                  )}
                </div>
              )}
            </FloatingFocusManager>
          )}
        </FloatingPortal>
      </React.Fragment>
    );
  },
);
ComboBox.displayName = "ComboBox";

const ComboBoxSkeleton = React.forwardRef<
  HTMLDivElement,
  React.HTMLProps<HTMLDivElement>
>(({ ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={
        "bg-popover rounded-sm h-10 no-scrollbar border border-gray-400 dark:border-gray-400 drop-shadow-lg animate-pulse relative flex justify-center items-center"
      }
      {...props}
    >
      <PiSpinner className={"size-5 animate-spin"} />
    </div>
  );
});
ComboBoxSkeleton.displayName = "ComboBoxSkeleton";

export { ComboBox };
