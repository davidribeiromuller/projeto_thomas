export type SceneId =
  | 'sound_gate'
  | 'scene1_intro'
  | 'scene2_dinosaurs'
  | 'scene3_characters'
  | 'scene4_party'
  | 'scene5_popup_final';

export interface AppConfig {
  birthdayName: string;
  ageText: string;
  surpriseTitle: string;
  surpriseSubtitle: string;
  finalMessage: string;
  finalSubmessage: string;
  customUrl: string;
  soundEnabled: boolean;
  musicVolume: number;
  sfxVolume: number;
  scene1Duration: number; // in seconds
  scene2Duration: number;
  scene3Duration: number;
  scene4Duration: number;
}

export interface FloatingBalloon {
  id: string;
  x: number; // percentage 0-100
  color: string;
  size: number;
  speed: number;
  delay: number;
  popped?: boolean;
}

export interface Footstep {
  id: number;
  x: number;
  y: number;
  rotation: number;
  scale: number;
}
