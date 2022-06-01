import React, { FC, useEffect, useMemo, useRef, useState } from 'react'
import { CalendarOutlined } from '@ant-design/icons';
import { Button, Slider, Space, Switch } from 'antd';
import Schedule from '../schedule/Schedule';
import { LightRepositoryMock } from '../../repository/light/lightRepositoryMock';
import { BlindsRepositoryMock } from '../../repository/blinds/blindsRepositoryMock';


const Home: FC<{}> = () => {
  const lightRepo = useMemo(() => new LightRepositoryMock(), []);
  const blindsRepo = useMemo(() => new BlindsRepositoryMock(), []);

  const timeOutRef = useRef<NodeJS.Timeout>();

  const [showScheduler, setShowScheduler] = useState(false);
  const [roleta, setRoleta] = useState(0);
  const [svjetlo, setSvjetlo] = useState(false);
  const [lastRoletaSync, setLastRoletaSync] = useState(0);

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
      console.log('roleta', roleta);
      clearTimeout(timeOutRef.current);
      setRoleta(roleta);
      setLastRoletaSync(roleta);
    })
  }, [blindsRepo, lightRepo])


  const onFinishAdjust = (value: number) => {
    clearTimeout(timeOutRef.current);
    let timeOutThing = setTimeout(() => {
      setRoleta(lastRoletaSync)
    }, 5000);
    timeOutRef.current = timeOutThing;
    setRoleta(value);
    sendRoleta(value);


  }




  return (
    <div className="App"
      style={{
        height: window.innerHeight - 1,
      }}
    >

      <div className='roleta'>
        <Space direction='horizontal' >
          <div className="blinds_container">
            <div className="blinds" style={{ marginTop: -(200 - roleta * 2) }}>
              {Array.from(new Array(7)).map((_, index) =>
                <img src="/assets/blindBlade.svg" alt="roleta" className='rotelta_blade' />
              )}

            </div>
          </div>
          <Slider reverse={true} vertical={true} value={roleta} min={0} max={100} onChange={(val) => setRoleta(val)} style={{ width: 10, height: 200 }} onAfterChange={onFinishAdjust} />

        </Space>
      </div>



      <div className='gutter'>
        <Button onClick={() => setShowScheduler(true)} className="calendar_btn">
          <CalendarOutlined />
        </Button>
      </div>



      <div className='svjetlo'>
        <div className="svjetlo_roundrect">
          <div className="bulb_btn_wrapper">
            <div className="bubl_btn"
              onClick={() => { sendSvjetlo(!svjetlo) }}
              style={{ ...!svjetlo && { backgroundColor: '#b6d7ea' } }}
            >
              <img src="/assets/bulb.svg" alt="svjetlo" style={{ height: 100 }} />

            </div>
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