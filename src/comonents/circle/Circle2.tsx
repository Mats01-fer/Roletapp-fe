import React, { FC, useMemo, useRef } from 'react'

type Props ={
  percentage: number
}

const Circle: FC<Props> = ({ percentage }) => {
    const circleRef = useRef<SVGCircleElement>(null);

    const rect = useRef({} as DOMRect);

    function getInversePercentageNumber(x: number, y: number, width: number, height: number) {
      x = x - width / 2;
      y = height / 2 - y;
      var perc = Math.atan2(y, x) / Math.PI - 0.5;
      perc = perc < 0 ? 2 + perc : perc;

      console.log(x, y, perc);


      return perc/2;
    }

    function getPercentage(e: MouseEvent | TouchEvent) {
      const x = !!(e as TouchEvent).touches ? (e as TouchEvent).touches[0].clientX: (e as MouseEvent).clientX;
      const y = !!(e as TouchEvent).touches ? (e as TouchEvent).touches[0].clientY: (e as MouseEvent).clientY;

      return getInversePercentageNumber(x, y, rect.current.width, rect.current.height);
    }

    function handleMouseDown(e: React.MouseEvent<SVGSVGElement, MouseEvent>) {
      window.addEventListener("mousemove", handleMove);
      window.addEventListener("mouseup", () => window.removeEventListener("mousemove", handleMove));
    }

    function handleTouchStart(e: React.TouchEvent<SVGSVGElement>) {
      e.preventDefault();
      window.addEventListener("touchmove", handleMove);
      window.addEventListener("touchend", () => window.removeEventListener("touchmove", handleMove));
    }

    function handleMove(e: MouseEvent | TouchEvent) {
      e.preventDefault();
      const currOffset = parseInt(circleRef.current!.getAttribute("stroke-dashoffset")!);
      const perc = getPercentage(e);
      var newOffset = perc*502;
      if(newOffset - currOffset < -200) newOffset = 502;
      else if(newOffset - currOffset > 200) newOffset = 0;


      circleRef.current!.setAttribute("stroke-dashoffset", newOffset.toFixed(0));
    }

    return (
      <svg
        width={200}
        height={200}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        ref={(elem) => {
          if(!elem) return;

          rect.current = elem.getBoundingClientRect();
        }}
      >
        <circle cx="0" transform='translate(100,100)' cy="0" r="90" fill="#222" />
        <circle
          ref={circleRef}
          id='circle'
          cx={0}
          cy={0}
          r={80}
          transform='translate(100,100) rotate(-90)'
          strokeWidth={20}
          stroke="red"
          strokeDasharray={502}
          strokeDashoffset={0}
          fill="none"
        />
        <circle
          cx="0"
          cy="0"
          r={10}
          fill="white"
          strokeWidth={10}
          stroke="blue"
        />
      </svg>
    )
  }
export default Circle;