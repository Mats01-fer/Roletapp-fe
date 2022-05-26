import { Slider } from 'antd';
import React, { FC, useEffect } from 'react'


const Circle: FC<{
  percentage: number
}> = ({
  percentage
}) => {

    const radius = 4.5;
    const [x, setX] = React.useState(percentage * (2 * radius * Math.PI));
    const [y,] = React.useState(2 * radius * Math.PI);

    const [progress, setProgress] = React.useState(percentage);


    return (
      <>

        <div style={{
          width: 100,
          height: 100,
          margin: '10vh auto',
          position: "relative"
        }}>
          <div className="outline" >
          </div>
          <svg viewBox="0 0 10 10">
            <path className="outline" d="M5 0.5 a 4.5 4.5 0 0 1 0 9 a 4.5 4.5 0 0 1 0 -9" stroke='lightgrey' fill="none" strokeDasharray="100, 100" />

            <path className="ring" d="M5 0.5
                a 4.5 4.5 0 0 1 0 9
                a 4.5 4.5 0 0 1 0 -9" fill="none" stroke="grey" stroke-width="1" stroke-dasharray={`${x}, ${y}`} />
          </svg>


        </div>


        <Slider value={progress * 100} min={0} max={100} onChange={(value: number) => { setProgress(value / 100.0); setX(value / 100.0 * (2 * radius * Math.PI)) }} style={{ width: 150 }} />

      </>
    )
  }
export default Circle;