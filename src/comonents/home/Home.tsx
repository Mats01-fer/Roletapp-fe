import CircularSlider from '@fseehawer/react-circular-slider';
import { Spin } from 'antd';
import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { LightListener } from 'repository/light/lightRepository';
import { useBlindsRepository, useLampRepository, useLightRepository } from '../../hooks';
import Lamp from '../lamp/Lamp';
import Blinds from '../roleta/Blinds';


const Home: FC<{}> = () => {
  const listener = useMemo<LightListener>(() => {
    return ({ light }) => {
      setLoading(false);
      setLight(light);
    }
  }, []);
  useLightRepository(listener);

  const [sliderValue, setSliderValue] = useState(0);
  const [light, setLight] = useState(-1);
  const [loading, setLoading] = useState(true);
  const [manulaControl, setManulaControl] = useState(true);

  const timeout = useRef<NodeJS.Timeout>();

  const sendBlinds = useBlindsRepository();
  const sendLamp = useLampRepository();

  const updateState = useCallback((current: number, desired: number) => {
    if (current < desired) {
      sendLamp({ lamp: true });
      sendBlinds({ blinds: desired });
    } else {
      sendLamp({ lamp: false });
      sendBlinds({ blinds: desired });
    }
  }, [sendBlinds, sendLamp]);

  useEffect(() => {
    if(light === -1) return
    if(manulaControl) return;

    updateState(light, sliderValue)
  }, [light]);

  function handleChange(value: number) {
    if(light === -1) return;
    if(!!timeout.current) {
      clearTimeout(timeout.current)
    }

    timeout.current = setTimeout(() => {
      updateState(light, value);
      timeout.current = undefined;
    }, 2000);

    setSliderValue(value);
    setManulaControl(false);
  }

  return (
    <div className={`App ${loading ? 'loading' : ''}`}
      style={{
        height: window.innerHeight - 1,
      }}
    >
      {loading && (
        <Spin className="spinner" size="large" />
      )}
      <div className='roleta'>
        <Blinds setManulaControl={setManulaControl} />
      </div>
      <div className='svjetlo'>
        <div className="svjetlo_roundrect">
          <div className="bulb_btn_wrapper">
          <div className="slider_container">
            <CircularSlider
              knobColor="#48ACE4"
              progressSize={10}
              trackColor="#eeeeee"
              trackSize={10}
              label={''}
              width={200}
              hideLabelValue={true}
              min={0}
              max={100}
              onChange={handleChange}
            />
            </div>
            <Lamp setManulaControl={setManulaControl} />
          </div>
        </div>
      </div >
    </div >
  )
}

export default Home;