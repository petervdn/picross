import { InteractionMode, useInteractionStore } from '@/store/interaction.store';
import styles from './InteractionModeSelect.module.css';
import React, { useCallback, useEffect, useMemo } from 'react';
import { BoardItemState, boardItemStates } from '@/types/misc.types';
import { getLabelForBoardItemState } from '@/components/interaction-mode-select/InteractionModeSelect.utils';

const keyMap: Record<string, BoardItemState | undefined> = {
  a: 'filled',
  s: 'crossed',
  d: 'temporary',
};

export function InteractionModeSelect() {
  const { interactionMode, setInteractionMode } = useInteractionStore(
    ({ interactionMode, setInteractionMode }) => ({ interactionMode, setInteractionMode }),
  );

  const onRadioChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setInteractionMode(event.target.value as InteractionMode);
    },
    [setInteractionMode],
  );

  const options = useMemo(
    () =>
      boardItemStates.map((state) => ({ value: state, label: getLabelForBoardItemState(state) })),
    [],
  );

  useEffect(() => {
    const keyUpHandler = function (event: KeyboardEvent) {
      const stateForKey = keyMap[event.key];
      if (stateForKey) {
        setInteractionMode(stateForKey);
      }
    };
    window.addEventListener('keyup', keyUpHandler);

    return () => window.removeEventListener('keyup', keyUpHandler);
  }, [interactionMode, options, setInteractionMode]);

  return (
    <div>
      <h2>
        Select mode <small className={styles.small}>(change with a s d keys)</small>
      </h2>
      <div>
        {options.map(({ value, label }) => (
          <label htmlFor={value} key={value}>
            <input
              type="radio"
              value={value}
              id={value}
              checked={value === interactionMode}
              onChange={onRadioChange}
            />
            {label}
          </label>
        ))}
      </div>
    </div>
  );
}
