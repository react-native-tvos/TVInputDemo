/*
 * Demo of nextFocus APIs
 */

import {useRef, useState} from 'react';
import {
  Button,
  RowContainer,
  SectionContainer,
  Spacer,
} from '../common/StyledComponents';

const NextFocusExample = () => {
  const left = useRef<typeof Button>(null);
  const right = useRef<typeof Button>(null);

  // Hold refs to the two buttons in states
  // Update the state the first time the left button focuses; by then
  // the refs will be valid for the focus API
  const [leftState, setLeftState] = useState<typeof Button | null>(null);
  const [rightState, setRightState] = useState<typeof Button | null>(null);

  // We enable both nextFocusLeft and nextFocusRight for the buttons,
  // so that either left or right arrow/swipe will take us to the other button
  return (
    <SectionContainer title="nextFocus API example">
      <RowContainer>
        <Button
          ref={left}
          nextFocusLeft={rightState}
          nextFocusRight={rightState}
          onFocus={() => {
            setLeftState(left.current);
            setRightState(right.current);
          }}
          onPress={() => {}}>
          Button 1
        </Button>
        <Spacer />
      </RowContainer>
      <RowContainer>
        <Spacer />
        <Button
          ref={right}
          nextFocusLeft={leftState}
          nextFocusRight={leftState}
          onPress={() => {}}>
          Button 2
        </Button>
      </RowContainer>
    </SectionContainer>
  );
};

export default NextFocusExample;
