import {init} from './webgl/init.mjs';
import {Master} from './webgl/model/master.mjs';

var master = new Master();

window.onload = init(master);
