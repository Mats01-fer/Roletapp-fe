import React, { FC, useEffect, useMemo, useState } from 'react'
import { CalendarOutlined } from '@ant-design/icons';
import { Button, Slider, Space, Switch } from 'antd';
import Schedule from '../schedule/Schedule';
import { LightRepositoryMock } from '../../repository/light/lightRepositoryMock';
import { BlindsRepositoryMock } from '../../repository/blinds/lightRepositoryMock';


const Home: FC<{}> = () => {
  const lightRepo = useMemo(() => new LightRepositoryMock(), []);
  const blindsRepo = useMemo(() => new BlindsRepositoryMock(), []);

  const [showScheduler, setShowScheduler] = useState(false);
  const [roleta, setRoleta] = useState(0);
  const [svjetlo, setSvjetlo] = useState(false);

  const sendSchedule = (data: any) => {
    // scheduleRepo.schedule(data);
  }

  const sendRoleta = (value: number) => {
    blindsRepo.send({ roleta: value });
  }

  const sendSvjetlo = (state: boolean) => {
    lightRepo.send({ svjetlo: state });
  }


  useEffect(() => {
    lightRepo.addListener(({ svjetlo }) => {
      setSvjetlo(svjetlo);
    })

    blindsRepo.addListener(({ roleta }) => {
      setRoleta(roleta);
    })
  }, [blindsRepo, lightRepo])




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