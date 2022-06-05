import LightSvg from 'light_svg';
import { FC, useMemo, useState } from 'react';
import { LampListener } from 'repository/lamp/lampRepository';
import { useLampRepository } from '../../hooks';


const Lamp: FC<{ setManulaControl: React.Dispatch<React.SetStateAction<boolean>> }> = ({ setManulaControl }) => {
  const listener = useMemo<LampListener>(() => {
    return ({ lamp }) => {
      setSvjetlo(lamp);
    }
  }, []);

  const sendLamp = useLampRepository(listener);
  const [svjetlo, setSvjetlo] = useState(false);

  const sendSvjetlo = (state: boolean) => {
    sendLamp({ lamp: state });
  }

  return (
      <button className={`bubl_btn ${svjetlo ? 'on' : 'off'}`}
        onClick={() => {
          sendSvjetlo(!svjetlo);
          setManulaControl(true);
          console.log("buttton");

        }}
      >
        <LightSvg fill={svjetlo ? "#fff" : "#48ACE4"} style={{ height: 70 }} />
      </button>
  )
}
export default Lamp;