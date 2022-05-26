import React, { FC, useState } from 'react'
import { CalendarOutlined } from '@ant-design/icons';
import { Button, Slider, Space, Switch } from 'antd';
import Schedule from '../schedule/Schedule';


const Home: FC<{}> = () => {

  const [showScheduler, setShowScheduler] = useState(false);

  const sendSchedule = (data: any) => { }

  const sendRoleta = (value: number) => { }

  const sendSvjetlo = (state: boolean) => { }

  return (
    <div className="App">

      <div className='roleta'>
        <Space direction='horizontal' className='datetime_picker' >
          <span>Roleta:</span>
          <Slider defaultValue={30} min={0} max={100} onChange={sendRoleta} style={{ width: 150 }} />
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
          <Switch defaultChecked onChange={sendSvjetlo} />
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