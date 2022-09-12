import { Server, AttachOptions, ServerOptions } from "engine.io/build/server";
import transports from "engine.io/build/transports";
import * as parser from "engine.io-parser";
export { Server, transports, listen, attach, parser };
export { AttachOptions, ServerOptions } from "engine.io/build/server";
export { uServer } from "engine.io/build/userver";
export { Socket } from "engine.io/build/socket";
export { Transport } from "engine.io/build/transport";
export declare const protocol = 4;
/**
 * Creates an http.Server exclusively used for WS upgrades.
 *
 * @param {Number} port
 * @param {Function} callback
 * @param {Object} options
 * @return {Server} websocket.io server
 * @api public
 */
declare function listen(port: any, options: AttachOptions & ServerOptions, fn: any): Server;
/**
 * Captures upgrade requests for a http.Server.
 *
 * @param {http.Server} server
 * @param {Object} options
 * @return {Server} engine server
 * @api public
 */
declare function attach(server: any, options: AttachOptions & ServerOptions): Server;
