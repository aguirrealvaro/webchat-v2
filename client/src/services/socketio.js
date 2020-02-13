import io from 'socket.io-client'
import { ENDPOINT } from '../const'

export const socket = io(ENDPOINT)