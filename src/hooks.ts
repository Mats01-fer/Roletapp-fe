import { BlindsObj } from "models/BlindsObj";
import { LampObj } from "models/LampObj";
import { useEffect, useState } from "react";
import { BlindsListener } from "repository/blinds/blindsRepository";
import { LampListener } from "repository/lamp/lampRepository";
import { LightListener } from "repository/light/lightRepository";
import di from "./di/di";
import { InitObj } from "./models/InitObj";

export type InitListner = (value: InitObj) => void;

var promise: Promise<InitObj>;

export function useInitValues(): [InitObj | undefined, boolean] {
  const [value, setValue] = useState<InitObj>();
  const [error, setError] = useState(false);

  useEffect(() => {
    if(!promise) {
      promise = di.initRepository.getInitState();
    };

    promise.then(val => {
      console.log("init hook then");

      setValue(val);
    }).catch(reason => {
      setError(true);
    });
  }, [])

  return [value, error];
}

export function useBlindsRepository(listener: BlindsListener): (value: BlindsObj) => void {
  const repo = di.blindsRepository;

  useEffect(() => {
    const id = repo.addListener(listener)

    return () => { repo.removeListener(id) }
  }, [listener, repo])

  return repo.send;
}

export function useLampRepository(listener: LampListener): (value: LampObj) => void {
  const repo = di.lampRepository;

  useEffect(() => {
    const id = repo.addListener(listener)

    return () => { repo.removeListener(id) }
  }, [listener, repo])

  return repo.send;
}

export function useLightRepository(listener: LightListener): void {
  const repo = di.lightRepository;

  useEffect(() => {
    const id = repo.addListener(listener)

    return () => { repo.removeListener(id) }
  }, [listener, repo])
}