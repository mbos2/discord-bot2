import { portal } from '@roboplay/robo.js';
import fs from 'fs';

/**
 * @type {import('@roboplay/robo.js').Config}
 **/
const updateModulesStatus = () => {
  const jsonString = fs.readFileSync('./modules.json', 'utf8');
  const json = JSON.parse(jsonString);
  const modules = json.modules;
  try {
    for(let i = 0; i < modules.length; i++) {
      portal.module(modules[i].name).setEnabled(modules[i].isEnabled)
    }
  } catch (error) {
    throw(error)
  }
}

export default async () => {
  try {
    updateModulesStatus();
  } catch (error) {
    console.log(error)
  }
}
