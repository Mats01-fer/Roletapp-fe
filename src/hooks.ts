import { BlindsObj } from "models/BlindsObj";
import { LampObj } from "models/LampObj";
import { useEffect } from "react";
import { BlindsListener } from "repository/blinds/blindsRepository";
import { LampListener } from "repository/lamp/lampRepository";
import { LightListener } from "repository/light/lightRepository";
import di from "./di/di";

export function useBlindsRepository(listener?: BlindsListener): (value: BlindsObj) => void {
  const repo = di.blindsRepository;

  useEffect(() => {
    if(!listener) return
    const id = repo.addListener(listener)

    return () => { repo.removeListener(id) }
  }, [listener, repo])

  return repo.send;
}

export function useLampRepository(listener?: LampListener): (value: LampObj) => void {
  const repo = di.lampRepository;

  useEffect(() => {
    if(!listener) return
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