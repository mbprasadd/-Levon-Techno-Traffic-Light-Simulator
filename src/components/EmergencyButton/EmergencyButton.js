import React, { useContext, useEffect } from 'react';
import { TrafficContext } from '../TrafficContext/TrafficContext';

import "./index.css"

const EmergencyButton = () => {
    const { state, dispatch } = useContext(TrafficContext);
    return(
        <button className='emergency-button' onClick={() => dispatch({ type: 'EMERGENCY_OVERRIDE' })}>
          Emergency Override
      </button>
    )

}

export default EmergencyButton