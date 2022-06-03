import { FC, useCallback, useEffect, useState } from 'react'
import { CalendarOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import Schedule from '../schedule/Schedule';
import di from '../../di/di';
import Lamp from '../lamp/Lamp';
import Blinds from '../roleta/Blinds';
import CircularSlider from '@fseehawer/react-circular-slider';


const Home: FC<{}> = () => {

  const map = (value: number, x1: number, y1: number, x2: number, y2: number) => (value - x1) * (y2 - x2) / (y1 - x1) + x2;

  const { lightRepository: lightRepo, lampRepository, blindsRepository } = di;


  const [showScheduler, setShowScheduler] = useState(false);
  const [sliderValue, setSliderValue] = useState(0);
  const [light, setlight] = useState(0);

  const [manulaControl, setManulaControl] = useState(false);


  const sendSchedule = (data: any) => {
    // scheduleRepo.schedule(data);
  }


  useEffect(() => {
    if (manulaControl) return;
    if (light < sliderValue) {
      lampRepository.send({ lamp: true });
      blindsRepository.send({ blinds: light });
    } else {
      lampRepository.send({ lamp: false });
      blindsRepository.send({ blinds: light });
    }
  }, [manulaControl, light])


  useEffect(() => {

    lightRepo.addListener(({ light }) => {
      setlight(light);
    });

  }, [lightRepo])


  useEffect(() => {
    console.log(manulaControl);
  }, [manulaControl])





  return (
    <div className="App"
      style={{
        height: window.innerHeight - 1,
      }}
    >

      <div className='roleta'>
        <Blinds setManulaControl={setManulaControl} />
      </div>



      <div className='gutter'>
        <Button onClick={() => setShowScheduler(true)} className="calendar_btn">
          <CalendarOutlined />
        </Button>
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



      {showScheduler &&
        <div className='popup'>
          <div className='popup_body'>
            <Schedule
              onSave={(data: any) => {
                setShowScheduler(false);
                sendSchedule(data);
              }}
              hide={() => setShowScheduler(false)}
            />
          </div>
        </div>
      }
    </div >
  )
}
export default Home;