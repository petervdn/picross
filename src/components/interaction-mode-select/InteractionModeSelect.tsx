import { InteractionMode, useInteractionStore } from '@/store/interaction.store';
import styles from './InteractionModeSelect.module.css';
import React, { useCallback } from 'react';
import { boardItemStates } from '@/types/misc.types';

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

  const options = boardItemStates.map((state) => ({ value: state, label: state }));
  console.log(interactionMode);
  return (
    <div className={styles.wrap}>
      <h2>Select mode</h2>
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
