import clsx from 'clsx';
import { CSSProperties, FC, useCallback, useMemo, useRef, useState } from 'react';
import useClickAway from 'react-use/lib/useClickAway';
import { DropdownArrow } from './DropdownArrow';

interface Props {
  placeholder?: string;
  emptyPlaceholder?: string;
  maxPopupHeight?: number;
  items: ItemProps[];
  value?: string;
  onChange(value: string): void;
}

interface ItemProps {
  text: string;
  value: string;
}

export const Dropdown: FC<Props> = props => {
  const { placeholder, emptyPlaceholder = 'No items', maxPopupHeight = 256, items, value, onChange } = props;

  const [opened, setOpened] = useState(false);
  const [maxHeight, setMaxHeight] = useState<CSSProperties['maxHeight']>('none');
  const containerRef = useRef<HTMLDivElement>(null);

  const onInputClick = useCallback(() => {
    if (containerRef.current) {
      const bounds = containerRef.current.getBoundingClientRect();
      const computedHeight = window.innerHeight - bounds.bottom;
      setMaxHeight(Math.min(computedHeight, maxPopupHeight));
    }

    setOpened(value => !value);
  }, [maxPopupHeight, setOpened, setMaxHeight]);

  const onItemClick = useCallback(
    (item: ItemProps) => {
      onChange(item.value);
      setOpened(false);
    },
    [setOpened, onChange],
  );

  const selectedItem = useMemo(() => items.find(item => item.value === value), [items]);

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
            opened
              ? 'tw-rounded-t tw-border-input-focus tw-border-b-transparent tw-text-primary tw-placeholder-primary'
              : 'tw-rounded tw-border-transparent tw-text-white tw-placeholder-white',
          )}
          readOnly
          placeholder={placeholder}
          onClick={onInputClick}
          defaultValue={selectedItem?.text}
        />
        <div
          onClick={onInputClick}
          className="tw-absolute tw-h-12 tw-w-12 tw-right-0 tw-top-0 tw-flex tw-items-center tw-justify-center">
          <DropdownArrow className={clsx('tw-w-4 tw-h-auto', opened && 'tw-rotate-180')} />
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
                    <li
                      key={item.value}
                      className="tw-h-10 tw-px-4 tw-flex tw-items-center"
                      onClick={() => onItemClick(item)}>
                      {item.text}
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
