import { FC, useEffect, useState } from 'react'
import { CalendarOutlined } from '@ant-design/icons';
import { Button, Slider, Space, Switch } from 'antd';
import Schedule from '../schedule/Schedule';
import di from '../../di/di';


const Home: FC<{}> = () => {
  const lampRepo = di.lampRepository;
  const blindsRepo = di.blindsRepository;

  const [showScheduler, setShowScheduler] = useState(false);
  const [roleta, setRoleta] = useState(0);
  const [svjetlo, setSvjetlo] = useState(false);

  const sendSchedule = (data: any) => {
    // scheduleRepo.schedule(data);
  }

  const sendRoleta = (value: number) => {
    blindsRepo.send({ blinds: value });
  }

  const sendSvjetlo = (state: boolean) => {
  }


  useEffect(() => {
    lampRepo.addListener(({ lamp }) => {
      setSvjetlo(lamp);
    })

    blindsRepo.addListener(({ blinds }) => {
      setRoleta(blinds);
    })
  }, [blindsRepo, lampRepo])




  return (
    <div className="App">

      <div className='roleta'>
        <Space direction='horizontal' className='datetime_picker' >
          <span>Roleta:</span>
          <Slider value={roleta} min={0} max={100} onChange={sendRoleta} style={{ width: 150 }} />
        </Space>
      </div>



      <div className='gutter'>
        <Button onClick={() => setShowScheduler(true)}>
          <CalendarOutlined />
        </Button>
      </div>



      <div className='svjetlo'>
        <Space direction='horizontal' className='datetime_picker' >
          <span>Svjetlo:</span>
          <Switch
            checked={svjetlo}
            onChange={sendSvjetlo} />
        </Space>
      </div>



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
    </div>
  )
}
export default Home;