import { FC, useEffect, useState } from 'react'
import { CalendarOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import Schedule from '../schedule/Schedule';
import di from '../../di/di';
import Lamp from '../lamp/Lamp';
import Blinds from '../roleta/Roleta';


const Home: FC<{}> = () => {
  const lightRepo = di.lightRepository;


  const [showScheduler, setShowScheduler] = useState(false);


  const sendSchedule = (data: any) => {
    // scheduleRepo.schedule(data);
  }


  useEffect(() => {

    lightRepo.addListener(({ light }) => {
      console.log('light', light);
    });

  }, [lightRepo])






  return (
    <div className="App"
      style={{
        height: window.innerHeight - 1,
      }}
    >

      <div className='roleta'>
        <Blinds />
      </div>



      <div className='gutter'>
        <Button onClick={() => setShowScheduler(true)} className="calendar_btn">
          <CalendarOutlined />
        </Button>
      </div>



      <div className='svjetlo'>
        <div className="svjetlo_roundrect">
          <Lamp />
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