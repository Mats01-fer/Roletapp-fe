import { FC, useEffect, useRef, useState } from 'react';
import Schedule from '../schedule/Schedule';
import di from '../../di/di';


const Lamp: FC<{ setManulaControl: React.Dispatch<React.SetStateAction<boolean>> }> = ({ setManulaControl }) => {
  const lampRepo = di.lampRepository;


  const [svjetlo, setSvjetlo] = useState(false);


  const sendSvjetlo = (state: boolean) => {
    lampRepo.send({ lamp: state });
  }


  useEffect(() => {



    lampRepo.addListener(({ lamp }) => {
      setSvjetlo(lamp);
    })


  }, [lampRepo])






  return (

    <div className="bulb_btn_wrapper">
      <div className="bubl_btn"
        onClick={() => {
          sendSvjetlo(!svjetlo);
          setManulaControl(true);
        }}
        style={{ ...!svjetlo && { backgroundColor: '#b6d7ea' } }}
      >
        <img src="/assets/bulb.svg" alt="svjetlo" style={{ height: 100 }} />

      </div>
    </div>

  )
}
export default Lamp;