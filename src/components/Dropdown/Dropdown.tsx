import clsx from 'clsx';
import { CSSProperties, FC, useCallback, useMemo, useRef, useState } from 'react';
import useClickAway from 'react-use/lib/useClickAway';
import { DropdownArrow } from './DropdownArrow';
import { DropdownSpinner } from './DropdownSpinner';

interface Props {
  placeholder?: string;
  emptyPlaceholder?: string;
  maxPopupHeight?: number;
  popupScreenPadding?: number;
  items: DropdownItemProps[];
  value?: string;
  disabled?: boolean;
  loading?: boolean;
  onChange(value: string): void;
}

export interface DropdownItemProps {
  text: string;
  value: string;
}

export const Dropdown: FC<Props> = props => {
  const {
    placeholder,
    emptyPlaceholder = 'No items',
    maxPopupHeight = 256,
    popupScreenPadding = 8,
    items,
    value,
    disabled,
    loading,
    onChange,
  } = props;

  const [opened, setOpened] = useState(false);
  const [maxHeight, setMaxHeight] = useState<CSSProperties['maxHeight']>('none');
  const containerRef = useRef<HTMLDivElement>(null);

  const disabledOrLoading = useMemo(() => disabled || loading, [disabled, loading]);

  const onInputClick = useCallback(() => {
    if (disabledOrLoading) {
      return;
    }

    if (containerRef.current) {
      const bounds = containerRef.current.getBoundingClientRect();
      const computedHeight = window.innerHeight - bounds.bottom - popupScreenPadding;
      setMaxHeight(Math.min(computedHeight, maxPopupHeight));
    }

    setOpened(value => !value);
  }, [maxPopupHeight, popupScreenPadding, setOpened, setMaxHeight, disabledOrLoading]);

  const onItemClick = useCallback(
    (item: DropdownItemProps) => {
      onChange(item.value);
      setOpened(false);
    },
    [setOpened, onChange],
  );

  const selectedItem = useMemo(() => items.find(item => item.value === value), [items, value]);

  useClickAway(containerRef, () => setOpened(false));

  return (
    <>
      {opened && (
        <div className="tw-fixed tw-inset-0 tw-pointer-events-none tw-bg-input-focus tw-opacity-50 tw-z-dropdown-backdrop tw-animate-backdrop-open" />
      )}
      <div className={clsx('tw-relative', opened && 'tw-z-dropdown-opened')} ref={containerRef}>
        <input
          className={clsx(
            'tw-h-12 tw-w-full tw-px-4 tw-bg-input focus:tw-outline-none tw-border-2 tw-border-solid',
            'disabled:tw-bg-control-disabled disabled:tw-opacity-30',
            opened
              ? 'tw-rounded-t tw-border-input-focus tw-border-b-transparent tw-text-primary tw-placeholder-primary'
              : 'tw-rounded tw-border-transparent tw-text-white tw-placeholder-white',
          )}
          readOnly
          placeholder={placeholder}
          onClick={onInputClick}
          defaultValue={selectedItem?.text}
          disabled={disabledOrLoading}
        />
        <div
          onClick={onInputClick}
          className="tw-absolute tw-h-12 tw-w-12 tw-right-0 tw-top-0 tw-flex tw-items-center tw-justify-center">
          {loading ? (
            <DropdownSpinner className="tw-w-4 tw-h-4" />
          ) : (
            <DropdownArrow className={clsx('tw-w-4 tw-h-auto', opened && 'tw-rotate-180')} />
          )}
        </div>
        {opened && (
          <div className="tw-absolute tw-w-full">
            <div
              className="tw-rounded-b tw-bg-input tw-text-white tw-border-2 tw-border-solid tw-border-input-focus tw-border-t-0 tw-mt-[-2px] tw-flex tw-items-stretch tw-flex-col"
              style={{ maxHeight }}>
              <hr className="tw-border-input-divider tw-mx-2 tw-flex-none" />
              <ul className="tw-flex-1 tw-overflow-auto">
                {items.length > 0 ? (
                  items.map(item => (
                    <li key={item.value} className="tw-px-2">
                      <button
                        className="tw-w-full tw-h-10 tw-rounded tw-px-2 tw-flex tw-items-center active:tw-bg-list-item-active active:tw-text-primary"
                        onClick={() => onItemClick(item)}>
                        {item.text}
                      </button>
                    </li>
                  ))
                ) : (
                  <div className="tw-h-10 tw-px-4 tw-flex tw-items-center">{emptyPlaceholder}</div>
                )}
              </ul>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
