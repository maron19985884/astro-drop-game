export function getBgmEnabled(): boolean {
  const stored = localStorage.getItem('bgmEnabled');
  return stored !== null ? stored === 'true' : true;
}

export function setBgmEnabled(enabled: boolean): void {
  localStorage.setItem('bgmEnabled', String(enabled));
}

export function getSeEnabled(): boolean {
  const stored = localStorage.getItem('seEnabled');
  return stored !== null ? stored === 'true' : true;
}

export function setSeEnabled(enabled: boolean): void {
  localStorage.setItem('seEnabled', String(enabled));
}
