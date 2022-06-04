import { Slider, Space } from 'antd';
import { FC, useEffect, useRef, useState } from 'react';
import di from '../../di/di';


const Blinds: FC<{ setManulaControl: React.Dispatch<React.SetStateAction<boolean>> }> = ({ setManulaControl }) => {
  const { blindsRepository } = di;

  const timeOutRef = useRef<NodeJS.Timeout>();

  const [roleta, setRoleta] = useState(100);
  const [lastRoletaSync, setLastRoletaSync] = useState(100);


  const sendRoleta = (value: number) => {
    blindsRepository.send({ blinds: value });
  }


  useEffect(() => {

    blindsRepository.addListener(({ blinds }) => {
      setRoleta(blinds);
      clearTimeout(timeOutRef.current);
      setLastRoletaSync(blinds)
    })
  }, [blindsRepository])


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

    <Space direction='horizontal' >
      <div className="blinds_container">
        <div className="blinds" style={{ marginTop: -(200 - roleta * 2) }}>
          {Array.from(new Array(7)).map((_, index) =>
            <img src="/assets/blindBlade.svg" alt="roleta" className='rotelta_blade' key={index} />
          )}

        </div>
      </div>
      <Slider reverse={true} vertical={true} value={roleta} min={0} max={100} onChange={(val) => {
        setRoleta(val);
        setManulaControl(true);
      }} style={{ width: 10, height: 200 }} onAfterChange={onFinishAdjust} />

    </Space>

  )
}
export default Blinds;