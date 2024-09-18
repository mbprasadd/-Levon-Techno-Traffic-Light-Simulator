import React, { useContext, useEffect } from 'react';
import { TrafficContext } from '../TrafficContext/TrafficContext';
import GreenLight from '../GreenLight/GreenLight';
import YellowLight from '../YellowLight/YellowLight';
import RedLight from '../RedLight/RedLight';
import PedestrianButton from '../PedestrianButton/PedestrianButton';
import EmergencyButton from '../EmergencyButton/EmergencyButton';

import "./index.css"

const TrafficLight = () => {
  const { state, dispatch } = useContext(TrafficContext);

  useEffect(() => {
    let timer;
    if (!state.emergencyOverride) {
      timer = setTimeout(() => {
        switch (state.currentLight) {
          case 'green':
            dispatch({ type: 'CHANGE_LIGHT', payload: { light: 'yellow', timer: 3 } });
            break;
          case 'yellow':
            dispatch({ type: 'CHANGE_LIGHT', payload: { light: 'red', timer: 7 } });
            break;
          case 'red':
            if (state.pedestrianRequested) {
              dispatch({ type: 'REQUEST_CROSSING' });
              setTimeout(() => {
                dispatch({ type: 'CHANGE_LIGHT', payload: { light: 'green', timer: 10 } });
              }, 5000);
            } else {
              dispatch({ type: 'CHANGE_LIGHT', payload: { light: 'green', timer: 10 } });
            }
            break;
          default:
            break;
        }
      }, state.timer * 1000);
    }

    return () => clearTimeout(timer);
  }, [state.currentLight, state.pedestrianRequested, state.emergencyOverride]);

  return (
    <div className="traffic-light">
      <div className='lights-container'>
        <GreenLight active={state.currentLight === 'green'} timer={state.timer} />
        <YellowLight active={state.currentLight === 'yellow'} timer={state.timer} />
        <RedLight active={state.currentLight === 'red'} timer={state.timer} />
      </div>
      <PedestrianButton />
      <EmergencyButton />
    </div>
  );
};

export default TrafficLight;
