import { ILogger } from "@evo-ninja/agent-utils";

export interface BrowserLoggerConfig {
  onLog(markdown: string): void;
}

export class BrowserLogger implements ILogger {
  constructor(private _config: BrowserLoggerConfig) {}

  async info(info: string): Promise<void> {
    this._config.onLog(info);
  }

  async notice(msg: string): Promise<void> {
    this._config.onLog(msg);
  }

  async success(msg: string): Promise<void> {
    this._config.onLog(msg);
  }

  async warning(msg: string): Promise<void> {
    this._config.onLog(msg);
  }

  async error(msg: string): Promise<void> {
    this._config.onLog(msg);
  }
}
