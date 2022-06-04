import CircularSlider from '@fseehawer/react-circular-slider';
import { Spin } from 'antd';
import { FC, useEffect, useMemo, useState } from 'react';
import { LightListener } from 'repository/light/lightRepository';
import { useInitValues, useLightRepository } from '../../hooks';
import Lamp from '../lamp/Lamp';
import Blinds from '../roleta/Blinds';


const Home: FC<{}> = () => {

  const map = (value: number, x1: number, y1: number, x2: number, y2: number) => (value - x1) * (y2 - x2) / (y1 - x1) + x2;

  const listener = useMemo<LightListener>(() => {
    return ({ light }) => {
            setLight(light);
          }
  }, []);
  useLightRepository(listener);

  const [value, error] = useInitValues();

  const [sliderValue, setSliderValue] = useState(75);
  const [light, setLight] = useState(0);

  const [manulaControl, setManulaControl] = useState(false);

  // useEffect(() => {
  //   if (manulaControl) return;

  //   if (light < sliderValue) {
  //     lampRepository.send({ lamp: true });
  //     blindsRepository.send({ blinds: light });
  //   } else {
  //     lampRepository.send({ lamp: false });
  //     blindsRepository.send({ blinds: light });
  //   }
  // }, [manulaControl, light])


  useEffect(() => {
    console.log(manulaControl);
  }, [manulaControl])

  return (
    <div className={`App ${!value ? 'loading' : ''}`}
      style={{
        height: window.innerHeight - 1,
      }}
    >
      {!value && (
        <Spin className="spinner" size="large" />
      )}
      <div className='roleta'>
        <Blinds setManulaControl={setManulaControl} />
      </div>
      <div className='svjetlo'>
        <div className="svjetlo_roundrect">
          <Lamp setManulaControl={setManulaControl} />
          <div className="slider_container">

            <CircularSlider
              labelColor="#005a58"
              knobColor="#1374ac"
              progressSize={10}
              trackColor="#eeeeee"
              trackSize={10}
              label={''}
              width={220}
              value={map(sliderValue, 0, 100, 0, 360)}
              onChange={(value: any) => {
                setSliderValue(map(value, 0, 360, 0, 100));
                setManulaControl(false);
              }}
            />
          </div>
        </div>
      </div >
    </div >
  )
}
export default Home;