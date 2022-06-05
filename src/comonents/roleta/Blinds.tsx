import { Slider, Space } from 'antd';
import { useBlindsRepository } from 'hooks';
import { FC, useMemo, useRef, useState } from 'react';
import { BlindsListener } from 'repository/blinds/blindsRepository';


const Blinds: FC<{ setManulaControl: React.Dispatch<React.SetStateAction<boolean>> }> = ({ setManulaControl }) => {
  const listener = useMemo<BlindsListener>(() => {
    return ({ blinds }) => {
      setRoleta(blinds);
      clearTimeout(timeOutRef.current);
      setLastRoletaSync(blinds)
    };
  }, []);
  const sendBlinds = useBlindsRepository(listener);
  const timeOutRef = useRef<NodeJS.Timeout>();

  const [roleta, setRoleta] = useState(100);
  const [lastRoletaSync, setLastRoletaSync] = useState(100);


  const sendRoleta = (value: number) => {
    sendBlinds({ blinds: value });
  }

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
        <div className="blinds" style={{ transform: `translateY(-${100-roleta}%)` }}>
          {Array.from(new Array(7)).map((_, index) =>
            <img src="/assets/blindBlade.svg" alt="roleta" className='rotelta_blade' key={index} />
          )}

        </div>
      </div>
      <Slider reverse={true} vertical={true} value={roleta} min={0} max={100} onChange={(val) => {
        setRoleta(val);
        setManulaControl(true);
      }} style={{
        width: 10,
        height: document.querySelector('.blinds')?.getBoundingClientRect().height
      }} onAfterChange={onFinishAdjust} />

    </Space>

  )
}
export default Blinds;