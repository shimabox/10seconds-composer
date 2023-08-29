import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { PolySynth, Synth, Time, Transport, start } from 'tone';
import { CodeStructureType } from '../types';
import { DefaultCodeStructure } from '../constants/codeStructure';
import { MaxSoundTimeInSeconds } from '../constants/constraints';
import { RootState } from '../store';

const synth = new PolySynth(Synth).toDestination();

const scheduleProgression = (codeStructure: CodeStructureType) => {
  const endTimes: number[] = [];
  codeStructure.forEach(({ startTime, chord, duration, velocity }) => {
    const endTime = Time(startTime).toSeconds() + Time(duration).toSeconds();
    endTimes.push(endTime);
    Transport.scheduleOnce((time) => {
      synth.triggerAttackRelease(chord, duration, time, velocity);
    }, startTime);
  });
  const maxEndTime: number = Math.max(...endTimes);
  Transport.scheduleOnce(() => {
    Transport.stop();
  }, Math.min(maxEndTime, MaxSoundTimeInSeconds));
}

const Player: React.FC = () => {
  const [buttonLabel, setButtonLabel] = useState('Play');
  const codeStructure = useSelector((state: RootState) => state.data.codeStructure);

  const handleClick = async () => {
    if (Transport.state === 'stopped') {
      await start();
      scheduleProgression(codeStructure ? codeStructure : DefaultCodeStructure);
      Transport.start();
      setButtonLabel('Stop');
    } else if (Transport.state === 'started') {
      Transport.stop();
      Transport.cancel();
      setButtonLabel('Play');
    }
  };

  Transport.on('stop', () => {
    Transport.cancel();
    setButtonLabel('Play');
  });

  return (
    <button type='button' onClick={handleClick}>{buttonLabel}</button>
  );
};

export default Player;
