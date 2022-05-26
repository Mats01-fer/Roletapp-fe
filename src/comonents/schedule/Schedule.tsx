import React, { FC, useState } from 'react'
import { Button, DatePicker, Select, Slider, Space, Switch, TimePicker } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import moment from 'moment';


const Schedule: FC<{
  onSave: (data: any) => void;
  hide: () => void;
}> = ({ onSave, hide }) => {

  const [scheduledDate, setScheduledDate] = useState<moment.Moment | null>(null);
  const [scheduledTime, setScheduledTime] = useState<moment.Moment | null>(null);


  const onChangeDate = (date: moment.Moment | null) => {
    setScheduledDate(date);
    scheduledTime && setScheduledTime(scheduledTime.set({ year: date?.year(), month: date?.month(), date: date?.date() }));
  }

  const onChangeTime = (time: moment.Moment | null) => {
    if (scheduledDate && time) {
      const date = moment(scheduledDate)
      date.set({ hour: time.hours(), minute: time.minutes() });
      if (date.diff(moment()) > 0) {
        setScheduledTime(date);
      }
    }

  }

  const clearSchedule = () => {
    setScheduledTime(null);
    setScheduledDate(null);
  }


  return (
    <>
      <h2>Scheduliraj</h2>
      <Space direction='horizontal' className='datetime_picker' >
        <DatePicker
          onChange={onChangeDate}
          className='picker'
          placeholder='Odaberi datum'
          format={'DD.MM.YYYY'}
          value={scheduledDate}
          disabledDate={(date) => {
            return date.diff(moment(), 'days') < 0;
          }}
        />
        <TimePicker
          onChange={onChangeTime}
          className='picker'
          placeholder='Odaberi vrijeme'
          value={scheduledTime}
          format='HH:mm'
          secondStep={60}
          disabled={!scheduledDate}
          disabledTime={(time) => {
            if (scheduledDate && scheduledDate.format('YYYY-MM-DD') === moment().format('YYYY-MM-DD')) {
              const hour = time.hours();
              const minute = time.minutes();
              return {
                disabledHours: () => Array.from(Array(hour).keys()),
                disabledMinutes: (selectedHour: number) => selectedHour === hour ? Array.from(Array(minute).keys()) : [],
                // disabledSeconds: (selectedHour: number, selectedMinute: number) => []

              };
            }
            return {
              disabledHours: () => [],
              disabledMinutes: (selectedHour: number) => [],
              disabledSeconds: (selectedHour: number, selectedMinute: number) => []
            };
          }}
        />
        <CloseOutlined onClick={clearSchedule} />
      </Space>
      <Space direction='horizontal' className='datetime_picker' >
        <span>Svjetlo:</span>
        <Switch defaultChecked onChange={(checked: boolean) => { }} />

      </Space>

      <Space direction='horizontal' className='datetime_picker' >
        <span>Roleta:</span>
        <Slider defaultValue={30} min={0} max={100} onChange={(value: number) => { }} style={{ width: 150 }} />
      </Space>
      <Space>
        <Button type='primary' disabled={!scheduledDate || !scheduledTime}
          onClick={() => scheduledTime && onSave(scheduledTime)}>
          Spremi
        </Button>
        <Button type='default'
          onClick={hide}>
          Odustavni
        </Button>
      </Space>
    </>
  )
}
export default Schedule;